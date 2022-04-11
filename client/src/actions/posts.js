import * as api from "../api";
import { FETCH_ALL, CREATE, UPDATE, LIKE, DELETE } from "../Constants/actionTypes";

// Action Creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    const action = {
      type: FETCH_ALL,
      payload: data,
    };

    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    const { data } = await api.createPost(newPost);
    const action = {
      type: CREATE,
      payload: data,
    };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (currentId, updatedPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(currentId, updatedPost);
    const action = {
      type: UPDATE,
      payload: data,
    };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (_id) =>  async (dispatch) => {
  try {
    await api.deletePost(_id);
    const action = {
      type: DELETE,
      payload: _id,
    };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const {data} = await api.likePost(id);
    const action = {
      type:LIKE,
      payload:data
    }
    dispatch(action);
    
  } catch (error) {
    console.log(error.message);
  }
}
