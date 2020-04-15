import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {VendorRegistrationB2B} from '../../../../shared/class/vendor-registration';
import {select, Store} from '@ngrx/store';
import {UsermanagementState} from '../../state/usermanagement.reducer';
import * as UserManageSelector from '../../state';
import * as UserManageActions from '../../state/usermanagement.actions';
import {Member} from '../../../../shared/class/member';

@Component({
    selector: 'app-usermanagement-check-vendor-detail-shell',
    templateUrl: './usermanagement-check-vendor-detail-shell.component.html',
    styleUrls: ['./usermanagement-check-vendor-detail-shell.component.css']
})
export class UsermanagementCheckVendorDetailShellComponent implements OnInit {
    vendorRegistration$: Observable<VendorRegistrationB2B>;
    memberList$: Observable<Member[]>;

    constructor(
        private store: Store<UsermanagementState>
    ) {
    }

    ngOnInit() {
        this.vendorRegistration$ = this.store.pipe(select(UserManageSelector.getCurrentVendorRegistration));
        this.memberList$ = this.store.pipe(select(UserManageSelector.getPMList));
    }

    getMemberPMList() {
        this.store.dispatch(new UserManageActions.LoadMemberPMList());
    }

    createVendor(vendorRegistrationB2B: VendorRegistrationB2B) {
        this.store.dispatch(new UserManageActions.CreateVendorB2b(vendorRegistrationB2B));
    }
}
