import React, { useEffect } from 'react';
import { useDataContext } from '../../store/DataContext';
import CheckboxComponent from '../ui/Checkbox';

const Sidebar: React.FC = () => {
    const { state, filterPosts, fetchPosts, setIsFilterApplied, getIsFilterApplied } = useDataContext();
    const { tags, authors } = state;

    const tagsFilterHandler = (label: string): void => {
        setIsFilterApplied(true);
        filterPosts(label);
    }

    const authorFilterHandler = (label: string): void => {
        setIsFilterApplied(true);

        filterPosts('', label);
    }

    const clearFilter = () => {
        fetchPosts();
        setIsFilterApplied(false);
    }

    useEffect(() => {
    }, [tags, authors]);

    return (
        <>
            <aside className="hidden sm:block w-1/4 bg-white p-4 shadow-md rounded-md h-max border border-gray-300">
                <div className={`flex items-center justify-between  mb-2`}>
                    <h2 className="font-bold py-2 text-2xl">Filters</h2>
                    <button onClick={clearFilter} className={`btn btn-sm ${getIsFilterApplied() ? "" : "hidden"} btn-outlined`}>Clear filter</button>
                </div>
                <h2 className="font-bold ">Authors</h2>
                <ul className="mt-2 text-gray-600 max-h-[250px] overflow-auto border-t border-gray-300">
                    {authors.map(x => <CheckboxComponent key={x} handleClick={authorFilterHandler} label={x} />)}
                </ul>
                <h2 className="font-bold mt-6">Tags</h2>
                <ul className="mt-2 text-gray-600 max-h-[250px] overflow-auto border-t border-gray-300">
                    {tags.map(x => <CheckboxComponent key={x} handleClick={tagsFilterHandler} label={x} />)}
                </ul>
            </aside>


        </>)
}

export default Sidebar