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
    label : {
        type: String,
        required: true,
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