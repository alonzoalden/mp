import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesOrderService } from './sales-order.service';
import { Subscription } from 'rxjs';

import { NotificationComponent } from '../shared/tool/notification/notification.component';

@Component({
    selector: 'o-sales-order',
    templateUrl: './sales-order.component.html',
})

export class SalesOrderComponent implements OnInit, OnDestroy {
    subscription: Subscription;

    @ViewChild(NotificationComponent, { static: true })
    private  notificationComponent: NotificationComponent;

    constructor(private route: ActivatedRoute, private salesorderService: SalesOrderService) { }

    ngOnInit() {
        if (this.route.snapshot.queryParams['init']) {
            this.salesorderService.resetSalesOrders();
        }
        this.subscription = this.salesorderService.subject.subscribe(
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
