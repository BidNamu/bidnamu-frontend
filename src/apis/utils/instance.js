import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const instance = axios.create({
    baseURL: API_KEY,
   //timeout:1000,
    headers: {
        "Content-Type": "application/json",
    }
})

export default instance