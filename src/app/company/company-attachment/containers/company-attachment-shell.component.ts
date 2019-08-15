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
    userInfoDefaultPageSize$: Observable<Number>;
    errorMessage$: Observable<string>;
    route: string[];

    constructor(
        private router: Router,
        private store: Store<fromCompany.State>) {
    }

    ngOnInit() {
        this.vendorAttachmentsMatTable$ = this.store.pipe(select(fromCompany.getVendorAttachmentsMatTable));
        this.userInfoDefaultPageSize$ = this.store.pipe(select(fromUser.getCurrentUserDefaultPageSize));
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
    setVendorAttachmentID(vendorattachmentid: number) {
        this.store.dispatch(new companyActions.SetVendorAttachmentID(vendorattachmentid));
    }
    deleteVendorAttachment(vendorattachmentid: number) {
        this.store.dispatch(new companyActions.DeleteVendorAttachment(vendorattachmentid));
    }

}