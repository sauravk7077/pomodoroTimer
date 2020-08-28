import React from "react";


function Button(props){
    return (
        <div>
            <button className="btn" id={props.id} onClick={props.onClick}>{props.children}</button>
        </div>
    )
}

export default Button;