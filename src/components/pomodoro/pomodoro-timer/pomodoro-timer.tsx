import { Component, h, Prop, State } from '@stencil/core';
import { Timer } from '../../../helpers/timer';
import { TimerState } from '../../../models/timer-state';
import { PomodoroState } from '../../../models/pomodoro-state';

@Component({
  tag: 'pomodoro-timer',
  styleUrl: 'pomodoro-timer.scss'
})
export class PomodoroTimer {

    @Prop() duration: number = 25;
    @State() timeString: string;
    @State() timerState: TimerState;
    pomodoroState: PomodoroState;
    pomodoroCount: number = 0;
    timerWatch: any;    

    componentWillLoad() {
        this.timerState = TimerState.STOP;
        this.pomodoroState = PomodoroState.POMODORO;
        this.timerWatch = window.setInterval((_) => {
            Timer.Instance.checkTimer().then((timer) =>{
                this.timeString = this.getTimerString(timer.remaining);
                this.timerState = timer.state;
            })
        }, 1000);
    }

    render() {
        return(
        <div class="timer-wrapper">
            <div id="timer-string">
                {this.timeString}
            </div>
            <div id="timer-objective">
                Let's get this bread!
            </div>
            <ion-button id="timer-button" onClick={(_) => {this.toggleTimer()}} color="tomato-secondary">
                {this.timerState == TimerState.START ? "PAUSE" : "START"}
            </ion-button>
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
    }

    getTimerString(ms: number){
        let mins = (ms/60000 >> 0);
        let secs = (ms%60000/1000 >> 0);
        return mins + ':' + (secs+"").padStart(2,"0");
    }
}