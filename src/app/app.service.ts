import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Member } from './shared/class/member';
import { PurchaseOrder } from './shared/class/purchase-order';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from './../environments/environment';
import { NotificationComponent } from './shared/tool/notification/notification.component';

@Injectable()

export class AppService {
    private apiURL = environment.webapiURL;
    private notificationComponent: NotificationComponent;
    currentMember: Member;
    wasLoggedIn: boolean;

    public subject = new Subject<string>();

    public disabledBrowsers = {
        'IE': 1,
        'MS-Edge': 1
    };

    constructor(private http: HttpClient,
        private oauthService: OAuthService) { }

    sendNotification(notification: any) {
        this.notificationComponent.notify(notification);
    }

    setWasLoggedIn() {
        this.wasLoggedIn = true;
    }

    getWasLoggedIn() {
        return this.wasLoggedIn;
    }

    getCurrentMember(): Observable<Member> {
        if (this.currentMember) {
            return of(this.currentMember);
        }
        return this.http.get<Member>(this.apiURL + '/member/current')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.currentMember = data),
                            catchError(this.handleError)
                        );
    }

    editToFirstVendor(): Observable<Member>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<Member>(this.apiURL + '/member/firstvendor', { headers: headers} )
                            .pipe(
                                //tap(data => console.log('Update Member: ' + data.MemberID)),
                                tap(data => this.currentMember = data),
                                catchError(this.handleError)
                            );
    }

    isMemberAdmin(): Observable<Boolean> {
        if (this.currentMember) {
            return of (this.currentMember.IsAdmin);
        } else {
            this.getCurrentMember()
                .subscribe(
                    (data) => {
                        this.currentMember = data;
                        if (this.currentMember) {
                            return of (this.currentMember.IsAdmin);
                        }
                    }
                );
        }
        return of(false);
    }

    isMemberSuperAdmin(): Observable<Boolean> {
        if (this.currentMember) {
            return of (this.currentMember.IsSuperAdmin);
        } else {
            this.getCurrentMember()
                .subscribe(
                    (data) => {
                        this.currentMember = data;
                        if (this.currentMember) {
                            return of (this.currentMember.IsSuperAdmin);
                        }
                    }
                );
        }
        return of(false);
    }

    get email() {
        const claims = this.oauthService.getIdentityClaims();
        if (!claims) {
            return null;
        }
        return claims['preferred_username'];
    }

    getVendorID(): Observable<string> {
        if (this.currentMember) {
            return of(this.currentMember.VendorID);
        } else {
            this.getCurrentMember()
                .subscribe(
                    (data) => {
                        this.currentMember = data;
                        return of(this.currentMember.VendorID);
                    }
                );
        }
    }


    addPurchaseOrder(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<PurchaseOrder>(this.apiURL + '/purchaseorder', null, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Add Purchase Order: ' + JSON.stringify(data))),
                                tap(data => {
                                    console.log(data);
                                }),
                                catchError(this.handleError)
                            );
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            // errorMessage = `An error occurred: ${err.error.message}`;
            errorMessage = `Network error: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // errorMessage = `Backend returned code ${err.status}, body was: ${err.error.Message}`;
            errorMessage = `Response error: ${err.error.Message}`;
        }
        return throwError(errorMessage);
    }

    public verifyBrowserCompatibility(): Observable<any> {
        return this.http.get<any>('https://json.geoiplookup.io/api')
            .pipe(
                tap(data => data),
                catchError(this.handleError)
            );
    }
}
