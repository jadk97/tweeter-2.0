import React from "react";
import "./Home.css";
const Home = (props) => {
  return (
    <div className="home">
      {props.children}
    </div>
  )
}

export default Home;