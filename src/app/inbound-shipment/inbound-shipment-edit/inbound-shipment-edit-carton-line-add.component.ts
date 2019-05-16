import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

// import { PurchaseOrderLineList, PurchaseOrderLine } from '../../shared/class/purchase-order-line';

// import { CartonLineInsert } from '../../shared/class/carton-line';
// import { Carton } from '../../shared/class/carton';

import { PurchaseOrderLineList, PurchaseOrderLine, Carton, CartonLineInsert } from '../../shared/class/purchase-order';

import { PurchaseOrderService } from '../purchase-order.service';

@Component({
    selector: 'o-inbound-shipment-edit-carton-line-add',
    templateUrl: './inbound-shipment-edit-carton-line-add.component.html'
})

export class InboundShipmentEditCartonLineAddComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    errorMessage: string;
    pendingAdd: boolean;
    
    cartonline: CartonLineInsert;
    purchaseorderid: number;
    cartonid: number;
    cartonnumber: string;
    purchaseorderlineList: PurchaseOrderLineList[];


    get carton(): Carton | null {
        return this.purchaseOrderService.currentCarton;
    }

    constructor(route: ActivatedRoute,
                private router: Router,
                private purchaseOrderService: PurchaseOrderService) {
        this.purchaseorderid = route.snapshot.parent.parent.params['id'];
    }

    ngOnInit() {
        this.cartonid = this.purchaseOrderService.currentCartonID;
        this.cartonnumber = this.purchaseOrderService.currentCarton.CartonNumber;
        this.reset();
        this.subscription = this.purchaseOrderService.getPurchaseOrderLineList(this.purchaseorderid).subscribe(
            (purchaseorderlinelist: PurchaseOrderLineList[]) => {
                // this.purchaseorderlineList = purchaseorderlinelist
                this.purchaseorderlineList = purchaseorderlinelist.filter(
                    (purchaseorderlineList: PurchaseOrderLineList) => !this.purchaseOrderService.getCurrentCartonLines().find(x => x.PurchaseOrderLineID === purchaseorderlineList.Value));
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onAddCartonLine(): void {

        if(this.isValid()) {    
            this.pendingAdd = true;   
            this.purchaseOrderService.addCartonLine(this.cartonline)
                .subscribe(
                    () => {
                        this.pendingAdd = false;
                        this.onAddComplete(`Saved`)
                    },
                    (error: any) => {
                        this.pendingAdd = false;
                        //this.errorMessage = <any>error;
                        this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: <any>error });
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

    reset() {
        this.cartonline = new CartonLineInsert(this.cartonid, null, null);
    }

    onAddComplete(message?: string) {
        // this.purchaseOrderService.clearPurchaseOrderLines();
        // const purchaseorderline = this.purchaseOrderService.currentPurchaseOrderLines.find(x => x.PurchaseOrderLineID === this.cartonline.PurchaseOrderLineID);
        // purchaseorderline.CartonQuantity += this.cartonline.Quantity;
        // this.purchaseOrderService.replacePurchaseOrderLine(this.cartonline.PurchaseOrderLineID, purchaseorderline);

        this.purchaseOrderService.sendNotification({ type: 'success', title: 'Successfully Created', content: message });
        this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'carton']);
    }
}
