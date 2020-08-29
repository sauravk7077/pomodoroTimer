import React from "react";

function Display(props){
    let completed = props.completed *2;
    let style = {
        boxShadow: `inset 0 -${completed}px 0px 2px hsl(${completed}, 85%, 65%)`,
        border: `4px solid hsl(${completed}, 85%,65%)`
    }
    return(
        <div className="display" id="time-left" style={style}>
            {props.value}
        </div>
    )
}

export default Display;