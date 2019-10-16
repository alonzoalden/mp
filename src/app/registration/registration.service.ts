import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { VendorRegistration } from '../shared/class/vendor-registration';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

@Injectable()
export class RegistrationService {
    private apiURL = environment.webapiURL;

    public subject = new Subject<string>();

    constructor(private http: HttpClient,
                private oauthService: OAuthService) { }

    sendNotification(notification: any) {
        this.subject.next(notification);
    }

    addVendorRegistration(registration: VendorRegistration): Observable<VendorRegistration> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<VendorRegistration>(this.apiURL + '/vendorregistration', registration, { headers: headers } )
                            .pipe(
                                tap(data => console.log('Add Registration: ' + JSON.stringify(data))),
                                catchError(this.handleError)
                            );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage: string;
        if (err.error instanceof Error) {
            errorMessage = `Network error: ${err.error.message}`;
        } else {
            errorMessage = `Response error: ${err.error.Message}`;
        }
        return throwError(errorMessage);
    }
}
