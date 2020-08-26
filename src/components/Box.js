import React from "react";
import ButtonBox from "./ButtonBox";
import Button from "./Button";

class Box extends React.Component{
    constructor(){
        super();
        this.state = {
            session: 25,
            break: 5,
            sessionText: "25:00",
            breakText: "5:00",
            mode: "session",
            startTime: 0,
            timerId: null,
            paused: true
        }
    }

    setTimer = _=>{
        const time= this.state.session * 60;
        this.setState({
            startTime: time
        })

    }
    resumeTimer = (e)=>{
        let timerId = setInterval(_=>{
            this.setState(s=>({
                sessionText: Math.floor(s.startTime/60) + ":"  + s.startTime%60,
                startTime: s.startTime-1
            }))
        },1000);
        this.setState({
            timerId: timerId
        });
    }

    pauseTimer = _=>{
        clearInterval(this.state.timerId);
    }

    updateValues = (name,value)=>{
        if(this.state[name] > 1 || value > 0){
            this.setState(s=>({
                [name]: s[name] + value
            }))
        }
    }
    
    resetValues = _=>{
        this.pauseTimer();
        this.setState(s=>({
            startTime: s.session*60
        }))
    }

    startTimer = _=>{
        
    }


    render() {
        return (
            <div className="box">
                <ButtonBox label="Session" value={this.state.session} onClick={i=>this.updateValues("session",i)}/>
                <ButtonBox label="Break" value={this.state.break} onClick={i=>this.updateValues("break",i)}/>
                <button onClick={this.resumeTimer}>Start</button>
                <button onClick={this.pauseTimer}>Hey</button>
            </div>
        )
    }
}

export default Box;