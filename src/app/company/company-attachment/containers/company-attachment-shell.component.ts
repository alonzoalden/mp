import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CompanyInfo } from 'app/shared/class/company-info';
import { VendorBrand } from 'app/shared/class/vendor-brand';
import { Store, select } from '@ngrx/store';
import * as fromCompany from '../state';
import * as fromUser from '../../../shared/state/user-state.reducer';
import * as companyActions from '../state/company-attachment.actions';
import { Observable } from 'rxjs';
import { AddressState, AddressCountry } from 'app/shared/class/address';
import { Member } from 'app/shared/class/member';
import { VendorAttachment } from 'app/shared/class/vendor-attachment';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'o-company-attachment',
    templateUrl: './company-attachment-shell.component.html',
})

export class CompanyAttachmentShellComponent implements OnInit {
    vendorAttachments$: Observable<MatTableDataSource<VendorAttachment>>;
    userInfo$: Observable<Member>;
    
    errorMessage$: Observable<string>;
    route: string[];

    //vendorBrands$: Observable<MatTableDataSource<VendorBrand>>;
    constructor(
        private router: Router,
        private store: Store<fromCompany.State>) {
    }

    ngOnInit() {
        //this.companyInfo$ = this.store.pipe(select(fromCompany.getCompanyInfo));
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.vendorAttachments$ = this.store.pipe(select(fromCompany.getVendorAttachments));
        this.errorMessage$ = this.store.pipe(select(fromCompany.getError));
        
        this.router.events.subscribe((event: NavigationEnd): void => {
            if (event instanceof NavigationEnd) {
                this.route = event.url.split('?')[0].split('/');
            }
        });
        if (!this.route) this.route = this.router.url.split('?')[0].split('/');
    }

    getVendorAttachmentList() {
        this.store.dispatch(new companyActions.LoadVendorAttachments());
    }
    setVendorAttachmentID(vendorattachmentid: number) {
        this.store.dispatch(new companyActions.SetVendorAttachmentID(vendorattachmentid));
    }


}