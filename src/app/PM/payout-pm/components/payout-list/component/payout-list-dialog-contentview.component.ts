import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Payout, PayoutLog} from '../../../../../shared/class/payout';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PayoutPmService} from '../../../payout-pm.service';
import {DatePipe} from '@angular/common';


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
        'ReturnShippingFee',
    ];

    constructor(
        private payoutService: PayoutPmService,
        private dataPipe: DatePipe
    ) {

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

    onDownLoadClick() {
        this.payoutService.downloadPayoutExcel(this.data.PayoutLogID).subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                const blobUrl = URL.createObjectURL(blob);
                const startDate = this.dataPipe.transform(this.data.PayoutStartDate, 'yyyy-MM-dd');
                const endDate = this.dataPipe.transform(this.data.PayoutEndDate, 'yyyy-MM-dd');
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = this.data.vendor + '-' + startDate + '-' + endDate;
                    window.navigator.msSaveOrOpenBlob(data, fileName + '.xlsx'); // IE is the worst!!!
                } else {
                    const fileURL = window.URL.createObjectURL(blob);
                    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
                    a.href = fileURL;
                    a.download = this.data.vendor + '-' + startDate + '-' + endDate;
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
            , error => {
                this.payoutService.sendNotification({type: 'error', title: 'Error', content: error});
            });
    }
}


