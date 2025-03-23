import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDataContext } from '../../store/DataContext';

type PostCommentFromProps = {
    postId: string;
}

const PostCommentForm: React.FC<PostCommentFromProps> = ({ postId }) => {

    const [author, setAuthor] = useState<string>("");
    const [commentText, setCommentText] = useState<string>("");

    const { addComment } = useDataContext();

    const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setAuthor(e.target.value);
    };

    const handleCommentTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setCommentText(e.target.value);
    };

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        if (!author.trim() || !commentText.trim()) return;

        const date = new Date().toDateString();

        addComment(postId, { author, postId, content: commentText, date })
        setAuthor("");
        setCommentText("");

    };


    return (
        <><form onSubmit={handleSubmit} className="mt-4 bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2>Add Comment</h2>
            <input
                type="text"
                placeholder="Your Name"
                value={author}
                onChange={handleAuthorChange}
                required={true}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
                placeholder="Write a comment..."
                required={true}
                value={commentText}
                onChange={handleCommentTextChange}
                className="w-full mt-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button type="submit" className="btn btn-primary">Submit</button>

        </form>
        </>
    )
}


export default PostCommentForm;