import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PurchaseOrder } from '../../../../shared/class/purchase-order';
import { InboundShippingMethod } from '../../../../shared/class/inbound-shipping-method';
import { PurchaseOrderService } from '../../../purchase-order.service';

@Component({
  selector: 'o-inbound-shipment-edit-shipping',
  templateUrl: './inbound-shipment-edit-shipping.component.html',
  styleUrls: ['../../inbound-shipment-edit.component.css']
})

export class InboundShipmentEditShippingComponent implements OnInit {
    private purchaseOrderSubscription: Subscription;

    errorMessage: string;
    purchaseorder: PurchaseOrder;
    inboundShippingMethod: InboundShippingMethod;
    origStatus: string;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private purchaseOrderService: PurchaseOrderService) { 
        this.purchaseOrderService.currentStep = 3;
    }

    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);

    get isValidShipment() {
        if (this.purchaseOrderService.getCurrentPurchaseOrderLines()) {
            const invalidIndex = this.purchaseOrderService.getCurrentPurchaseOrderLines().findIndex(purchaseorderline => purchaseorderline.Quantity !== purchaseorderline.CartonQuantity);
            return invalidIndex < 0;
        } else {
            return false;
        }
    }

    ngOnInit(): void {
        

        const param = this.route.parent.snapshot.params['id'];
        this.purchaseOrderSubscription = this.purchaseOrderService.getCurrentPurchaseOrderEdit(param).subscribe(
            (purchaseorder) => {
                this.purchaseOrderService.currentPurchaseOrderEdit = purchaseorder;
                this.purchaseorder = this.purchaseOrderService.currentPurchaseOrderEdit;
                this.origStatus = this.purchaseorder.Status;
                
                if (this.purchaseorder.InboundShippingMethods && this.purchaseorder.InboundShippingMethods[0]) {
                    this.inboundShippingMethod = this.purchaseorder.InboundShippingMethods[0];
                    //this.purchaseOrderService.currentInboundShippingMethod = this.inboundShippingMethod;
                } else {
                    if(!this.purchaseorder.InboundShippingMethods)
                    {
                        this.purchaseorder.InboundShippingMethods = [];
                    }
                    const _temp = new InboundShippingMethod(null, param, '', '', '', null, null);
                    this.purchaseorder.InboundShippingMethods.push(_temp);
                    this.inboundShippingMethod = this.purchaseorder.InboundShippingMethods[0];
                    //this.purchaseOrderService.currentInboundShippingMethod = this.inboundShippingMethod;                    
                    //this.purchaseOrderService.currentInboundShippingMethods.push(this.inboundShippingMethod);
                }
            },
            error => this.errorMessage = <any>error
        );        

        // this.purchaseOrderService.getInboundShippingMethods(param).subscribe(
        //     (inboundshippingmethods: InboundShippingMethod[]) => {
        //         this.purchaseOrderService.currentInboundShippingMethods = inboundshippingmethods;
        //         if (inboundshippingmethods && inboundshippingmethods[0]) {
        //             this.inboundShippingMethod = inboundshippingmethods[0];
        //             this.purchaseOrderService.currentInboundShippingMethod = inboundshippingmethods[0];
        //         } else {
        //             this.inboundShippingMethod = new InboundShippingMethod(null, param, '', '', '', null, null);
        //             this.purchaseOrderService.currentInboundShippingMethod = this.inboundShippingMethod;
        //             this.purchaseOrderService.currentInboundShippingMethods.push(this.inboundShippingMethod);
        //         }
        //     },
        //     error => this.errorMessage = <any>error
        // );
    }

    savePurchaseOrderShipment(): void {
        if (this.purchaseorder.ShipmentDate && this.inboundShippingMethod.BillingOfLading && this.inboundShippingMethod.ContainerNumber) { // && this.purchaseorder.ShipmentDate !== '') {
            this.purchaseorder.Status = 'Shipping';
            this.purchaseOrderService.editPurchaseOrder(this.purchaseorder).subscribe(
                (data) => {
                    this.origStatus = this.purchaseorder.Status;
                    this.onSaveComplete(`${this.purchaseorder.PackingSlipNumber} was saved`);
                },
                (error: any) => {
                    this.errorMessage = <any>error;
                    this.purchaseorder.Status = this.origStatus;
                }
            );

            if (this.inboundShippingMethod.InboundShippingMethodID) {
                this.purchaseOrderService.editInboundShippingMethod(this.inboundShippingMethod).subscribe(
                    () => this.onSaveComplete(`${this.inboundShippingMethod.PurchaseOrderID} was saved`),
                    (error: any) => this.errorMessage = <any>error
                );
            } else {
                this.purchaseOrderService.addInboundShippingMethod(this.inboundShippingMethod).subscribe(
                    (data) => {
                        //console.log(data);
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                    }
                );
            }
        } else {
            //alert('Shipment Date, B/L, and Container Number is required!');
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Invalid Data', content: 'Shipment Date, B/L, and Container Number is required!' });
        }
    }

    cancelPurchaseOrder(): void {
        this.purchaseorder.Status = 'Canceled';
        this.purchaseOrderService.editPurchaseOrder(this.purchaseorder).subscribe(
            (data) => {
                this.origStatus = this.purchaseorder.Status;
                this.onSaveComplete(`${this.purchaseorder.PackingSlipNumber} was saved`);
            },
            (error: any) => {
                this.errorMessage = <any>error;
                this.purchaseorder.Status = this.origStatus;
            }
        );
    }

    onSaveComplete(message?: string): void {
        this.purchaseOrderService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
        // Navigate back to the purchase order list
        // this.router.navigate(['/purchase-order', this.purchaseorderline.PurchaseOrderID, 'detail', 'line']);
    }
}
