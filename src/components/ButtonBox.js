import React from "react";
import Button from "./Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faArrowDown} from "@fortawesome/free-solid-svg-icons";

function ButtonBox(props){
    const label = props.label.toLowerCase();
    return(
        <div>
            <div id={label + "-label"}>{props.label}</div>
            <div>
                <Button id={label+'-increment'} onClick={_=>{props.onClick(1)}}>
                    <FontAwesomeIcon icon={faArrowUp} />
                </Button>
                <div>{props.value}</div>
                <Button id={label+'-decrement'} onClick={_=>{props.onClick(-1)}}>
                    <FontAwesomeIcon icon={faArrowDown}/>
                </Button>
            </div>
        </div>
    )
}

export default ButtonBox;