import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as FromPayout from '../../../state/payout.reducer';
import * as PayoutSelector from '../../../state/index';
import {MatTableDataSource} from '@angular/material';
import * as PayoutActions from '../../../state/payout.actions';
import {Member} from '../../../../../shared/class/member';
import * as fromUser from '../../../../../shared/state/user-state.reducer';
import {PayoutLog} from '../../../../../shared/class/payout';
import {Vendor} from '../../../../../shared/class/vendor';

@Component({
    selector: 'app-payout-list-container',
    templateUrl: './payout-list-container.component.html',
    styleUrls: ['./payout-list-container.component.css']
})
export class PayoutListContainerComponent implements OnInit {
    isPayoutListLoading$: Observable<boolean>;
    payoutMatTable$: Observable<MatTableDataSource<PayoutLog>>;
    userInfo$: Observable<Member>;
    vendorList$: Observable<Vendor[]>;

    constructor(
        private store: Store<FromPayout.PayoutState>
    ) {
    }

    ngOnInit() {
        this.payoutMatTable$ = this.store.pipe(select(PayoutSelector.getPayloutList));
        this.vendorList$ = this.store.pipe(select(PayoutSelector.getVendorList));
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        setTimeout(() =>
            this.isPayoutListLoading$ = this.store.pipe(select(PayoutSelector.getPayloutListLoading))
        );
    }

    getVendorList($event: boolean) {
        if ($event === true) {
            this.store.dispatch(new PayoutActions.LoadMyVendorList());
            return;
        }
        this.store.dispatch(new PayoutActions.LoadVendorList());
    }

    getPayoutList(vendor: Vendor) {
        this.store.dispatch(new PayoutActions.LoadPayoutList(vendor));
    }

}
