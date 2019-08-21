import { Component, OnInit } from '@angular/core';
import { Member } from '../../../shared/class/member';
import { Observable } from 'rxjs';
import * as adminActions from '../../state/admin.actions';
import * as fromAdmin from '../../state';
import * as fromUser from '../../../shared/state/user-state.reducer';
import { MatTableDataSource } from '@angular/material';
import { Store, select } from '@ngrx/store';


@Component({
    selector: 'o-admin',
    templateUrl: './admin-member-list-shell.component.html',
})

export class AdminMemberListShellComponent implements OnInit  {
    membersMatTable$: Observable<MatTableDataSource<Member>>;
    userInfo$: Observable<Member>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromAdmin.State>) { }
    
    ngOnInit() {
        this.membersMatTable$ = this.store.pipe(select(fromAdmin.getMembersMatTable));
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.errorMessage$ = this.store.pipe(select(fromAdmin.getError));
    }

    getMembers() {
        this.store.dispatch(new adminActions.LoadMembers());
    }
    setMemberID(vendorattachmentid: number) {
        this.store.dispatch(new adminActions.SetMemberID(vendorattachmentid));
    }
    editMember(member: Member) {
        this.store.dispatch(new adminActions.EditMember(member));
    }
}