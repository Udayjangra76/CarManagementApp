import MyContent from "../componets/MyContent.jsx";
import Footer from "../componets/Footer.jsx";
import Navbar from "../componets/Navbar.jsx";

const MyCar = () => {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col min-h-screen w-4/5 text-center justify-center bg-gray-50">
                <Navbar />
                <div className="flex-grow">
                    <MyContent />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default MyCar;

