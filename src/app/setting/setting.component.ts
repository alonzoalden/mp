import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettingService } from './setting.service';

import { Subscription } from 'rxjs';

import { NotificationComponent } from '../shared/tool/notification/notification.component';

@Component({
    selector: 'o-setting',
    templateUrl: './setting.component.html',
})

export class SettingComponent implements OnInit, OnDestroy {
    subscription: Subscription;

    @ViewChild(NotificationComponent)
    private  notificationComponent: NotificationComponent;

    constructor(private route: ActivatedRoute,
        private settingService: SettingService) {
    }

    ngOnInit() {
        this.subscription = this.settingService.subject.subscribe(
            notification => this.doNotification(notification)
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    doNotification(notification) {
        this.notificationComponent.notify(notification);
    }
}
