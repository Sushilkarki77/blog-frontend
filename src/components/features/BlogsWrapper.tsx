import React from 'react';
import BlogCard from './BlogCard';
import { useDataContext } from '../../store/DataContext';
import Loading from '../ui/Loading';
import Pagination from '../ui/Pagination';
import { useNavigate } from 'react-router';
import { clearStorageAtom } from '../../store/PostVisitStore';
import { useAtom } from 'jotai';

const BlogsWrapper: React.FC = () => {
    const { state, fetchPosts, exportPosts } = useDataContext();
    const [, clearStorage] = useAtom(clearStorageAtom);

    

    const navigate = useNavigate();


    const navigateToAdd = () => navigate(`/add-post`);


    if (state.loading) return <Loading />;
    if (state.error) return <p>Error: {state.error}</p>;

    const handleClick = (page: number) => {
        fetchPosts(page.toString());
    }

    return (<>

        <main className="flex-1 flex flex-col gap-3  ">


            <div className=" flex justify-between w-full bg-white p-4  text-sm shadow-md rounded-md h-max border border-gray-300">
               <span className='text-gray-500'>Results  {state.posts.page || 1} - {(state.posts.count || state.posts.result.length)* (state?.posts?.page || 1)} of {state.posts.totalcount}</span>
               <div className='flex gap-4'>
                        <button className='btn-nav' onClick={navigateToAdd}>Add Post</button>
                        <button className='btn-nav' onClick={() => clearStorage()}>Clear Visit</button>
                        <button className='btn-nav' onClick={exportPosts}>Export</button>
                    </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-3'>
                {state.posts.result.sort((a, b) => Number(b.bookmarked) - Number(a.bookmarked)).map(x => <BlogCard key={x.id} post={x} />)}

            </div>
            {state.posts.count !== state.posts.totalcount && <Pagination handleClick={handleClick} page={state.posts.page || 0} numberPerPage={15} totalResult={state.posts.totalcount || 0} />}
        </main>

    </>)
}

export default BlogsWrapper;