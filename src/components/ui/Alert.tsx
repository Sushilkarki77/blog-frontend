import React, { useEffect } from 'react';

type CustomAlertProps = {
    message: string;
    isVisible: boolean;
    alertClose: () => void;
    alertConfirmation:  () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, isVisible, alertClose, alertConfirmation }) => {

    useEffect(() => {}, [isVisible])
    return (
      isVisible && (
        <div className="fixed z-10 left-[37%] top-[12px] bg-red-500 text-white px-4 py-2 rounded-lg shadow-md">
          {message}
          <button 
            onClick={alertClose} 
            className="ml-4 px-2 py-1 bg-white text-red-600 rounded-md"
          >
            Close
          </button>
          <button 
            onClick={alertConfirmation} 
            className="ml-4 px-2 py-1 bg-white text-red-600 rounded-md"
          >
            Ok
          </button>
        </div>
      )
    );
  };
  
  export default CustomAlert;
  

