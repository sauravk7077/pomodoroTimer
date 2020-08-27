import React from "react";
import ButtonBox from "./ButtonBox";
import Button from "./Button";
import Display from "./Display";
import ringing from "../res/ringing.mp3";

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
        this.audio = new Audio(ringing);
        this.audio.load();
    }

    setTimer = _=>{
        const time= this.state.session * 60;
        this.setState({
            startTime: time
        })

    }

    updateTimer = _=>{
        const options = {minimumIntegerDigits: 2, useGrouping:false};
        this.setState(s=>({
            text: Math.floor(s.startTime/60).toLocaleString('en-US',options) + ":"  + (s.startTime%60).toLocaleString('en-US', options),
            startTime: s.startTime-1
        }))
    }

    resumeTimer = (e)=>{
        let timerId = setInterval(_=>{
            if(this.state.startTime == 0){
                this.audio.play();
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
            
        },1000);
        this.setState({
            timerId: timerId
        });
    }

    pauseTimer = _=>{
        clearInterval(this.state.timerId);
        this.setState(
            {
                timerId: null,
                paused: true,
                started: false
            }
        );
    }

    updateValues = (name,value)=>{
        if(this.state.paused || !this.state.started){
            if((this.state[name] > 1 || value > 0) && (this.state[name]<60 || value<0)){
                this.setState(s=>({
                    [name]: s[name] + value,
                    text: `${s[name]+value}:00`
                }))
            }
        }
    }
    
    resetValues = _=>{
        this.pauseTimer();
        this.setState(s=>({
            startTime: s.sessionMode? s.session*60: s.break*60,
            started: true
        }))
    }

    startTimer = _=>{
        if(!this.state.paused)
            this.resetValues();
        else
            this.setState({paused: false});
        this.resumeTimer();
    }


    render() {
        return (
            <div className="box">
                <ButtonBox label="Session" value={this.state.session} onClick={i=>this.updateValues("session",i)}/>
                <ButtonBox label="Break" value={this.state.break} onClick={i=>this.updateValues("break",i)}/>
                <Button onClick={this.startTimer}>Start</Button>
                <Button onClick={this.pauseTimer}>Hey</Button>
                <div>
                <Display value={this.state.text}/>
                </div>
            </div>
            
        )
    }
}

export default Box;