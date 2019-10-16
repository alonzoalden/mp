import { Component, OnInit, ViewChild, Output, EventEmitter, SimpleChanges, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource} from '@angular/material';
import { SalesOrder } from '../../../../../shared/class/sales-order';
import { Fulfillment } from '../../../../../shared/class/fulfillment';

@Component({
  selector: 'o-sales-order-fulfillment-list',
  templateUrl: './sales-order-view-fulfillment-list.component.html'
})

export class SalesOrderFulfillmentListComponent implements OnInit, OnChanges {
    @Input() fulfillmentsMatTable: MatTableDataSource<Fulfillment>;
    @Input() errorMessage: string;
    @Input() salesOrder: SalesOrder;
    @Input() isLoading: boolean;
    @Output() getFulfilledBySalesOrder = new EventEmitter<{orderid: number, fulfilledby: string}>();
    @Output() getFulfilledByFulfillments = new EventEmitter<{orderid: number, fulfilledby: string}>();
    @Output() getSalesOrderDelivery = new EventEmitter<number>();
    @Output() setFulfillment = new EventEmitter<Fulfillment>();
    @Output() deleteFulfillment = new EventEmitter<number>();
    salesorder: SalesOrder;
    orderid: number;
    fulfilledby: string;
    fulfillments: Fulfillment[];
    displayedColumns = ['Menu', 'Package', 'ID', 'ShipDate', 'Carrier', 'ShippingService', 'TrackingNumber'];
    dataSource: any = null;
    isMerchant: boolean;

    constructor(private route: ActivatedRoute) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.salesOrder && !changes.salesOrder.currentValue && changes.salesOrder.firstChange) {
            this.getFulfilledBySalesOrder.emit({orderid: this.route.snapshot.params['id'], fulfilledby: this.route.snapshot.params['fulfilledby']});
        }
        if (changes.fulfillmentsMatTable && changes.fulfillmentsMatTable.currentValue && changes.fulfillmentsMatTable.firstChange) {
            this.getFulfilledByFulfillments.emit({orderid: this.route.parent.snapshot.params['id'], fulfilledby: this.route.parent.snapshot.params['fulfilledby']});
        }

    }
    ngOnInit() {
        this.orderid = this.route.parent.snapshot.params['id'];
        this.fulfilledby = this.route.parent.snapshot.params['fulfilledby'];

        if (this.fulfilledby === 'merchant') {
            this.isMerchant = true;
        } else {
            this.isMerchant = false;
        }
    }
    onDeleteFulfillment(fulfillment: Fulfillment) {
        const confirmation = confirm(`Remove Shipment ID# ${fulfillment.FulfillmentID}?`);
        if (confirmation) {
            this.deleteFulfillment.emit(fulfillment.FulfillmentID);
        }
    }
}
