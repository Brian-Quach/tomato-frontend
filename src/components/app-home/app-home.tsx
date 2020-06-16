import { Component, h } from '@stencil/core';
@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  componentDidLoad() {
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Tomato</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content class="ion-padding">
        <pomodoro-timer>
        </pomodoro-timer>

        {/* <pomodoro-todo>
        </pomodoro-todo> */}
      </ion-content>
    ];
  }

  componentDidRender() {
    // Timer.Instance.checkTimer().then((timer) => {
    //   console.log(timer);
    // });
    // Timer.Instance.setTimerDuration(1);
    // Timer.Instance.startTimer();
    // setInterval((_) => { 
    //   Timer.Instance.checkTimer().then((timer) => {
    //     console.log(timer.remaining)
    //   })
    // }, 100);
  }
}
