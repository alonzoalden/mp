import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseOrderService } from '../../purchase-order.service';
import { PurchaseOrder, Carton, CartonInsert, CartonLine, CartonLineInsert } from '../../../shared/class/purchase-order';

@Component({
    selector: 'o-inbound-shipment-edit-shipping-instruction',
    templateUrl: './inbound-shipment-edit-shipping-instruction.component.html',		
    styleUrls: ['./inbound-shipment-edit.component.css']
})

export class InboundShipmentEditShippingInstructionComponent implements OnInit {
    errorMessage: string;
    purchaseorder: PurchaseOrder;
    purchaseorderid: number;

    constructor(private route: ActivatedRoute,
                private router: Router,
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
        const dialogRef = this.cartonPrintDialog.open(InboundShipmentEditShippingInstructionComponentCartonPrintDialog, {
          width: '250px',
          data: this.purchaseorder
        });
    
        dialogRef.afterClosed().subscribe(result => {
            this.onPrintAllCartonLabels(result.Border);
        });
    }

    onPrintAllCartonLabels(border: string) {
        this.purchaseOrderService.downloadAllCartonLabel(this.purchaseorderid, border).subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = 'Carton_' +  this.purchaseorder.PackingSlipNumber;
                    window.navigator.msSaveOrOpenBlob(data, fileName + '.pdf'); // IE is the worst!!!
                } else {
                    // const iframe = document.createElement('iframe');
                    // iframe.style.display = 'none';
                    // iframe.src = blobUrl;
                    // document.body.appendChild(iframe);

                    // iframe.onload = (function() {
                    //     iframe.contentWindow.focus();
                    //     iframe.contentWindow.print();
                    // });
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


export class CartonAllLabelPrintDialog {
    constructor(
        public Border: string
    ) {}
}

@Component({
    selector: 'inbound-shipment-edit-shipping-instruction.component-carton-print-dialog',
    templateUrl: 'inbound-shipment-edit-shipping-instruction.component-carton-print-dialog.html',
  })

export class InboundShipmentEditShippingInstructionComponentCartonPrintDialog implements OnInit {
    cartonLabelPrintDialog: CartonAllLabelPrintDialog;

    constructor(
        public dialogRef: MatDialogRef<InboundShipmentEditShippingInstructionComponentCartonPrintDialog>,
        @Inject(MAT_DIALOG_DATA) public data: PurchaseOrder) {
            //console.log(data);
        }

    ngOnInit() {
        //this.quantity = this.data.LabelQty;
        this.cartonLabelPrintDialog = new CartonAllLabelPrintDialog("yes");
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}

