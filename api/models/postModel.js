import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    address : {
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


// regularPrice : {
//     type: Number,
//     required: true
// },
// discountPrice : {
//     type: Number,
//     required: true
// },
// bedrooms : {
//     type: Number,
//     required: true
// },
// bathrooms : {
//     type: Number,
//     required: true
// },
// furnished : {
//     type: Boolean,
//     required: true
// },
// parking : {
//     type: Boolean,
//     required: true
// },