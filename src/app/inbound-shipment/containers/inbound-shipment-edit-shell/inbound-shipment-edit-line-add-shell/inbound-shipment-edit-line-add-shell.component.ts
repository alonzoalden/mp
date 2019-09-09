import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PurchaseOrderLineInsert, PurchaseOrderLine } from '../../../../shared/class/purchase-order';

//import { PurchaseOrderLineInsert, PurchaseOrderLine } from '../../shared/class/purchase-order-line';
import { ItemList } from '../../../../shared/class/item';
import { Item } from '../../../../shared/class/item';

import { PurchaseOrderService } from '../../../purchase-order.service';

@Component({
    selector: 'o-inbound-shipment-edit-line-add',
    templateUrl: './inbound-shipment-edit-line-add.component.html'
})

export class InboundShipmentEditLineAddComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    errorMessage: string;
    purchaseorderline: PurchaseOrderLineInsert;
    purchaseorderid: number;
    itemList: ItemList[];
    pendingAdd: boolean;

    constructor(activatedRoute: ActivatedRoute,
                private router: Router,
                private purchaseOrderService: PurchaseOrderService) {
            this.purchaseorderid = activatedRoute.snapshot.parent.parent.params['id'];
            this.reset();
    }

    ngOnInit() {
        if (this.purchaseOrderService.getCurrentPurchaseOrderLines()) {
            this.subscription = this.purchaseOrderService.getSimpleItemList().subscribe(
                (itemlist: ItemList[]) => {
                    this.itemList = itemlist.filter(
                        (il: ItemList) => !this.purchaseOrderService.getCurrentPurchaseOrderLines().find(x => x.ItemID === il.ItemID));
                },
                (error: any) => this.errorMessage = <any>error
            );
        } else {
            this.router.navigate(['/purchase-order', this.purchaseorderid, 'detail']);
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onAddLine(): void {        
        if(this.isRequirementValid()) {
            this.pendingAdd = true;
            this.purchaseOrderService.addPurchaseOrderLine(this.purchaseorderline)
                .subscribe(
                    () => {
                        this.pendingAdd = false;
                        this.onAddComplete(`saved`);
                    },
                    (error: any) => {
                        this.pendingAdd = false;
                        this.errorMessage = <any>error;
                    }
                );
        }
        else {
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Invalid Data', content: 'All fields are required'});
        }
    }

    isRequirementValid() {
        return (this.purchaseorderline.ItemID &&
            this.purchaseorderline.FOBPrice &&
            this.purchaseorderline.Quantity &&
            this.purchaseorderline.Quantity > 0)
    }

    reset() {
        this.purchaseorderline = new PurchaseOrderLineInsert(this.purchaseorderid, null, null, null);
    }

    onAddComplete(message?: string) {
        this.purchaseOrderService.sendNotification({ type: 'success', title: 'Successfully Created', content: message });
        this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit']);
    }

    onItemChanged(newValue: number) {
        const selectedItem = this.itemList.find(x => x.ItemID === newValue);
        if (selectedItem) {
            this.purchaseorderline.FOBPrice = selectedItem.FOBPrice;
        }
    }
}
