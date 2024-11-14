import React, { useState } from "react";
import { useFormik } from 'formik';
import Navbar from "../componets/Navbar.jsx";
import Footer from "../componets/Footer.jsx";
import upload from "../Utils/Upload.js";
import newRequest from "../Utils/BaseURL.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const handleUpload = async () => {
        setUploading(true);
        try {
            const urls = await Promise.all(
                [...images].map(async (file) => {
                    const url = await upload(file);
                    return url;
                })
            );
            setUploading(false);
            return urls;
        } catch (err) {
            console.log(err);
            toast.error("Image upload failed!");
        }
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            tags: '',
            carType: '',
            company: '',
            dealer: ''
        },
        onSubmit: async (values) => {
            const uploadedImageUrls = await handleUpload();
            if (!uploadedImageUrls) return;
            console.log(uploadedImageUrls);
            const dataToSend = {
                ...values,
                images: uploadedImageUrls,
            };
            try {
                const user = JSON.parse(localStorage.getItem("currentUser"));
                const response = await newRequest.post('/api/cars/', dataToSend, {
                    headers: {
                        Authorization: user.token,
                    },
                });
                console.log("Car created successfully:", response.data);
                toast.success("Car created successfully!");
            } catch (error) {
                console.error("Error creating car:", error);
                toast.error("Error creating car!");
            }
        },
    });

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length <= 10) {  // Limit to 10 images
            setImages(files);
        } else {
            alert("You can only upload up to 10 images.");
        }
    };

    return (
        <div className="flex justify-center">
            <ToastContainer />
            <div className=" gap-1 flex flex-col min-h-screen w-4/5 text-center justify-center bg-gray-50">
                <Navbar />
                <div className="flex justify-center">
                    <div className=" w-4/5 flex items-center justify-center bg-gray-100">
                        {/* Form Container */}
                        <div className="bg-white p-5 rounded-lg shadow-lg w-full">
                            <h1 className="text-3xl font-semibold text-center mb-6 text-blue-700">Create a New Car</h1>

                            <form onSubmit={formik.handleSubmit}>
                                {/* Title */}
                                <div className="mb-2">
                                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                                        Car Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        onChange={formik.handleChange}
                                        value={formik.values.title}
                                        placeholder="Enter car title"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-2">
                                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        placeholder="Enter car description"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Tags */}
                                <div className="mb-2">
                                    <label htmlFor="tags" className="block text-gray-700 font-semibold mb-2">
                                        Tags (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        name="tags"
                                        onChange={formik.handleChange}
                                        value={formik.values.tags}
                                        placeholder="electric , hybrid "
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Car Type */}
                                <div className="flex justify-between">
                                    <div className=" w-3/12 ">
                                        <label htmlFor="carType" className="block text-gray-700 font-semibold mb-2">
                                            Car Type
                                        </label>
                                        <input
                                            type="text"
                                            name="carType"
                                            onChange={formik.handleChange}
                                            value={formik.values.carType}
                                            placeholder="e.g. Sedan, SUV"
                                            className=" w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Company */}

                                    <div className=" w-3/12">
                                        <label htmlFor="company" className="block text-gray-700 font-semibold mb-2">
                                            Company
                                        </label>
                                        <input
                                            type="text"
                                            name="company"
                                            onChange={formik.handleChange}
                                            value={formik.values.company}
                                            placeholder="Car manufacturer"
                                            className=" w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Dealer */}
                                    <div className=" w-3/12">
                                        <label htmlFor="dealer" className="block text-gray-700 font-semibold mb-2">
                                            Dealer
                                        </label>
                                        <input
                                            type="text"
                                            name="dealer"
                                            onChange={formik.handleChange}
                                            value={formik.values.dealer}
                                            placeholder="Enter dealer name"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div className="mb-2 mt-5">
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        multiple
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <p className="text-sm text-gray-500 mt-2">
                                        You can upload up to 10 images.
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <div className="mb-2">
                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                                    >
                                        Create Car
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Create;


