import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {UsermanagementState} from '../../state/usermanagement.reducer';
import {Observable} from 'rxjs';
import * as UserManageSelector from '../../state/index';
import {MatTableDataSource} from '@angular/material';
import {Member} from '../../../../shared/class/member';
import * as UserManageActions from '../../state/usermanagement.actions';

@Component({
    selector: 'app-usermanagement-shell',
    templateUrl: './usermanagement-shell.component.html',
    styleUrls: ['./usermanagement-shell.component.css']
})
export class UsermanagementShellComponent implements OnInit {
    isMemberListLoading$: Observable<boolean>;
    memberListMatTable$: Observable<MatTableDataSource<Member>>;

    constructor(
        private store: Store<UsermanagementState>
    ) {
    }

    ngOnInit() {
        this.isMemberListLoading$ = this.store.pipe(select(UserManageSelector.getMemberListLoading));
        this.memberListMatTable$ = this.store.pipe(select(UserManageSelector.getMemeberList));
    }

    getMemberList() {
        this.store.dispatch(new UserManageActions.LoadMemberList());
    }
}
