import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationComponent } from '../shared/tool/notification/notification.component';
import { select, Store } from '@ngrx/store';
import * as fromUser from '../shared/state/user-state.reducer';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { takeWhile } from 'rxjs/operators';
import * as userActions from '../shared/state/user-state.actions';
import { authConfig } from '../auth/auth.config';

@Component({
    selector: 'app-pm',
    templateUrl: './pm.component.html',
})
export class PmComponent implements OnInit, OnDestroy {
    errorMessage: string;
    subscription: Subscription;
    componentActive: boolean = true;

    @ViewChild(NotificationComponent, { static: false })
    private notificationComponent: NotificationComponent;
    title = 'app';
    apiResponse: any;
    claims: any;

    currentLanguage: string;

    constructor(
        private userStore: Store<fromUser.State>,
        private oauthService: OAuthService,
        private httpClient: HttpClient,
        private router: Router,
        private appService: AppService,
        private translate: TranslateService,
        private deviceService: DeviceDetectorService) {
    }

    ngOnInit() {

        this.configureWithNewConfigApi();
        this.translate.setDefaultLang('en');
        this.currentLanguage = 'en';

        this.initInterval();

        this.userStore.pipe(
            select(fromUser.getCurrentUser),
            takeWhile(() => this.componentActive)
        ).subscribe(
            data => {
                if (data) {
                    this.appService.currentMember = data;

                    //Set Default Language
                    this.currentLanguage = this.appService.currentMember.DefaultLanguage;
                    this.translate.setDefaultLang(this.currentLanguage);

                    // change vendor if not active
                    if (!this.appService.currentMember.IsActive) {
                        this.changeVendor();
                    }
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

        this.subscription = this.appService.subject.subscribe(
            notification => this.doNotification(notification)
        );

        if (this.isLoggedin) {
            this.userStore.dispatch(new userActions.LoadCurrentUser());
        }

    }

    initInterval() {
        setInterval(() => {
            if (this.wasLoggedIn && !this.isLoggedin) {
                this.logout();
            }
        }, 5000);
    }

    changeVendor() {
        this.appService.editToFirstVendor()
            .subscribe(
                (data) => {
                    if (data && data.VendorID) {
                        this.appService.currentMember = data;
                        // this.appService.sendNotification({ type: 'alert', title: 'Vendor Changed', content: '' });
                    } else {
                        this.logout();
                    }
                },
                (error: any) => {
                    this.errorMessage = <any>error;
                    // this.appService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    window.location.reload();
                }
            );
    }

    private configureWithNewConfigApi() {
        this.oauthService.configure(authConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.setupAutomaticSilentRefresh();
        this.oauthService.loadDiscoveryDocumentAndTryLogin();
    }

    get wasLoggedIn() {
        return (this.appService.wasLoggedIn || this.isLoggedin) && !(this.router.url === '/home' || this.router.url === '/');
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


    addPurchaseOrder() {
        this.router.navigate(['PM/inbound-shipment', 0, 'edit']);
    }

    isInboundShipmentPage() {
        return this.router.url.indexOf('inbound-shipment/') > 0;
    }

    get givenName() {
        const claims = this.oauthService.getIdentityClaims();
        if (!claims) {
            return null;
        }
        return claims['given_name'];
    }

    get familyName() {
        const claims = this.oauthService.getIdentityClaims();
        if (!claims) {
            return null;
        }
        return claims['family_name'];
    }

    get email() {
        const claims = this.oauthService.getIdentityClaims();
        if (!claims) {
            return null;
        }
        return claims['preferred_username'];
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

    get VendorID() {
        if (this.appService.currentMember) {
            return this.appService.currentMember.VendorID;
        } else {
            return '';
        }
    }

    get DisplayVendorName() {
        if (this.appService.currentMember && this.appService.currentMember.VendorName) {
            return this.appService.currentMember.VendorName.length > 15
                ? this.appService.currentMember.VendorName.substring(0, 15) + '...'
                : this.appService.currentMember.VendorName.substring(0, 15);
        } else {
            return '';
        }
    }

    ngOnDestroy(): void {
        this.componentActive = false;
        this.subscription.unsubscribe();
    }

    doNotification(notification) {
        this.notificationComponent.notify(notification);
    }

    switchLanguage(language: string) {
        this.translate.use(language);
        this.currentLanguage = language;
    }
}
