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
        enum: ["open", "ongoing", "closed"],
    },
    githubRepoLink: {
        type: String,
        required: true,
        validate: {
          validator: function(v) {
            const githubRepoRegex = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
            return githubRepoRegex.test(v);
          },
          message: props => `${props.value} is not a valid GitHub repository URL!`
        }
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