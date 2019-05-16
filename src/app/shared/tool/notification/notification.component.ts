import { Component } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'o-notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.css'],
})

export class NotificationComponent {
    public options = {
        position: ['bottom', 'right'],
        timeOut: 3000,
        lastOnBottom: true,
        animate: 'rotate'
    };

    constructor(private _service: NotificationsService) { }

    notify (notification: any) {
        switch(notification.type) {
            case 'success':
                this._service.success(notification.title, notification.content, {});
                break;
            case 'error':
                this._service.error(notification.title, notification.content, {});
                break;
            case 'alert':
                this._service.alert(notification.title, notification.content, {});
                break;
            case 'info':
                this._service.info(notification.title, notification.content, {});
                break;
            case 'warn':
                this._service.warn(notification.title, notification.content, {});
                break;
            case 'bare':
                this._service.bare(notification.title, notification.content, {});
                break;
        }
    }
}
