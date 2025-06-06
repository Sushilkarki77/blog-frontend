
import React from "react";

const Loading: React.FC = () => {
    return (
        <>
            <div className="flex items-center justify-center h-screen mx-auto">
                <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
        </>

    );
};

export default Loading;