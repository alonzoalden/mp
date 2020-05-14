import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {Contact} from '../../../../../shared/class/contact';
import {select, Store} from '@ngrx/store';
import * as fromCompany from '../../state';
import * as companyActions from '../../state/company-b2b.actions';

@Component({
    selector: 'app-company-b2b-info-contact-shell',
    templateUrl: './company-contact-shell.component.html'
})
export class CompanyContactShellComponent implements OnInit {
    contactDataSource$: Observable<MatTableDataSource<Contact>>;
    isContactLoading$: Observable<boolean>;

    constructor(
        private store: Store<fromCompany.State>
    ) {
    }

    ngOnInit() {
        this.contactDataSource$ = this.store.pipe(select(fromCompany.getContactList));
        setTimeout(() => {
            this.isContactLoading$ = this.store.pipe(select(fromCompany.getContactLoading));
        });
    }

    getContact() {
        this.store.dispatch(new companyActions.LoadVendorContact());
    }
}
