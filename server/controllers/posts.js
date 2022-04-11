import mongoose from "mongoose";
import PostMessage from "../models/postMesage.js";

export const getPosts = async (req, res) => {
  try {
    let postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  let post = req.body;
  const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  let { id: _id } = req.params;
  let updatePost = req.body;
  if (mongoose.Types.ObjectId.isValid(_id)) {
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, updatePost, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } else {
    res.status(404).send("No data with this id!");
  }
};

export const deletePost = async (req, res) => {
  let { id: _id } = req.params;
  if (mongoose.Types.ObjectId.isValid(_id)) {
    await PostMessage.findByIdAndDelete(_id);
    res.status(200).json("Post Deleted");
  } else {
    res.status(404).send("No data with this id!");
  }
};

export const likePost = async (req, res) => {
  let { id: _id } = req.params;

  if(!req.userId) return res.status(400).json({message:'Unauthenticated'});
  
  if (mongoose.Types.ObjectId.isValid(_id)) {
    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex((id)=>id==req.userId);

    if(index == -1){
      post.likes.push(req.userId)
    } else {
      post.likes = post.likes.filter((id)=> id!== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post,{new: true,});

    res.status(200).json(updatedPost);
  } else {
    res.status(404).send("No data with this id!");
  }
};
