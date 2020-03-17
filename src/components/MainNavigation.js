import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
const MainNavigation = (props) => (
  <React.Fragment>
  <NavBar avatar={props.avatar}/>
  {props.children}
  <SideBar />
  </React.Fragment>
)

export default MainNavigation;