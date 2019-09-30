import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource} from '@angular/material';
import { SalesOrder } from '../../../../../shared/class/sales-order';
import { Fulfillment, ShipmentTracking, FulfillmentSalesOrderLine } from '../../../../../shared/class/fulfillment';
import { SalesOrderService } from '../../../../sales-order.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'o-sales-order-fulfillment-edit',
  templateUrl: './sales-order-view-fulfillment-edit.component.html'
})

export class SalesOrderFulfillmentEditComponent implements OnInit {
    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;
    @Input() errorMessage: string;
    @Input() deliveryDetail: string;
    @Input() salesOrder: SalesOrder;
    @Input() fulfillment: Fulfillment;
    @Input() isLoading: boolean;
    @Output() getFulfilledBySalesOrder = new EventEmitter<{orderid: number, fulfilledby: string}>();
    @Output() getFulfilledBySalesOrderDelivery = new EventEmitter<{orderid: number, fulfilledby: string}>();
    @Output() getFulfilledByFulfillment = new EventEmitter<{fulfillmentid: number, fulfilledby: string}>();
    @Output() editFulfillment = new EventEmitter<Fulfillment>();

    orderid: number;
    fulfilledby: string;
    fulfillmentid: number;
    fulfillmentSalesOrderLines: FulfillmentSalesOrderLine[];
    fulfillmentSalesOrderLinesMatTable: MatTableDataSource<FulfillmentSalesOrderLine>;
    //displayedColumns = ['ItemImage', 'ItemName', 'SKU', 'TPIN', 'RemainingQuantity', 'PackageQuantity'];
    displayedColumns = ['ProductDetails', 'RemainingQuantity', 'PackageQuantity'];
    isMerchant: boolean;
    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);

    constructor(private route: ActivatedRoute,
        private salesorderService: SalesOrderService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.deliveryDetail && changes.deliveryDetail.currentValue) {
            this.deliveryDetail = changes.deliveryDetail.currentValue.trim().replace(new RegExp('<br />', 'g'), '\n');
        }

        if (changes.fulfillment && changes.fulfillment.currentValue) {
            if (!this.fulfillment.ShipmentTrackings || this.fulfillment.ShipmentTrackings.length == 0) {
                this.addNewShipmentTracking();
            }

            if (this.fulfilledby == 'merchant' && !this.fulfillment.InternalID) {
                this.isMerchant = true;
            } else {
                this.isMerchant = false;
            }
            this.fulfillmentSalesOrderLines = this.fulfillment.FulfillmentSalesOrderLines;
            this.fulfillmentSalesOrderLinesMatTable = new MatTableDataSource<FulfillmentSalesOrderLine>(this.fulfillmentSalesOrderLines);
        }
        if (changes.fulfillment && !changes.fulfillment.currentValue && changes.fulfillment.firstChange) {
            this.getFulfilledByFulfillment.emit({fulfillmentid: this.route.snapshot.params['fulfillmentid'], fulfilledby: this.route.parent.snapshot.params['fulfilledby']});
        }
        if (changes.salesOrder && !changes.salesOrder.currentValue && changes.salesOrder.firstChange) {
            this.getFulfilledBySalesOrder.emit({orderid: this.route.parent.snapshot.params['id'], fulfilledby: this.route.parent.snapshot.params['fulfilledby']});
        }
    }
    ngOnInit() {
        this.orderid = this.route.parent.snapshot.params['id'];
        this.fulfilledby = this.route.parent.snapshot.params['fulfilledby'];
        this.fulfillmentid = this.route.snapshot.params['fulfillmentid'];

        this.getFulfilledBySalesOrder.emit({orderid: this.orderid, fulfilledby: this.fulfilledby});
        this.getFulfilledBySalesOrderDelivery.emit({orderid: this.orderid, fulfilledby: this.fulfilledby});

        if (this.fulfilledby == 'merchant') {
            this.isMerchant = true;
        } else {
            this.isMerchant = false;
        }
    }

    addNewShipmentTracking() {
        const _temp = new ShipmentTracking(null, this.fulfillmentid.toString(), null, null);
        this.fulfillment.ShipmentTrackings.push(_temp);
    }
    onAddShipmentTracking() {
        this.addNewShipmentTracking();
    }

    onUpdateFulfillment() {
        if (this.isValid()) {
            this.editFulfillment.emit(this.fulfillment);
        }
    }

    isValid(): boolean {
        if (this.fulfillment
            && this.fulfillment.ShipDate
            && this.fulfillment.ShipmentTrackings.find(val => !!val.TrackingNumber && val.TrackingNumber.toString().trim() != '')
            && this.fulfillment.ShipmentTrackings.length > 0
            && this.fulfillment.Carrier
            && this.fulfillment.ShippingMethod
            && this.fulfillment.FulfillmentSalesOrderLines
            && this.fulfillment.FulfillmentSalesOrderLines.length > 0
            && this.getTotalPackageQty() > 0
        ) {
            return true;
        } else {
            if (this.getTotalPackageQty() == 0) {
                this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: 'Item is required'});
            } else if (!this.fulfillment.ShipmentTrackings.find(val => !!val.TrackingNumber && val.TrackingNumber.toString().trim() != '') || this.fulfillment.ShipmentTrackings.length == 0) {
                this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: 'Tracking Number is required'});
            } else {
                this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: 'Please enter all required fields'});
            }

            return false;
        }
    }

    public getTotalPackageQty(): number {
        let total = 0;
        if (this.fulfillment != null && this.fulfillment.FulfillmentSalesOrderLines != null && this.fulfillment.FulfillmentSalesOrderLines.length > 0) {
            this.fulfillment.FulfillmentSalesOrderLines.forEach(x => total += x.PackageQuantity);
        }
        return total;
    }
}
