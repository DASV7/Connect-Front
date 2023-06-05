import axios from "./axios.js";

export default {
    get: (url, request) => axios.get(url, request),
    post: (url, request) => axios.post(url, request),
    patch: (url, request) => axios.patch(url, request),
    delete: (url, request) => axios.delete(url, request),
    put: (url, request) => axios.put(url, request),
};
