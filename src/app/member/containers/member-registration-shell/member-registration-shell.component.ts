import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Member } from '../../../shared/class/member';
import { MemberService } from '../../member.service';
import 'rxjs/add/operator/filter';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as fromMember from '../../state';
import * as fromUser from '../../../shared/state/user-state.reducer';
import * as memberActions from '../../state/member.actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './member-registration-shell.component.html'
})

export class MemberRegistrationShellComponent implements OnInit {
    //memberForm: any;

    //errorMessage: string;
    //member: Member;
    //member: Member = new Member(null, '', '', '', '', true, '', '', true, true, true, true, '', 1, true, '', '', '', '', );
    

    userInfo$: Observable<Member>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromMember.State>) {}

    ngOnInit(): void {
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.errorMessage$ = this.store.pipe(select(fromMember.getError));
    }
    getMemberByInviteGUID(guid: string): void {
        this.store.dispatch(new memberActions.LoadMemberByInviteGUID(guid));
    }
    editMemberRegistration(member: Member): void {
        this.store.dispatch(new memberActions.EditMemberRegistration(member));
    }
}
