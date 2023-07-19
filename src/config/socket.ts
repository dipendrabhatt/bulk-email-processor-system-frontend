import io from "socket.io-client";
import url from "../constants/url";

const socket = io(url.REACT_APP_SOCKET_URL, {
    reconnectionDelayMax: 10000,
    auth: {
        token: localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token") as string).token
            : "",
    },
});

export default socket;
