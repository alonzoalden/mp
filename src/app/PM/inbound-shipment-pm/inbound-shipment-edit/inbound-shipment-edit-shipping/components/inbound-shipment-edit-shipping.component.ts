import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseOrder } from '../../../../../shared/class/purchase-order';
import { InboundShippingMethod } from '../../../../../shared/class/inbound-shipping-method';
import { PurchaseOrderService } from '../../../purchase-order.service';

@Component({
  selector: 'o-inbound-shipment-edit-shipping',
  templateUrl: './inbound-shipment-edit-shipping.component.html',
  styleUrls: ['../../components/inbound-shipment-edit.component.css']
})

export class InboundShipmentEditShippingComponent implements OnInit, OnChanges {
    inboundShippingMethod: InboundShippingMethod;
    origStatus: string;

    @Input() purchaseorder: PurchaseOrder;
    @Input() errorMessage: string;

    constructor(private route: ActivatedRoute,
        private purchaseOrderService: PurchaseOrderService
    ) {}

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
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.purchaseorder.currentValue) {
            if (changes.purchaseorder.currentValue.InboundShippingMethods.length) {
                this.inboundShippingMethod = changes.purchaseorder.currentValue.InboundShippingMethods[0];
            }
            if (!changes.purchaseorder.currentValue.InboundShippingMethods.length) {
                const param = this.route.parent.snapshot.params['id'];
                const _temp = new InboundShippingMethod(null, param, '', '', '', null, null);
                this.purchaseorder.InboundShippingMethods.push(_temp);
                this.inboundShippingMethod = this.purchaseorder.InboundShippingMethods[0];
            }

        }
    }

    ngOnInit(): void {
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
    }
}
