import React from "react";
import "./Messages.css";

import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../Message/Message";

const Messages = ({ messages, name }) => (
  <ScrollToBottom>
    {messages.map((message, i) => (
      <div className="messages" key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
