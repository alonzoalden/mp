import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth/auth.config';
import { AppService } from '../app.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from '../../environments/environment';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    loadAPI:Promise<any>;
    id: any;
    constructor(activatedRoute: ActivatedRoute,
            private router: Router,
            private oauthService: OAuthService,
            private appService: AppService,
            private deviceService: DeviceDetectorService, ) {
        // this.oauthService.configure(authConfig);
        // this.oauthService.loadDiscoveryDocumentAndTryLogin();

        this.loadAPI = new Promise((resolve) => {
            this.loadScript();
            resolve(true);
        })
    }

    public loadScript() {        
        var isFound = false;
        var scripts = document.getElementsByTagName("script")
        for (var i = 0; i < scripts.length; ++i) {
            if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
                isFound = true;
            }
        }
    
        if (!isFound) {
            var dynamicScripts = [""];
    
            for (var i = 0; i < dynamicScripts.length; i++) {
                let node = document.createElement('script');
                node.src = dynamicScripts [i];
                node.type = 'text/javascript';
                node.async = false;
                node.charset = 'utf-8';
                document.getElementsByTagName('head')[0].appendChild(node);
            }
    
        }
    }

    ngOnInit() {
        //this.detectBrowser();
        // console.log(this.oauthService.hasValidIdToken());
        // console.log(this.oauthService.hasValidAccessToken());
        // console.log('log in: ');
        // console.log(this.isLoggedin);
        // const claims = this.oauthService.getIdentityClaims();

        if (this.isLoggedin) {
            //console.log('To Dashboard');
            this.router.navigate(['/dashboard']);
            // window.location.href = window.location.href.replace('/home', '/dashboard');
            // window.location.reload();
        }

        this.oauthService.events.subscribe(e => {
            if (e.type === 'token_received') {
                this.appService.setWasLoggedIn();
                this.redirectToDashboard();
            }
        });
    }
    
    detectBrowser() {
        let isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
        //console.log(isIEOrEdge);
        //console.log(window.navigator.userAgent);
    }
    
    redirectToDashboard() {
        // this.router.navigate(['/dashboard']);
        window.location.href = window.location.href.replace('/home', '/dashboard');
        
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
        this.appService.verifyBrowserCompatibility()
            .subscribe((data) => {
                const browser = this.deviceService.getDeviceInfo().browser;
                if (this.appService.disabledBrowsers[browser] && data.country_code !== 'US') {
                    this.router.navigate(['/browser-invalid']);
                } 
                else {
                    this.oauthService.initImplicitFlow();
                }
            });
    }

    logout() {
        this.oauthService.logOut();
    }

    scrollToElement($element): void {
        $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
}