import React from 'react'
import { useNavigate } from 'react-router';


const BackButton: React.FC = () => {
    const navigate = useNavigate();


    return (<>
     <button onClick={() => navigate(-1)} className="btn btn-sm bg-gray-200 text-gray-700 shadow-md hover:bg-gray-300 transition"
                >
                    ← Back
                </button>
    </>)
}

export default BackButton