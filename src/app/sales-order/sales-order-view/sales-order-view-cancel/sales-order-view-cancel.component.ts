import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { SalesOrderLine } from '../../../shared/class/sales-order-line';
import { SalesOrder } from '../../../shared/class/sales-order';

import { SalesOrderService } from '../../sales-order.service';
import { AppService } from '../../../app.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'o-sales-order-cancel',
  templateUrl: './sales-order-view-cancel.component.html',
  styleUrls: ['../../sales-order.component.css'] 
})

export class SalesOrderCancelComponent implements OnInit {
    errorMessage: string;
    fulfilledby: string;
    orderid: number;
    hasCancellationQty: boolean;

    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;

    //displayedColumns = ['ItemImage','ItemName', 'SKU', 'TPIN', 'Quantity', 'ShippedQty', 'CancellationQty'];
    displayedColumns = ['ItemImage', 'ProductDetails','ProductInfo','CancellationReason'];
    dataSource: any = null;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    // salesorderline: SalesOrderLine;
    deliveryDetail: string;
    salesorder: SalesOrder;
    salesorderlines: SalesOrderLine[];

    constructor(private route: ActivatedRoute,
        private router: Router,
        private salesorderService: SalesOrderService,
        private appService: AppService) { }

    ngOnInit() {
        const paramOrderID = this.route.snapshot.params['id'];
        this.orderid = paramOrderID;
        this.fulfilledby = 'merchant';

        this.appService.getCurrentMember()
            .subscribe(
                (data) => {
                    if(data.DefaultPageSize){
                        this.paginator.pageSize = data.DefaultPageSize;
                    }
                },
                (error: any) => {
                    this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: error });
                }
            );

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
                // this.salesorderService.cancelSalesOrder(this.orderid).subscribe(
                //     () => {
                //         this.salesorderService.sendNotification({ type: 'success', title: 'Successfully Canceled', content: this.errorMessage });
                //         this.router.navigate(['/sales-order','merchant', this.orderid, 'detail']);
                //     },
                //     (error: any) => {
                //         this.errorMessage = <any>error;
                //         this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                //         window.location.reload();
                //     }
                // );
                
                this.salesorderService.cancelSalesOrderLines(this.salesorderlines).subscribe(
                    () => {
                        this.salesorderService.sendNotification({ type: 'success', title: 'Successfully Canceled', content: this.errorMessage });
                        //this.router.navigate(['/sales-order','merchant', this.orderid, 'detail']);
                        //window.location.reload();
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                        this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                        //window.location.reload();
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
}
