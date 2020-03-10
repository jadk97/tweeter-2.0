import React from "react";
import "./Home.css";
const Home = (props) => {
  return (
    <div className="home">
      <h1>Home</h1>
      {props.children}
    </div>
  )
}

export default Home;