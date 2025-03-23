import React, { useState } from 'react';
import { Post } from '../../interfaces/Interfaces';
import { useDataContext } from '../../store/DataContext';
import BookMark from '../ui/BookMark';
import CustomAlert from '../ui/Alert';
import { useNavigate } from 'react-router';
import IsVisited from '../ui/IsVisited';

type BlogCardProps = {
    post: Post
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    const { updatePost, deletePost } = useDataContext();
    const [DeletePostWarn, setDeleteState] = useState(false);
    const navigate = useNavigate();

    const deletepost = () => {
        deletePost(post.id);
    }
    const handleBookmarkToggle = (): void => {
        updatePost(post.id, { ...post, bookmarked: !post.bookmarked })
    }

    const redirecttoEdit = () => { navigate(`/edit-post/${post.id}`) }

    const redirectDetails = () => { navigate(`/details/${post.id}`) }

    return (<>
        <div className="card-default border border-gray-300 relative">
            <BookMark isBookMarked={post.bookmarked} handleBookmarkToggle={handleBookmarkToggle} />
            <IsVisited postId={post.id} />
            <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>

            <div className="text-gray-500 text-sm">
            <span>By {post.author}</span> • <span>{new Date(post.date).toDateString()}</span>
        </div>

            <p className="text-gray-500 text-sm line-clamp-4">{post.content}</p>
            <div className='flex flex-wrap gap-2'>
                {post.tags.map(x =>
                    <span key={Math.random()} className="pill">{x}</span>
                )}
            </div>

            <div className='mt-auto flex gap-2 items-center '>
                <button className="btn btn-primary" onClick={() => redirectDetails()}>Read More</button>
                <button className="btn btn-sm btn-success" onClick={() => redirecttoEdit()}>
                    Edit
                </button>

                <button className="btn btn-sm btn-warn" onClick={() => setDeleteState((state) => !state)}>
                    Delete
                </button>

            </div>
            {<CustomAlert message="Do You want to delete this Item ?" isVisible={DeletePostWarn} alertClose={() => setDeleteState((state) => !state)} alertConfirmation={() => deletepost()} />}

        </div>
    </>)
}

export default React.memo(BlogCard);