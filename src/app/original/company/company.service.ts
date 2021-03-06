import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, of, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../../../environments/environment';
import {AppService} from '../../app.service';
import {VendorAttachment} from '../../shared/class/vendor-attachment';
import {VendorBrand} from '../../shared/class/vendor-brand';
import {Member} from '../../shared/class/member';
import {CompanyInfo} from '../../shared/class/company-info';
import {AddressCountry, AddressState} from '../../shared/class/address';
import {NotificationComponent} from '../../shared/tool/notification/notification.component';
import {
    VendorCertificate,
    VendorDevelopment,
    VendorFactoryTour,
    VendorImage,
    VendorOM,
    VendorQC,
    VendorService, VendorTradeShow
} from '../../shared/class/vendor-b2b';
import {Contact} from '../../shared/class/contact';

@Injectable()
export class CompanyService {
    private apiURL = environment.webapiURL;

    currentMember: Member;

    public subject = new Subject<string>();

    public uploadSubject = new Subject<VendorImage>();

    constructor(private http: HttpClient,
                private oauthService: OAuthService,
                private appService: AppService,
                private notificationComponent: NotificationComponent) {
    }

    sendNotification(notification: any) {
        this.notificationComponent.notify(notification);
    }

    getVendorID() {
        if (!this.appService.currentMember) {
            this.appService.getCurrentMember().subscribe(
                (data) => {
                    this.appService.currentMember = data;
                    this.currentMember = data;
                    return this.currentMember.VendorID;
                }
            );
        } else {
            return this.appService.currentMember.VendorID;
        }
    }

