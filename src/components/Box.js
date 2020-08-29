import React from "react";
import ButtonBox from "./ButtonBox";
import Button from "./Button";
import Display from "./Display";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause, faRedo} from "@fortawesome/free-solid-svg-icons";
import ringing from "../res/ringing.mp3";

const options = {minimumIntegerDigits: 2, useGrouping:false};

class Box extends React.Component{
    constructor(){
        super();
        this.state = {
            session: 25,
            break: 5,
            text: "25:00",
            sessionMode: true,
            startTime: 0,
            timerId: null,
            paused: false,
            started: false
        }
    }

    setTimer = _=>{
        const time= this.state.session * 60;
        this.setState({
            startTime: time
        })

    }

    doThis = _=>{
        if(this.state.startTime == 0){
            document.getElementById('beep').play();
        }
        if(this.state.startTime == -1){
            this.setState(s=>({
            sessionMode: !s.sessionMode 
            }), _=>{
                this.resetValues();
                this.updateTimer();
                this.resumeTimer();
            });
        }
        else
            this.updateTimer();
        
    }

    updateTimer = _=>{
        this.setState(s=>({
            text: Math.floor(s.startTime/60).toLocaleString('en-US',options) + ":"  + (s.startTime%60).toLocaleString('en-US', options),
            startTime: s.startTime-1
        }))
    }

    resumeTimer = _=>{
        this.doThis();
        let timerId = setInterval(this.doThis,1000);
        this.setState({
            timerId: timerId
        });
        
    }

    pauseTimer = _=>{
        clearInterval(this.state.timerId);
        this.setState(
            {
                timerId: null,
                paused: true
            }
        );
    }

    updateValues = (name,value)=>{
        if(this.state.paused || !this.state.started){
            if((this.state[name] > 1 || value > 0) && (this.state[name]<60 || value<0)){
                this.setState(s=>({
                    [name]: s[name] + value,
                    text: `${(s[name]+value).toLocaleString('en-US', options)}:00`
                }))
            }
        }
    }
    
    resetValues = (callback=(_=>{}))=>{
        this.setState(s=>({
            startTime: s.sessionMode? s.session*60: s.break*60,
            started: true
        }), callback)
    }

    startTimer = _=>{
        if(!this.state.started){
            this.resetValues(this.resumeTimer);
        }else{
            console.log(this.state.paused);
            if(!this.state.paused)
                this.pauseTimer();
            else
                this.setState({paused: false},this.resumeTimer);
        }
        
    }

    resetState = _=>{
        document.getElementById('beep').pause();
        document.getElementById('beep').currentTime = 0;
        this.pauseTimer();
        this.setState({
            session: 25,
            break: 5,
            text: "25:00",
            sessionMode: true,
            startTime: 0,
            timerId: null,
            paused: false,
            started: false
        })
    }



    render() {
        const totalTime = this.state.session*60;
        const timeUsed = totalTime - this.state.startTime;
        let percentComplete = Math.ceil(timeUsed/totalTime * 100);
        return (
            <div className="box">
                <audio id="beep" src={ringing} preload></audio>
                <div className="headText">
                    <h1 id="timer-label">{this.state.sessionMode?'Session': "Break"}</h1>
                    <Display value={this.state.text} completed={percentComplete}/>
                </div>
                <div className="btnBoxGroup">
                    <ButtonBox label="Session" value={this.state.session} onClick={i=>this.updateValues("session",i)}/>
                    <ButtonBox label="Break" value={this.state.break} onClick={i=>this.updateValues("break",i)}/>
                </div>
                <div className="controls">
                    <Button onClick={this.startTimer}><FontAwesomeIcon icon={faPlay}/></Button>
                    <Button onClick={this.pauseTimer}><FontAwesomeIcon icon={faPause}/></Button>
                    <Button onClick={this.resetState}><FontAwesomeIcon icon={faRedo}/></Button>
                </div>
                
            </div>
            
        )
    }
}

// <i className="fas fa-play" id="start"/>
// <i className="fas fa-pause" id="pause"/>
// <i className="fas fa-redo" id="reset"/>

export default Box;