import io from "socket.io-client";

const socket = io("ws://localhost:4000", {
    reconnectionDelayMax: 1000,
    auth: {
        token: localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token") as string).token
            : "",
    },
});

export default socket;
