import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import * as PayoutActions from './payout.actions';
import {PayoutPmService} from '../payout-pm.service';
import {Store} from '@ngrx/store';
import {PayoutState} from './payout.reducer';
import {Payout, PayoutLog} from '../../../shared/class/payout';
import {Vendor} from '../../../shared/class/vendor';


@Injectable()
export class PayoutEffects {
    constructor(
        private actions$: Actions,
        private payoutPmService: PayoutPmService,
        private store: Store<PayoutState>
    ) {
    }

    @Effect() LoadSubVendors$ = this.actions$.pipe(
        ofType(PayoutActions.PayoutActionTypes.LoadVendorList),
        mergeMap(() => {
            return this.payoutPmService.getAllSubMemberVendors().pipe(
                map((vendorList: Vendor[]) => new PayoutActions.LoadVendorListSuccess(vendorList)),
                catchError(err => {
                        this.payoutPmService.sendNotification({type: 'error', title: 'Error', content: err});
                        return of(new PayoutActions.LoadVendorListFail(err));
                    }
                )
            );
        })
    );
    @Effect() LoadMySubVendors$ = this.actions$.pipe(
        ofType(PayoutActions.PayoutActionTypes.LoadMyVendorList),
        mergeMap(() => {
            return this.payoutPmService.getMySubMemberVendors().pipe(
                map((vendorList: Vendor[]) => new PayoutActions.LoadMyVendorListSuccess(vendorList)),
                catchError(err => {
                        this.payoutPmService.sendNotification({type: 'error', title: 'Error', content: err});
                        return of(new PayoutActions.LoadMyVendorListFail(err));
                    }
                )
            );
        })
    );
    @Effect() LoadPayoutList$ = this.actions$.pipe(
        ofType(PayoutActions.PayoutActionTypes.LoadPayoutList),
        map((aciton: PayoutActions.LoadPayoutList) => aciton.payload),
        mergeMap((vendor: Vendor) => {
            return this.payoutPmService.getPayoutList(vendor).pipe(
                map((itemlist: PayoutLog[]) => new PayoutActions.LoadPayoutListSuccess(itemlist)),
                catchError(err => {
                        this.payoutPmService.sendNotification({type: 'error', title: 'Error', content: err});
                        return of(new PayoutActions.LoadPayoutListFail(err));
                    }
                )
            );
        })
    );
    @Effect() LoadPayoutDetail$ = this.actions$.pipe(
        ofType(PayoutActions.PayoutActionTypes.LoadVendorPayoutDetail),
        map((aciton: PayoutActions.LoadVendorPayoutDetail) => aciton.payload),
        mergeMap((payoutlogID: string) => {
            return this.payoutPmService.getPayoutDetail(payoutlogID).pipe(
                map((payoutlist: Payout[]) => new PayoutActions.LoadVendorPayoutDetailSuccess(payoutlist)),
                catchError(err => {
                        this.payoutPmService.sendNotification({type: 'error', title: 'Error', content: err});
                        return of(new PayoutActions.LoadVendorPayoutDetailFail(err));
                    }
                )
            );
        })
    );
}
