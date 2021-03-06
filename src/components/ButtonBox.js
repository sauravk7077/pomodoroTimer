import React from "react";
import Button from "./Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";

function ButtonBox(props){
    const label = props.label.toLowerCase();
    return(
        <div className="btnBox">
            <div id={label + "-label"}>{props.label + " Length"}</div>
            <div className="incControls">
                <Button id={label+'-decrement'} onClick={_=>{props.onClick(-1)}}>
                    <FontAwesomeIcon icon={faMinus}/>
                </Button>
                <div id={label+"-length"}>{props.value}</div>
                <Button id={label+'-increment'} onClick={_=>{props.onClick(1)}}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </div>
        </div>
    )
}

export default ButtonBox;