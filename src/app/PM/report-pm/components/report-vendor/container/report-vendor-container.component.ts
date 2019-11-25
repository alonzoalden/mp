import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ReportState} from '../../../state/report.reducer';
import {Observable} from 'rxjs';
import {Vendor, VendorList} from '../../../../../shared/class/vendor';
import * as ReportSelector from '../../../state';
import * as ReportActions from '../../../state/report.actions';
import {MatTableDataSource} from '@angular/material';
import {VendorReport} from '../../../../../shared/class/report';

@Component({
    selector: 'app-report-vendor-container',
    templateUrl: './report-vendor-container.component.html',
    styleUrls: ['./report-vendor-container.component.css']
})
export class ReportVendorContainerComponent implements OnInit {
    vendorList$: Observable<Vendor[]>;
    subVendorReportLoading$: Observable<Boolean>;
    reportMatTable$: Observable<MatTableDataSource<VendorReport>>;

    constructor(
        private store: Store<ReportState>
    ) {
    }

    ngOnInit() {
        this.vendorList$ = this.store.pipe(select(ReportSelector.getSubVendorList));
        this.reportMatTable$ = this.store.pipe(select(ReportSelector.getVendorReport));
        setTimeout(() =>
            this.subVendorReportLoading$ = this.store.pipe(select(ReportSelector.getSubVendorReportLoading))
        );
    }

    getVendorList() {
        this.store.dispatch(new ReportActions.LoadVendorList());
    }

    getVendorReport(vendor: Vendor) {
        this.store.dispatch(new ReportActions.LoadVendorReport(vendor));
    }
}
