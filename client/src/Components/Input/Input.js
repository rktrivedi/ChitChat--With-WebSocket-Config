import React from "react";

import "./Input.css";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="inputContainer">
      <form className="form">
        <input
          className="input"
          type="text"
          value={message}
          placeholder="Enter Your Message"
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <button
          className="sendButton"
          onClick={(event) => {
            sendMessage = { sendMessage };
            console.log(message, event);
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Input;
