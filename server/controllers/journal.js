import journalModel from "../models/journalModel.js";
// import journalModel from "../models/journalModel.js"


// export const postJournal =async(req,res)=>{
//     const { description } = req.body;
//     const newPost = new journalModel({description});
//     try {
//         await newPost.save();
//         res.status(201).json(newPost);
//     } catch (error) {
//         res.status(error.statusCode).json({error:"error creating your post"})
//     }
//     }

export const getJournal = async (req,res)=>{
    try{
        const newPost = await journalModel.find();
        res.status(201).json(newPost);
    }
    catch(error){
        res.status(error.statusCode).json({error:"error retrieving your post"})
    }
    
}   

export const deleteJournal = async (req, res) => {
    try {
      const { id } = req.params;  // Extract the journal ID from request parameters
      
      // Find the journal entry by ID and delete it
      await journalModel.findByIdAndDelete(id);
      
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: "Error deleting your post" });
    }
  };

// Save Journal for the user (private)
export const postJournalPrivate = async (req, res) => {
    const { description } = req.body;
    try {
        const newPost = new journalModel({
            description,
            user: req.user.id, // Ensure req.user is populated by auth middleware
            isPublic: false, // Private by default
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Error saving your post privately" });
    }
};

// Post Journal to community (public)
export const postJournalCommunity = async (req, res) => {
    console.log("helo")
    const { description } = req.body;
    try {
        console.log("hello")
        const newPost = new journalModel({
            description,
            user: req.user.id, // Ensure req.user is populated by auth middleware
            isPublic: true, // Set as public for community
        });
        console.log(req.user.id)
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Error posting your journal to the community" });
    }
};
