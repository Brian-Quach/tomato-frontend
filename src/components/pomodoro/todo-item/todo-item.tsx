import { Component, Prop, State, h } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';
import { Todo } from '../../../models/todo';

@Component({
  tag: 'todo-item',
  styleUrl: 'todo-item.scss'
})
export class TodoItem {

  @Event() removeTodo: EventEmitter;
  @Event() updateTodo: EventEmitter;

  @Prop() todo: Todo;

  @State() isEditable = false;

  toggleEdition() {
      this.isEditable = !this.isEditable;
  }

  render() {
    let todoTemplate;

    if (!this.isEditable) {

      todoTemplate = <div>
        {this.todo.name}
        <button onClick = {this.removeThisTodo}>
          X
        </button>
      </div>

    } else {

      todoTemplate = <div>
        <input value={this.todo.name} onKeyDown={this.handleKeyDown} />

      </div>
    }

    return (
      <li onDblClick= {this.toggleEdition}>
        {todoTemplate}
      </li>
    );
  }

  handleKeyDown(e){
    if (e.code === "Enter") {
      this.updateThisTodo(e.target.value);
      this.isEditable = false;
    }
  };

  removeThisTodo = () => {
    this.removeTodo.emit(this.todo.id);
  }

  updateThisTodo(value) {
    this.updateTodo.emit({value: value, id: this.todo.id});
  }
}