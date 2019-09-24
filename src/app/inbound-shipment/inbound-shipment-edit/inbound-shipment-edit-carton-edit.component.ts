import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
//import { Carton } from '../../shared/class/carton';
import { Carton } from '../../shared/class/purchase-order';

import { PurchaseOrderService } from '../purchase-order.service';

@Component({
  selector: 'o-inbound-shipment-edit-carton-edit.component',
  templateUrl: './inbound-shipment-edit-carton-edit.component.html'
})

export class InboundShipmentEditCartonEditComponent implements OnInit, OnDestroy {
    carton: Carton;
    subscription: Subscription;
    purchaseorderid: number;

    errorMessage: string;
    pendingSave: boolean;


    constructor(private route: ActivatedRoute,
                private router: Router,
                private purchaseOrderService: PurchaseOrderService) {
        this.purchaseorderid = route.snapshot.parent.parent.params['id'];
    }

    ngOnInit() {
        const cartonid = this.route.snapshot.params['cid'];
        this.purchaseOrderService.getCarton(cartonid).subscribe(
            (carton: Carton) => {
                this.carton = carton;
                //this.purchaseOrderService.currentCarton = carton;
                this.purchaseOrderService.currentCarton.next(carton);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    ngOnDestroy() {
        
    }

    onSaveCarton(): void {
        if(this.isValid()) {     
            this.pendingSave = true;   
            this.purchaseOrderService.editCarton(this.carton).subscribe(
                () => {
                    this.pendingSave = false;
                    this.onSaveComplete(`${this.carton.CartonNumber} was saved`);
                },
                (error: any) => {
                    this.pendingSave = false;
                    this.errorMessage = <any>error;
                    this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    this.router.navigate(['/nbound-shipment', this.purchaseorderid, 'edit', 'carton']);
                    window.location.reload();
                }
            );
        }
        else {
            //alert("Please enter all required fields");
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Invalid Data', content: 'Please enter all required fields' });
        }
    }

    onSaveComplete(message?: string): void {
        this.purchaseOrderService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
        this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'carton']);
    }

    cancelCarton() {
        this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'carton']);
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
