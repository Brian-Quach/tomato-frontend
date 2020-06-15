
import { Component, h, Prop, State } from '@stencil/core';
import { Timer } from '../../../helpers/timer';
import { TimerState } from '../../../models/timer-state';

@Component({
  tag: 'pomodoro-timer',
  styleUrl: 'pomodoro-timer.scss'
})
export class PomodoroTimer {

    @Prop() duration: number = 25;
    @State() timeString: string;
    @State() timerState: TimerState;
    timerWatch: any;    

    componentWillLoad() {
        this.timerState = TimerState.STOP;
        this.timerWatch = window.setInterval((_) => {
            Timer.Instance.checkTimer().then((timer) =>{
                console.log("hi");
                this.timeString = this.getTimerString(timer.remaining);
                this.timerState = timer.state;
            })
        }, 100);
    }

    render() {
        return(
            <div class="timer-wrapper">
                <div id="timer-string">
                    {this.timeString}
                </div>
                <div id="timer-objective">
                    Do a thing
                </div>
                <ion-button onClick={(_) => {this.startTimer()}} color="primary">TIMER</ion-button>
            </div>
        );
    }

    startTimer() {
        Timer.Instance.startTimer();
    }

    getTimerString(ms: number){
        let mins = (ms/60000 >> 0);
        let secs = (ms%60000/1000 >> 0);
        return mins + ':' + (secs+"").padStart(2,"0");
    }
}