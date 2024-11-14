import React, { useEffect, useState } from 'react';
import CarList from './CarList.jsx';
import newRequest from '../Utils/BaseURL.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Content() {
    const [carData, setCarData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                const user = JSON.parse(localStorage.getItem("currentUser"));
                console.log(user.token);
                const response = await newRequest.get('/api/cars/', {
                    headers: {
                        Authorization: user.token,
                    },
                });
                setCarData(response.data);
                toast.success("Cars loaded successfully!"); // Success toast
            } catch (error) {
                toast.error("Error fetching car data."); // Error toast
                console.error("Error fetching car data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    return (
        <div className='flex flex-col gap-2 m-2'>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
            {loading ? (
                <p>Loading cars...</p>
            ) : (
                <CarList cars={carData} />
            )}
        </div>
    );
}

// import React, { useEffect, useState } from 'react';
// import CarList from './CarList.jsx';
// import newRequest from '../Utils/BaseURL.js';

// export default function Content() {
//     const [carData, setCarData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchCars = async () => {
//             setLoading(true);
//             try {
//                 const user = JSON.parse(localStorage.getItem("currentUser"));
//                 console.log(user.token);
//                 const response = await newRequest.get('/api/cars/', {
//                     headers: {
//                         Authorization: user.token,
//                     },
//                 });
//                 setCarData(response.data);
//             } catch (error) {
//                 console.error("Error fetching car data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchCars();
//     }, []);

//     return (
//         <div className='flex flex-col gap-2 m-2'>
//             {loading ? (
//                 <p>Loading cars...</p>
//             ) : (
//                 <CarList cars={carData} />
//             )}
//         </div>
//     );
// }
