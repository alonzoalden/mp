import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CompanyService } from '../../company.service';
import * as fromCompany from './index';
import * as companyActions from './company-attachment.actions';

@Injectable()
export class CompanyAttachmentEffects {
    constructor(private store: Store<fromCompany.State>,
        private companyService: CompanyService,
        private actions$: Actions) { }

    @Effect()
    loadVendorAttachments$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyAttachmentActionTypes.LoadVendorAttachments),
        mergeMap((mat) =>
            this.companyService.getVendorAttachments().pipe(
                map(vendorattachments => (new companyActions.LoadVendorAttachmentsSuccess(vendorattachments))),
                catchError(err => {
                    of(new companyActions.LoadVendorAttachmentsFail(err))
                    return EMPTY;
                })
            )
        ),
        take(1)
    );

    @Effect()
    deleteVendorAttachments$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyAttachmentActionTypes.DeleteVendorAttachment),
        map((action: companyActions.DeleteVendorAttachment) => action.payload),
        mergeMap((vendorattachmentid: number) =>
            this.companyService.deleteVendorAttachment(vendorattachmentid).pipe(
                map(() => {
                    const message = `${vendorattachmentid} was deleted`
                    this.companyService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: message });
                    return (new companyActions.DeleteVendorAttachmentSuccess(vendorattachmentid))
                }),
                catchError(err => {
                    this.companyService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new companyActions.DeleteVendorAttachmentFail(err))
                })
            )
        )
    );
}
