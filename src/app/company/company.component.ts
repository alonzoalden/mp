import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CompanyService } from './company.service';
import { Subscription } from 'rxjs';
import { NotificationComponent } from '../shared/tool/notification/notification.component';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss']
})

export class CompanyComponent implements OnInit, OnDestroy {
    subscription: Subscription;

    @ViewChild(NotificationComponent, { static: true })
    private  notificationComponent: NotificationComponent;

    constructor(
        private companyService: CompanyService) {
    }

    ngOnInit() {
            this.subscription = this.companyService.subject.subscribe(
            notification => this.doNotification(notification)
        );
    }

    doNotification(notification) {
        this.notificationComponent.notify(notification);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
