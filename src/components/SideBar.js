import React from "react";
import './Sidebar.css';
import SearchInput from "./SearchInput";
const SideBar = () => {
  
  return (
    <div className="sidebar">
    <div className="sidebar-interactables">
    <SearchInput />
    </div>
    
    </div>
  )
}
export default SideBar;