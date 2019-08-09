import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription ,  Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

import { Router } from '@angular/router';

import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth/auth.config';

import { AppService } from './app.service';
import { NotificationComponent } from './shared/tool/notification/notification.component';

import { PurchaseOrder } from './shared/class/purchase-order';

import { environment } from './../environments/environment';
import { DeviceDetectorService } from 'ngx-device-detector';

import * as fromUser from './shared/state/user-state.reducer';
import { Store } from '@ngrx/store';
import * as userActions from './shared/state/user-state.actions';

declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    errorMessage: string;
    subscription: Subscription;

    @ViewChild(NotificationComponent, { static: false })
    private  notificationComponent: NotificationComponent;

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
        this.configureWithNewConfigApi();
        translate.setDefaultLang('en');
        this.currentLanguage = 'en';
                
        this.initInterval();
    }

    initInterval() {
        setInterval(() => {
            if(this.wasLoggedIn && !this.isLoggedin) {
                this.logout();
            }
        }, 5000);
    }
    
    ngOnInit() {
        
        
        this.userStore.dispatch(new userActions.GetCurrentUser());

        // this.appService.verifyBrowserCompatibility()
        //     .subscribe((data) => {
        //         const browser = this.deviceService.getDeviceInfo().browser;
        //         if (window.location.href !== environment.siteURL && window.location.href !== environment.siteURL + '/home') {
        //             if (this.appService.disabledBrowsers[browser] && data.country_code !== 'US') {
        //                 this.router.navigate(['/browser-invalid']);
        //             }
        //         }
        //     });

        // var nav = window.navigator;
        // var screen = window.screen;
        // var guid = nav.mimeTypes.length.toString();
        // guid += nav.userAgent.replace(/\D+/g, '');
        // guid += nav.plugins.length;
        // guid += screen.height || '';
        // guid += screen.width || '';
        // guid += screen.pixelDepth || '';
        // console.log(guid);
        // console.log(document.cookie);    
        // console.log(sessionStorage);
        // console.log(window.navigator.userAgent);
        // console.log(window.navigator.mimeTypes);

        

        this.subscription = this.appService.subject.subscribe(
            notification => this.doNotification(notification)
        );

        if (this.isLoggedin) {
            this.appService.getCurrentMember()
                .subscribe(
                    (data) => {
                        this.appService.currentMember = data;

                        //Set Default Language
                        this.currentLanguage =this.appService.currentMember.DefaultLanguage;
                        this.translate.setDefaultLang(this.currentLanguage);

                        // change vendor if not active
                        if (!this.appService.currentMember.IsActive) {
                            this.changeVendor();
                        }
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                        //console.log(error);
                        this.logout();
                    }
                );
        }

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
        // this.oauthService.setStorage(localStorage);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.setupAutomaticSilentRefresh();
        this.oauthService.loadDiscoveryDocumentAndTryLogin();
    }

    get wasLoggedIn() {
        return (this.appService.wasLoggedIn || this.isLoggedin) && !(this.router.url === '/home' || this.router.url === '/');

        //return (this.appService.getWasLoggedIn() || this.isLoggedin) && !(this.router.url === '/home' || this.router.url === '/');

        // if ( (this.appService.getWasLoggedIn() || this.isLoggedin) && !(this.router.url === '/home' || this.router.url === '/') ) {
        //     return true;
        // }
        // else {
        //     this.router.navigate(['/home']);
        //     return false;
        // }
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
            .then(info => console.debug('refresh ok', info))
            .catch(err => console.error('refresh error', err));
    }

    // getApi() {
    //     this.httpClient
    //         //.get("https://localhost:44383/api/WebApiResource", {
    //         .get("https://login.toolots.com/api/WebApiResource", {
    //             headers: new HttpHeaders(
    //             {
    //             'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    //             }
    //         )
    //         })
    //         .subscribe(data => this.apiResponse = data, error => this.apiResponse = {});
    // }

    logout() {
        this.oauthService.logOut();
    }


    addPurchaseOrder() {
        this.appService.addPurchaseOrder().subscribe(
            (data: PurchaseOrder) => this.onAddPurchaseOrderComplete(data, `${data.PurchaseOrderID} was added`),
            (error: any) => {     
                //console.log(error);           
                this.errorMessage = <any>error;                              
            }
        );
    }

    onAddPurchaseOrderComplete(purchaseorder: PurchaseOrder, message?: string) {
        //this.appService.sendNotification({ type: 'success', title: 'Successfully Added', content: message });
        
        if(this.isInboundShipmentPage()) {
            this.router.navigate(['/inbound-shipment', purchaseorder.PurchaseOrderID, 'edit']);
            //window.location.reload();
        }
        else {
            this.router.navigate(['/inbound-shipment', purchaseorder.PurchaseOrderID, 'edit']);
        }                
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
