import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginatorModule, MatSort, MatTableDataSource } from '@angular/material';
import { DashboardService } from './dashboard.service';
import { Subscription } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth/auth.config';

import { NotificationComponent } from '../shared/tool/notification/notification.component';

import { AppService } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  @ViewChild(NotificationComponent)
  private  notificationComponent: NotificationComponent;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService,
    private oauthService: OAuthService,
    private appService: AppService) {
      // this.oauthService.configure(authConfig);
      // this.oauthService.loadDiscoveryDocument();
    }

  ngOnInit() {

    // if (this.route.snapshot.queryParams['init']) {
    //   this.dashboardService.reset();
    // }

    this.subscription = this.dashboardService.subject.subscribe(
        notification => this.doNotification(notification)
    );
    
    this.oauthService.events.subscribe(e => {
      // console.log('oauth/oidc event');
      // console.log(e);
      this.appService.setWasLoggedIn();      
    });
  }

  doNotification(notification) {
    this.notificationComponent.notify(notification);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

  get isLoggedin() {
    return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
  }
}
