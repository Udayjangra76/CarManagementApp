import axios from "axios";

const newRequest = axios.create({
    baseURL: "https://car-management-app-one.vercel.app",
    withCredentials: true,
});

export default newRequest;