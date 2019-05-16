import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { DashboardService } from '../dashboard.service';
import { Dashboard, DashboardNews } from '../../shared/class/dashboard';
import { growContainerAnimation } from './smooth-open-animation.component';
import { trigger, transition, useAnimation } from '@angular/animations';
@Component({
    selector: 'o-dashboard-main-news-feed',
    styleUrls: ['../dashboard.component.css'],
    templateUrl: './dashboard-main-news-feed.component.html',
    animations: [
        trigger('smoothOpen', [
          transition('void => *', [
            useAnimation(growContainerAnimation)
          ])
        ])
      ]
})


export class DashboardMainNewsFeedComponent implements OnInit {
    errorMessage: string;
    dashboard: Dashboard;
    
    displayedColumns = ['Subject', 'News', 'CreatedOn'];
    dataSource: any = null;
    newsClick: any = false;
    

    constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

    ngOnInit() {
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
    }

    refreshDataSource(dashboardNews: DashboardNews[]) {
        this.dataSource = new MatTableDataSource<DashboardNews>(dashboardNews);
    }
    toggleNews() {
        this.newsClick = true;
        this.dataSource.data.length < 2 && this.dashboard.DashboardNews.length > 1
          ? this.refreshDataSource(this.dashboard.DashboardNews)
          : this.refreshDataSource([this.dashboard.DashboardNews[0]]);
      }
}
