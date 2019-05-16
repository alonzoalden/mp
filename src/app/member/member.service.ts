import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Member, MemberInsert, MemberVendor } from '../shared/class/member';

import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

@Injectable()
export class MemberService {
    private apiURL = environment.webapiURL;
    private members: Member[];
    private memberVendors: MemberVendor[];
    public subject = new Subject<string>();

    currentMember: Member;

    constructor(private http: HttpClient,
                private oauthService: OAuthService) { }

    sendNotification(notification: any) {
        this.subject.next(notification);
    }

    getMembers(): Observable<Member[]> {
        if (this.members) {
            return of(this.members);
        }
        return this.http.get<Member[]>(this.apiURL + '/member')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.members = data),
                            catchError(this.handleError)
                        );
    }

    getMemberByInviteGUID(inviteGUID: string): Observable<Member> {
        return this.http.get<Member>(this.apiURL + '/member/inviteGUID/' + inviteGUID)
        .pipe(
            //tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    sendConfirmationMemberByEmail(email: string): Observable<Member> {
        return this.http.get<Member>(this.apiURL + '/member/email/' + email + '/confirm')
        .pipe(
            //tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    addMember(member: MemberInsert): Observable<MemberInsert> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<Member>(this.apiURL + '/member', member, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Add Member: ' + JSON.stringify(data))),
                                tap(data => {
                                    data.IsActive = true;
                                    if(this.members) {
                                        this.members.push(data);
                                    }
                                }),
                                catchError(this.handleError)
                            );
    }

    editMember(member: Member): Observable<Member>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<Member>(this.apiURL + '/member/' + member.MemberID, member, { headers: headers} )
                            .pipe(
                                //tap(data => console.log('Update Member: ' + member.MemberID)),
                                catchError(this.handleError)
                            );
    }

    editMemberRegistration(member: Member): Observable<Member>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<Member>(this.apiURL + '/member/registration/' + member.MemberID, member, { headers: headers} )
                            .pipe(
                                //tap(data => console.log('Update Member: ' + member.MemberID)),
                                catchError(this.handleError)
                            );
    }

    sendConfirmation(member: Member): Observable<Member>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<Member>(this.apiURL + '/member/' + member.MemberID + '/confirm', member, { headers: headers} )
                            .pipe(
                                //tap(data => console.log('Update Member: ' + member.MemberID)),
                                catchError(this.handleError)
                            );
    }

    deleteMember(member: Member): Observable<Member>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.delete<Member>(this.apiURL + '/member/' + member.MemberID, { headers: headers} )
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
