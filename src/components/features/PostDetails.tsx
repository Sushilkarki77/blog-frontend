import React from 'react';
import { Post } from '../../interfaces/Interfaces';
import BookMark from '../ui/BookMark';
import { useDataContext } from '../../store/DataContext';


type PostDetailsProps = {
    post: Post
}
const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {

    const { updatePost } = useDataContext();




    const handleBookmarkToggle = (): void => {
        updatePost(post.id, { ...post, bookmarked: !post.bookmarked })
    }

    return (<>

        <BookMark isBookMarked={post.bookmarked} handleBookmarkToggle={handleBookmarkToggle} />

        <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>


        <div className="text-gray-500 text-sm mt-1">
            <span>By {post.author}</span> • <span>{new Date(post.date).toDateString()}</span>
        </div>


        <p className="mt-4 text-gray-700">{post.content}</p>


        <div className="mt-4 flex gap-2">
            {post.tags.map((tag) => (
                <span key={tag} className="bg-gray-200 text-gray-700 px-3 py-1 text-xs rounded-md">
                    #{tag}
                </span>
            ))}
        </div>


    </>)
}

export default PostDetails;