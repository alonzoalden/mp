import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from './member.service';

import { Subscription } from 'rxjs';

import { NotificationComponent } from '../shared/tool/notification/notification.component';

@Component({
    selector: 'o-member',
    templateUrl: './member.component.html',
})

export class MemberComponent implements OnInit, OnDestroy {
    subscription: Subscription;

    @ViewChild(NotificationComponent, { static: true })
    private  notificationComponent: NotificationComponent;

    constructor(private route: ActivatedRoute,
        private memberService: MemberService) {
    }

    ngOnInit() {
        this.subscription = this.memberService.subject.subscribe(
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
