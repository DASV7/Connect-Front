import axios from "axios";
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_HOST + import.meta.env.VITE_PREFIX,
    headers: {
        "Content-Type": "application/json",
        "jwt": localStorage.getItem("jwt") || null,
        app: "autologin",
    },
});

axiosInstance.interceptors.request.use(
    config => {
        let token = localStorage.getItem("jwt") || null;

        if (token) {
            config.headers["jwt"] = `${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;