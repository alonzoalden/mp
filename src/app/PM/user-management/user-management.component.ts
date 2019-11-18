import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {NotificationComponent} from 'app/shared/tool/notification/notification.component';
import {UserManagementService} from './user-management.service';

@Component({
    selector: 'app-pm-usermanagement',
    templateUrl: './user-management.component.html',

})
export class UserManagementComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    @ViewChild(NotificationComponent, {static: true}) private notificationComponent: NotificationComponent;


    constructor(
        private userManagementService: UserManagementService
    ) {
    }

    ngOnInit() {

        this.subscription = this.userManagementService.subject.subscribe(
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
