import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from './item.service';
import { Subscription } from 'rxjs';
import { NotificationComponent } from '../../shared/tool/notification/notification.component';

@Component({
    selector: 'o-item',
    templateUrl: './item.component.html',
})
export class ItemComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    @ViewChild(NotificationComponent, { static: true })

    private notificationComponent: NotificationComponent;
    constructor(
        private route: ActivatedRoute,
        private itemService: ItemService
    ) { }

    ngOnInit() {
        if (this.route.snapshot.queryParams['init']) {
            this.itemService.resetItems();
        }
        this.subscription = this.itemService.subject.subscribe(
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
