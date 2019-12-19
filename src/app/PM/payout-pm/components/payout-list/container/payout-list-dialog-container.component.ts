import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {select, Store} from '@ngrx/store';
import * as PayoutActions from '../../../state/payout.actions';
import * as FromPayout from '../../../state/payout.reducer';
import * as PayoutSelector from '../../../state/index';
import {Payout, PayoutLog} from 'app/shared/class/payout';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-pm-payout-list-dialog-container',
    templateUrl: './payout-list-dialog-container.component.html',

})
export class PayoutListDialogContainerComponent implements OnInit {
    isPayoutDetailLoading$: Observable<boolean>;
    payloutDetailList$: Observable<MatTableDataSource<Payout>>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: PayoutLog,
        public dialogRef: MatDialogRef<PayoutListDialogContainerComponent>,
        private store: Store<FromPayout.PayoutState>
    ) {

    }

    ngOnInit() {
        console.log(this.data);
        this.payloutDetailList$ = this.store.pipe(select(PayoutSelector.getPayloutDetailList));
        this.getPayoutLog(this.data.PayoutLogID);
        setTimeout(() => {
                this.isPayoutDetailLoading$ = this.store.pipe(select(PayoutSelector.getVendorPayoutDetailLoading));
            }
        );
    }

    getPayoutLog(payoutlogID: string) {
        this.store.dispatch(new PayoutActions.LoadVendorPayoutDetail(payoutlogID));
    }

    onCancelClick() {
        this.dialogRef.close();
    }
}
