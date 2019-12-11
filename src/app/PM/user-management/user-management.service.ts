import {Injectable} from '@angular/core';
import {Observable, of, Subject, throwError} from 'rxjs';
import {ItemList} from '../../shared/class/item';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {NotificationComponent} from '../../shared/tool/notification/notification.component';
import {Vendor} from '../../shared/class/vendor';
import {Member} from '../../shared/class/member';
import {MemberRelationItemNode, MemberRelationNode} from 'app/shared/class/member-relation';

@Injectable()
export class UserManagementService {
    private apiURL = environment.webapiURL;
    public subject = new Subject<string>();
    private memberList: Member[];
    private simpleItemList: ItemList[];

    constructor(
        private http: HttpClient,
        private notificationComponent: NotificationComponent
    ) {

    }


    sendNotification(notification: any) {
        this.notificationComponent.notify(notification);
    }

    getSubMembers(): Observable<Member[]> {
        if (this.memberList) {
            return of(this.memberList);
        }
        return this.http.get<Member[]>(this.apiURL + '/usermanage/submembers')
            .pipe(
                tap(data => this.memberList = data),
                catchError(this.handleError)
            );
    }

    getRelatedVendors(memberID: string): Observable<Vendor[]> {
        return this.http.get<Vendor[]>(this.apiURL + '/usermanage/member/related/' + memberID)
            .pipe(
                catchError(this.handleError)
            );
    }

    getUnRelatedVendors(memberID: string): Observable<Vendor[]> {
        return this.http.get<Vendor[]>(this.apiURL + '/usermanage/member/unrelated/' + memberID)
            .pipe(
                catchError(this.handleError)
            );
    }

    EditRelatedVendor(vendor: Vendor): Observable<Vendor> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<Vendor>(this.apiURL + '/vendor/' + vendor.VendorID, vendor, {headers: headers})
            .pipe(
                catchError(this.handleError)
            );
    }

    getMemberRelationTree(): Observable<MemberRelationItemNode[]> {
        return this.http.get<MemberRelationItemNode[]>(this.apiURL + '/usermanage/membertree')
            .pipe(
                catchError(this.handleError)
            );
    }

    getUnRelatedMemberRelationList(): Observable<MemberRelationNode[]> {
        return this.http.get<MemberRelationNode[]>(this.apiURL + '/usermanage/unrelatedmembers')
            .pipe(
                catchError(this.handleError)
            );
    }

    saveRelatedMemberRelationList(memberList: MemberRelationItemNode[]): Observable<MemberRelationItemNode[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<MemberRelationItemNode[]>(this.apiURL + '/usermanage/membertree', memberList, {headers: headers})
            .pipe(
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
