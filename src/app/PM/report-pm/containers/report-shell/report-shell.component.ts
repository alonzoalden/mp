import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {NotificationComponent} from '../../../../shared/tool/notification/notification.component';
import {ReportPmService} from '../../report-pm.service';

@Component({
    selector: 'app-report-shell',
    templateUrl: './report-shell.component.html',
    styleUrls: ['./report-shell.component.css']
})
export class ReportShellComponent implements OnInit, OnDestroy {
    opened = true;
    subscription: Subscription;
    @ViewChild(NotificationComponent, {static: true}) private notificationComponent: NotificationComponent;

    constructor(
        private reportService: ReportPmService
    ) {
    }

    ngOnInit() {
        this.subscription = this.reportService.subject.subscribe(
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
