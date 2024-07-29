import Post from "../models/postModel.js";
import User from "../models/userModel.js";

export const updateUser = async(req, res, next) =>{
    if(req.user.id !== req.params.id) return next(error); //res.status(404).json({msg : "you can only update ypur own account"});

    try {
       const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            name : req.body.name,
            email : req.body.email,
            avatar : req.body.avatar,

        }
       }, {new : true}) 

       res.status(200).json("user updated successfully");
    } catch (error) {
        next(error);
    }

}

export const deleteUser = async(req, res, next) =>{
    if(req.user.id !== req.params.id) return next(error);

    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({msg : "user deleted successfully", clearToken: true});
    } catch (error) {
        next(error);
    }
}

export const getUserPost = async(req, res, next)=>{
     if(req.user.id === req.params.id){
         try {
             const listings = await Post.find({userRef: req.params.id});
             if (listings.length === 0) {
                res.status(404).json({ message: 'No listings found for the user' });
             } else {
                res.status(200).json(listings);
             }
         } catch (error) {
            next(error);
         }

     } else{
        console.log("error getting user post")
     }

    
}