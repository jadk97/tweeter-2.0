import React from "react";
import "./Button.css"
const Button = (props) => {
  let classes = [];

  if(props.disabled){
    classes.push("__disabled");
  }

  if (props.fullwidth){
    classes.push("__fullwidth");
  }

  if (props.transparent){
    classes.push("__transparent")
  }

  if(props.danger){
    classes.push("__danger");
  }
  return(
    <React.Fragment>
    <button {...props} className={"button" + " " + classes.join(" ")}>{props.children}</button>
    </React.Fragment>
  )
}

export default Button;