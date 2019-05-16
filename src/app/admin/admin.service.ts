import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Member, MemberInsert } from '../shared/class/member';

import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

import { VendorList } from '../shared/class/vendor';

@Injectable()
export class AdminService {
    private apiURL = environment.webapiURL;
    private members: Member[];
    public subject = new Subject<string>();

    private vendorList: VendorList[];
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
        return this.http.get<Member[]>(this.apiURL + '/member/admin')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.members = data),
                            catchError(this.handleError)
                        );
    }

    getMember(id: number): Observable<Member> {
        if (this.members) {
            const foundMember = this.members.find(x => x.MemberID === id);
            return of(foundMember);
        }
        return this.http.get<Member>(this.apiURL + '/member/' + id)
                    .pipe(
                        //tap(data => console.log(JSON.stringify(data))),
                        catchError(this.handleError)
                    );
    }

    addMember(member: MemberInsert): Observable<MemberInsert> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<Member>(this.apiURL + '/member/admin', member, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Add Member: ' + JSON.stringify(data))),
                                tap(data => {
                                    this.members.push(data);
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

    replaceMember(id: number, member: Member) {
        if (this.members) {
            this.members[this.members.findIndex(i => i.MemberID === id)] = member;
        }
    }

    getVendorList(): Observable<VendorList[]>  {
        if (this.vendorList && this.vendorList.length > 0) {
            return of(this.vendorList);
        }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.get<VendorList[]>(this.apiURL + '/vendor/simplevendorlist', { headers: headers} )
                            .pipe(
                                //tap(data => console.log(JSON.stringify(data))),
                                tap(data => this.vendorList = data),
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