    getAddressCountry(): Observable<AddressCountry[]> {
        return this.http.get<AddressCountry[]>(this.apiURL + '/address/country')
            .pipe(
                //tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getAddressState(countryid: string): Observable<AddressState[]> {
        return this.http.get<AddressState[]>(this.apiURL + '/address/country/' + countryid + '/state')
            .pipe(
                //tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getCompanyInfo(): Observable<CompanyInfo> {
        return this.http.get<CompanyInfo>(this.apiURL + '/company')
            .pipe(
                //tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    editCompanyInfoShippingAddress(companyInfo: CompanyInfo): Observable<CompanyInfo> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<CompanyInfo>(this.apiURL + '/company/shippingaddress', companyInfo, {headers: headers})
            .pipe(
                // tap(data => console.log(data)),
                catchError(this.handleError)
            );
    }

    editCompanyInfoBillingAddress(companyInfo: CompanyInfo): Observable<CompanyInfo> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<CompanyInfo>(this.apiURL + '/company/billingaddress', companyInfo, {headers: headers})
            .pipe(
                tap(data => console.log(companyInfo)),
                catchError(this.handleError)
            );
    }

    uploadAttachment(formData: FormData) {
        return this.http.post<VendorAttachment>(this.apiURL + '/vendorattachment/upload', formData)
            .pipe(
                //tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    uploadUpdateAttachment(id: number, formData: FormData) {
        return this.http.post<VendorAttachment>(this.apiURL + '/vendorattachment/' + id + '/upload', formData)
            .pipe(
                //tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getVendorAttachment(id: number): Observable<VendorAttachment> {
        return this.http.get<VendorAttachment>(this.apiURL + '/vendorattachment/' + id)
            .pipe(
                //tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getVendorAttachments(): Observable<VendorAttachment[]> {
        return this.http.get<VendorAttachment[]>(this.apiURL + '/vendorattachment')
            .pipe(
                //tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    editVendorAttachment(vendorattachment: VendorAttachment): Observable<VendorAttachment> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        //console.log(vendorattachment);
        //console.log(this.apiURL + '/vendorattachment/' + vendorattachment.VendorAttachmentID);

        return this.http.put<VendorAttachment>(this.apiURL + '/vendorattachment/' + vendorattachment.VendorAttachmentID, vendorattachment, {headers: headers})
            .pipe(
                catchError(this.handleError)
            );
    }

    editVendorAttachments(vendorattachments: VendorAttachment[]): Observable<VendorAttachment[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<VendorAttachment[]>(this.apiURL + '/vendorattachment', vendorattachments, {headers: headers})
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteVendorAttachment(id: number): Observable<VendorAttachment> {
        return this.http.delete<VendorAttachment>(this.apiURL + '/vendorattachment/' + id)
            .pipe(
                //tap(data => console.log('Delete Item: ' + id)),
                // tap(data => {
                //     const foundIndex = this.items.findIndex(i => i.ItemID === id);
                //     if (foundIndex > -1) {
                //         this.items.splice(foundIndex, 1);
                //         this.currentItem = null;
                //     }
                // }),
                catchError(this.handleError)
            );
    }

    getVendorBrands(): Observable<VendorBrand[]> {
        return this.http.get<VendorBrand[]>(this.apiURL + '/vendorbrand')
            .pipe(
                //tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    addVendorBrand(vendorBrand: VendorBrand): Observable<VendorBrand> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<VendorBrand>(this.apiURL + '/vendorbrand', vendorBrand, {headers: headers})
            .pipe(
                tap(data => console.log('Add Item Attachment: ' + JSON.stringify(data))),
                tap(data => {
                }),
                catchError(this.handleError)
            );
    }

    deleteVendorBrand(id: number): Observable<VendorBrand> {
        return this.http.delete<VendorBrand>(this.apiURL + '/vendorbrand/' + id)
            .pipe(
                tap(data => console.log('Delete Item: ' + id)),
                catchError(this.handleError)
            );
    }

    getVendorFactoryTour(): Observable<VendorFactoryTour> {
        return this.http.get<VendorFactoryTour>(this.apiURL + '/company/factorytour')
            .pipe(
                //tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    updateVendorFactoryTour(vendorInfo: VendorFactoryTour): Observable<VendorFactoryTour> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<VendorFactoryTour>(this.apiURL + '/company/factorytour/save', vendorInfo, {headers: headers})
            .pipe(
                //tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    uploadVendorImage(formData: FormData) {
        return this.http.post<string>(this.apiURL + '/company/uploadtemp/' + this.newGuid(), formData)
            .pipe(
                //tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getVendorDevelopment(): Observable<VendorDevelopment> {
        return this.http.get<VendorDevelopment>(this.apiURL + '/company/development')
            .pipe(
                catchError(this.handleError)
            );
    }

    updateVendorDevelopment(vendorInfo: VendorDevelopment): Observable<VendorDevelopment> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<VendorDevelopment>(this.apiURL + '/company/development/save', vendorInfo, {headers: headers})
            .pipe(
                catchError(this.handleError)
            );
    }

    getVendorOM(): Observable<VendorOM> {
        return this.http.get<VendorOM>(this.apiURL + '/company/om')
            .pipe(
                catchError(this.handleError)
            );
    }

    updateVendorOM(vendorInfo: VendorOM): Observable<VendorOM> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<VendorOM>(this.apiURL + '/company/om/save', vendorInfo, {headers: headers})
            .pipe(
                catchError(this.handleError)
            );
    }

    getVendorQC(): Observable<VendorQC> {
        return this.http.get<VendorQC>(this.apiURL + '/company/qc')
            .pipe(
                catchError(this.handleError)
            );
    }

    updateVendorQC(vendorInfo: VendorQC): Observable<VendorQC> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<VendorQC>(this.apiURL + '/company/qc/save', vendorInfo, {headers: headers})
            .pipe(
                catchError(this.handleError)
            );
    }

    getVendorService(): Observable<VendorService> {
        return this.http.get<VendorService>(this.apiURL + '/company/service')
            .pipe(
                catchError(this.handleError)
            );
    }

    updateVendorService(vendorInfo: VendorService): Observable<VendorService> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<VendorService>(this.apiURL + '/company/service/save', vendorInfo, {headers: headers})
            .pipe(
                catchError(this.handleError)
            );
    }

    getVendorCertificate(): Observable<VendorImage[]> {
        return this.http.get<VendorImage[]>(this.apiURL + '/company/certificates')
            .pipe(
                catchError(this.handleError)
            );
    }

    updateVendorCertificate(vendorInfo: VendorCertificate): Observable<VendorCertificate> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<VendorCertificate>(this.apiURL + '/company/certificates/save', vendorInfo, {headers: headers})
            .pipe(
                catchError(this.handleError)
            );
    }

    getVendorTradeShow(): Observable<VendorTradeShow[]> {
        return this.http.get<VendorTradeShow[]>(this.apiURL + '/company/tradeshow/list')
            .pipe(
                catchError(this.handleError)
            );
    }

    updateVendorTradeShow(vendorInfo: VendorTradeShow): Observable<VendorTradeShow> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<VendorTradeShow>(this.apiURL + '/company/tradeshow/save', vendorInfo, {headers: headers})
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteVendorTradeShow(vendorInfo: VendorTradeShow) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.delete(this.apiURL + '/company/tradeshow/' + vendorInfo.VendorTradeShowID, {headers: headers})
            .pipe(
                catchError(this.handleError)
            );
    }

    getVendorContact(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.apiURL + '/company/contact/list')
            .pipe(
                catchError(this.handleError)
            );
    }

    newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    sendUploadMessage(vendorImage: VendorImage) {
        this.uploadSubject.next(vendorImage);
    }

    getUploadMessage() {
        return this.uploadSubject.asObservable();
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

    rowColorConditions(i: number, collection: Array<any>, currentIndex: number, formDirty: boolean): string {
        const inputRow = i === collection.length - 1 && currentIndex === i;
        const selectedInputRow = inputRow && formDirty;
        if (selectedInputRow) {
            return '#F5F5F5';
        } else if (inputRow) {
            return '#E8E8E8';
        } else if (currentIndex === i) {
            return '#F5F5F5';
        } else {
            return '#FFFFFF';
        }
    }
}
