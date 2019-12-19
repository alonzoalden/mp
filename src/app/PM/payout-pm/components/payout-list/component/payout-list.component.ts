import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatCheckboxChange, MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Member} from '../../../../../shared/class/member';
import {PayoutLog} from '../../../../../shared/class/payout';
import {Vendor} from '../../../../../shared/class/vendor';
import {PayoutListDialogContainerComponent} from '../container/payout-list-dialog-container.component';

@Component({
    selector: 'app-payout-list',
    templateUrl: './payout-list.component.html',
    styleUrls: ['./payout-list.component.css']
})
export class PayoutListComponent implements OnInit, OnChanges {
    @Input() isPayoutListLoading: boolean;
    @Input() payoutMatTable: MatTableDataSource<PayoutLog>;
    @Input() vendorList: Vendor[];
    @Input() userInfo: Member;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @Output() getVendorList = new EventEmitter<boolean>();
    @Output() getPayoutList = new EventEmitter<Vendor>();
    columnsToDisplay = ['Vendor', 'PayoutStartDate', 'PayoutEndDate', 'Edit'];

    constructor(
        public dialog: MatDialog,
    ) {
    }
    checkChange(event: MatCheckboxChange) {
        if (event.checked === true ) {
            this.getVendorList.emit(true);
        } else {
            this.getVendorList.emit(false);
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.payoutMatTable && changes.payoutMatTable.currentValue.data) {
            this.payoutMatTable.paginator = this.paginator;
            this.payoutMatTable.sort = this.sort;
        }
    }

    onButtonClick(member: Member) {
        this.dialog.open(PayoutListDialogContainerComponent, {
            data: member
        });
    }

    ngOnInit() {
        this.getVendorList.emit(true);
    }

    onSelect(vendor) {
        this.getPayoutList.emit(vendor);
    }
}
