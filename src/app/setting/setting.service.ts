import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Member, MemberInsert, MemberVendor } from '../shared/class/member';

import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

@Injectable()
export class SettingService {
    private apiURL = environment.webapiURL;
    private memberVendors: MemberVendor[];
    public subject = new Subject<string>();

    constructor(private http: HttpClient,
                private oauthService: OAuthService) { }

    sendNotification(notification: any) {
        this.subject.next(notification);
    }

    getMemberVendors(): Observable<MemberVendor[]> {
        if (this.memberVendors) {
            return of(this.memberVendors);
        }
        return this.http.get<MemberVendor[]>(this.apiURL + '/membervendor' )
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.memberVendors = data),
                            catchError(this.handleError)
                        );
    }

    editCurrentMember(member: Member): Observable<Member>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<Member>(this.apiURL + '/member/' + member.MemberID, member, { headers: headers} )
                            .pipe(
                                //tap(data => console.log('Update Member: ' + member.MemberID)),
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
}
