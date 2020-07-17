import { Component, Prop, State, h, Listen } from '@stencil/core';
import { Todo } from '../../../models/todo';
import { Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'todo-item',
  styleUrl: 'todo-item.scss'
})
export class TodoItem {
  @Prop() todo: Todo = {
    id: 1,
    name: "Do a task X",
    isActive: false,
    completed: false,
    pomodorosUsed: 1,
    pomodorosAllocated: 4
  };
  @State() isActive = false;
  @State() isComplete = false;
  @Event() todoChanged: EventEmitter<Todo>;

  @Listen('todoUpdated', {target: 'document'})
  todoUpdatedHandler(event: CustomEvent<Todo>) {
    let updatedTodo = event.detail;
    console.log(updatedTodo)
    if(updatedTodo.id == this.todo.id){
      this.todo = updatedTodo;
    }
  }

  async todoChangedHandler() {
    this.todoChanged.emit(this.todo);
  }

  componentDidLoad() {
    this.isComplete = this.todo.completed;
  }

  render() {
    return (
      <div class={"item-wrapper" + (this.todo.isActive ? " active" : "")}>
        <div class="checkbox">
          <img onClick={(_) => this.toggleComplete()} src={this.isComplete ? "/assets/images/checked.svg" :"/assets/images/unchecked.svg"}></img>
        </div>

        <p class="task-label">
          {this.todo.name}
        </p>

        <p class="pomodoro-progress">
          {this.todo.pomodorosUsed + '/' + this.todo.pomodorosAllocated}
        </p>

        <div class="edit">
          <img src="/assets/images/edit.svg"></img>
        </div>

      </div>
    );
  }

  async toggleComplete() {
    this.todo.completed = !this.todo.completed;
    this.isComplete = this.todo.completed;
    if(this.isComplete) this.todoChangedHandler()
  }
}