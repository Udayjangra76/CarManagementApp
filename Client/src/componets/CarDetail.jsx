import { Swiper, SwiperSlide } from "swiper/react";
import "../../node_modules/swiper/swiper-bundle.min.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import newRequest from "../Utils/BaseURL.js";

const CarDetail = () => {
    const { id } = useParams();  // Retrieve car ID from route params
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await newRequest.get(`/api/cars/${id}`);
                setCar(response.data.car);
            } catch (error) {
                console.error("Error fetching car data:", error);
                toast.error("Failed to fetch car details.");
            } finally {
                setLoading(false);
            }
        };
        fetchCar();
    }, [id]);

    // Handle delete car
    const handleDelete = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("currentUser"));
            await newRequest.delete(`/api/cars/${id}`, {
                headers: {
                    Authorization: user.token,
                },
            });
            toast.success("Car deleted successfully.");
            setTimeout(() => navigate("/"), 1500);  // Redirect after a short delay
        } catch (error) {
            console.error("Error deleting car:", error);
            toast.error("Failed to delete the car.");
        }
    };

    // Handle update car
    const handleUpdate = () => {
        toast.info("Redirecting to update car...");
        navigate(`/update/${id}`);
    };

    if (loading) return <p>Loading...</p>;
    if (!car) return <p>Car not found.</p>;

    return (
        <div className="flex justify-center bg-gray-100">
            <div className="w-4/5 mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
                <h1 className="text-4xl font-bold text-blue-700 mb-2 text-center">{car.title}</h1>

                {/* ToastContainer to render toast notifications */}
                <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover />

                {/* Enhanced Image Slider with Autoplay and Pagination */}
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={10}
                    slidesPerView={2}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    className="w-full max-w-4xl mx-auto mb-2 rounded-lg overflow-hidden shadow-lg"
                >
                    {car.images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image}
                                alt={`Car Image ${index + 1}`}
                                className="rounded-lg object-cover h-72"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Car Details Section */}
                <div className="text-left w-full mt-4 space-y-4">
                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">{car.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-gray-600 text-base">
                        <div><strong className="text-gray-800">Car Type:</strong> {car.carType}</div>
                        <div><strong className="text-gray-800">Company:</strong> {car.company}</div>
                        <div><strong className="text-gray-800">Dealer:</strong> {car.dealer}</div>
                        <div><strong className="text-gray-800">Tags:</strong> {car.tags.join(", ")}</div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-8">
                    <button
                        className="w-1/3 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
                        onClick={handleDelete}
                    >
                        Delete Car
                    </button>
                    <button
                        className="w-1/3 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
                        onClick={handleUpdate}
                    >
                        Update Car
                    </button>
                    <button
                        className="w-1/3 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
                        onClick={() => navigate("/")}
                    >
                        Back to Car List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;
