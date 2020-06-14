import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Tomato</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        Hello! :)
      </ion-content>
    ];
  }
}
