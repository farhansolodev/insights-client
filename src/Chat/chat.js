import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import styles from "./chat.module.css";

const Chat = ({ socket, username, roomId }) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
  
    //Send a socket event "send_message" with messageData that contains room ID, author, message content and time sent.
    const sendMessage = () => {
        if (currentMessage !== "") {
        const messageData = {
            roomId,
            author: username,
            message: currentMessage,
            time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        }
        socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("")
        }
    };

    //When socket receives a event "receive_message" append message data to message list to dispaly in the chat section.
    useEffect(() => {
        if (!socket) return
        if (socket.connected) return
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    },[socket]);

    return (
        <div className={styles['chat-window']}>
            <div className={styles['chat-header']}>
                <p>Live Chat</p>
            </div>
                <ScrollToBottom className={styles["message-container"]}>
                    {messageList.map((messageContent, index) => {
                        
                        return (
                            <div
                                className={styles["message"]}
                                name={username === messageContent.author ? "you" : "other"}
                                key={index}
                            >
                                <div className={styles["message-group"]}>
                                <div className={styles["message-content"]}>
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className={styles["message-meta"]}>
                                    <p name="time">{messageContent.time}</p>
                                    <p name="author">{messageContent.author}</p>
                                </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            <input
                className={styles["chat-footer"]}
                placeholder="Type a message..."
                onChange={(event) => {
                    setCurrentMessage(event.target.value);
                }}
                onKeyPress={(event) => {
                    if (event.key !== "Enter") return
                    if (event.shiftKey === true) return
                    event.target.value = "";
                    sendMessage()
                }}
                />
        </div>
    );
};

export default Chat;
