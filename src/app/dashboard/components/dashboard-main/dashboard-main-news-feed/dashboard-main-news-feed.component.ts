import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { DashboardNews } from '../../../../shared/class/dashboard';
import { growContainerAnimation } from '../smooth-open-animation.component';
import { trigger, transition, useAnimation } from '@angular/animations';
@Component({
    selector: 'o-dashboard-main-news-feed',
    styleUrls: ['../../../dashboard.component.css'],
    templateUrl: './dashboard-main-news-feed.component.html',
    animations: [
        trigger('smoothOpen', [
            transition('void => *', [
                useAnimation(growContainerAnimation)
            ])
        ])
    ]
})

export class DashboardMainNewsFeedComponent implements OnChanges {
    @Input() dashboardNews: DashboardNews[];
    @Input() errorMessage: string;
    
    displayedColumns = ['Subject', 'News', 'CreatedOn'];
    newsDisplay: DashboardNews;

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.dashboardNews.currentValue) {
            this.newsDisplay = changes.dashboardNews.currentValue[0];
        }
    }
}

