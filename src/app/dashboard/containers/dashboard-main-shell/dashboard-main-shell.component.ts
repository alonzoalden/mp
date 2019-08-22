import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatSidenav } from '@angular/material';
import { DashboardService } from '../../dashboard.service';
import { Dashboard, DashboardNews, DashboardVendorNotification } from '../../../shared/class/dashboard';
import { trigger, transition, useAnimation } from '@angular/animations';
import { growContainerAnimation, shinkContainerAnimation } from '../../components/dashboard-main/smooth-open-animation.component';

import { AppService } from '../../../app.service';

@Component({
    selector: 'o-dashboard-main-shell',
    templateUrl: './dashboard-main-shell.component.html',
    styleUrls: ['../../dashboard.component.css'],
    animations: [
        trigger('smoothOpen', [
            transition('void => false', [
                /*no transition on first load*/
            ]),
            transition('* => void', [
                useAnimation(shinkContainerAnimation)
            ]),
            transition('void => *', [
                useAnimation(growContainerAnimation)
            ])
        ])
    ]
})

export class DashboardMainShellComponent implements OnInit {
    errorMessage: string;
    dashboard: Dashboard;
    DashboardVendorNotification: DashboardVendorNotification;

    name: string;

    displayedColumns = ['Subject', 'News', 'CreatedOn'];
    dataSource: any = null;
    newsClick: any = false;
    opened = true;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
    @HostListener('window:resize', [])
    onResize() {
        if (window.innerWidth < 700) {
            this.sidenav.close()
        } else {
            this.sidenav.open()
        }
    }

    constructor(private route: ActivatedRoute,
        private router: Router,
        private dashboardService: DashboardService,
        private appService: AppService) {

    }

    ngOnInit() {
        this.appService.getCurrentMember()
            .subscribe(
                (data) => {
                    this.appService.currentMember = data;
                    this.name = this.appService.currentMember.FirstName;
                },
                (error: any) => {
                    this.dashboardService.sendNotification({ type: 'error', title: 'Error', content: error });
                }
            );

        this.dashboardService.getDashboard().subscribe(
            (dashboard: Dashboard) => {
                this.dashboard = dashboard;
                let firstItem = [dashboard.DashboardNews[0]];
                this.refreshDataSource(firstItem);
            },
            (error: any) => {
                this.dashboardService.sendNotification({ type: 'error', title: 'Error', content: error });
                this.errorMessage = <any>error;
            }
        );

        this.dashboardService.getDashboarVendorNotification().subscribe(
            (dashboardvendornotification: DashboardVendorNotification) => {
                this.DashboardVendorNotification = dashboardvendornotification;
            },
            (error: any) => {
                this.dashboardService.sendNotification({ type: 'error', title: 'Error', content: error });
                this.errorMessage = <any>error;
            }
        );

        if ((window.innerWidth) < 700) {
            this.opened = false;
        }
    }

    refreshDataSource(dashboardNews: DashboardNews[]) {
        this.dataSource = new MatTableDataSource<DashboardNews>(dashboardNews);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    toggleNews() {
        this.newsClick = true;
        this.dataSource.data.length < 2 && this.dashboard.DashboardNews.length > 1
            ? this.refreshDataSource(this.dashboard.DashboardNews)
            : this.refreshDataSource([this.dashboard.DashboardNews[0]]);
    }

}
