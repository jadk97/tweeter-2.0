import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "./Dropdown.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile } from "../reducers/userProfileSlice";

const Dropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdown = useRef();
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);

  const handleButtonClick = () => {
    setDropdownOpen(true);
  };

  const handleOutsideClick = (e) => {
    // props.clickBind(e);
   
    if (!dropdown.current.contains(e.target)) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  })

  return (
    <div className={`${props.buttonClass} dropdown`} ref={dropdown} onClick={props.clickBind} >
    {dropdownOpen && (
      <div className="dropdown-list">
        <ul>
          {props.creatorHandle && props.creatorHandle === userProfile.creatorHandle && (
            <li>Delete tweet</li>
          )}
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
          <li>Option 4</li>
        </ul>
      </div>
    )}
      <div className={`fa-layers dropdown-button ${dropdownOpen ? "__opened": ""}`} onClick={handleButtonClick} >
        <FontAwesomeIcon
          icon={faAngleDown}
          size="lg"
          color="#778899"
          className="dropdown-icon"
        />
        <FontAwesomeIcon
          icon={faCircle}
          size="2x"
          color="rgba(29, 161, 242, 0.1)"
          className="dropdown-circle-icon"
          transform="left-4.5"
        />
      </div>

    </div>
  )
}

export default Dropdown;


