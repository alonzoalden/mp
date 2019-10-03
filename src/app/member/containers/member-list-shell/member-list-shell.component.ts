import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Member } from '../../../shared/class/member';
import { Observable } from 'rxjs';
import * as fromMember from '../../state';
import * as fromUser from '../../../shared/state/user-state.reducer';
import * as memberActions from '../../state/member.actions';
import { Store, select } from '@ngrx/store';

@Component({
    templateUrl: './member-list-shell.component.html',
})

export class MemberListShellComponent implements OnInit {
    userInfo$: Observable<Member>;
    membersMatTable$: Observable<MatTableDataSource<Member>>;
    errorMessage$: Observable<string>;
    pendingDelete$: Observable<boolean>;
    isLoading$: Observable<boolean>;

    constructor(private store: Store<fromMember.State>) { }

    ngOnChange(changes: SimpleChanges) {

    }
    ngOnInit() {
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.membersMatTable$ = this.store.pipe(select(fromMember.getMembersMatTable));
        this.pendingDelete$ = this.store.pipe(select(fromMember.getPendingDelete));
        this.errorMessage$ = this.store.pipe(select(fromMember.getError));
        setTimeout(()=> {
            this.isLoading$ = this.store.pipe(select(fromMember.getIsLoading));
        });
    }
    getMembers() {
        this.store.dispatch(new memberActions.LoadMembers());
    }
    sendConfirmationMember(member: Member) {
        this.store.dispatch(new memberActions.SendConfirmationMember(member));
    }
    deleteMember(member: Member) {
        this.store.dispatch(new memberActions.DeleteMember(member));
    }
    editMember(member: Member) {
        this.store.dispatch(new memberActions.EditMember(member));
    }
}
