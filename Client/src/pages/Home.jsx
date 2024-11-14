import Content from "../componets/Content.jsx";
import Footer from "../componets/Footer.jsx";
import Navbar from "../componets/Navbar.jsx";

const Home = () => {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col min-h-screen w-4/5 text-center justify-center bg-gray-50">
                <Navbar />
                <div className="flex-grow">
                    <Content />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Home;

