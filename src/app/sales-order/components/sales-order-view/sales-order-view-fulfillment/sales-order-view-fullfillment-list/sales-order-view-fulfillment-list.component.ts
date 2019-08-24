import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { SalesOrderLine } from '../../../../../shared/class/sales-order-line';
import { SalesOrder } from '../../../../../shared/class/sales-order';
import { Fulfillment } from '../../../../../shared/class/fulfillment';

import { SalesOrderService } from '../../../../sales-order.service';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'o-sales-order-fulfillment-list',
  templateUrl: './sales-order-view-fulfillment-list.component.html'
})

export class SalesOrderFulfillmentListComponent implements OnInit {
    errorMessage: string;
    deliveryDetail: string;
    salesorder: SalesOrder;
    orderid: number;
    fulfilledby: string;

    fulfillments: Fulfillment[];
    displayedColumns = ['Menu','Package','ID','ShipDate','Carrier','ShippingService','TrackingNumber'];
    dataSource: any = null;

    isMerchant: boolean;
    isLoading: boolean;
    constructor(private route: ActivatedRoute,
        private router: Router,
        private salesorderService: SalesOrderService) { }

    ngOnInit() {
        // const param = this.route.snapshot.params['id'];
        // this.orderid = param;
        // this.fulfilledby = 'merchant';

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

        // this.salesorderService.getSalesOrder(param).subscribe(
        //     (salesorder: SalesOrder) => {
        //         this.salesorder = salesorder;                
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );
        this.isLoading = true;
        this.salesorderService.getFulfilledBySalesOrder(this.orderid, this.fulfilledby).subscribe(
            (salesorder: SalesOrder) => {
                this.salesorder = salesorder;
                
            },
            (error: any) => this.errorMessage = <any>error
        );

        //this.salesorderService.getFulfillments(this.orderid).subscribe(
        this.salesorderService.getFulfilledByFulfillments(this.orderid, this.fulfilledby).subscribe(
            (fulfillments: Fulfillment[]) => {
                this.fulfillments = fulfillments;
                
                // if(this.fulfillments.length == 0) {
                //if(this.isMerchant && this.fulfillments.length == 0) {
                    // this.router.navigate(['/','sales-order', 'view', this.fulfilledby,this.orderid,'fulfillment','add']);
                //}

                this.refreshDataSource(this.fulfillments);
                this.isLoading = false;
            },
            (error: any) => this.errorMessage = <any>error
        );

        this.salesorderService.getSalesOrderDelivery(this.orderid).subscribe(
            (deliveryDetail: string) => {
                this.deliveryDetail = deliveryDetail.trim().replace(new RegExp('<br />', 'g'), '\n');
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    refreshDataSource(fulfillments: Fulfillment[]){
        this.dataSource = new MatTableDataSource<Fulfillment>(fulfillments);
    }

    onDeleteFulfillment(fulfillment: Fulfillment) {
        const confirmation = confirm(`Remove Shipment ID# ${fulfillment.FulfillmentID}?`);
        if (confirmation) {
            this.salesorderService.deleteFulfillment(fulfillment.FulfillmentID).subscribe(
                () => {
                    this.salesorderService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: this.errorMessage });
                    
                    // const foundIndex = this.fulfillments.findIndex(i => i.FulfillmentID === fulfillment.FulfillmentID);
                    // if (foundIndex > -1) {
                    //     this.fulfillments.splice(foundIndex, 1);
                    // }

                    // this.refreshDataSource(this.fulfillments);

                    window.location.reload();
                },
                (error: any) => {
                    this.errorMessage = <any>error;
                    this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });

                    this.salesorderService.getFulfilledByFulfillments(this.orderid, this.fulfilledby).subscribe(
                        (fulfillments: Fulfillment[]) => {
                            this.fulfillments = fulfillments;                
                            this.refreshDataSource(this.fulfillments);
                        },
                        (error: any) => this.errorMessage = <any>error
                    );
                    
                    //window.location.reload();
                }
            );
        }
    }
}
