import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./join.css";
function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <img className="joinImg" src={"./chat.png"} />
        <div className="ipcontainer">
          <div className="ip1">
            <input
              placeholder="Your Name"
              className="joinInput1"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="ip2">
            <input
              placeholder="Room ID"
              className="joinInput2"
              type="text"
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <Link
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
          >
            <button className="button" type="submit">
              {" "}
              Signin
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Join;
