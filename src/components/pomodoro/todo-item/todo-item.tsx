import { Component, Prop, State, h } from '@stencil/core';
import { Todo } from '../../../models/todo';

@Component({
  tag: 'todo-item',
  styleUrl: 'todo-item.scss'
})
export class TodoItem {
  @Prop() todo: Todo = {
    id: 1,
    name: "Do a task X",
    completed: false,
    pomodorosUsed: 1,
    pomodorosAllocated: 4
  };
  @State() isActive = false;
  @State() isComplete = false;

  componentDidLoad() {
    this.isComplete = this.todo.completed;
  }

  render() {
    return (
      <div class={"item-wrapper" + (this.isActive ? " active" : "")}>
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
  }
}