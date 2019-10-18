import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Member, MemberVendor } from '../shared/class/member';
import { environment } from '../../environments/environment';
import { NotificationComponent } from '../shared/tool/notification/notification.component';

@Injectable()
export class SettingService {
    private apiURL = environment.webapiURL;
    private memberVendors: MemberVendor[];
    public subject = new Subject<string>();

    constructor(private http: HttpClient,
                private notificationComponent: NotificationComponent) { }

    sendNotification(notification: any) {
        this.notificationComponent.notify(notification);
    }

    getMemberVendors(): Observable<MemberVendor[]> {
        if (this.memberVendors) {
            return of(this.memberVendors);
        }
        return this.http.get<MemberVendor[]>(this.apiURL + '/membervendor' )
                        .pipe(
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
