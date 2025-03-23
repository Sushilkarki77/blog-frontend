import React from "react";
import PostForm from "../features/PostForm";
import BackButton from "../ui/BackButton";
import { Post } from "../../interfaces/Interfaces";
import { useDataContext } from "../../store/DataContext";
import { useNavigate } from "react-router";

const AddPost: React.FC = () => {

    const { addPost } = useDataContext();
    const navigate = useNavigate();
    const handlePostSubmit = (post: Omit<Post, 'id'>) => {
        addPost(post).then(() => {  alert('Post added Successfully!') });
        navigate(`/`);
    }
    return (
        <>
            <div className="max-w-3xl border border-gray-300 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg relative">
                <BackButton />
                <h2 className="text-xl font-semibold  text-center">Add Post</h2>
                <PostForm onSubmit={handlePostSubmit} />
            </div>
        </>)
}


export default AddPost;