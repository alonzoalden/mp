import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Vendor, VendorList} from '../../../../../shared/class/vendor';
import {MatTableDataSource} from '@angular/material';
import {VendorReport} from '../../../../../shared/class/report';

@Component({
    selector: 'app-report-vendor',
    templateUrl: './report-vendor.component.html',
    styleUrls: ['./report-vendor.component.css']
})
export class ReportVendorComponent implements OnInit {
    @Input() vendorList: Vendor[];
    @Input() subVendorReportLoading: Boolean;
    @Input() reportMatTable: MatTableDataSource<VendorReport[]>;
    @Output() getVendorReport = new EventEmitter<Vendor>();
    @Output() getVendorList = new EventEmitter();
    columnsToDisplay = ['VendorID', 'QuantityOnHand', 'QuantityAvailable'];

    constructor() {
    }

    ngOnInit() {
        this.getVendorList.emit();
    }

    onSelect(vendor) {
        this.getVendorReport.emit(vendor);
    }
}
