import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromCompany from '../../state';
import * as fromUser from '../../../../../shared/state/user-state.reducer';
import * as companyActions from '../../state/company-attachment.actions';
import { Observable } from 'rxjs';
import { VendorAttachment } from '../../../../../shared/class/vendor-attachment';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'o-company-attachment',
    templateUrl: './company-attachment-list-shell.component.html',
})

export class CompanyAttachmentListShellComponent implements OnInit {
    vendorAttachmentsMatTable$: Observable<MatTableDataSource<VendorAttachment>>;
    vendorAttachment$: Observable<VendorAttachment>;
    userInfoDefaultPageSize$: Observable<Number>;
    pendingDelete$: Observable<boolean>;
    isVendorAttachmentsLoading$: Observable<boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromCompany.State>) {}

    ngOnInit() {
        this.vendorAttachmentsMatTable$ = this.store.pipe(select(fromCompany.getVendorAttachmentsMatTable));
        this.vendorAttachment$ = this.store.pipe(select(fromCompany.getCurrentVendorAttachment));
        this.userInfoDefaultPageSize$ = this.store.pipe(select(fromUser.getCurrentUserDefaultPageSize));
        this.pendingDelete$ = this.store.pipe(select(fromCompany.getPendingDelete));
        this.errorMessage$ = this.store.pipe(select(fromCompany.getError));
        setTimeout(() => {
            this.isVendorAttachmentsLoading$ = this.store.pipe(select(fromCompany.getIsVendorAttachmentsLoading));
        });
    }

    getVendorAttachments() {
        this.store.dispatch(new companyActions.LoadVendorAttachments());
    }
    setVendorAttachmentID(vendorattachmentid: number) {
        this.store.dispatch(new companyActions.SetVendorAttachmentID(vendorattachmentid));
    }
    deleteVendorAttachment(vendorattachmentid: number) {
        this.store.dispatch(new companyActions.DeleteVendorAttachment(vendorattachmentid));
    }
}
