import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar.jsx';
import CarList from './CarList.jsx';
import newRequest from '../Utils/BaseURL.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Content() {
    const [carData, setCarData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await newRequest.get('/api/cars/all/');
                setCarData(response.data);
                toast.success("Cars loaded successfully!");
            } catch (error) {
                toast.error("Error fetching car data.");
                console.error("Error fetching car data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    const fetchCars = async (query = '') => {
        setLoading(true);
        try {
            const response = await newRequest.get(`/api/cars/search?query=${query}`);
            setCarData(response.data);
            toast.success("Cars filtered successfully!");
        } catch (error) {
            toast.error("Error fetching car data.");
            console.error("Error fetching car data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars(); // Initial fetch without query
    }, []);

    const handleSearch = (query) => {
        fetchCars(query.trim()); // Fetch cars based on search query
    };

    return (
        <div className='flex flex-col gap-2 m-2'>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
            <SearchBar onSearch={handleSearch} />
            {loading ? (
                <p>Loading cars...</p>
            ) : (
                <CarList cars={carData} />
            )}
        </div>
    );
}

