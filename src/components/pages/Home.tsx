import React, { useEffect } from 'react';

import BlogsWrapper from '../features/BlogsWrapper';
import Sidebar from '../layout/Sidebar';
import { useDataContext } from '../../store/DataContext';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import Navbar from '../layout/Navbar';

const Home: React.FC = () => {
    const { state,  searchPosts } = useDataContext();
    const { loading, error, posts } = state;

    const renderContent = () => {

        if (loading) {
            return <Loading />;
        }

        if (error) {
            return <div className="text-red-500">Oops!! Something went wrong</div>; 
        }

        if (posts.result.length > 0) {
            return (
                <>
                   
                    <Sidebar />
                    <BlogsWrapper />
                </>
            );
        }

        return <NoResults />;
    };

    useEffect(() => {
       
    }, [ searchPosts]);


    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="flex py-4 max-w-7xl mx-auto gap-2 lg:gap-5 px-2 ">
                {renderContent()}  
            </div>
        </div>
    );
}

export default Home;