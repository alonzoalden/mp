import { Injectable } from '@angular/core';
import { CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable()
export class AuthGuard implements CanLoad {

    constructor(private deviceService: DeviceDetectorService, private oauthService: OAuthService, private router: Router) { }

    canLoad() {
        //this.verifyBrowserCompatibility();
        //console.log(this.oauthService.hasValidIdToken());
        if (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()) {
            // console.log("passed guard");
            return true;
        } else {
            this.router.navigate(['/home']);
        }
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.oauthService
            .loadDiscoveryDocumentAndTryLogin()
            .then((res) => {
                return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken();
            });
    }
    verifyBrowserCompatibility() {
        const disabledBrowsers = {
          'IE': 1,
          'MS-Edge': 1
        }
        const browser = this.deviceService.getDeviceInfo().browser;
        if (disabledBrowsers[browser]) {
            this.router.navigate(['/browser-invalid'])
        };
    }
}
