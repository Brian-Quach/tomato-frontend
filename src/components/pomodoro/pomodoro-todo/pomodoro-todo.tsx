import { Component, State, h, Listen } from '@stencil/core';
import { Todo } from '../../../models/todo-list';

@Component({
  tag: 'pomodoro-todo',
  styleUrl: 'pomodoro-todo.scss'
})
export class PomodoroTodo {
    @State() todoList: Todo[];
    @State() newTodo: Todo;

    @Listen('removeTodo')
    removeTodo(event) {
      this.todoList = this.todoList.filter((todo) => {
        return todo.id !== event.detail;
      });
      console.log(this.todoList);
    }

    @Listen('updateTodo')
    updateValue(event) {
      const todos = this.todoList.concat([]);
  
      let todoToUpdate = todos.filter((todo) => {
        return todo.id === event.detail.id;
      })[0];
  
      todoToUpdate.title = event.detail.value;
  
      this.todoList = todos;
      console.log(this.todoList);
    }
  
  

    componentWillLoad() {
        this.todoList = [];
    }

    render() {
        return (
            <div>
                <input onChange={e => this.setNewTodo(e.target)}></input>

                <ul>
                    {this.todoList.map((todo) => {
                        return <todo-item todo={todo}></todo-item>
                    })}
                </ul>
            </div>
        );
    }

    setNewTodo(newTodo){
        this.todoList = [...this.todoList, {
            id: Date.now(),
            title: newTodo.value,
            complete: false,
            pomodoros: 0,
            estPomodoros: 1
            }];
    }
}