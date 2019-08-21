import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromCompany from '../../state';
import * as companyActions from '../../state/company-attachment.actions';
import { Observable } from 'rxjs';

@Component({
    selector: 'o-company-attachment',
    templateUrl: './company-attachment-add-shell.component.html',
})

export class CompanyAttachmentAddShellComponent implements OnInit {
    pendingUpload$: Observable<boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromCompany.State>) {}

    ngOnInit() {
        this.pendingUpload$ = this.store.pipe(select(fromCompany.getPendingUpload));
        this.errorMessage$ = this.store.pipe(select(fromCompany.getError));
    }
    uploadVendorAttachment(payload: { form: FormData, title: string }) {
        this.store.dispatch(new companyActions.UploadVendorAttachment(payload));
    }
}