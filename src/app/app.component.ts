import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth/auth.config';
import { AppService } from './app.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as fromUser from './shared/state/user-state.reducer';
import { Store, select } from '@ngrx/store';
import * as userActions from './shared/state/user-state.actions';
import { takeWhile } from 'rxjs/operators';

declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
    claims: any;
    componentActive: boolean = true;
    appLoading: boolean;

    constructor(
        private userStore: Store<fromUser.State>,
        private oauthService: OAuthService,
        private router: Router,
        public appService: AppService) {
    }

    ngOnInit() {
        this.appLoading = true;
        this.configureWithNewConfigApi();
        this.initInterval();
        this.userStore.pipe(
            select(fromUser.getCurrentUser),
            takeWhile(() => this.componentActive)
        ).subscribe(
            member => {
                if (member) {
                    this.appLoading = false;
                    if (member.IsPM && this.router.url === '/dashboard') {
                        //this.router.navigate(['/PM']);
                    }
                }
            }
        );
        this.userStore.pipe(
            select(fromUser.getIsLoading),
            takeWhile(() => this.componentActive)
        ).subscribe(
            loading => {
                if (!loading) {
                    this.appLoading = loading;
                }
            }
        );
        // this.appService.verifyBrowserCompatibility()
        //     .subscribe((data) => {
        //         const browser = this.deviceService.getDeviceInfo().browser;
        //         if (window.location.href !== environment.siteURL && window.location.href !== environment.siteURL + '/home') {
        //             if (this.appService.disabledBrowsers[browser] && data.country_code !== 'US') {
        //                 this.router.navigate(['/browser-invalid']);
        //             }
        //         }
        //     });

        if (this.isLoggedin) {
            this.userStore.dispatch(new userActions.LoadCurrentUser());
        }

    }
    ngAfterViewInit() {

    }

    initInterval() {
        setInterval(() => {
            if (this.wasLoggedIn && !this.isLoggedin) {
                this.logout();
            }
        }, 5000);
    }

    private configureWithNewConfigApi() {
        this.oauthService.configure(authConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.setupAutomaticSilentRefresh();
        this.oauthService.loadDiscoveryDocumentAndTryLogin();
    }

    ngOnDestroy() {
    }
    login() {
        this.oauthService.initImplicitFlow();
    }
    showClaims() {
        this.claims = this.oauthService.getIdentityClaims();
    }
    manualSilentRefresh() {
        this.oauthService
        .silentRefresh()
        .then(info => console.error('refresh ok', info))
        .catch(err => console.error('refresh error', err));
    }
    logout() {
        this.oauthService.logOut();
    }
    get wasLoggedIn() {
        return (this.appService.wasLoggedIn || this.isLoggedin) && !(this.router.url === '/home' || this.router.url === '/');
    }
    get isLoggedin() {
        return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
    }
    get isAdmin() {
        return (this.appService.currentMember && this.appService.currentMember.IsAdmin);
    }
    get isSuperAdmin() {
        return (this.appService.currentMember && this.appService.currentMember.IsSuperAdmin);
    }
    get isPM() {
        return (this.appService.currentMember && this.appService.currentMember.IsPM);
    }
}
