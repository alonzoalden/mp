import * as fromRoot from '../../../state/app.state';
import * as fromPayout from './payout.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MatTableDataSource} from '@angular/material';
import {Payout, PayoutLog} from '../../../shared/class/payout';

export interface State extends fromRoot.State {
    report: fromPayout.PayoutState;
}

const getPayoutFeatureState = createFeatureSelector<fromPayout.PayoutState>('payout');

export const getPayloutListLoading = createSelector(
    getPayoutFeatureState,
    state => state.isPayoutItemLoading
);
export const getPayloutList = createSelector(
    getPayoutFeatureState,
    state => new MatTableDataSource<PayoutLog>(state.payoutItemList)
);
export const getPayloutDetailList = createSelector(
    getPayoutFeatureState,
    state => new MatTableDataSource<Payout>(state.payoutDetailList)
);

export const getVendorList = createSelector(
    getPayoutFeatureState,
    state => state.vendorList
);
export const getVendorPayoutDetail = createSelector(
    getPayoutFeatureState,
    state => state.payoutDetailList
);
export const getVendorPayoutDetailLoading = createSelector(
    getPayoutFeatureState,
    state => state.isPayoutDetailLoading
);
