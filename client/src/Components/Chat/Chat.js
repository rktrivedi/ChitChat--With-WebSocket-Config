// // let socket;

// // const Chat = ({ location }) => {

// // useEffect(() => {
// //   console.log("Inside useEffect");
// //   if (location && location.search) {
// //     console.log("Location exists:", location.search);
// //     const { name, room } = queryString.parse(location.search);
// //     socket = io(ENDPOINT);

// //     console.log("Parsed Query Params - Name and Room:", name, room);
// //     setName(name);
// //     setRoom(room);

// //     console.log("Socket:", socket);
// //   }
// // }, [location]);
// import React, { useState, useEffect } from "react";
// import queryString from "query-string";
// import "./Chat.css";
// import io from "socket.io-client";

// const Chat = ({ location }) => {
//   const [name, setName] = useState(urlParams.get("name") || "");
//   const [room, setRoom] = useState(urlParams.get("room") || "");
//   const ENDPOINT = "http://localhost:5000";
//   const urlParams = new URLSearchParams(window.location.search);
//   useEffect(() => {
//     const { name, room } = queryString.parse(urlParams);
//     // Specify transport options when creating the socket connection
//     const socket = io(ENDPOINT, {
//       transports: ["websocket", "polling", "flashsocket"],
//     });

//     setName(name);
//     setRoom(room);

//     socket.emit("join", { name, room }, ({ error }) => {});
//     console.log("Socket:", socket);

//     socket.on("connect", () => {
//       console.log("Connected to server");
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected from server");
//     });

//     // ... other event listeners

//     return () => {
//       // Clean up the socket connection
//       socket.disconnect();
//     };
//   }, [ENDPOINT, urlParams]);

//   return <div>Lets Chat</div>;
// };

// export default Chat;

// import React, { useState, useEffect } from "react";
// import queryString from "query-string";
// import "./Chat.css";
// import io from "socket.io-client";

// const Chat = ({ location }) => {
//   const ENDPOINT = "http://localhost:5000";
//   const urlParams = new URLSearchParams(window.location.search);

//   // Use state to manage name and room values
//   const [name, setName] = useState(urlParams.get("name") || "");
//   const [room, setRoom] = useState(urlParams.get("room") || "");

//   useEffect(() => {
//     // Parse query parameters
//     const { name, room } = queryString.parse(urlParams.get("name") || "");

//     // Specify transport options when creating the socket connection
//     const socket = io(ENDPOINT, {
//       transports: ["websocket", "polling", "flashsocket"],
//     });

//     setName(name);
//     setRoom(room);

//     // Emit join event with name and room
//     socket.emit("join", { name, room }, ({ error }) => {
//       // Handle acknowledgment if needed
//     });

//     console.log("Socket:", socket);

//     socket.on("connect", () => {
//       console.log("Connected to server");
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected from server");
//     });

//     // ... other event listeners

//     return () => {
//       // Clean up the socket connection
//       socket.disconnect();
//     };
//   }, [ENDPOINT, urlParams]);

//   return <div>Lets Chat</div>;
// };

// export default Chat;

import React, { useState, useEffect } from "react";
import queryString from "query-string";
import "./Chat.css";
import io from "socket.io-client";

const Chat = ({ location }) => {
  const ENDPOINT = "http://localhost:5000";
  const urlParams = new URLSearchParams(window.location.search);

  // Use state to manage name and room values
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    // Parse query parameters
    const { name, room } = queryString.parse(urlParams.get("name") || "");

    // Specify transport options when creating the socket connection
    const socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    setName(name);
    setRoom(room);

    // Emit join event with name and room
    socket.emit("join", { name: name, room: room }, ({ error }) => {
      // Handle acknowledgment if needed
    });

    console.log("Socket:", socket);

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // ... other event listeners

    //   // Clean up the socket connection
    return () => {
      socket.disconnect();
    };
  }, [ENDPOINT, urlParams]);

  return <div>Lets Chat</div>;
};

export default Chat;
