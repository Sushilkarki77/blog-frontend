import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDataContext } from "../../store/DataContext";
import { Post } from "../../interfaces/Interfaces";
import PostDetails from "../features/PostDetails";
import PostCommentForm from "../features/PostCommentForm";
import PostCommentList from "../features/PostCommentList";
import NoResults from "../ui/NoResults";
import Loading from "../ui/Loading";
import BackButton from "../ui/BackButton";
import { useAtom } from "jotai";
import { addPostVisitAtom } from "../../store/PostVisitStore";


const BlogDetail: React.FC = () => {

    const [, addPostVisit] = useAtom(addPostVisitAtom);


    const { id } = useParams();
    const { getCurrentPost, state } = useDataContext();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchedPost = id ? getCurrentPost(id) : null;
        if (id && fetchedPost) {
            setPost(fetchedPost);
            
        }
    }, [id, getCurrentPost]);

    if (state.loading) {
        return <Loading />
    }

    if (!id || !post) {
        return <NoResults />
    }

    addPostVisit(id);


    return (
        <div className="max-w-3xl border border-gray-300 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg relative">
            <BackButton />
            <PostDetails post={post} />
            <div className="mt-6">
                <PostCommentForm postId={id} />
                <PostCommentList postId={id} />
            </div>
        </div>
    );
};

export default BlogDetail;


