import React from "react";


function Button(props){
    return (
        <div>
            <button className="btn" id={props.id} onClick={props.onClick}>{props.children}</button>
        </div>
    )
}

// <i className="fas fa-minus"></i>
// <i className="fas fa-plus"></i>

export default Button;