import { reactive } from "vue";
import { io } from "socket.io-client";
import jwtDecode from "jwt-decode";
export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: []
});

const URL = import.meta.env.VITE_SOCKET || "http://localhost:5500";

export let socket = io(URL, {
    auth: {
        "user": localStorage.getItem("vinc-jwt") ? jwtDecode(localStorage.getItem("vinc-jwt")) : null
    },
    autoConnect: true,
});

export const socketInitManual = () => {
    socket = io(URL, {
        auth: {
            "user": localStorage.getItem("vinc-jwt") ? jwtDecode(localStorage.getItem("vinc-jwt")) : null
        },
        autoConnect: true
    })
}

socket.on("connect", () => {
    state.connected = true;
});

socket.on("disconnect", () => {
    state.connected = false;
});

