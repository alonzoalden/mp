import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SalesOrderService } from '../sales-order.service';
import * as salesOrderActions from './sales-order.actions';
import { Router } from '@angular/router';
import { Member, MemberVendor } from 'app/shared/class/member';
import { SalesOrder } from 'app/shared/class/sales-order';

@Injectable()
export class SalesOrderEffects {
    constructor(
        private router: Router,
        private salesOrderService: SalesOrderService,
        private actions$: Actions) { }


        
    @Effect()
    loadSalesOrders$: Observable<Action> = this.actions$.pipe(
        ofType(salesOrderActions.SalesOrderActionTypes.LoadSalesOrders),
        map((action: salesOrderActions.LoadSalesOrders) => action.payload),
        mergeMap((payload) =>
            this.salesOrderService.getSalesOrderByVendor(payload.fulfilledby, payload.status).pipe(
                map((members: SalesOrder[]) => (new salesOrderActions.LoadSalesOrdersSuccess(members))),
                catchError(err => {
                    of(new salesOrderActions.LoadSalesOrdersFail(err))
                    return EMPTY;
                })
            )
        ),
        take(1)
    );

    // @Effect()
    // editCurrentMember$: Observable<Action> = this.actions$.pipe(
    //     ofType(settingActions.SettingActionTypes.EditCurrentMember),
    //     map((action: settingActions.EditCurrentMember) => action.payload),
    //     mergeMap((payload: Member) =>
    //         this.settingService.editCurrentMember(payload).pipe(
    //             map((member: Member) => {
    //                 this.settingService.sendNotification({ type: 'success', title: 'Successfully Updated', content: '' });
    //                 window.location.reload();
    //                 return (new settingActions.EditCurrentMemberSuccess(member));
    //             }),
    //             catchError(err => {
    //                 this.settingService.sendNotification({ type: 'error', title: 'Error', content: err });
    //                 this.router.navigate(['/setting']);
    //                 return of(new settingActions.EditCurrentMemberFail(err));
    //             })
    //         )
    //     )
    // );
}
