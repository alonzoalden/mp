import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromCompany from '../../state';
import * as companyActions from '../../state/company-attachment.actions';
import { Observable } from 'rxjs';
import { VendorAttachment } from 'app/shared/class/vendor-attachment';

@Component({
    selector: 'o-company-attachment',
    templateUrl: './company-attachment-edit-shell.component.html',
})

export class CompanyAttachmentEditShellComponent implements OnInit {
    vendorAttachment$: Observable<VendorAttachment>;
    pendingUpload$: Observable<boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromCompany.State>) {}

    ngOnInit() {
        this.vendorAttachment$ = this.store.pipe(select(fromCompany.getCurrentVendorAttachment));
        this.pendingUpload$ = this.store.pipe(select(fromCompany.getPendingUpload));
        this.errorMessage$ = this.store.pipe(select(fromCompany.getError));
    }
    editVendorAttachment(vendorattachment: VendorAttachment) {
        this.store.dispatch(new companyActions.EditVendorAttachment(vendorattachment));
    }
    getCurrentVendorAttachment(id: number) {
        this.store.dispatch(new companyActions.GetVendorAttachment(id));
    }
    uploadUpdateVendorAttachment(payload: { id: number, form: FormData, title: string, exclude: boolean }) {
        this.store.dispatch(new companyActions.UploadUpdateVendorAttachment(payload));
    }
}
