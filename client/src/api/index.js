import axios from "axios";

// const url = "https://memorys-server.herokuapp.com/posts";
const url = "http://localhost:5000";

axios.interceptors.request.use((req)=> {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
});

export const fetchPosts = () => axios.get(url+'/posts');

export const createPost = (newPost) => axios.post(url+'/posts', newPost);

export const updatePost = (currentId, updatedPost) => axios.patch(url + `/posts/${currentId}`, updatedPost);

export const deletePost = (currentId) => axios.delete(url + `/posts/${currentId}`);

export const likePost = (id) => axios.patch(url+`/posts/${id}/like`);

export const signIn = (formData) => axios.post(url+'/user/signin',formData)

export const signUp = (formData) => axios.post(url+'/user/signup',formData)