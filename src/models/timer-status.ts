import { TimerState } from "./timer-state";
import { PomodoroState } from "./pomodoro-state";

export class TimerStatus {
    state: TimerState;
    remaining: number;
    interval: PomodoroState;
    task: string;
}