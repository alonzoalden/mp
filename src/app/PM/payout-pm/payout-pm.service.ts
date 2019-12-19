import {Injectable} from '@angular/core';
import {Observable, of, Subject, throwError} from 'rxjs';
import {ItemList} from '../../shared/class/item';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {NotificationComponent} from '../../shared/tool/notification/notification.component';
import {Vendor} from '../../shared/class/vendor';
import {Payout, PayoutLog} from '../../shared/class/payout';

@Injectable()
export class PayoutPmService {
    private apiURL = environment.webapiURL;
    public subject = new Subject<string>();
    private memberVendors: Vendor[];
    private myMemberVendors: Vendor[];
    private simpleItemList: ItemList[];

    constructor(
        private http: HttpClient,
        private notificationComponent: NotificationComponent
    ) {

    }


    sendNotification(notification: any) {
        this.notificationComponent.notify(notification);
    }

    getPayoutList(vendor: Vendor): Observable<PayoutLog[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.get<PayoutLog[]>(this.apiURL + '/payout/overview/' + vendor.VendorID, {headers: headers})
            .pipe(
                // tap(data => console.dir(data)),
                catchError(this.handleError)
            );
    }

    getPayoutDetail(payoutlogID: string): Observable<Payout[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.get<Payout[]>(this.apiURL + '/payout/payout/' + payoutlogID, {headers: headers})
            .pipe(
                // tap(data => console.dir(data)),
                catchError(this.handleError)
            );
    }

    getMySubMemberVendors(): Observable<Vendor[]> {
        if (this.myMemberVendors) {
            return of(this.myMemberVendors);
        }
        return this.http.get<Vendor[]>(this.apiURL + '/membervendor/mysubvendors')
            .pipe(
                tap(data => this.myMemberVendors = data),
                catchError(this.handleError)
            );
    }

    getAllSubMemberVendors(): Observable<Vendor[]> {
        if (this.memberVendors) {
            return of(this.memberVendors);
        }
        return this.http.get<Vendor[]>(this.apiURL + '/membervendor/allsubvendors')
            .pipe(
                tap(data => this.memberVendors = data),
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
