import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Member } from '../shared/class/member';

import { AdminService } from './admin.service';
import { AppService } from '../app.service';

import { Subscription } from 'rxjs';

import { NotificationComponent } from '../shared/tool/notification/notification.component';

@Component({
    selector: 'o-admin',
    templateUrl: './admin.component.html',
})

export class AdminComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    currentMember: Member;

    @ViewChild(NotificationComponent, { static: true })
    private  notificationComponent: NotificationComponent;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private adminService: AdminService,
        private appService: AppService) {
    }

    ngOnInit() {
        this.appService.getCurrentMember()
                .subscribe(
                    (data) => {
                        this.appService.currentMember = data;
                        this.currentMember = data;
                        if (this.currentMember && !this.currentMember.IsSuperAdmin) {
                            this.router.navigate(['/home']);
                        }
                    },
                    (error: any) => {
                        this.appService.sendNotification({ type: 'error', title: 'Error', content: error });

                    }
                );

        this.subscription = this.adminService.subject.subscribe(
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
