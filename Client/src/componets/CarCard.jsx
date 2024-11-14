import React from "react";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
    const navigate = useNavigate();

    const handleClick = () => {

        navigate(`/cars/${car._id}`);
    };
    return (
        <div
            onClick={handleClick}
            className="max-w-xs bg-yellow-200 rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer bg-white"
        >
            {/* Car Image */}
            <img
                className="w-full h-40 object-cover"
                src={car.images[0] || 'https://via.placeholder.com/150'}  // Placeholder if no image
                alt={`${car.title} image`}
            />

            {/* Car Info */}
            <div className="px-4 py-3">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{car.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                    {car.description.length > 60
                        ? car.description.slice(0, 60) + "..."
                        : car.description}
                </p>
                <p className="text-blue-600 font-semibold text-sm">View Details</p>
            </div>
        </div>
    );
};

export default CarCard;
