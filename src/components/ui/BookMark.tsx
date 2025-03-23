import React from 'react'

type BookMarkProps = {
    isBookMarked: boolean;
    handleBookmarkToggle: () => void
}

const BookMark: React.FC<BookMarkProps> = ({ isBookMarked, handleBookmarkToggle }) => {
    return (
        <>
            <div className="cursor-pointer absolute right-4 top-0" onClick={handleBookmarkToggle}>
                {isBookMarked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-yellow-500">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v18l7-3 7 3V3a2 2 0 00-2-2H7a2 2 0 00-2 2z"></path>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-700 hover:text-yellow-500">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v18l7-3 7 3V3a2 2 0 00-2-2H7a2 2 0 00-2 2z"></path>
                    </svg>
                )}
            </div>

        </>
    )
}

export default BookMark