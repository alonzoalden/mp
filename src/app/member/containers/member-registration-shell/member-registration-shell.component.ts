import { Component, OnInit } from '@angular/core';
import { Member } from '../../../shared/class/member';
import 'rxjs/add/operator/filter';
import * as fromMember from '../../state';
import * as memberActions from '../../state/member.actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './member-registration-shell.component.html'
})

export class MemberRegistrationShellComponent implements OnInit {
    member$: Observable<Member>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromMember.State>) {}

    ngOnInit(): void {
        this.member$ = this.store.pipe(select(fromMember.getMember));
        this.errorMessage$ = this.store.pipe(select(fromMember.getError));
    }
    getMemberByInviteGUID(guid: string): void {
        this.store.dispatch(new memberActions.LoadMemberByInviteGUID(guid));
    }
    editMemberRegistration(member: Member): void {
        this.store.dispatch(new memberActions.EditMemberRegistration(member));
    }
}
