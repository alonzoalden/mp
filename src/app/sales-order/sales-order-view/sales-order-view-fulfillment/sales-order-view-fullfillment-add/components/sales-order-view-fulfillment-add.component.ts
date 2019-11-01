import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource} from '@angular/material';
import { SalesOrder } from '../../../../../shared/class/sales-order';
import { Fulfillment, ShipmentTracking, FulfillmentSalesOrderLine } from '../../../../../shared/class/fulfillment';
import { SalesOrderService } from '../../../../sales-order.service';
import { environment } from '../../../../../../environments/environment';

@Component({
    selector: 'o-sales-order-fulfillment-add',
    templateUrl: './sales-order-view-fulfillment-add.component.html'
})

export class SalesOrderFulfillmentAddComponent implements OnInit, OnChanges {
    imageURL = environment.imageURL;
    linkURL = environment.linkURL;
    @Input() errorMessage: string;
    @Input() salesOrder: SalesOrder;
    @Input() fulfillment: Fulfillment;
    @Input() isLoading: boolean;
    @Input() fulfillmentSalesOrderLinesMatTable: MatTableDataSource<FulfillmentSalesOrderLine>;
    @Output() getFulfilledBySalesOrder = new EventEmitter<{orderid: number, fulfilledby: string}>();
    @Output() getFulfilmmentSalesOrderLines = new EventEmitter<number>();
    @Output() addFulfillment = new EventEmitter<{fulfillment: Fulfillment, orderid: number; fulfilledby: string}>();
    orderid: number;
    fulfilledby: string;
    displayedColumns = ['ProductDetails', 'RemainingQuantity', 'PackageQuantity'];
    dataSource: any = null;
    shipmentTrackings: ShipmentTracking[] = [];

    constructor(
        private route: ActivatedRoute,
        private salesorderService: SalesOrderService
    ) { }

    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2040, 0, 1);

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.fulfillmentSalesOrderLinesMatTable && changes.fulfillmentSalesOrderLinesMatTable.currentValue.data.length) {
            this.fulfillment = new Fulfillment(null, String(this.orderid), null, null, null, null, null, null, null, null, null, this.shipmentTrackings, this.fulfillmentSalesOrderLinesMatTable.data);
            this.dataSource = new MatTableDataSource<FulfillmentSalesOrderLine>(this.fulfillment.FulfillmentSalesOrderLines);
        }
        if (changes.salesOrder && !changes.salesOrder.currentValue && changes.salesOrder.firstChange) {
            this.getFulfilledBySalesOrder.emit({orderid: this.route.parent.snapshot.params['id'], fulfilledby: this.route.parent.snapshot.params['fulfilledby']});
        }
    }

    ngOnInit() {
        this.isLoading = true;
        this.orderid = this.route.parent.snapshot.params['id'];
        this.fulfilledby = 'merchant';
        this.getFulfilmmentSalesOrderLines.emit(this.orderid);
        this.fulfillment = new Fulfillment(null, String(this.orderid), null, null, null, null, null, null, null, null, null, this.shipmentTrackings, this.fulfillmentSalesOrderLinesMatTable.data);

        this.shipmentTrackings = [];
        this.addNewShipmentTracking();
    }

    addNewShipmentTracking() {
        const _temp = new ShipmentTracking(null, null, null, null);
        this.shipmentTrackings.push(_temp);
    }
    onAddShipmentTracking() {
        this.addNewShipmentTracking();
    }

    onAddFulfillment() {
        if (this.isValid()) {
            this.addFulfillment.emit({fulfillment: this.fulfillment, orderid: this.orderid, fulfilledby: this.fulfilledby});
        }
    }

    isValid(): boolean {
        if (this.fulfillment
            && this.fulfillment.ShipDate
            && this.fulfillment.ShipmentTrackings.find(val => !!val.TrackingNumber && val.TrackingNumber.toString().trim() !== '')
            && this.fulfillment.ShipmentTrackings.length > 0
            && this.fulfillment.Carrier
            && this.fulfillment.ShippingMethod
            && this.fulfillment.FulfillmentSalesOrderLines
            && this.fulfillment.FulfillmentSalesOrderLines.length > 0
            && this.getTotalPackageQty() > 0
        ) {
            return true;
        } else {
            if (this.getTotalPackageQty() === 0) {
                this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: 'Item is required'});
            } else if (!this.fulfillment.ShipmentTrackings.find(val => !!val.TrackingNumber && val.TrackingNumber.toString().trim() !== '') || this.fulfillment.ShipmentTrackings.length === 0) {
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
