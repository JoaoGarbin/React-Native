import axios from "axios";
import { AppError } from "@utils/AppError";

const api = axios.create({
    baseURL: 'http://172.18.0.1:3333'
});

api.interceptors.request.use(response => response, error => {
    if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message));
    } else {
        return Promise.reject(error)
    }
});

export { api };

