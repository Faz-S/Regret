import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false, // Default to private post
    },
});

const journalModel = mongoose.model("Journal", journalSchema);
export default journalModel;
