import { Component, OnInit, OnChanges, ChangeDetectorRef, Inject, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseOrder, PurchaseOrderLine, Carton } from '../../../shared/class/purchase-order';
import { PurchaseOrderService } from '../../purchase-order.service';
import { InboundShippingMethod } from '../../../shared/class/inbound-shipping-method';

@Component({
  selector: 'o-inbound-shipment-edit',
  templateUrl: './inbound-shipment-edit.component.html',
  styleUrls: ['./inbound-shipment-edit.component.css']
})

export class InboundShipmentEditComponent implements OnInit, OnChanges {
    @Input() purchaseOrder: PurchaseOrder;
    @Input() errorMessage: string;
    @Input() isLoading: boolean;
    @Input() pendingSave: boolean;
    @Output() getPurchaseOrder = new EventEmitter<number>();
    @Output() addNewPurchaseOrder = new EventEmitter<void>();
    @Output() editPurchaseOrder = new EventEmitter<{ purchaseOrder: PurchaseOrder, printLabel: boolean }>();
    @Output() editPurchaseOrderThenPrintItemLabels = new EventEmitter<{ purchaseOrder: PurchaseOrder, size: string, border: string }>();
    @Output() downloadPurchaseOrderLabel = new EventEmitter<PurchaseOrder>();
    @Output() downloadAllItemLabel = new EventEmitter<{purchaseOrder: PurchaseOrder, border: string}>();
    @Output() downloadAllItemLargeLabel = new EventEmitter<{purchaseOrder: PurchaseOrder, border: string}>();
    @Output() setSelectedPurchaseOrder = new EventEmitter<PurchaseOrder>();
    @Output() setSelectedCarton = new EventEmitter<Carton>();

