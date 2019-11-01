import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MemberService } from '../member.service';
import * as fromMember from './index';
import * as memberActions from './member.actions';
import { Router } from '@angular/router';
import { Member } from '../../../shared/class/member';

@Injectable()
export class MemberEffects {
    constructor(
        private router: Router,
        private store: Store<fromMember.State>,
        private memberService: MemberService,
        private actions$: Actions) { }

    @Effect()
    loadMemberInviteByGUID$: Observable<Action> = this.actions$.pipe(
        ofType(memberActions.MemberActionTypes.LoadMemberByInviteGUID),
        map((action: memberActions.LoadMemberByInviteGUID) => action.payload),
        mergeMap((guid: string) =>
            this.memberService.getMemberByInviteGUID(guid).pipe(
                map(member => {
                    member.Password = '';
                    member.ConfirmPassword = '';
                    if (member.IsConfirmed) {
                        this.router.navigate(['/home']);
                    }
                    return (new memberActions.LoadMemberByInviteGUIDSuccess(member));
                }),
                catchError(err => {
                    this.memberService.sendNotification({ type: 'error', title: 'Error', content: err });
                    this.router.navigate(['/home']);
                    of(new memberActions.LoadMemberByInviteGUIDFail(err));
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    editMemberRegistration$: Observable<Action> = this.actions$.pipe(
        ofType(memberActions.MemberActionTypes.EditMemberRegistration),
        map((action: memberActions.EditMemberRegistration) => action.payload),
        mergeMap((member: Member) =>
            this.memberService.editMemberRegistration(member).pipe(
                map(member => {
                    this.memberService.sendNotification({ type: 'success', title: 'Successfully Updated', content: `${member.Email} was saved` });
                    this.router.navigate(['/dashboard']);
                    return (new memberActions.EditMemberRegistrationSuccess(member));
                }),
                catchError(err => {
                    this.memberService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new memberActions.LoadMemberByInviteGUIDFail(err));
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    getMembers$: Observable<Action> = this.actions$.pipe(
        ofType(memberActions.MemberActionTypes.LoadMembers),
        mergeMap(() =>
            this.memberService.getMembers().pipe(
                map(member => (new memberActions.LoadMembersSuccess(member))),
                catchError(err => {
                    this.memberService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new memberActions.LoadMembersFail(err));
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    deleteMember$: Observable<Action> = this.actions$.pipe(
        ofType(memberActions.MemberActionTypes.DeleteMember),
        map((action: memberActions.DeleteMember) => action.payload),
        mergeMap((member) =>
            this.memberService.deleteMember(member).pipe(
                map(() => {
                    this.memberService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: `${member.Email} has been deleted.` });
                    return (new memberActions.DeleteMemberSuccess(member));
                }),
                catchError(err => {
                    this.memberService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new memberActions.DeleteMemberFail(err));
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    editMember$: Observable<Action> = this.actions$.pipe(
        ofType(memberActions.MemberActionTypes.EditMember),
        map((action: memberActions.EditMember) => action.payload),
        mergeMap((member) =>
            this.memberService.editMember(member).pipe(
                map(member => {
                    this.memberService.sendNotification({ type: 'success', title: 'Successfully Updated', content: `${member.Email} was saved` });
                    window.location.reload();
                    return (new memberActions.EditMemberSuccess(member));
                }),
                catchError(err => {
                    this.memberService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new memberActions.EditMemberFail(err));
                    return EMPTY;
                })
            )
        )
    );
}
