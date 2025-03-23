import React from 'react';
import { useDataContext } from '../../store/DataContext';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';

const WithLoading = (WrappedComponent: React.FC) => {
    const { state } = useDataContext(); 

    return () => {
      const { loading, error, posts } = state;
  
      const renderContent = () => {
        if (loading) {
          return <Loading />;
        }
  
        if (error) {
          return <div className="text-red-500">Oops!! Something went wrong</div>;
        }
  
        if (posts.result.length > 0) {
          return <WrappedComponent />;
        }
  
        return <NoResults />;
      };
  
      return <>{renderContent()}</>;
    };
  };
  
  export default WithLoading;