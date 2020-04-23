import React, { useState, useEffect, useRef } from "react";

const Dropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdown = useRef();

  const handleButtonClick = () => {
    setDropdownOpen(true);
  };

  const handleOutsideClick = (e) => {
    if (!dropdown.current.contains(e.target)) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  })

  return (
    <div className="dropdown" ref={dropdown}>
      <button onClick={handleButtonClick}>
        ☰
    </button>
      {dropdownOpen && (
        <div class="dropdown-list">
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
            <li>Option 4</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Dropdown;


