import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
const MainNavigation = (props) => (
  <React.Fragment>
    <NavBar avatar={props.avatar} creatorHandle={props.creatorHandle}/>
    {props.children}
    <SideBar />
  </React.Fragment>
)

export default MainNavigation;