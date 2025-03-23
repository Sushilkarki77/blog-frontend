
import Navbar from '../layout/Navbar';
import WithLoading from '../layout/WithLoader';
import HomeBody from '../layout/HomeBody';



const Home: React.FC = () => {
    const HomeBodyWithLoading = WithLoading(HomeBody)

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="flex py-4 max-w-7xl mx-auto gap-2 lg:gap-5 px-2 ">
                <HomeBodyWithLoading />
            </div>
        </div>
    );
}

export default Home;