import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as adminActions from '../../state/admin.actions';
import * as fromAdmin from '../../state';
import * as fromUser from '../../../shared/state/user-state.reducer';
import { Member  } from '../../../shared/class/member';
import { VendorList } from 'app/shared/class/vendor';


@Component({
    selector: 'o-admin',
    templateUrl: './admin-member-edit-shell.component.html',
})

export class AdminMemberEditShellComponent implements OnInit  {
    member$: Observable<Member>;
    userInfo$: Observable<Member>;
    vendorList$: Observable<VendorList[]>;
    pendingSave$: Observable<boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromAdmin.State>) {}
    
    ngOnInit() {
        this.member$ = this.store.pipe(select(fromAdmin.getMember));
        this.vendorList$ = this.store.pipe(select(fromAdmin.getVendorList))
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.pendingSave$ = this.store.pipe(select(fromAdmin.getPendingSave));
        this.errorMessage$ = this.store.pipe(select(fromAdmin.getError));
    }
    getMembers() {
        this.store.dispatch(new adminActions.LoadMembers());
    }
    getVendorList() {
        this.store.dispatch(new adminActions.LoadVendorList());
    }
    getMember(id: number) {
        this.store.dispatch(new adminActions.LoadMember(id));
    }
    setMemberID(vendorattachmentid: number) {
        this.store.dispatch(new adminActions.SetMemberID(vendorattachmentid));
    }
    editMember(member: Member) {
        this.store.dispatch(new adminActions.EditMember(member));
    }
}