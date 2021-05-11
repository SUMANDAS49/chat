import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./chat.css"
let socket;

function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io("https://sumanchat.herokuapp.com/", { transport: ["websocket"] });

    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, () => {});
    return () => {
      socket.emit("disconnect");
      
    };
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage=(event)=>{
      event.preventDefault() 
    if(message){
        socket.emit('sendMessage',message,()=>setMessage(""))
    }
    console.log(message,messages)
  }

  return (
    <div className="outerContainer">
        <div className="messageScreen">
            {
              messages.map((m)=>{
                if(m.user===name)
                {
                  return <div className="messageDisplay right">
                 
                  <h3>{m.user}:{m.text}</h3>
                </div>
                }
                else
                {
                  return <div className="messageDisplay left">
                 
                  <h3>{m.user}:{m.text}</h3>
                </div>
                }
               
              })
            }
        </div>
      <div>
        <input
          value={message}
          className="inputMessage"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyPress={e=>e.key==='Enter'?sendMessage(e):null}
        />
      </div>
    </div>
  );
}

export default Chat;
