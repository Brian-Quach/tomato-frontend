import { Network } from '@capacitor/core';

export class ApiClient {

    private static _instance: ApiClient;
    private networkConnected: boolean;

    private constructor() {
        Network.getStatus().then((status) => {
            this.networkConnected = status.connected;
        })
        
        Network.addListener("networkStatusChange", (status) => {
            this.networkConnected = status.connected;
        })
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    isConnected() {
        return this.networkConnected;
    }

    async get(path) {
        return await fetch(path).then(response => response.json())
    }

    async post(path, data?) {
        return await fetch(path, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        }).then(response => response.json())
    }

    async patch(path, data?) {
        return await fetch(path, {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        }).then(response => response.json())
    }
}