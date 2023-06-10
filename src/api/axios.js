import axios from "axios";
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_HOST + import.meta.env.VITE_PREFIX,
    headers: {
        "Content-Type": "application/json",
        "vinc-jwt": localStorage.getItem("vinc-jwt") || null,
        app: "VINC",
    },
});

axiosInstance.interceptors.request.use(
    config => {
        let token = localStorage.getItem("vinc-jwt") || null;

        if (token) {
            config.headers["vinc-jwt"] = `${token}`;
        }

        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

export default axiosInstance;