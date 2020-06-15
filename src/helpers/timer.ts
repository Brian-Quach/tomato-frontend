import { ApiClient } from "./api-client";
import { API } from '../global/environment';
import { TimerState } from "../models/timer-state";
import { TimerStatus } from "../models/timer-status";

export class Timer{

    private static _instance: Timer;
    private timerEnd: number;
    private state: TimerState;
    private duration: number;
    private timeOffset: number;
    private timeLeft: number;

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    private constructor() {
        this.state = TimerState.STOP;
        this.duration = -1;
        this.timeLeft = 0;
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

    private timerStatus() {
        return {
            state: this.state,
            remaining: this.timeLeft
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

        return this.timerStatus();
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

        this.timeLeft = -1;
        this.timerEnd = -1;
        this.state = TimerState.STOP;

        //TODO: stop timer on server

        return this.timerStatus();
    }

//When saving do timerEnd.format('x'); 
}

