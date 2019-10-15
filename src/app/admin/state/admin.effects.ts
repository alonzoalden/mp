import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AdminService } from '../admin.service';
import * as fromUser from '../../shared/state/user-state.reducer';
import * as userActions from '../../shared/state/user-state.actions';
import * as adminActions from './admin.actions';
import { Router } from '@angular/router';
import { Member } from 'app/shared/class/member';
import { VendorList } from 'app/shared/class/vendor';
import { AppService } from 'app/app.service';

@Injectable()
export class AdminEffects {
    constructor(
        private router: Router,
        private userStore: Store<fromUser.State>,
        private appService: AppService,
        private adminService: AdminService,
        private actions$: Actions) { }

    @Effect()
    loadMembers$: Observable<Action> = this.actions$.pipe(
        ofType(adminActions.AdminActionTypes.LoadMembers),
        mergeMap(() =>
            this.adminService.getMembers().pipe(
                map((members: Member[]) => (new adminActions.LoadMembersSuccess(members))),
                catchError(err => {
                    of(new adminActions.LoadMembersFail(err));
                    return EMPTY;
                })
            )
        ),
        take(1)
    );
    @Effect()
    loadVendorList$: Observable<Action> = this.actions$.pipe(
        ofType(adminActions.AdminActionTypes.LoadVendorList),
        mergeMap(() =>
            this.adminService.getVendorList().pipe(
                map((vendorlist: VendorList[]) => (new adminActions.LoadVendorListSuccess(vendorlist))),
                catchError(err => {
                    of(new adminActions.LoadVendorListFail(err));
                    return EMPTY;
                })
            )
        ),
        take(1)
    );
    @Effect()
    loadMember$: Observable<Action> = this.actions$.pipe(
        ofType(adminActions.AdminActionTypes.LoadMember),
        map((action: adminActions.LoadMember) => action.payload),
        mergeMap((id: number) =>
            this.adminService.getMember(id).pipe(
                map((member: Member) => (new adminActions.LoadMemberSuccess(member))),
                catchError(err => {
                    this.adminService.sendNotification({ type: 'error', title: 'Error', content: err });
                    return of(new adminActions.LoadMemberFail(err));
                })
            )
        )
    );
    @Effect()
    editMember$: Observable<Action> = this.actions$.pipe(
        ofType(adminActions.AdminActionTypes.EditMember),
        map((action: adminActions.EditMember) => action.payload),
        mergeMap((payload: Member) =>
            this.adminService.editMember(payload).pipe(
                map((member: Member) => {
                    if (this.appService.currentMember.MemberID === member.MemberID) {
                        this.userStore.dispatch(new userActions.SetCurrentUser(member));
                    }
                    this.adminService.replaceMember(member.MemberID, member);
                    this.adminService.sendNotification({ type: 'success', title: 'Successfully Updated', content: `${member.Email} was saved` });
                    window.location.reload();
                    //this.router.navigate(['/admin']);
                    return (new adminActions.EditMemberSuccess(member));
                }),
                catchError(err => {
                    this.adminService.sendNotification({ type: 'error', title: 'Error', content: err });
                    this.router.navigate(['/admin']);
                    return of(new adminActions.EditMemberFail(err));
                })
            )
        )
    );
    @Effect()
    addMember$: Observable<Action | unknown> = this.actions$.pipe(
        ofType(adminActions.AdminActionTypes.AddMember),
        map((action: adminActions.AddMember) => action.payload),
        mergeMap((payload) =>
            this.adminService.addMember(payload).pipe(
                map((member: Member) => {
                    const message = `${member.Email} was saved`;
                    this.adminService.sendNotification({ type: 'success', title: 'Successfully Created', content: message });
                    this.router.navigate(['/admin']);
                    return (new adminActions.AddMemberSuccess(member));
                }),
                catchError(err => {
                    this.adminService.sendNotification({ type: 'error', title: 'Error', content: err });
                    this.router.navigate(['/admin']);
                    return of(new adminActions.AddMemberFail(err));
                })
            )
        )
    );
}
