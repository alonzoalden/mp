import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
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

    @ViewChild(NotificationComponent)
    private  notificationComponent: NotificationComponent;

    constructor(private route: ActivatedRoute,
        private router: Router,
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
