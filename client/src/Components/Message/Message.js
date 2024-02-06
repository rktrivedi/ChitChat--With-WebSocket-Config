import React from "react";
import "./Message.css";

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimeName = name.trim().toLowerCase();

  if (user === trimeName) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <div className="messageContainer justfyEnd">
      <p className="sentText pr-10">{trimeName}</p>
      <div className="messagebox backgroundBlue">
        <p className="messageText colorWhite">{text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messagebox backgroundLight">
        <p className="messageText colorDark">{text}</p>
      </div>
      <p className="sentText pl-10">{user}</p>
    </div>
  );
};

export default Message;
