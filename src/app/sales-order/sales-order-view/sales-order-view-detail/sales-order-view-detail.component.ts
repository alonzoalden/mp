import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SalesOrderLine } from '../../../shared/class/sales-order-line';
import { SalesOrder } from '../../../shared/class/sales-order';

import { SalesOrderService } from '../../sales-order.service';
import { AppService } from '../../../app.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'o-sales-order-detail',
  templateUrl: './sales-order-view-detail.component.html',
  styleUrls: ['../../sales-order.component.css'] 
})

export class SalesOrderDetailComponent implements OnInit {
    errorMessage: string;
    fulfilledby: string;
    orderid: number;

    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;

    // displayedColumns = ['ItemImage','ItemName', 'SKU', 'TPIN', 'Quantity', 'ShippedQty', 'MerchantStatus', 'UnitPrice', 'LineSubTotal'];
    displayedColumns = ['ItemImage', 'ProductDetails', 'Quantity', 'MerchantStatus', 'UnitPrice', 'LineSubTotal'];
    dataSource: any = null;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    // salesorderline: SalesOrderLine;
    deliveryDetail: string;
    salesorder: SalesOrder;
    salesorderlines: SalesOrderLine[];

    isMerchant: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private salesorderService: SalesOrderService,
        private appService: AppService,
        public printDialog: MatDialog) { }

    ngOnInit() {
        // const paramFulfilledBy = this.route.snapshot.params['fulfilledby'];
        // const paramOrderID = this.route.snapshot.params['id'];
        const paramFulfilledBy = this.route.parent.snapshot.params['fulfilledby'];
        const paramOrderID = this.route.parent.snapshot.params['id'];
        this.orderid = paramOrderID;
        this.fulfilledby = paramFulfilledBy;
        if(this.fulfilledby == 'merchant') {
            this.isMerchant = true;
        }
        else {
            this.isMerchant = false;
        }
        
        // this.appService.getCurrentMember()
        //     .subscribe(
        //         (data) => {
        //             if(data.DefaultPageSize){
        //                 this.paginator.pageSize = data.DefaultPageSize;
        //             }
        //         },
        //         (error: any) => {
        //             this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: error });
        //         }
        //     );

        this.salesorderService.getFulfilledBySalesOrder(this.orderid, this.fulfilledby).subscribe(
            (salesorder: SalesOrder) => {
                this.salesorder = salesorder;
            },
            (error: any) => this.errorMessage = <any>error
        );

        this.salesorderService.getSalesOrderLineByVendor(this.orderid, this.fulfilledby).subscribe(
            (salesorderlines: SalesOrderLine[]) => {
                this.salesorderlines = salesorderlines;
                                
                // if (this.salesorderlines) {
                //     const salesorderline = this.salesorderlines.find(x => x.Location == "Merchant");
                //     if (salesorderline) {
                //         this.isMerchant = true;
                //     }
                //     else {
                //         this.isMerchant = false;
                //     }
                // }

                this.dataSource = new MatTableDataSource<SalesOrderLine>(salesorderlines);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (error: any) => this.errorMessage = <any>error
        );

        this.salesorderService.getFulfilledBySalesOrderDelivery(this.orderid, this.fulfilledby).subscribe(
            (deliveryDetail: string) => {
                this.deliveryDetail = deliveryDetail.trim().replace(new RegExp('<br />', 'g'), '\n');
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    onPrintPackingSlip() {
        this.salesorderService.downloadSalesOrderPackingSlip(this.orderid).subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = this.salesorder.IncrementID;
                    window.navigator.msSaveOrOpenBlob(data, fileName + '.pdf'); // IE is the worst!!!
                } else {
                    // const iframe = document.createElement('iframe');
                    // iframe.style.display = 'none';
                    // iframe.src = blobUrl;
                    // document.body.appendChild(iframe);

                    // iframe.onload = (function() {
                    //     iframe.contentWindow.focus();
                    //     iframe.contentWindow.print();
                    // });
                    const fileURL = window.URL.createObjectURL(blob);
                    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
                    a.href = fileURL;
                    a.download = String(this.salesorder.IncrementID);
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }

    openDialogCancelOrder(id) {
        const dialogRef = this.printDialog.open(SalesOrderCancelComponentPrintDialog, {
            data: id,
            width: '840px'
        });
    
        dialogRef.afterClosed().subscribe(result => {
            if (result) {                
                console.log(result);                
            }
            window.location.reload();
        });
    }
}


export class SalesOrderCancelDialog {
    constructor(
        public Size: string,
        public Border: string
    ) {}
}

@Component({
    selector: 'sales-order-cancel.component-print-dialog',
    templateUrl: '../sales-order-view-cancel/sales-order-view-cancel.component-cancel-dialog.html',
})
    
export class SalesOrderCancelComponentPrintDialog implements OnInit {
    itemLabelPrintDialog: SalesOrderCancelDialog;
    errorMessage: string;
    fulfilledby: string;
    orderid: number;
    salesorder: SalesOrder;
    hasCancellationQty: boolean;
    salesorderlines: SalesOrderLine[];
    deliveryDetail: string;
    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;
    
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['ItemImage', 'ProductDetails','ProductInfo','CancellationReason'];

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<SalesOrderCancelComponentPrintDialog>,
        private route: ActivatedRoute,
        private router: Router,
        private salesorderService: SalesOrderService) {}

    ngOnInit() {
        this.orderid = this.data;
        this.fulfilledby = 'merchant';

        // this.salesorderService.getSalesOrder(this.orderid).subscribe(
        //     (salesorder: SalesOrder) => {
        //         this.salesorder = salesorder;
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );

        this.salesorderService.getFulfilledBySalesOrder(this.orderid, this.fulfilledby).subscribe(
            (salesorder: SalesOrder) => {
                this.salesorder = salesorder;
            },
            (error: any) => this.errorMessage = <any>error
        );

        this.hasCancellationQty = false;
        this.salesorderService.getSalesOrderLineByVendor(this.orderid, this.fulfilledby).subscribe(
            (salesorderlines: SalesOrderLine[]) => {
                this.salesorderlines = salesorderlines;

                this.salesorderlines.forEach((salesorderline) => {
                    if(salesorderline.Quantity - salesorderline.FulfilledQuantity > 0)
                    {
                        this.hasCancellationQty = true;
                    }
                });

                this.dataSource = new MatTableDataSource<SalesOrderLine>(salesorderlines);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (error: any) => this.errorMessage = <any>error
        );

        // this.salesorderService.getSalesOrderDelivery(this.orderid).subscribe(
        //     (deliveryDetail: string) => {
        //         this.deliveryDetail = deliveryDetail.trim().replace(new RegExp('<br />', 'g'), '\n');
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );

        this.salesorderService.getFulfilledBySalesOrderDelivery(this.orderid, this.fulfilledby).subscribe(
            (deliveryDetail: string) => {
                this.deliveryDetail = deliveryDetail.trim().replace(new RegExp('<br />', 'g'), '\n');
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    onCancel() {
        if(this.isValid()) {            
            const confirmation = confirm(`Are you sure you want to cancel this order?`);        
            if (confirmation) {
                this.salesorderService.cancelSalesOrderLines(this.salesorderlines).subscribe(
                    () => {
                        
                        this.salesorderService.sendNotification({ type: 'success', title: 'Successfully Canceled', content: this.errorMessage });
                        // this.router.navigate(['/sales-order', 'view', 'merchant', this.orderid, 'detail']);
                        // this.router.navigate(['/sales-order', 'merchant', 'status', 'unshipped']);
                        // this.salesorderService.getFulfilledBySalesOrder(this.orderid, this.fulfilledby).subscribe(
                        //     (salesorder: SalesOrder) => {
                        //         this.salesorder = salesorder;
                        //     },
                        //     (error: any) => this.errorMessage = <any>error
                        // );
                        this.dialogRef.close();
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                        this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                        window.location.reload();
                    }
                );
            }
        }
    }

    isValid() {   
        var _ret = false;
        var _count = 0;

        this.salesorderlines.forEach((salesorderline) => {
            _count++;

            if(_count == 1) {
                _ret = true;
            }

            if (salesorderline.Quantity - salesorderline.FulfilledQuantity > 0 && !salesorderline.CancellationReason) {
                this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: 'Cancellation Reasons are required' });
                _ret = false;
            }
        });

        if(_count == 0) {
            this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: 'No Lines to cancel' });
        }

        return _ret;
    }
    onCloseClick(): void {
        this.dialogRef.close();
    }
}