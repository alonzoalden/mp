import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {VendorTradeShow} from '../../../../../shared/class/vendor-b2b';
import {select, Store} from '@ngrx/store';
import * as fromCompany from '../../state';
import * as companyActions from '../../state/company-b2b.actions';

@Component({
    selector: 'app-company-b2b-info-trade-show-shell',
    templateUrl: './company-trade-show-shell.component.html'
})
export class CompanyTradeShowShellComponent implements OnInit {
    isTradeShowLoading$: Observable<boolean>;
    tradeShowList$: Observable<MatTableDataSource<VendorTradeShow>>;

    constructor(
        private store: Store<fromCompany.State>
    ) {
    }

    ngOnInit() {
        this.tradeShowList$ = this.store.pipe(select(fromCompany.getTradeShowList));
        setTimeout(() => {
            this.isTradeShowLoading$ = this.store.pipe(select(fromCompany.getTradeShowLoading));
        });
    }

    loadVendorInfo() {
        this.store.dispatch(new companyActions.LoadVendorTradeShow());
    }

    updateVendorTradeShow(vendorTradeShow: VendorTradeShow) {
        this.store.dispatch(new companyActions.UpdateVendorTradeShow(vendorTradeShow));
    }

    deleteVendorTradeShow(vendorTradeShow: VendorTradeShow) {
        this.store.dispatch(new companyActions.DeleteVendorTradeShow(vendorTradeShow));
    }
}
