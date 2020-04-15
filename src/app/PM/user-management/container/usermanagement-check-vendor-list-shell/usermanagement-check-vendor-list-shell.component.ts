import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {Member} from '../../../../shared/class/member';
import {VendorRegistrationB2B} from '../../../../shared/class/vendor-registration';
import {select, Store} from '@ngrx/store';
import * as UserManageSelector from '../../state';
import * as UserManageActions from '../../state/usermanagement.actions';
import {UsermanagementState} from '../../state/usermanagement.reducer';

@Component({
    selector: 'app-usermanagement-check-vendor-list-shell',
    templateUrl: './usermanagement-check-vendor-list-shell.component.html',
    styleUrls: ['./usermanagement-check-vendor-list-shell.component.css']
})
export class UsermanagementCheckVendorListShellComponent implements OnInit {
    isCheckVendorListLoading$: Observable<boolean>;
    vendorCheckListMatTable$: Observable<MatTableDataSource<VendorRegistrationB2B>>;

    constructor(
        private store: Store<UsermanagementState>
    ) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.isCheckVendorListLoading$ = this.store.pipe(select(UserManageSelector.getCheckVendorListLoading));
        });
        this.vendorCheckListMatTable$ = this.store.pipe(select(UserManageSelector.getCheckVendorList));
    }

    getVendorCheckList() {
        this.store.dispatch(new UserManageActions.LoadCheckVendorList());
    }

    // editVendor(vendorRegistration: VendorRegistrationB2B) {
    //     this.store.dispatch(new UserManageActions.CreateVendorB2b(vendorRegistration));
    // }

    editVendor(vendorRegistration: VendorRegistrationB2B) {
        this.store.dispatch(new UserManageActions.EditCurrentVendorRegistration(vendorRegistration));
    }
}
