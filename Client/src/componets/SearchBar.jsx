import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (onSearch && query) {
            onSearch(query);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="mt-2 flex justify-center items-center w-full">
            <div className="flex relative rounded-md w-full px-2">
                <input
                    type="text"
                    name="q"
                    id="query"
                    placeholder="Search by title, description, tags"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full p-3 rounded-md border-2 rounded-r-none border-gray-800 placeholder-gray-800"
                />
                <button
                    onClick={handleSearch}
                    className="inline-flex items-center gap-2 bg-blue-700 text-white text-lg font-semibold py-2 px-6 rounded-r-md"
                >
                    <span>Search</span>
                </button>
            </div>
        </div>
    );
}
