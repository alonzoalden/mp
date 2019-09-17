import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

//import { PurchaseOrderLine } from '../../../shared/class/purchase-order-line';
import { PurchaseOrderLine } from '../../../../../shared/class/purchase-order';
import { ItemList } from '../../../../../shared/class/item';

import { PurchaseOrderService } from '../../../../purchase-order.service';

@Component({
  selector: 'o-inbound-shipment-edit-line-edit',
  templateUrl: './inbound-shipment-edit-line-edit.component.html'
})

export class InboundShipmentEditLineEditComponent implements OnInit, OnDestroy {
    private originalPurchaseOrderLine: PurchaseOrderLine;
    private currentPurchaseOrderLine: PurchaseOrderLine;
    subscription: Subscription;
    itemList: ItemList[];
    pendingAdd: boolean;

    errorMessage: string;
    private dataIsValid: { [key: string]: boolean } = {};
    constructor(private route: ActivatedRoute,
                private router: Router,
                private purchaseOrderService: PurchaseOrderService) { }

    ngOnInit() {
        const param = this.route.snapshot.params['lid'];
        this.purchaseOrderService.getPurchaseOrderLine(param).subscribe(
            purchaseorderline => {
                this.purchaseorderline = purchaseorderline;
                // this.originalPurchaseOrderLine = purchaseorderline;
            },
            error => this.errorMessage = <any>error
        );
        this.subscription = this.purchaseOrderService.getSimpleItemList().subscribe(
            (itemlist: ItemList[]) => {
                // this.itemList = itemlist
                this.itemList = itemlist.filter(
                    (il: ItemList) => !this.purchaseOrderService.getCurrentPurchaseOrderLines().find(
                        x => x.ItemID === il.ItemID && x.ItemID !== this.purchaseorderline.ItemID
                    )
                );
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    get purchaseorderline(): PurchaseOrderLine {
        return this.currentPurchaseOrderLine;
    }
    set purchaseorderline(value: PurchaseOrderLine) {
        this.currentPurchaseOrderLine = value;
        // Clone the object to retain a copy
        this.originalPurchaseOrderLine = Object.assign({}, value);
    }

    get hasChange(): boolean {
        return JSON.stringify(this.originalPurchaseOrderLine) !== JSON.stringify(this.currentPurchaseOrderLine);
    }

    saveLine(): void {
        if (this.isRequirementValid() && this.isValid(null)) {
            this.pendingAdd = true;
            this.purchaseOrderService.editPurchaseOrderLine(this.purchaseorderline)
            .subscribe(
                () => {
                    this.pendingAdd = false;
                    this.onSaveComplete(`${this.purchaseorderline.PurchaseOrderLineID} was saved`);
                },
                (error: any) => {
                    this.pendingAdd = false;
                    this.errorMessage = <any>error;
                    this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    this.purchaseOrderService.clearPurchaseOrderLines();
                    this.router.navigate(['/inbound-shipment', this.purchaseorderline.PurchaseOrderID, 'edit']);
                }
            );
        } else {
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Invalid Data', content: 'All fields are required'});
            //this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(message?: string): void {
        this.purchaseOrderService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
        // Navigate back to the purchase order list
        this.router.navigate(['/inbound-shipment', this.purchaseorderline.PurchaseOrderID, 'edit']);
    }

    cancelLine() {
        this.purchaseOrderService.replacePurchaseOrderLine(this.purchaseorderline.PurchaseOrderLineID, this.originalPurchaseOrderLine);
        this.router.navigate(['/inbound-shipment', this.purchaseorderline.PurchaseOrderID, 'edit']);
    }

    // Reset the data
    // Required after a save so the data is no longer seen as dirty.
    reset(): void {
        this.dataIsValid = null;
        this.currentPurchaseOrderLine = null;
        this.originalPurchaseOrderLine = null;
    }

    isValid(path: string): boolean {
        this.validate();
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
    }

    isRequirementValid() {
        return (this.purchaseorderline.ItemID &&
            this.purchaseorderline.FOBPrice &&
            this.purchaseorderline.Quantity &&
            this.purchaseorderline.Quantity > 0)
    }

    validate(): void {
        // Clear the validation object
        this.dataIsValid = {};
    }

    onItemChanged(newValue: number) {
        const selectedItem = this.itemList.find(x => x.ItemID === newValue);
        if (selectedItem) {
            this.purchaseorderline.FOBPrice = selectedItem.FOBPrice;
        }
    }
}
