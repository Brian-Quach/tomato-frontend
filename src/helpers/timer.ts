import { ApiClient } from "./api-client";
import { API } from '../global/environment';
import { TimerState } from "../models/timer-state";
import { TimerStatus } from "../models/timer-status";
import { PomodoroState, PomodoroMinutes } from "../models/pomodoro-state";

export class Timer{

    private static _instance: Timer;
    private timerEnd: number;
    private state: TimerState;
    private duration: number;
    private timeOffset: number;
    private timeLeft: number;
    private pomodoroState: PomodoroState;
    private task: string;
    private intervalNumber: number = 0;

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    private constructor() {
        this.state = TimerState.STOP;
        this.pomodoroState = PomodoroState.POMODORO;
        this.setTimerDuration(PomodoroMinutes.POMODORO);
    }

    async getTime() {
        let currentTime = new Date().getTime();
        if (this.timeOffset == null) {
            if(ApiClient.Instance.isConnected()){
                let netTime = (await ApiClient.Instance.get(API.TIME)).unixtime;
                this.timeOffset = netTime - currentTime;
            } else {
                this.timeOffset = 0;
            }
        }
        return currentTime + this.timeOffset;
    }

    setTimerDuration(minutes: number){
        this.duration = minutes;
        this.timeLeft = minutes * 60000;
    }

    getTimerEnd() {
        return (this.timerEnd ? this.timerEnd : -1);
    }

    setTask(task: string) {
        this.task = task;
    }

    getTask(){
        return this.task;
    }

    timerStatus() {
        return {
            state: this.state,
            remaining: this.timeLeft,
            interval: this.pomodoroState
        } as TimerStatus;
    }

    async startTimer(duration?: number) {
        if(duration) this.duration = duration;
        
        let currentTime = await this.getTime();
        this.timerEnd = currentTime + (60000 * this.duration);
        this.timeLeft = this.timerEnd - currentTime;
        this.state = TimerState.START;

        // TODO: save endTime to server

        return this.timerStatus();
    }

    async checkTimer() {
        if(this.state != TimerState.START) return this.timerStatus();

        let currentTime = await this.getTime();
        this.timeLeft = this.timerEnd - currentTime;

        if(this.timeLeft <= 0) {
            this.state = TimerState.COMPLETE;
            this.timeLeft = 0;

            if(this.pomodoroState == PomodoroState.POMODORO) {
                this.intervalNumber += 1;
                this.pomodoroState = (this.intervalNumber % 4 == 0) ? PomodoroState.BREAK_LONG : PomodoroState.BREAK_SHORT;
                this.setTimerDuration((this.intervalNumber % 4 == 0) ? PomodoroMinutes.BREAK_LONG : PomodoroMinutes.BREAK_SHORT);
            } else {
                this.pomodoroState = PomodoroState.POMODORO;
                this.setTimerDuration(PomodoroMinutes.POMODORO);
            }
        }

        return this.timerStatus();
    }

    async skip() {
        this.state = TimerState.STOP;
        this.timeLeft = 0;

        if(this.pomodoroState == PomodoroState.POMODORO) {
            this.intervalNumber += 1;
            this.pomodoroState = (this.intervalNumber % 4 == 0) ? PomodoroState.BREAK_LONG : PomodoroState.BREAK_SHORT;
            this.setTimerDuration((this.intervalNumber % 4 == 0) ? PomodoroMinutes.BREAK_LONG : PomodoroMinutes.BREAK_SHORT);
        } else {
            this.pomodoroState = PomodoroState.POMODORO;
            this.setTimerDuration(PomodoroMinutes.POMODORO);
        }
    }

    async pauseTimer() {
        if(this.state != TimerState.START) return;

        let currentTime = await this.getTime();
        this.timeLeft = this.timerEnd - currentTime;
        this.state = TimerState.PAUSE;

        //TODO: save timeleft to server 

        return this.timerStatus();
    }

    async continueTimer() {
        if(this.state != TimerState.PAUSE) return;

        let currentTime = await this.getTime();
        this.timerEnd = currentTime + this.timeLeft;
        this.state = TimerState.START;

        //TODO: save new endTime to server

        return this.timerStatus();
    }

    async stopTimer() {
        if(this.state == TimerState.STOP) return;

        this.setTimerDuration(PomodoroMinutes.POMODORO);
        this.timerEnd = -1;
        this.state = TimerState.STOP;

        //TODO: stop timer on server

        return this.timerStatus();
    }

//When saving do timerEnd.format('x'); 
}

