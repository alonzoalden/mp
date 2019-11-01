import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseOrderService } from './purchase-order.service';
import { Subscription } from 'rxjs';
import { NotificationComponent } from '../../shared/tool/notification/notification.component';

@Component({
    selector: 'o-inbound-shipment',
    templateUrl: './inbound-shipment.component.html',
})
export class InboundShipmentComponent implements OnInit  {
    subscription: Subscription;

    @ViewChild(NotificationComponent, { static: true })
    public notificationComponent: NotificationComponent;

    constructor(private route: ActivatedRoute, private purchaseorderService: PurchaseOrderService) {
    }

    ngOnInit() {
        if (this.route.snapshot.queryParams['init']) {
            this.purchaseorderService.resetPurchaseOrders();
        }
    }
}
