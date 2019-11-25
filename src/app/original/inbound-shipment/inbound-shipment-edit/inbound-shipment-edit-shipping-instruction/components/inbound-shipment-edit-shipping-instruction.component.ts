import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseOrderService } from '../../../purchase-order.service';
import { PurchaseOrder } from '../../../../../shared/class/purchase-order';
import { InboundShipmentEditShippingInstructionCartonPrintDialogComponent } from './inbound-shipment-edit-shipping-instruction.component-carton-print-dialog';
import { CustomPrintLabel } from 'app/shared/class/label';

@Component({
    selector: 'o-inbound-shipment-edit-shipping-instruction',
    templateUrl: './inbound-shipment-edit-shipping-instruction.component.html',
    styleUrls: ['../../components/inbound-shipment-edit.component.css']
})

export class InboundShipmentEditShippingInstructionComponent implements OnInit {
    errorMessage: string;
    purchaseorder: PurchaseOrder;
    purchaseorderid: number;

    constructor(private route: ActivatedRoute,
                private purchaseOrderService: PurchaseOrderService,
                public cartonPrintDialog: MatDialog) { }

    ngOnInit() {
        this.purchaseorderid = this.route.parent.snapshot.params['id'];

        this.purchaseOrderService.getCurrentPurchaseOrderEdit(this.purchaseorderid).subscribe(
            (purchaseorder: PurchaseOrder) => {
                this.purchaseOrderService.currentPurchaseOrderEdit = purchaseorder;
                this.purchaseorder = this.purchaseOrderService.currentPurchaseOrderEdit;
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    openDialogPrintCartonLabel() {
        const dialogRef = this.cartonPrintDialog.open(InboundShipmentEditShippingInstructionCartonPrintDialogComponent, {
          width: '420px',
          data: this.purchaseorder
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (result.isCustom) {
                    this.onPrintAllCartonLabelsCustom(result.customOptions);
                }
                else {
                    this.onPrintAllCartonLabels(result.customOptions.Border);
                }
            }
        });
    }

    onPrintAllCartonLabels(border: string) {
        this.purchaseOrderService.downloadAllCartonLabel(this.purchaseorderid, border).subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = 'Carton_' +  this.purchaseorder.PackingSlipNumber;
                    window.navigator.msSaveOrOpenBlob(data, fileName + '.pdf');
                } else {
                    const fileURL = window.URL.createObjectURL(blob);
                    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
                    a.href = fileURL;
                    a.download = 'Carton_' +  this.purchaseorder.PackingSlipNumber;
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }
    onPrintAllCartonLabelsCustom(options: CustomPrintLabel) {
        this.purchaseOrderService.downloadAllCartonLabelCustom(this.purchaseorderid, options).subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = 'Carton_' +  this.purchaseorder.PackingSlipNumber;
                    window.navigator.msSaveOrOpenBlob(data, fileName + '.pdf');
                } else {
                    const fileURL = window.URL.createObjectURL(blob);
                    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
                    a.href = fileURL;
                    a.download = 'Carton_' +  this.purchaseorder.PackingSlipNumber;
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }
}
