import { Component, OnInit } from '@angular/core';
import { Member, MemberInsert } from '../../../shared/class/member';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as adminActions from '../../state/admin.actions';
import * as fromAdmin from '../../state';
import * as fromUser from '../../../shared/state/user-state.reducer';

@Component({
    selector: 'o-admin',
    templateUrl: './admin-member-add-shell.component.html',
})

export class AdminMemberAddShellComponent implements OnInit  {
    userInfo$: Observable<Member>;
    pendingSave$: Observable<boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromAdmin.State>) {}
    
    ngOnInit() {
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.pendingSave$ = this.store.pipe(select(fromAdmin.getPendingSave));
        this.errorMessage$ = this.store.pipe(select(fromAdmin.getError));
    }

    addMember(member: MemberInsert) {
        this.store.dispatch(new adminActions.AddMember(member));
    }
}