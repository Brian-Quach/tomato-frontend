export class Todo implements ITodo{
    public id: number;
    public name: string;
    public completed: boolean;
    public pomodorosUsed: number;
    public pomodorosAllocated: number;

    constructor( name: string, pomodoros: number ) {
        this.name = name;
        this.pomodorosAllocated = pomodoros;

        this.completed = false;
        this.pomodorosUsed = 0;
        this.id = new Date().valueOf();
    }
}


interface ITodo {
    id: number;
    name: string;
    completed: boolean;
    pomodorosUsed: number;
    pomodorosAllocated: number;
}
