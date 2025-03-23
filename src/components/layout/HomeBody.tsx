
import BlogsWrapper from '../features/BlogsWrapper';
import Sidebar from '../layout/Sidebar';

const Home: React.FC = () => {
 
    return (
        <>
         <Sidebar />
         <BlogsWrapper /> 
        </>  
    );
}

export default Home;