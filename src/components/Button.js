import React from "react";
import "./Button.css"
const Button = (props) => {
  let classes = [];

  if(props.disabled){
    classes.push("__disabled");
    console.log(classes.join(" "));
  }

  if (props.fullWidth){
    classes.push("__fullwidth");
  }
  return(
    <React.Fragment>
    <button {...props} className={"button" + " " + classes.join(" ")}>{props.children}</button>
    </React.Fragment>
  )
}

export default Button;