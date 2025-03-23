import React from 'react';

const NoResults: React.FC = () => {
    return (<>
    <div className="flex items-center justify-center min-h-screen bg-white w-full">
      <div className="text-center text-gray-500">
        <p className="text-xl">No Results Found</p>
      </div>
    </div>
    </>);
}

export default NoResults;