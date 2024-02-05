import React, { useState, useEffect } from "react";
import "./Chat.css";
import io from "socket.io-client";
import { useLocation } from "react-router";

const Chat = ({ location }) => {
  const socket = io({
    transports: ["websocket", "polling", "flashsocket"],
  });

  const ENDPOINT = "http://localhost:5000";
  const { search } = useLocation();
  const urlParams = React.useMemo(() => new URLSearchParams(search), [search]);

  // Use state to manage name and room values
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Parse query parameters
    const name = urlParams.get("name");
    const room = urlParams.get("room");

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

  // To Send Message
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [message]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
      </div>
    </div>
  );
};

export default Chat;
