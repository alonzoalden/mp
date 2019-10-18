import { Component, Input } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';

@Component({
  selector: 'o-notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.css'],
})

export class NotificationComponent {
    public subject = new Subject<any>();
    public options = {
        position: ['bottom', 'right'],
        timeOut: 3000,
        lastOnBottom: true,
        animate: 'rotate'
    };

    constructor(private _service: NotificationsService) { }

    notify(notification: any, options: any = {}) {
        switch (notification.type) {
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
                const a = this._service.info(notification.title, notification.content, options);
                this.subject.next(a);
                break;
            case 'warn':
                this._service.warn(notification.title, notification.content, {});
                break;
            case 'bare':
                this._service.bare(notification.title, notification.content, {});
                break;
        }
    }
    remove(notificationID: string) {
        this._service.remove(notificationID);
    }
}