    private originalPurchaseOrder: PurchaseOrder;
    private currentPurchaseOrder: PurchaseOrder;
    private currentInboundShippingMethod: InboundShippingMethod;
    private currentPurchaseOrderLines: PurchaseOrderLine[];
    private dataIsValid: { [key: string]: boolean } = {};
    purchaseorderid: number;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private cd: ChangeDetectorRef,
        private purchaseOrderService: PurchaseOrderService,
        public itemPrintDialog: MatDialog) {
    }

    get isValidShipment() {
        return (this.validatePurchaseOrderLines()
            && this.validateCarton()
            && this.validateShipping());
    }

    get currentStep() {
        return (this.purchaseOrderService.currentStep);
    }

    get qtyUpdated() {
        return false;
        //return (this.purchaseOrderService.currentPurchaseLineIsUpdated);
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.purchaseorderid = this.route.snapshot.params['id'];
        this.route.params.subscribe(params => {
            this.purchaseorderid = params.id;
            if (params.id == 0)  {
                this.addNewPurchaseOrder.emit();
            } else {
                this.getPurchaseOrder.emit(this.purchaseorderid);
            }
        });
    }

    get purchaseorderlines(): PurchaseOrderLine[] {
        return this.currentPurchaseOrderLines;
    }
    set purchaseorderlines(value: PurchaseOrderLine[]) {
        this.currentPurchaseOrderLines = value;
    }

    get inboundShippingMethod(): InboundShippingMethod {
        return this.currentInboundShippingMethod;
    }
    set inboundShippingMethod(value: InboundShippingMethod) {
        this.currentInboundShippingMethod = value;
    }

    get hasChange(): boolean {
        return JSON.stringify(this.originalPurchaseOrder) !== JSON.stringify(this.currentPurchaseOrder);
    }

    cancelEdit(): void {
        this.router.navigate(['/item']);
    }

    confirmLoseChange(): void {
        this.purchaseOrderService.replacePurchaseOrder(this.originalPurchaseOrder.PurchaseOrderID, this.originalPurchaseOrder);
    }

    // Reset the data
    // Required after a save so the data is no longer seen as dirty.
    reset(): void {
        this.dataIsValid = null;
        this.currentPurchaseOrder = null;
        this.originalPurchaseOrder = null;
    }

    isValid(path: string): boolean {
        this.validate();
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
    }

    validate(): void {
        if (!this.purchaseOrder) {
            return;
        }

        // Clear the validation object
        this.dataIsValid = {};

        // 'Line' tab
        // if (this.purchaseOrder && this.purchaseOrderService.validatePurchaseOrderLines()) {
        if (this.purchaseOrder && this.validatePurchaseOrderLines()) {
            this.dataIsValid['line/list'] = true;
        } else {
            this.dataIsValid['line/list'] = false;
        }

        // 'Carton' tab
        if (this.purchaseOrder && this.validateCarton()) {
            this.dataIsValid['carton/list/line'] = true;
        } else {
            this.dataIsValid['carton/list/line'] = false;
        }

        // 'Shipping' tab
        // if (this.purchaseOrder && this.purchaseOrderService.validateShipping()) {
        if (this.purchaseOrder && this.validateShipping()) {
            this.dataIsValid['shipping'] = true;
        } else {
            this.dataIsValid['shipping'] = false;
        }
    }

    validatePurchaseOrderLines() {
        return (this.purchaseOrder && this.purchaseOrder.PurchaseOrderLines
            && this.purchaseOrder.PurchaseOrderLines.length > 0
            && this.purchaseOrder.PurchaseOrderLines[0].ItemName);
    }

    validateCarton() {
        return (this.purchaseOrder && this.purchaseOrder.PurchaseOrderLines
            && !this.purchaseOrder.PurchaseOrderLines.find(x => x.CartonQuantity !== x.Quantity && !x.pendingAdd));
    }

    validateShipping() {
        return (this.purchaseOrder.ShipmentDate &&
            this.purchaseOrder.InboundShippingMethods[0] &&
            this.purchaseOrder.InboundShippingMethods[0].BillingOfLading &&
            this.purchaseOrder.InboundShippingMethods[0].ContainerNumber);
    }

    saveInboundShipment(printLabel: boolean = false): void {
        if (this.purchaseOrder) {

            if (this.purchaseOrder.Status == 'Pending') {
                this.save(printLabel);
            } else if (printLabel) {
                this.onPrintLabel();
            }

            this.goNext();
        } else {
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Invalid Entry', content: 'Please enter all required fields' });
        }
    }

    goNext() {
        if (this.isLineList()) {
            this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'carton', 'list', 'line']);
        } else if (this.isCartonList()) {
            this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'shippinginstruction']);
        } else if (this.isShippingInstruction()) {
            this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'shipping']);
        }
    }

    goBack() {
        if (this.isCartonList()) {
            this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'line', 'list']);
        } else if (this.isShippingInstruction()) {
            this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'carton', 'list', 'line']);
        } else if (this.isShipping()) {
            this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'shippinginstruction']);
        }
    }

    saveInboundShipmentAndContinue() {
        if (this.purchaseOrder) {
            this.save(false);

            if (this.isLineList()) {
                this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'carton', 'list', 'line']);
            } else if (this.isCartonList()) {
                this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'shippinginstruction']);
            } else if (this.isShippingInstruction()) {
                this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'shipping']);
            }

        } else {
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Invalid Entry', content: 'Please enter all required fields' });
        }
    }

    isInboundShipmentPending() {
        return this.purchaseOrder.Status == 'Pending';
    }

    isLineList() {
        return this.router.url.indexOf('/edit/line/list') > 0;
    }

    isCartonList() {
        return this.router.url.indexOf('/edit/carton/list') > 0;
    }

    isShippingInstruction() {
        return this.router.url.indexOf('/edit/shippinginstruction') > 0;
    }

    isShipping() {
        return this.router.url.indexOf('/edit/shippinginstruction') <= 0 && this.router.url.indexOf('/edit/shipping') > 0;
    }

    save(printLabel: boolean = false) {
        this.setSelectedCarton.emit(null);
        //this.pendingSave = true;
        const newPurchaseOrder = this.purchaseOrderService.copyPurchaseOrder(this.purchaseOrder);
        if (newPurchaseOrder.PurchaseOrderLines) {
            const pendingPurchaseOrderLineIndex = newPurchaseOrder.PurchaseOrderLines.findIndex(i => i.pendingAdd === true);
            if (pendingPurchaseOrderLineIndex > -1) {
                newPurchaseOrder.PurchaseOrderLines.splice(pendingPurchaseOrderLineIndex, 1);
            }
        }

        if (newPurchaseOrder.Cartons) {
            const pendingCartonIndex = newPurchaseOrder.Cartons.findIndex(i => i.pendingAdd === true);
            if (pendingCartonIndex > -1) {
                newPurchaseOrder.Cartons.splice(pendingCartonIndex, 1);

                newPurchaseOrder.Cartons.forEach((c, i) => {
                    c.Position = i + 1;

                    if (c.CartonLines) {
                        const pendingCartonLineIndex = c.CartonLines.findIndex(i => i.pendingAdd === true);
                        if (pendingCartonLineIndex > -1) {
                            c.CartonLines.splice(pendingCartonLineIndex, 1);
                        }
                    }
                });
            }
        }
        this.editPurchaseOrder.emit({purchaseOrder: newPurchaseOrder, printLabel: printLabel});
    }

    saveAndShipInboundShipment(): void {
        // console.log(this.purchaseOrder);
        if (this.purchaseOrder && this.purchaseOrder.ShipmentDate && this.purchaseOrder.InboundShippingMethods[0].BillingOfLading && this.purchaseOrder.InboundShippingMethods[0].ContainerNumber) { // && this.purchaseOrder.ShipmentDate !== '') {
            this.purchaseOrder.Status = 'Shipping';
            this.save();
        } else {
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Invalid Data', content: 'Shipment Date, B/L, and Container Number is required!' });
        }
    }
    cancelPurchaseOrder(): void {
        this.purchaseOrder.Status = 'Canceled';
        this.save();
    }

    onPrintAllCartonLabels() {
        this.purchaseOrderService.downloadAllCartonLabel(this.purchaseorderid, 'yes').subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = 'Carton_' +  this.purchaseorderid;
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
                    a.download = 'Carton_' +  this.purchaseorderid;
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }

    onSaveComplete(message?: string): void {
        //this.reset();
        this.purchaseOrderService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
        // Navigate back to the item list
        //this.router.navigate(['/inbound-shipment']);
        //location.reload();
    }

    openDialogPrintAllItemLabel() {

        const dialogRef = this.itemPrintDialog.open(InboundShipmentEditComponentItemPrintDialog, {
            width: '250px',
            data: this.purchaseOrder
        });

        dialogRef.afterClosed().subscribe(result => {
            if (this.isInboundShipmentPending()) {
                //this.save();

                //this.pendingSave = true;
                const newPurchaseOrder = this.purchaseOrderService.copyPurchaseOrder(this.purchaseOrder);
                if (newPurchaseOrder.PurchaseOrderLines) {
                    const pendingPurchaseOrderLineIndex = newPurchaseOrder.PurchaseOrderLines.findIndex(i => i.pendingAdd === true);
                    if (pendingPurchaseOrderLineIndex > -1) {
                        newPurchaseOrder.PurchaseOrderLines.splice(pendingPurchaseOrderLineIndex, 1);
                    }
                }
                if (newPurchaseOrder.Cartons) {
                    const pendingCartonIndex = newPurchaseOrder.Cartons.findIndex(i => i.pendingAdd === true);
                    if (pendingCartonIndex > -1) {
                        newPurchaseOrder.Cartons.splice(pendingCartonIndex, 1);

                        newPurchaseOrder.Cartons.forEach((c, i) => {
                            c.Position = i + 1;

                            if (c.CartonLines) {
                                const pendingCartonLineIndex = c.CartonLines.findIndex(i => i.pendingAdd === true);
                                if (pendingCartonLineIndex > -1) {
                                    c.CartonLines.splice(pendingCartonLineIndex, 1);
                                }
                            }
                        });
                    }
                }
                //this.loading = true;

                this.editPurchaseOrderThenPrintItemLabels.emit({purchaseOrder: newPurchaseOrder, size: result.Size, border: result.Border});
            } else if (result.Size == 'small') {
                this.onPrintAllItemLabels(result.Border);
            } else {
                this.onPrintAllItemLargeLabels(result.Border);
            }
        });
        //downloadAllItemLabel
    }

    onPrintAllItemLabels(border: string) {

        this.downloadAllItemLabel.emit({purchaseOrder: this.purchaseOrder, border: border});

    }

    onPrintAllItemLargeLabels(border: string) {
        this.downloadAllItemLargeLabel.emit({purchaseOrder: this.purchaseOrder, border: border});
    }

    onPrintLabel() {
        this.downloadPurchaseOrderLabel.emit(this.purchaseOrder);
    }

}


export class LineItemLabelPrintDialog {
    constructor(
        public Size: string,
        public Border: string
    ) {}
}

@Component({
    selector: 'inbound-shipment-edit.component-item-print-dialog',
    templateUrl: 'inbound-shipment-edit.component-item-print-dialog.html',
  })

export class InboundShipmentEditComponentItemPrintDialog implements OnInit {
    lineItemLabelPrintDialog: LineItemLabelPrintDialog;

    constructor(
        public dialogRef: MatDialogRef<InboundShipmentEditComponentItemPrintDialog>,
        @Inject(MAT_DIALOG_DATA) public data: PurchaseOrder) {
            // console.log(data);
        }

    ngOnInit() {
        //this.quantity = this.data.LabelQty;
        this.lineItemLabelPrintDialog = new LineItemLabelPrintDialog('small', 'yes');
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}

