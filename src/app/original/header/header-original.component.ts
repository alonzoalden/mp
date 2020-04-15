import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AppService } from '../../app.service';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import * as fromUser from '../../shared/state/user-state.reducer';
import * as userActions from '../../shared/state/user-state.actions';
declare var $: any;

@Component({
    selector: 'header-original',
    templateUrl: './header-original.component.html',
    styleUrls: ['../../app.component.css']
})
export class HeaderOriginalComponent implements OnInit, OnDestroy {
    errorMessage: string;
    componentActive: boolean = true;
    claims: any;
    currentLanguage: string;

    constructor(
        private userStore: Store<fromUser.State>,
        private oauthService: OAuthService,
        private router: Router,
        private translate: TranslateService,
        public appService: AppService) {
    }

    ngOnInit() {
        this.translate.setDefaultLang('en');
        this.currentLanguage = 'en';
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

        if (this.isLoggedin) {
            this.userStore.dispatch(new userActions.LoadCurrentUser());
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

    get wasLoggedIn() {
        return (this.appService.wasLoggedIn || this.isLoggedin) && !(this.router.url === '/home' || this.router.url === '/');
    }

    login() {
        this.oauthService.initImplicitFlow();
    }

    showClaims() {
        this.claims = this.oauthService.getIdentityClaims();
    }

    logout() {
        this.oauthService.logOut();
    }


    addPurchaseOrder() {
        this.router.navigate(['/inbound-shipment', 0, 'edit']);
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

    get isB2B() {
        return (this.appService.currentMember && this.appService.currentMember.IsB2B);
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
    }

    switchLanguage(language: string) {
        this.translate.use(language);
        this.currentLanguage = language;
    }
}
