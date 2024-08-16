import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
        enum: ["high", "medium", "low"],  
    },
    label : {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["open", "in progress", "closed"],
    },
    imageUrls : {
        type: Array,
        required: true
    },
    userRef : {
        type: String,
        required: true
    }
    
}, {timestamps : true})

const Post = mongoose.model("Details", postSchema);

export default Post;