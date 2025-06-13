import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  //   const [lastSeendAt, setLastSeendAt] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const messagesEndRef = useRef(null);

  // Auto scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatToIST = (utcDate) => {
    if (!utcDate) return "";

    const date = new Date(utcDate);
    if (isNaN(date)) return "Invalid Date";

    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const fetchChatMessages = async () => {
    const chat = await axios.get(
      `${import.meta.env.VITE_SERVER_BACKEND_BASEURL}/chat/${targetUserId}`,
      { withCredentials: true }
    );
    // console.log(chat?.data?.data);

    const chatMessages = chat?.data?.data?.messages.map((msg) => {
      const { senderId, text, updatedAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text: text,
        sentTime: updatedAt,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    //As soon as the page loaded, the socket connectin is made & "joinChat" event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      //   console.log(firstName + " : " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    // as soon as component unmounts, disconnect the socket
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 max-w-4xl mx-auto border border-gray-300 rounded-2xl shadow-lg mt-8 h-[70vh] flex flex-col bg-white overflow-hidden">
      <h1 className="p-4 border-b flex items-center justify-between border-gray-200 text-xl font-semibold text-gray-700 bg-gray-50">
        Chat
      </h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-scroll p-4 space-y-3 bg-gradient-to-b from-white via-gray-50 to-gray-100">
        {messages.map((msg, index) => {
          const isOwnMessage = user?.firstName === msg?.firstName;
          return (
            <div
              key={index}
              className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-header flex items-center gap-2 text-base text-gray-800 dark:text-gray-100">
                <span className="text-slate-900">{`${msg?.firstName} ${msg?.lastName}`}</span>

                {/* Tooltip Icon */}
                <div className="relative group">
                  <span className="text-xs border border-gray-400 dark:border-gray-500 rounded-full w-4 h-5 flex items-center justify-center cursor-pointer text-gray-600 dark:text-gray-300">
                    ?
                  </span>
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10 whitespace-nowrap">
                    {formatToIST(
                      msg?.updatedAt || msg?.sentTime || msg?.createdAt
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`chat-bubble ${
                  isOwnMessage
                    ? "bg-green-200 text-gray-800"
                    : "bg-blue-200 text-gray-800"
                }`}
              >
                {msg?.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white flex gap-3 justify-between items-center">
        <input
          className="flex-grow min-w-0 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition w-auto min-w-[100px] max-w-[150px] text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
