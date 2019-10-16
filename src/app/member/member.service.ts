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
    public subject = new Subject<string>();

    currentMember: Member;

    constructor(private http: HttpClient,
                private oauthService: OAuthService) { }

    sendNotification(notification: any) {
        this.subject.next(notification);
    }

    getMembers(): Observable<Member[]> {
        // if (this.members) {
        //     return of(this.members);
        // }
        return this.http.get<Member[]>(this.apiURL + '/member')
                        .pipe(
                            tap(data => this.members = data),
                            catchError(this.handleError)
                        );
    }

    getMemberByInviteGUID(inviteGUID: string): Observable<Member> {
        return this.http.get<Member>(this.apiURL + '/member/inviteGUID/' + inviteGUID)
        .pipe(
            catchError(this.handleError)
        );
    }

    sendConfirmationMemberByEmail(email: string): Observable<Member> {
        return this.http.get<Member>(this.apiURL + '/member/email/' + email + '/confirm')
        .pipe(
            catchError(this.handleError)
        );
    }

    addMember(member: MemberInsert): Observable<MemberInsert> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<Member>(this.apiURL + '/member', member, { headers: headers } )
                            .pipe(
                                tap(data => {
                                    data.IsActive = true;
                                    if (this.members) {
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
                                catchError(this.handleError)
                            );
    }

    editMemberRegistration(member: Member): Observable<Member>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<Member>(this.apiURL + '/member/registration/' + member.MemberID, member, { headers: headers} )
                            .pipe(
                                catchError(this.handleError)
                            );
    }

    sendConfirmation(member: Member): Observable<Member>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<Member>(this.apiURL + '/member/' + member.MemberID + '/confirm', member, { headers: headers} )
                            .pipe(
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
        let errorMessage: string;
        if (err.error instanceof Error) {
            errorMessage = `Network error: ${err.error.message}`;
        } else {
            errorMessage = `Response error: ${err.error.Message}`;
        }
        return throwError(errorMessage);
    }
}
