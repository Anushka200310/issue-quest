import Post from "../models/postModel.js";

export const createPost =async(req, res, next)=>{

    try {
         // Assuming req.user.id contains the ID of the currently logged-in user
       // req.body.userRef = req.user.id; 
        const posts = await Post.create(req.body);
        return res.status(201).json(posts);
    } catch (error) {
        next(error);
    }

}

export const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            console.log("Couldn't find any post");
            return res.status(404).json({ error: "Post not found" });
        }

        if (req.user.id !== post.userRef) {
            console.log("You can only delete your own post");
            return res.status(403).json({ error: "Unauthorized" });
        }

        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json("Post deleted successfully");
    } catch (error) {
        next(error);
    }
};

export const updatePost = async(req, res, next)=>{
    const post = await Post.findById(req.params.id);

    if(!post){
        return res.status(404).json({msg : "post not found"})
    }

    if(req.user.id !== post.userRef){
        return res.status(403).json({error: "you can only update your own post"})
    }

    try {
       const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
       ) 
       res.status(200).json(updatedPost);
    } catch (error) {
        next(error)
    }

}




