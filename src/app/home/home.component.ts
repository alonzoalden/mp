import { getIsLoading } from './../shared/state/user-state.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth/auth.config';
import { AppService } from '../app.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from '../../environments/environment';
import * as fromUser from '../shared/state/user-state.reducer';
import { Store, select } from '@ngrx/store';
import * as userActions from '../shared/state/user-state.actions';
import { takeWhile } from 'rxjs/operators';
import { Member } from 'app/shared/class/member';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
    componentActive: boolean = true;
    appLoading: boolean = true;
    loadAPI: Promise<any>;
    id: any;
    member: any;
    constructor(activatedRoute: ActivatedRoute,
            private router: Router,
            private oauthService: OAuthService,
            private appService: AppService,
            private deviceService: DeviceDetectorService,
            private userStore: Store<fromUser.State>) {

        this.loadAPI = new Promise((resolve) => {
            this.loadScript();
            resolve(true);
        });
    }

    public loadScript() {
        let isFound = false;
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; ++i) {
            if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
                isFound = true;
            }
        }

        if (!isFound) {
            const dynamicScripts = [''];
            for (let i = 0; i < dynamicScripts.length; i++) {
                const node = document.createElement('script');
                node.src = dynamicScripts [i];
                node.type = 'text/javascript';
                node.async = false;
                node.charset = 'utf-8';
                document.getElementsByTagName('head')[0].appendChild(node);
            }
        }
    }

    ngOnInit() {
        this.userStore.pipe(
            select(fromUser.getCurrentUser),
            takeWhile(() => this.componentActive)
        ).subscribe(
            (member: Member) => {
                this.member = member;
                if (member && this.isLoggedin) {
                    if (member.IsPM) {
                        this.router.navigate(['/PM']);
                    }
                    else {
                        this.router.navigate(['/dashboard']);
                    }
                }
            }
        );
        this.userStore.pipe(
            select(fromUser.getIsLoading),
            takeWhile(() => this.componentActive)
        ).subscribe(
            (loading: boolean) => {
                if (!loading) {
                    this.appLoading = loading;
                }
            }
        );

        this.oauthService.events.subscribe(e => {
            if (e.type === 'token_received') {
                this.appService.setWasLoggedIn();
                this.getCurrentMemberAndRedirectToDashboard();
            }
        });
    }

    ngOnDestroy() {
        this.componentActive = false;
    }

    detectBrowser() {
        const isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    }
    getCurrentMemberAndRedirectToDashboard() {
        this.appService.getCurrentMember().subscribe((member: Member) => {
            if (member && this.isLoggedin) {
                if (member.IsPM) {
                    this.router.navigate(['/PM']);
                }
                else {
                    this.router.navigate(['/dashboard']);
                }
            }
        });
    }

    get isLoggedin() {
        return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
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

    login() {
        // this.appService.verifyBrowserCompatibility()
        //     .subscribe((data) => {
        //         const browser = this.deviceService.getDeviceInfo().browser;
        //         if (this.appService.disabledBrowsers[browser] && data.country_code !== 'US') {
        //             this.router.navigate(['/browser-invalid']);
        //         }
        //         else {
        //             this.oauthService.initImplicitFlow();
        //         }
        //     });

        this.oauthService.initImplicitFlow();
    }

    logout() {
        this.oauthService.logOut();
    }

    scrollToElement($element): void {
        $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }
}
