import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { DashboardVendorNotification, Dashboard } from '../../../../shared/class/dashboard';
import { growContainerAnimation } from '../smooth-open-animation.component';
import { trigger, transition, useAnimation } from '@angular/animations';
import { Member } from 'app/shared/class/member';

@Component({
    selector: 'o-dashboard-main-vendor-notification',
    styleUrls: ['../../../dashboard.component.css'],
    templateUrl: './dashboard-main-vendor-notification.component.html',
    animations: [
        trigger('smoothOpen', [
            transition('void => *', [
                useAnimation(growContainerAnimation)
            ])
        ])
    ]
})

export class DashboardMainVendorNotificationComponent implements OnInit {
    displayedColumns = ['Status', 'Count'];
    displayedMerchantColumns = ['Unshipped', 'Shipped'];
    displayedToolotsColumns = ['Unshipped', 'Shipped'];
    
    @Input() userInfo: Member;
    @Input() dashboard: Dashboard;
    @Input() dashboardVendorNotification: DashboardVendorNotification;
    @Input() errorMessage: string;
    @Output() getDashboardVendorNotification = new EventEmitter<void>();

    constructor() { }

    ngOnInit() {
        this.getDashboardVendorNotification.emit();
    }
}