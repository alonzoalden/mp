import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppService } from 'app/app.service';
import * as userActions from './user-state.actions';

@Injectable()
export class UserEffects {

    constructor(private appService: AppService,
        private actions$: Actions) { }

    @Effect()
    getCurrentMember$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.LoadCurrentUser),
        mergeMap(() =>
            this.appService.getCurrentMember().pipe(
                map(member => (new userActions.LoadCurrentUserSuccess(member))),
                catchError(err => {
                    of(new userActions.LoadCurrentUserFail(err));
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    editToFirstVendor$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.EditToFirstVendor),
        mergeMap(() =>
            this.appService.editToFirstVendor().pipe(
                map(member => (new userActions.LoadCurrentUserSuccess(member))),
                catchError(err => {
                    of(new userActions.LoadCurrentUserFail(err));
                    return EMPTY;
                })
            )
        )
    );
    

}
