import React from "react";
import CarCard from "./CarCard";

const CarList = ({ cars }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cars.map(car => (
                <CarCard key={car.id} car={car} />
            ))}
        </div>
    );
};

export default CarList;