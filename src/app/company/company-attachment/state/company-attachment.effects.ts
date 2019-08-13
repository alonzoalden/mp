import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CompanyService } from '../../company.service';
import * as fromCompany from './index';
import * as companyActions from './company-attachment.actions';
import { MatTableDataSource } from '@angular/material';
import { VendorAttachment } from 'app/shared/class/vendor-attachment';

@Injectable()
export class CompanyAttachmentEffects {
    constructor(private store: Store<fromCompany.State>,
        private companyService: CompanyService,
        private actions$: Actions) { }

    @Effect()
    loadVendorAttachments$: Observable<Action> = this.actions$.pipe(
        ofType(companyActions.CompanyAttachmentActionTypes.LoadVendorAttachments),
        mergeMap(() =>
            this.companyService.getVendorAttachments().pipe(
                map(vendorattachments => {
                    const _vendorattachments = new MatTableDataSource<VendorAttachment>(vendorattachments);
                    return (new companyActions.LoadVendorAttachmentsSuccess(_vendorattachments))
                }),
                catchError(err => {
                    of(new companyActions.LoadVendorAttachmentsFail(err))
                    return EMPTY;
                })
            )
        ),
        take(1)
    );

}
