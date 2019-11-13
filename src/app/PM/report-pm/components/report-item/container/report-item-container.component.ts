import {Component, Input, OnInit} from '@angular/core';
import {Observable, pipe} from 'rxjs';
import {Item, ItemList} from '../../../../../shared/class/item';
import {select, Store} from '@ngrx/store';
import * as FromReport from '../../../state/report.reducer';
import * as ReportSelector from '../../../state/index';
import {MatTableDataSource} from '@angular/material';
import * as ReportActions from '../../../state/report.actions';
import {Member} from '../../../../../shared/class/member';
import * as fromUser from '../../../../../shared/state/user-state.reducer';
import {InventoryReport} from '../../../../../shared/class/report';

@Component({
    selector: 'app-report-item-container',
    templateUrl: './report-item-container.component.html',
    styleUrls: ['./report-item-container.component.css']
})
export class ReportItemContainerComponent implements OnInit {
    itemsList$: Observable<ItemList[]>;
    isItemReportLoading$: Observable<boolean>;
    reportMatTable$: Observable<MatTableDataSource<InventoryReport>>;
    userInfo$: Observable<Member>;

    constructor(
        private store: Store<FromReport.ReportState>
    ) {
    }

    ngOnInit() {
        this.itemsList$ = this.store.pipe(select(ReportSelector.getItemList));
        this.reportMatTable$ = this.store.pipe(select(ReportSelector.getInventoryReport));
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        setTimeout(() =>
            this.isItemReportLoading$ = this.store.pipe(select(ReportSelector.getItemReportLoading))
        );
    }

    getItemList() {
        this.store.dispatch(new ReportActions.LoadItemListWithVendors());
    }

    getItemReport(item: ItemList) {
        this.store.dispatch(new ReportActions.LoadItemReport(item));
    }
}
