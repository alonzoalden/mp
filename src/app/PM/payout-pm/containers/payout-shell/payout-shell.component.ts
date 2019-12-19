import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {NotificationComponent} from '../../../../shared/tool/notification/notification.component';
import {PayoutPmService} from '../../payout-pm.service';

@Component({
    selector: 'app-payout-shell',
    templateUrl: './payout-shell.component.html',
    styleUrls: ['./payout-shell.component.css']
})
export class PayoutShellComponent implements OnInit, OnDestroy {
    opened = true;
    subscription: Subscription;
    @ViewChild(NotificationComponent, {static: true}) private notificationComponent: NotificationComponent;

    constructor(
        private payoutService: PayoutPmService
    ) {
    }

    ngOnInit() {
        this.subscription = this.payoutService.subject.subscribe(
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
