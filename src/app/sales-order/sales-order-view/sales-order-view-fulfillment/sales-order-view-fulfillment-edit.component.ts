import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { SalesOrderLine } from '../../../shared/class/sales-order-line';
import { SalesOrder } from '../../../shared/class/sales-order';
import { Fulfillment, ShipmentTracking, FulfillmentSalesOrderLine } from '../../../shared/class/fulfillment';

import { SalesOrderService } from '../../sales-order.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'o-sales-order-fulfillment-edit',
  templateUrl: './sales-order-view-fulfillment-edit.component.html'
})

export class SalesOrderFulfillmentEditComponent implements OnInit {
    errorMessage: string;
    deliveryDetail: string;
    salesorder: SalesOrder;
    orderid: number;
    fulfilledby: string;
    fulfillmentid: number;

    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;
    
    fulfillmentSalesOrderLines: FulfillmentSalesOrderLine[];
    //displayedColumns = ['ItemImage', 'ItemName', 'SKU', 'TPIN', 'RemainingQuantity', 'PackageQuantity'];
    displayedColumns = ['ProductDetails', 'RemainingQuantity', 'PackageQuantity'];
    dataSource: any = null;

    fulfillment: Fulfillment;
    shipmentTrackings: ShipmentTracking;

    pendingCreate: boolean;

    isMerchant: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private salesorderService: SalesOrderService) { }

    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);
    
    ngOnInit() {
        // const paramID = this.route.snapshot.params['id'];
        // const paramFulfilledBy = this.route.snapshot.params['fulfilledby'];
        const paramFulfilledBy = this.route.parent.snapshot.params['fulfilledby'];
        const paramOrderID = this.route.parent.snapshot.params['id'];
        const paramFulfillmentID = this.route.snapshot.params['fulfillmentid'];
        
        this.orderid = paramOrderID;
        this.fulfilledby = paramFulfilledBy;
        this.fulfillmentid = paramFulfillmentID;
        
        
        // if(this.fulfilledby == 'merchant') {
        //     this.isMerchant = true;s
        // }
        // else {
        //     this.isMerchant = false;
        // }

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

        this.salesorderService.getFulfilledBySalesOrderDelivery(this.orderid, this.fulfilledby).subscribe(
            (deliveryDetail: string) => {
                this.deliveryDetail = deliveryDetail.trim().replace(new RegExp('<br />', 'g'), '\n');
            },
            (error: any) => this.errorMessage = <any>error
        );

        // this.salesorderService.getFulfillment(this.fulfillmentid).subscribe(
        //     (fulfillment: Fulfillment) => {
        //         this.fulfillment = fulfillment;
        //         this.fulfillmentSalesOrderLines = this.fulfillment.FulfillmentSalesOrderLines;
        //         this.dataSource = new MatTableDataSource<FulfillmentSalesOrderLine>(this.fulfillmentSalesOrderLines);
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // )

        this.refreshFulfillment();
    }

    addNewShipmentTracking() {
        const _temp = new ShipmentTracking(null, this.fulfillmentid.toString(), null, null);
        this.fulfillment.ShipmentTrackings.push(_temp);        
    }
    onAddShipmentTracking() {
        this.addNewShipmentTracking();
    }

    refreshFulfillment() {
        this.salesorderService.getFulfilledByFulfillment(this.fulfillmentid, this.fulfilledby).subscribe(
            (fulfillment: Fulfillment) => {
                this.fulfillment = fulfillment;

                if(!this.fulfillment.ShipmentTrackings || this.fulfillment.ShipmentTrackings.length == 0){
                    this.addNewShipmentTracking();
                }

                if(this.fulfilledby == 'merchant' && !this.fulfillment.InternalID) {
                    this.isMerchant = true;
                }
                else {
                    this.isMerchant = false;
                }

                this.fulfillmentSalesOrderLines = this.fulfillment.FulfillmentSalesOrderLines;
                this.dataSource = new MatTableDataSource<FulfillmentSalesOrderLine>(this.fulfillmentSalesOrderLines);
            },
            (error: any) => this.errorMessage = <any>error
        )
    }

    onUpdateFulfillment() {
        if (this.isValid()) {
            this.pendingCreate = true;
            this.salesorderService.editFulfillment(this.fulfillment).subscribe(
                () => {
                    this.pendingCreate = false;
                    this.salesorderService.sendNotification({ type: 'success', title: 'Save Completed', content: "" });
                    this.router.navigate(['/sales-order','view', this.fulfilledby,this.orderid,'fulfillment']);
                    window.location.reload();
                },
                (error: any) => {
                    this.pendingCreate = false;
                    this.errorMessage = <any>error;                    
                    this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    this.router.navigate(['/sales-order', 'view', 'merchant', this.orderid, 'detail']);
                    //this.refreshFulfillment();
                    //this.router.navigate(['/home']);
                }
            );
        }
    }    

    isValid(): boolean {
        if (this.fulfillment
            && this.fulfillment.ShipDate
            && this.fulfillment.ShipmentTrackings.find(val=> !!val.TrackingNumber && val.TrackingNumber.toString().trim() != '')
            && this.fulfillment.ShipmentTrackings.length > 0
            && this.fulfillment.Carrier
            && this.fulfillment.ShippingMethod
            && this.fulfillment.FulfillmentSalesOrderLines
            && this.fulfillment.FulfillmentSalesOrderLines.length > 0
            && this.getTotalPackageQty() > 0
        ) {                
            return true;
        } else {
            
            if(this.getTotalPackageQty() == 0) {
                this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: "Item is required"});
            }
            else if(!this.fulfillment.ShipmentTrackings.find(val=> !!val.TrackingNumber && val.TrackingNumber.toString().trim() != '') || this.fulfillment.ShipmentTrackings.length == 0) {                        
                this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: "Tracking Number is required"});
            }
            else {
                this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: "Please enter all required fields"});
            }

            return false;
        }
    }

    public getTotalPackageQty(): number {
        var total = 0;
        if (this.fulfillment != null && this.fulfillment.FulfillmentSalesOrderLines != null && this.fulfillment.FulfillmentSalesOrderLines.length > 0) {   
            
            this.fulfillment.FulfillmentSalesOrderLines.forEach(x => total += x.PackageQuantity);
        }
        return total;
    }

    private test(a) {
        console.log(a)
    }
}
