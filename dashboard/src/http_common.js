import axios from "axios";

const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token") !== null
        ? `Bearer ${localStorage.getItem("token")}`
        : ''
    }
})

export default http;