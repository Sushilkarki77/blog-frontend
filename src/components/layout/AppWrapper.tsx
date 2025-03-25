
import { BrowserRouter, Route, Routes } from 'react-router'
import { useEffect } from 'react'
import { useDataContext } from '../../store/DataContext';
import Details from '../pages/Details';
import Home from '../pages/Home';
import AddPost from '../pages/AddPost';
import EditPost from '../pages/EditPost';

const AppWrapper: React.FC = () => {
    const { fetchPosts } = useDataContext();


    useEffect(() => {
        fetchPosts();
    }, [fetchPosts])

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/details/:id' element={ <Details  />} />
                    <Route path='/add-post' element={<AddPost />} />
                    <Route path='/edit-post/:id' element={<EditPost />} />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppWrapper;
