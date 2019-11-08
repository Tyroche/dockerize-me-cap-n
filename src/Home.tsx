import React, { useEffect, useState } from "react";
import "./Home.css";
import logo from "./react.svg";

class Home extends React.Component<{}, {}> {
  public render() {
    const [text, setText] = useState("");
    const [list, updateList] = useState<string[]>([]);

    useEffect(async () => {
      const guestList = await fetch("/api/data");
      updateList(guestList.body);
    }, []);

    const fetchGuestList = async () => {
      // postMessage("/api/data");
    };

    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to Razzle</h2>
        </div>
        <p className="Home-intro">
          Sign Our guest book!
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onSubmit={fetchGuestList}
          />
        </p>
      </div>
    );
  }
}

export default Home;
