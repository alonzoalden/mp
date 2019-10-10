import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SettingService } from '../setting.service';
import * as settingActions from './setting.actions';
import { Router } from '@angular/router';
import { Member, MemberVendor } from 'app/shared/class/member';
import * as fromUser from '../../shared/state/user-state.reducer';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../shared/state/user-state.actions';

@Injectable()
export class SettingEffects {
    constructor(
        private router: Router,
        private settingService: SettingService,
        private actions$: Actions,
        private userStore: Store<fromUser.State>,) { }

    @Effect()
    loadMemberVendors$: Observable<Action> = this.actions$.pipe(
        ofType(settingActions.SettingActionTypes.LoadMemberVendors),
        mergeMap(() =>
            this.settingService.getMemberVendors().pipe(
                map((members: MemberVendor[]) => (new settingActions.LoadMemberVendorsSuccess(members))),
                catchError(err => {
                    of(new settingActions.LoadMemberVendorsFail(err));
                    return EMPTY;
                })
            )
        ),
        take(1)
    );

    @Effect()
    editCurrentMember$: Observable<Action> = this.actions$.pipe(
        ofType(settingActions.SettingActionTypes.EditCurrentMember),
        map((action: settingActions.EditCurrentMember) => action.payload),
        mergeMap((payload: Member) =>
            this.settingService.editCurrentMember(payload).pipe(
                map((member: Member) => {
                    this.userStore.dispatch(new userActions.SetCurrentUser(member));
                    // if (payload.VendorID !== member.VendorID) {
                    //     this.settingService.sendNotification({ type: 'success', title: 'Successfully Updated', content: `Company switched to ${member.VendorName}` });
                    //     window.location.reload();
                    // }
                    if (payload.DefaultPageSize !== member.DefaultPageSize) {
                        this.settingService.sendNotification({ type: 'success', title: 'Successfully Updated', content: `Default Page Size is ${member.DefaultPageSize}` });
                    }
                    else {
                        this.settingService.sendNotification({ type: 'success', title: 'Successfully Updated', content: `Company switched to ${member.VendorName}` });
                        window.location.reload();
                    }
                    return (new settingActions.EditCurrentMemberSuccess(member));
                }),
                catchError(err => {
                    this.settingService.sendNotification({ type: 'error', title: 'Error', content: err });
                    this.router.navigate(['/setting']);
                    return of(new settingActions.EditCurrentMemberFail(err));
                })
            )
        )
    );
}
