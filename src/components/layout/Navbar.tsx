import React, { useState } from 'react';
import { useDataContext } from '../../store/DataContext';


const Navbar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { searchPosts, fetchPosts } = useDataContext();

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const containsText = (): boolean => {
        if (searchTerm.trim() === "") return false;
        return true;
    }

    const clearSearch = () => {
        setSearchTerm("");
        fetchPosts();
    }


    const handleSearchSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (!containsText()) {
            fetchPosts()
        } else {
            searchPosts(searchTerm);
        }
    }
    return (
        <>
            <nav className="navbar">
                <div className='flex max-w-7xl mx-auto w-full'>
                    <div className='hidden lg:flex'>
                        <img width={150} src="/Blogger-logo.jpg" alt="" />
                    </div>
                    <form onSubmit={handleSearchSubmit} className="search-box ml-auto mr-auto">
                        <input value={searchTerm} onChange={handleSearchInputChange} type="text" placeholder="Search..." className="search-input" />
                        {searchTerm && (
                            <button type="button" onClick={clearSearch} className="clear-button text-2xl mr-2">
                                &times;
                            </button>
                        )}
                        <button type='submit' className="search-button">Search</button>
                    </form>


                </div>

            </nav>

        </>
    )
}

export default Navbar;