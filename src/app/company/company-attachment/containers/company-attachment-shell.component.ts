import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromCompany from '../state';
import * as fromUser from '../../../shared/state/user-state.reducer';
import * as companyActions from '../state/company-attachment.actions';
import { Observable } from 'rxjs';

import { VendorAttachment } from 'app/shared/class/vendor-attachment';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
    selector: 'o-company-attachment',
    templateUrl: './company-attachment-shell.component.html',
})

export class CompanyAttachmentShellComponent implements OnInit {
    vendorAttachmentsMatTable$: Observable<MatTableDataSource<VendorAttachment>>;
    vendorAttachment$: Observable<VendorAttachment>;
    userInfoDefaultPageSize$: Observable<Number>;
    pendingDelete$: Observable<boolean>;
    pendingUpload$: Observable<boolean>;
    errorMessage$: Observable<string>;
    route: string[];

    constructor(
        private router: Router,
        private store: Store<fromCompany.State>) {
    }

    ngOnInit() {
        this.vendorAttachmentsMatTable$ = this.store.pipe(select(fromCompany.getVendorAttachmentsMatTable));
        this.vendorAttachment$ = this.store.pipe(select(fromCompany.getCurrentVendorAttachment));
        
        this.userInfoDefaultPageSize$ = this.store.pipe(select(fromUser.getCurrentUserDefaultPageSize));
        this.pendingUpload$ = this.store.pipe(select(fromCompany.getPendingUpload));
        this.pendingDelete$ = this.store.pipe(select(fromCompany.getPendingDelete));
        this.errorMessage$ = this.store.pipe(select(fromCompany.getError));

        this.router.events.subscribe((event: NavigationEnd): void => {
            if (event instanceof NavigationEnd) {
                this.route = event.url.split('?')[0].split('/');
            }
        });
        if (!this.route) this.route = this.router.url.split('?')[0].split('/');
    }

    getVendorAttachments() {
        this.store.dispatch(new companyActions.LoadVendorAttachments());
    }
    getCurrentVendorAttachment(id: number) {
        this.store.dispatch(new companyActions.GetVendorAttachment(id));
    }
    setVendorAttachmentID(vendorattachmentid: number) {
        this.store.dispatch(new companyActions.SetVendorAttachmentID(vendorattachmentid));
    }
    editVendorAttachment(vendorattachment: VendorAttachment) {
        this.store.dispatch(new companyActions.EditVendorAttachment(vendorattachment));
    }
    deleteVendorAttachment(vendorattachmentid: number) {
        this.store.dispatch(new companyActions.DeleteVendorAttachment(vendorattachmentid));
    }
    uploadVendorAttachment(payload: { form: FormData, title: string }) {
        this.store.dispatch(new companyActions.UploadVendorAttachment(payload));
    }
    uploadUpdateVendorAttachment(payload: { id: number, form: FormData, title: string, exclude: boolean }) {
        this.store.dispatch(new companyActions.UploadUpdateVendorAttachment(payload));
    }
}