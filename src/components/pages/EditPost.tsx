import React, { useEffect, useState } from "react";
import PostForm from "../features/PostForm";
import BackButton from "../ui/BackButton";
import { Post } from "../../interfaces/Interfaces";
import { useDataContext } from "../../store/DataContext";
import { useNavigate, useParams } from "react-router";
import Loading from "../ui/Loading";
import NoResults from "../ui/NoResults";

const EditPost: React.FC = () => {

    const { updatePost } = useDataContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const { getCurrentPost, state } = useDataContext();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchedPost = id ? getCurrentPost(id) : null;
        if (id && fetchedPost) {
            setPost(fetchedPost); 
        }
    }, [id, getCurrentPost]);

    const handlePostSubmit = (updatedPost: Omit<Post, 'id'>) => {
        if(post){
            updatePost(post.id, {...updatedPost, id: post.id}).then(() => {  alert('Post edited Successfully!') });
            navigate(`/`);
        }
    }


    if (state.loading) {
        return <Loading />
    }

    if (!id || !post) {
        return <NoResults />
    }
    return (
        <>
            <div className="max-w-3xl border border-gray-300 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg relative">
                <BackButton />
                <h2 className="text-xl font-semibold  text-center">Edit Post</h2>
                <PostForm post={post} onSubmit={handlePostSubmit} />
            </div>
        </>)
}


export default EditPost;