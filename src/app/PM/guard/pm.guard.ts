import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {AppService} from '../../app.service';
import {catchError, mergeMap} from 'rxjs/operators';
import {Member} from '../../shared/class/member';
import {of} from 'rxjs';

@Injectable()
export class PMAuthGuard implements CanLoad, CanActivate {

    constructor(
        private oauthService: OAuthService,
        private router: Router,
        private appService: AppService,
    ) {
    }

    canLoad() {
        if (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()) {
            if (!this.appService.currentMember) {
                return this.appService.getCurrentMember().pipe(
                    mergeMap((data: Member) => {
                        if (data.IsPM === true) {
                            return of(true);
                        } else {
                            this.router.navigate(['/home']);
                        }
                    }),
                    catchError(err => this.router.navigate(['home']))
                );
            } else {
                if (this.appService.currentMember.IsPM === true) {
                    return true;
                } else {
                    this.router.navigate(['/home']);
                }
            }
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
}

export class PMSuperAdminAuthGuard implements CanActivate {
    constructor(
        private oauthService: OAuthService,
        private appService: AppService,
        private router: Router
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.appService.currentMember.IsSuperAdmin === true) {
            return true;
        } else {
            this.router.navigate(['/home']);
        }
    }
}
