import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CompanyService } from '../../company.service';
import * as fromCompany from './index';
import * as companyActions from './company-attachment.actions';
import { VendorAttachment } from 'app/shared/class/vendor-attachment';
import { Router } from '@angular/router';

@Injectable()
export class CompanyAttachmentEffects {
    [x: string]: any;
    constructor(
        private router: Router,
        private store: Store<fromCompany.State>,
        private companyService: CompanyService,
        private actions$: Actions) { }

    @Effect()
    loadVendorAttachments$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyAttachmentActionTypes.LoadVendorAttachments),
        mergeMap((mat) =>
            this.companyService.getVendorAttachments().pipe(
                map(vendorattachments => (new companyActions.LoadVendorAttachmentsSuccess(vendorattachments))),
                catchError(err => {
                    return of(new companyActions.LoadVendorAttachmentsFail(err));
                })
            )
        )
    );

    @Effect()
    deleteVendorAttachments$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyAttachmentActionTypes.DeleteVendorAttachment),
        map((action: companyActions.DeleteVendorAttachment) => action.payload),
        mergeMap((vendorattachmentid: number) =>
            this.companyService.deleteVendorAttachment(vendorattachmentid).pipe(
                map(() => {
                    const message = `${vendorattachmentid} was deleted`;
                    this.companyService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: message });
                    return (new companyActions.DeleteVendorAttachmentSuccess(vendorattachmentid));
                }),
                catchError(err => {
                    this.companyService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new companyActions.DeleteVendorAttachmentFail(err));
                })
            )
        )
    );
    @Effect()
    uploadVendorAttachments$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyAttachmentActionTypes.UploadVendorAttachment),
        map((action: companyActions.UploadVendorAttachment) => action.payload),
        mergeMap((payload) =>
            this.companyService.uploadAttachment(payload.form).pipe(
                map((vendorattachment: VendorAttachment) => {
                    vendorattachment[0].Title = payload.title;
                    this.store.dispatch(new companyActions.EditVendorAttachment(vendorattachment[0]));
                    return (new companyActions.UploadVendorAttachmentSuccess(vendorattachment));
                }),
                catchError(err => {
                    this.companyService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new companyActions.UploadVendorAttachmentFail(err));
                })
            )
        )
    );
    @Effect()
    uploadUpdateVendorAttachments$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyAttachmentActionTypes.UploadUpdateVendorAttachment),
        map((action: companyActions.UploadUpdateVendorAttachment) => action.payload),
        mergeMap((payload) =>
            this.companyService.uploadUpdateAttachment(payload.id, payload.form).pipe(
                map((vendorattachment: VendorAttachment) => {
                    vendorattachment.Title = payload.title;
                    vendorattachment.Exclude = payload.exclude;
                    this.store.dispatch(new companyActions.EditVendorAttachment(vendorattachment));
                    return (new companyActions.UploadVendorAttachmentSuccess(vendorattachment));
                }),
                catchError(err => {
                    this.companyService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new companyActions.UploadVendorAttachmentFail(err));
                })
            )
        )
    );
    @Effect()
    editVendorAttachments$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyAttachmentActionTypes.EditVendorAttachment),
        map((action: companyActions.EditVendorAttachment) => action.payload),
        mergeMap((payload: VendorAttachment) =>
            this.companyService.editVendorAttachment(payload).pipe(
                map((vendorattachment: VendorAttachment) => {
                    this.companyService.sendNotification({ type: 'success', title: 'Successfully Updated', content: 'Attachment Saved' });
                    this.router.navigate(['/company/attachment']);
                    return (new companyActions.EditVendorAttachmentSuccess(vendorattachment));
                }),
                catchError(err => {
                    this.companyService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new companyActions.EditVendorAttachmentFail(err));
                })
            )
        )
    );
    @Effect()
    getVendorAttachment$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyAttachmentActionTypes.GetVendorAttachment),
        map((action: companyActions.GetVendorAttachment) => action.payload),
        mergeMap((id: number) =>
            this.companyService.getVendorAttachment(id).pipe(
                map((vendorattachment: VendorAttachment) => {
                    // this.router.navigate(['/company/attachment']);
                    return (new companyActions.GetVendorAttachmentSuccess(vendorattachment));
                }),
                catchError(err => {
                    this.companyService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new companyActions.GetVendorAttachmentFail(err));
                })
            )
        )
    );
}
