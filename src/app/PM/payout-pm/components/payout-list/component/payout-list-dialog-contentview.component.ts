import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Payout, PayoutLog} from '../../../../../shared/class/payout';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
    selector: 'app-pm-payout-list-dialog-contentview',
    templateUrl: './payout-list-dialog-contentview.component.html',

})
export class PayoutListDialogContentviewComponent implements OnInit, OnChanges {
    @Input() data: PayoutLog;
    @Input() isPayoutListLoading: boolean;
    @Input() payloutDetailList: MatTableDataSource<Payout>;
    @Output() closeEvent = new EventEmitter();
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    displayedColumns = [
        'PurchasedFrom',
        'Order',
        'PurchasedOn',
        'SellingPrice',
        'MerchantPrice',
        'PromotionPrice',
        'SubTotal',
        'OrderProcessingFee',
        'BillTo',
        'ShippingFee',
        'ShippingState',
        'Status',
        'IsBundle',
        'BundleItemID',
        'SKU',
        'TPIN',
        'Quantity',
        'ServiceStartDate',
        'FreeStorageMonths',
        'StorageFeeStartDate',
        'StorageDaysWithFee',
        'Height',
        'Width',
        'Length',
        'Volume',
        'StorageFee',
        'Location',
        'Warranty',
        'WarrantyFee',
        'ReturnShippingFee'];

    constructor() {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.payloutDetailList && changes.payloutDetailList.currentValue.data) {
            this.payloutDetailList.paginator = this.paginator;
            this.payloutDetailList.sort = this.sort;
        }
    }

    ngOnInit() {

    }

    onCloseClick() {
        this.closeEvent.emit();
    }

}


