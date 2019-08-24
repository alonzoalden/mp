import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { SalesOrderLine } from '../../../../../shared/class/sales-order-line';
import { SalesOrder } from '../../../../../shared/class/sales-order';
import { Fulfillment, ShipmentTracking, FulfillmentSalesOrderLine } from '../../../../../shared/class/fulfillment';

import { SalesOrderService } from '../../../../sales-order.service';

import { environment } from '../../../../../../environments/environment';

@Component({
  templateUrl: './sales-order-view-fulfillment-add-shell.component.html'
})

export class SalesOrderFulfillmentAddShellComponent implements OnInit {
    errorMessage: string;
    deliveryDetail: string;
    salesorder: SalesOrder;
    orderid: number;
    fulfilledby: string;

    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;

    fulfillmentSalesOrderLines: FulfillmentSalesOrderLine[];
    // displayedColumns = ['ItemImage', 'ItemName', 'SKU', 'TPIN', 'RemainingQuantity', 'PackageQuantity'];
    displayedColumns = ['ProductDetails', 'RemainingQuantity', 'PackageQuantity'];
    dataSource: any = null;

    fulfillment: Fulfillment;
    shipmentTrackings: ShipmentTracking[];

    pendingCreate: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private salesorderService: SalesOrderService) { }

    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);
    
    ngOnInit() {
        // const param = this.route.snapshot.params['id'];
        const param = this.route.parent.snapshot.params['id'];
        this.orderid = param;
        this.fulfilledby = 'merchant';
        
        // this.salesorderService.getSalesOrder(param).subscribe(
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

        this.salesorderService.getSalesOrderDelivery(param).subscribe(
            (deliveryDetail: string) => {
                this.deliveryDetail = deliveryDetail.trim().replace(new RegExp('<br />', 'g'), '\n');
            },
            (error: any) => this.errorMessage = <any>error
        );

        // this.salesorderService.getFulfilmmentSalesOrderLines(param).subscribe(
        //     (fulfillmentSalesOrderLines: FulfillmentSalesOrderLine[]) => {
        //         this.fulfillmentSalesOrderLines = fulfillmentSalesOrderLines;

        //         this.shipmentTracking = new ShipmentTracking(null, null, null, null, null, null, null);
        //         this.fulfillment = new Fulfillment(null, this.salesorderid, null, null, null, this.shipmentTracking, this.fulfillmentSalesOrderLines);
        //         this.dataSource = new MatTableDataSource<FulfillmentSalesOrderLine>(this.fulfillment.FulfillmentSalesOrderLines);
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );   
    
        this.shipmentTrackings = [];
        this.addNewShipmentTracking();
        this.refreshSalesOrderLine();
    }

    addNewShipmentTracking() {
        const _temp = new ShipmentTracking(null, null, null, null);
        this.shipmentTrackings.push(_temp);        
    }
    onAddShipmentTracking() {
        this.addNewShipmentTracking();
    }

    refreshSalesOrderLine() {
        this.salesorderService.getFulfilmmentSalesOrderLines(this.orderid).subscribe(
            (fulfillmentSalesOrderLines: FulfillmentSalesOrderLine[]) => {
                this.fulfillmentSalesOrderLines = fulfillmentSalesOrderLines;

                //this.shipmentTracking = new ShipmentTracking(null, null, null, null, null, null, null);
                this.fulfillment = new Fulfillment(null, String(this.orderid), null, null, null, null, null, null, null, null, null, this.shipmentTrackings, this.fulfillmentSalesOrderLines);
                this.dataSource = new MatTableDataSource<FulfillmentSalesOrderLine>(this.fulfillment.FulfillmentSalesOrderLines);
            },
            (error: any) => this.errorMessage = <any>error
        );  
    }

    onAddFulfillment() {        
        if (this.isValid()) {
            this.pendingCreate = true;
            this.salesorderService.addFulfillment(this.fulfillment).subscribe(
                () => {
                    this.pendingCreate = false;
                    this.salesorderService.sendNotification({ type: 'success', title: 'Save Completed', content: "" });
                    this.router.navigate(['/sales-order', 'view', this.fulfilledby,this.orderid,'fulfillment']);
                    //this.router.navigate(['/sales-order', 'view', 'merchant', this.orderid, 'detail']);
                    window.location.reload();
                },
                (error: any) => {
                    this.pendingCreate = false;
                    this.errorMessage = <any>error;                    
                    this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    this.router.navigate(['/sales-order', 'view', 'merchant', this.orderid, 'detail']);
                    //this.refreshSalesOrderLine();
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
}
