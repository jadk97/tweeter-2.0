import React from "react";
import "./Home.css";
const Home = (props) => {
  return (
    <div className="home">
      <h1 className="home-title">Home</h1>
      {props.children}
    </div>
  )
}

export default Home;