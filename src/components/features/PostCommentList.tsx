import React, { useEffect } from 'react';
import { useDataContext } from '../../store/DataContext';

type PostCommentListProps = {
    postId: string
}

const PostCommentList: React.FC<PostCommentListProps> = ({ postId }) => {

    const { fetchComments, deleteComment, state } = useDataContext();
    const { comments } = state;

    const handleDelete = (commentId: string) => { 
        deleteComment(postId, commentId);
     }


    useEffect(() => {
        fetchComments(postId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (<>
        {
            comments.length > 0 && <>
                <h2 className="text-lg font-semibold mt-2">Comments</h2>
                <ul className="mt-4">
                    {comments.map((comment) => (
                        <li
                            key={comment.id}
                            className="bg-gray-100 p-3 rounded-lg flex justify-between items-start mt-2"
                        >
                            <div>
                                <p className="text-sm font-semibold">{comment.author}</p>
                                <span className='text-gray-500 text-sm mt-1'>{new Date(comment.date).toDateString()}</span>
                                <p className="text-gray-700">{comment.content}</p>
                            </div>


                            <button className="btn btn-sm btn-warn" onClick={() => handleDelete(comment.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </>
        }

    </>)
}

export default PostCommentList;