import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

//import { PurchaseOrderLineList, PurchaseOrderLine } from '../../shared/class/purchase-order-line';

//import { Carton, CartonInsert } from '../../shared/class/carton';
import { Carton, CartonInsert, PurchaseOrderLineList, PurchaseOrderLine } from '../../../../shared/class/purchase-order';

import { PurchaseOrderService } from '../../../purchase-order.service';

@Component({
    templateUrl: './inbound-shipment-edit-carton-add-shell.component.html'
})

export class InboundShipmentEditCartonAddShellComponent implements OnInit, OnDestroy {
    errorMessage: string;

    cartons: Carton[];
    carton: CartonInsert;
    purchaseorderid: number;
    pendingAdd: boolean;

    constructor(route: ActivatedRoute,
                private router: Router,
                private purchaseOrderService: PurchaseOrderService) {
        this.purchaseorderid = route.snapshot.parent.parent.params['id'];
    }

    ngOnInit() {
        this.purchaseOrderService.getCartons(this.purchaseorderid).subscribe(
            (cartons: Carton[]) => {
                this.cartons = cartons;
            },
            (error: any) => this.errorMessage = <any>error
        );
        
        this.reset();
    }

    ngOnDestroy() {
        
    }

    onAddCarton(): void {
        if(this.isValid()) {
            this.pendingAdd = true;
            this.purchaseOrderService.addCarton(this.carton)
                .subscribe(
                    () => {
                        this.pendingAdd = false;
                        this.onAddComplete(`Saved`);
                    },
                    (error: any) => {
                        this.pendingAdd = false;
                        this.errorMessage = <any>error;
                    }
            );
        }
        else {
            //alert("Please enter all required fields");
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Invalid Data', content: 'Please enter all required fields' });
        }
    }

    reset() {
        this.carton = new CartonInsert(this.purchaseorderid, this.cartons ? this.cartons.length + 1 : 1, null, null, null, null, 1,[]);
    }

    onAddComplete(message?: string) {
        // this.purchaseOrderService.clearPurchaseOrderLines();
        this.purchaseOrderService.sendNotification({ type: 'success', title: 'Successfully Created', content: message });
        this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'carton']);
        //window.location.reload();
    }

    isValid() {
        return (
            this.carton.Length &&
            this.carton.Width &&
            this.carton.Height &&
            this.carton.Weight &&
            this.carton.LabelQty        
        )
    }
}
