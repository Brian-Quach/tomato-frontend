import { Component, h, Prop, State } from '@stencil/core';
import { Timer } from '../../../helpers/timer';
import { TimerState } from '../../../models/timer-state';
import { PomodoroState } from '../../../models/pomodoro-state';
import { Event, EventEmitter } from '@stencil/core';
import { TimerStatus } from '../../../models/timer-status';

@Component({
  tag: 'pomodoro-timer',
  styleUrl: 'pomodoro-timer.scss'
})
export class PomodoroTimer {

    @Prop() duration: number = 25;
    @State() timeString: string = "00:00";
    @State() timerState: TimerState;
    @State() pomodoroTask: string; 
    pomodoroState: PomodoroState;
    pomodoroCount: number = 0;
    timerWatch: any;    
    @Event() timerChanged: EventEmitter<TimerStatus>;
  
    async timerChangedHandler() {
        this.timerChanged.emit(Timer.Instance.timerStatus());
    }

    componentWillLoad() {
        this.pomodoroTask = "Let's get this bread!";

        this.timerState = TimerState.STOP;
        this.pomodoroState = PomodoroState.POMODORO;
        this.timerWatch = window.setInterval((_) => {
            Timer.Instance.checkTimer().then((timer) =>{
                this.timeString = this.getTimerString(timer.remaining);
                if(this.timerState != timer.state) {
                    this.timerState = timer.state;
                    this.pomodoroState = timer.interval;
                    this.timerChangedHandler()
                }
            })
        }, 1000);
    }

    render() {
        let temp = ["Init", "Pomodoro let's get it!!",
                    "Big break", "Smol break"];
        return(
        <div class="timer-wrapper">
            <div id="timer-string">
                {this.timeString}
            </div>
            <div id="timer-objective">
                {temp[this.pomodoroState]}
                {/* {this.pomodoroTask} */}
            </div>
            <div id="timer-control">
                <div class="reset-button" onClick={(_) => {this.skipOrReset()}}>
                    <img src={this.pomodoroState == PomodoroState.POMODORO ?
                        "/assets/images/refresh.svg" :
                        "/assets/images/cancel.svg"}></img>
                </div>
                <ion-button id="timer-button" onClick={(_) => {this.toggleTimer()}} color="tomato-secondary">
                    {this.timerState == TimerState.START ? "PAUSE" : "START"}
                </ion-button>
            </div>
        </div>
        );
    }

    toggleTimer() {
        if (this.timerState == TimerState.STOP) {
            Timer.Instance.startTimer();
        } else if (this.timerState == TimerState.PAUSE) {
            Timer.Instance.continueTimer();
        } else {
            Timer.Instance.pauseTimer();
        }
        this.timerChangedHandler();
    }

    skipOrReset() {
        if(this.pomodoroState == PomodoroState.POMODORO){
            Timer.Instance.stopTimer();
        } else {
            Timer.Instance.skip();
        }
        this.timerChangedHandler();
    }

    getTimerString(ms: number){
        let mins = (ms/60000 >> 0);
        let secs = (ms%60000/1000 >> 0);
        return (mins+"").padStart(2,"0") + ':' + (secs+"").padStart(2,"0");
    }
}