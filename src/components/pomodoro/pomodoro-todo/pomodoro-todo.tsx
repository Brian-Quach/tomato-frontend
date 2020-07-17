import { Component, State, h, Listen, EventEmitter, Event } from '@stencil/core';
import { TodoList } from '../../../models/todo-list';
import { TodoManager } from '../../../helpers/todo-manager';
import { TimerStatus } from '../../../models/timer-status';
import { Todo } from '../../../models/todo';
import { TimerState } from '../../../models/timer-state';
import { PomodoroState } from '../../../models/pomodoro-state';

@Component({
  tag: 'pomodoro-todo',
  styleUrl: 'pomodoro-todo.scss'
})
export class PomodoroTodo {
  @State() todoList: TodoList;
  @State() addingNew: boolean = false;
  @Event() todoUpdated: EventEmitter<Todo>;

  componentWillLoad() {
    this.todoList = TodoManager.Instance.getList();
  }

  async todoUpdatedHandler(todo: Todo) {
    this.todoUpdated.emit(todo);
  }

  @Listen('timerChanged', { target: 'document' })
  timerChangedHandler(event: CustomEvent<TimerStatus>) {
    this.todoList.printList()
    let timerStatus = event.detail;
    console.log("StateChange")
    if (timerStatus.state == TimerState.COMPLETE &&
      (timerStatus.interval == PomodoroState.BREAK_LONG ||
        timerStatus.interval == PomodoroState.BREAK_SHORT)) {
      if (this.todoList.getActiveItem()) {
        this.todoList.getActiveItem().pomodorosUsed = this.todoList.getActiveItem().pomodorosUsed + 1;
        this.todoList = this.todoList;
        // this.todoUpdatedHandler(this.todoList.getActiveItem())
      }
    }
    this.todoList.printList()
  }

  @Listen('todoChanged')
  todoCompletedHandler(event: CustomEvent<Todo>) {
    let changedTodo = event.detail;
    console.log(changedTodo);
  }

  componentDidRender() {
  }

  render() {
    return (
      <div class="pomodoro-todo">
        <div class="header-wrapper">
          <h>
            Tasks
                </h>
        </div>

        <div class="list-wrapper">
          <div class="list-items">
            {this.todoList.getAllTodos().map(todo => {
              return [
                <todo-item todo={todo}>
                </todo-item>
              ];
            })}
          </div>
          {this.addingNew ?
            <div class="new-item-form">
              <label>Task name</label>
              <input id="task-name" type="text"></input>
              <label>Estimated Pomodoros</label>
              <input id="task-poms" type="number" defaultValue="0"></input>
              <div class="form-footer">
                <ion-button color="tomato" onClick={(_) => this.saveNewTask()}>
                  Add
                </ion-button>
                <ion-button color="tomato" onClick={(_) => this.cancelNewTask()}>
                  Cancel
                </ion-button>
              </div>
            </div>
            :
            <div class="new-item-button" onClick={(_) => this.addNewTask()}>
              <div class="button-wrapper">
                <div class="text-wrapper">
                  <div class="add-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="add_circle_outline_24px">
                        <path id="icon/content/add_circle_outline_24px" fill-rule="evenodd" clip-rule="evenodd"
                          d="M12 2C6.48 2 2 6.48001 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22
                             6.48001 17.52 2 12 2ZM11 7V11H7V13H11V17H13V13H17V11H13V7H11ZM4 12C4 16.41 7.59 
                             20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4C7.59 4 4 7.59 4 12Z"
                          fill="white" fill-opacity="0.84" />
                      </g>
                    </svg>
                  </div>
                  <p>Add new task</p>
                </div>
              </div>
            </div>
          }

        </div>
      </div>
    );
  }

  async addNewTask() {
    this.addingNew = true;
  }

  async cancelNewTask() {
    this.addingNew = false;
  }

  async saveNewTask() {
    let newTaskName = (document.getElementById('task-name') as HTMLIonInputElement).value as string;
    let newtaskPoms = (document.getElementById('task-poms') as HTMLIonInputElement).value as number;
    console.log(newtaskPoms);
    if (newtaskPoms == null) newtaskPoms = 0;
    this.todoList = TodoManager.Instance.addItem(newTaskName, newtaskPoms);
    this.addingNew = false;
  }
}