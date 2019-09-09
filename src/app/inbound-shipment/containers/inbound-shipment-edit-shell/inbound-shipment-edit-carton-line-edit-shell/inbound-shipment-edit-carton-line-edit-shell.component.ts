import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

//import { CartonLine } from '../../shared/class/carton-line';
//import { PurchaseOrderLineList } from '../../shared/class/purchase-order-line';
import { CartonLine, PurchaseOrderLineList } from '../../../../shared/class/purchase-order';

import { PurchaseOrderService } from '../../../purchase-order.service';

@Component({
  selector: 'o-inbound-shipment-edit-carton-line-edit',
  templateUrl: './inbound-shipment-edit-carton-line-edit.component.html'
})

export class InboundShipmentEditCartonLineEditComponent implements OnInit, OnDestroy {
    originalQuantity: number;
    cartonline: CartonLine;
    cartonnumber: string;
    subscription: Subscription;

    purchaseorderid: number;
    purchaseorderlineList: PurchaseOrderLineList[];

    errorMessage: string;
    pendingSave: boolean;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private purchaseOrderService: PurchaseOrderService) {
        this.purchaseorderid = route.snapshot.parent.parent.params['id'];
    }

    ngOnInit() {
        const cartonlineid = this.route.snapshot.params['lid'];
        this.cartonnumber = this.purchaseOrderService.currentCarton.CartonNumber;
        this.purchaseOrderService.getCurrentCartonLine(cartonlineid).subscribe(
            (cartonline: CartonLine) => {
                this.cartonline = cartonline;
                this.originalQuantity = cartonline.Quantity;
                this.purchaseOrderService.currentCartonLine = cartonline;
            },
            (error: any) => this.errorMessage = <any>error
        );
        this.subscription = this.purchaseOrderService.getPurchaseOrderLineList(this.purchaseorderid).subscribe(
            (purchaseorderlinelist: PurchaseOrderLineList[]) => {
                // this.purchaseorderlineList = purchaseorderlinelist
                this.purchaseorderlineList = purchaseorderlinelist.filter(
                    (purchaseorderlineList: PurchaseOrderLineList) => !this.purchaseOrderService.getCurrentCartonLines().find(
                        x => x.PurchaseOrderLineID === purchaseorderlineList.Value && x.PurchaseOrderLineID !== this.cartonline.PurchaseOrderLineID
                    )
                );
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSaveCartonLine(): void {
        if(this.isValid()) {
            this.pendingSave = true;
            this.purchaseOrderService.editCartonLine(this.cartonline).subscribe(                
                () => {
                    this.pendingSave = false;
                    this.onSaveComplete(`${this.cartonline.CartonLineID} was saved`)
                },
                (error: any) => {
                    this.pendingSave = false;
                    this.errorMessage = <any>error;
                    this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'carton']);
                    window.location.reload();
                }
            );
        }
        else {
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Invalid Data', content: 'Please enter all required fields' });
        }
    }

    isValid() {
        return (this.cartonline
            && this.cartonline.PurchaseOrderLineID
            && this.cartonline.Quantity)
    }

    onSaveComplete(message?: string): void {
        // this.purchaseOrderService.clearPurchaseOrderLines();
        const purchaseorderline = this.purchaseOrderService.currentPurchaseOrderLines.find(x => x.PurchaseOrderLineID === this.cartonline.PurchaseOrderLineID);
        purchaseorderline.CartonQuantity += this.cartonline.Quantity - this.originalQuantity;
        this.purchaseOrderService.replacePurchaseOrderLine(this.cartonline.PurchaseOrderLineID, purchaseorderline);

        this.purchaseOrderService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
        this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'carton']);
    }

    cancelCartonLine() {
        this.purchaseOrderService.currentCartonLine.Quantity = this.originalQuantity;
        this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'carton']);
    }
}
