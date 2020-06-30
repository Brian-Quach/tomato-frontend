import { Component, State, h } from '@stencil/core';
import { Todo } from '../../../models/todo';

@Component({
  tag: 'pomodoro-todo',
  styleUrl: 'pomodoro-todo.scss'
})
export class PomodoroTodo {
    @State() newTodo: Todo;

  
    componentWillLoad() {

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
                <div class="list-item">
                  <div class ="">

                  </div>
                  <div>

                  </div>
                  <div>

                  </div>
                  <div>

                  </div>
                </div>

              </div>
            </div>
        );
    }

}