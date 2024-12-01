import time
import json
import ast
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from langchain_core.prompts import ChatPromptTemplate, PromptTemplate
from langchain_groq import ChatGroq

app = Flask(__name__)
CORS(app)

# MongoDB client setup
mongo_client = MongoClient("mongodb+srv://221501031:HPcr63PzUJOJuyTJ@cluster0.ajyr8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" )
db = mongo_client["chat_db"]
collection = db["session_history"]

# List of API keys
api_keys = [
    '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',
    'gsk_Another_API_Key1',
    'gsk_Another_API_Key2',
]

# Function to switch API key on rate limit error
def switch_api_key():
    api_key = api_keys.pop(0)
    api_keys.append(api_key)
    return api_key

# Function to make the request with retry logic for 429 status
def make_request_with_retry(llm, prompt, retries=3):
    try:
        response = llm(prompt)
        return response
    except Exception as e:
        print(f"Error encountered: {e}")
        if "429" in str(e):
            print("Rate limit reached. Switching to another API key...")
            new_api_key = switch_api_key()
            llm.groq_api_key = new_api_key
            print(f"New API Key: {new_api_key}")
            time.sleep(60)
            return make_request_with_retry(llm, prompt)
        else:
            raise e

# Initialize LLM with the initial API key
initial_api_key = api_keys[0]
llm = ChatGroq(
    temperature=0.7,
    model_name="mixtral-8x7b-32768",
    groq_api_key=initial_api_key
)

# Chat history management
prompt_template_summarise = '''
You are an assistant tasked with summarizing chat conversations while retaining specific details and context. I will provide you with a list of conversations between two roles: Human and AI. Each entry contains a role and the content they contributed. Your task is to:
- Summarize all the content spoken by the Human into a single entry under the role Human, ensuring that all specific details and topics mentioned are accurately represented without generalization.
- Summarize all the content spoken by the AI into a single entry under the role AI, ensuring the key responses are preserved with specific references to the Human's input.
- Return alone the summarized content in the same format as the input list: a list of dictionaries, where each dictionary contains role and content.
The output format that you provide should be in the above-specified format as I am splitting the output you gave for converting from string to list. Don't provide any string (text, words) in your response. Importantly don't include the string 'Output List:' in the response.
Input List:
{history}
'''

def summarize_history(detailed_history):
    prompt_history = PromptTemplate.from_template(prompt_template_summarise)
    chain_summarise = prompt_history | llm
    sum_output = chain_summarise.invoke({"history": detailed_history})
    return sum_output.content

def load_history_from_db(session_id):
    document = collection.find_one({"session_id": session_id})
    history = []
    if document:
        history = document.get("history", [])
    return history

def save_history_to_db(session_id, history):
    collection.update_one(
        {"session_id": session_id},
        {"$set": {"history": history}},
        upsert=True
    )

def load_history(history):
    if len(history) > 6:
        summarized_history = summarize_history(str(history[:-4]))
        history = ast.literal_eval(summarized_history) + history[-4:]
    return history

def add_history(history, role, content):
    history.append({"role": role, "content": content})

# Flask route
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    
    session_id = data.get("session_id")
    question = data.get("question")

    # Load or initialize session history
    history = load_history_from_db(session_id)

    # Process chat history
    processed_history = load_history(history)

    # Prompt template
    prompt_template = """
       You're an AI assistant designed to respond to the given question like Andrew Tate, combining his
       assertive, confident humor with a touch of bravado, reflecting Andrew Tate's confident style while encouraging a playful perspective on life’s challenges and embodying his rude personality with Gen Z language and slang.
       You are speaking to a college student or young adult who is discussing their problems, regrets, or casual topics.
       Always provide direct, blunt responses, encouraging resilience, independence, and accountability.
       Be motivational, but don’t sugarcoat anything. If the topic involves regrets or problems, challenge the user to take control of their life without excuses.
       For lighter, friendly chats, keep it laid-back but confident, occasionally using slang and sarcasm if it fits.
       Use informal language and avoid being overly polite. Add subtle references to strength, ambition, and self-respect.
       The chat history of the conversation is as follows:
       Chat History:
       {chat_history}

       Question:
       {question}

       Respond based on both the chat history and the given question.
    """
    prompt = PromptTemplate.from_template(prompt_template)
    chain = prompt | llm

    # Generate response
    response = chain.invoke({"question": question, "chat_history": processed_history})
    add_history(history, "Human", question)
    add_history(history, "AI", response.content)
    save_history_to_db(session_id, history)

    return jsonify({"response": response.content})

if __name__ == "__main__":
    app.run(debug=True)