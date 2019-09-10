import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef, Inject, enableProdMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

import { PurchaseOrder, PurchaseOrderLine } from '../../../../shared/class/purchase-order';
//import { PurchaseOrderLine } from '../../shared/class/purchase-order-line';

import { PurchaseOrderService } from '../../../purchase-order.service';
import { InboundShippingMethod } from '../../../../shared/class/inbound-shipping-method';

@Component({
  //selector: 'o-inbound-shipment-edit',
  templateUrl: './inbound-shipment-edit-shell.component.html',
  //styleUrls: ['./inbound-shipment-edit.component.css']
})

export class InboundShipmentEditShellComponent implements OnInit, AfterViewInit, OnDestroy {
    private purchaseOrderSubscription: Subscription;
    private inboundShippingMethodSubscription: Subscription;
    private purchaseOrderLineSubscription: Subscription;

    private originalPurchaseOrder: PurchaseOrder;
    private currentPurchaseOrder: PurchaseOrder;

    private currentInboundShippingMethod: InboundShippingMethod;

    private currentPurchaseOrderLines: PurchaseOrderLine[];

    purchaseorderid: number;
    errorMessage: string;
    headerLabel: string;
    private dataIsValid: { [key: string]: boolean } = {};

    pendingSave: boolean;

    origStatus: string;

    loading: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private cd: ChangeDetectorRef,
        private purchaseOrderService: PurchaseOrderService,
        public itemPrintDialog: MatDialog) {

        route.params.subscribe(val => {            
            this.purchaseorderid = this.route.snapshot.params['id'];

            this.loading = true;
            this.purchaseOrderSubscription = this.purchaseOrderService.getPurchaseOrder(this.purchaseorderid).subscribe(
                (purchaseorder: PurchaseOrder) => {
                    this.purchaseOrderService.currentPurchaseOrderEdit = purchaseorder;
                    this.purchaseorder = this.purchaseOrderService.currentPurchaseOrderEdit;
                    this.headerLabel = purchaseorder.PackingSlipNumber;
                    this.origStatus = this.purchaseorder.Status;

                    this.loading = false;
                },
                error => {
                    //this.errorMessage = <any>error;
                    this.loading = false;
                    this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    this.router.navigate(['/inbound-shipment']);
                }
            );

            this.purchaseOrderLineSubscription = this.purchaseOrderService.getPurchaseOrderLines(this.purchaseorderid).subscribe(
                (purchaseorderlines: PurchaseOrderLine[]) => {
                    this.purchaseOrderService.currentPurchaseOrderLines = purchaseorderlines;
                    this.purchaseorderlines = purchaseorderlines;
                },
                error => this.errorMessage = <any>error
            );

            this.inboundShippingMethodSubscription = this.purchaseOrderService.getInboundShippingMethods(this.purchaseorderid).subscribe(
                (inboundshippingmethods: InboundShippingMethod[]) => {
                    this.purchaseOrderService.currentInboundShippingMethods = inboundshippingmethods;
                    if (inboundshippingmethods && inboundshippingmethods[0]) {
                        this.inboundShippingMethod = inboundshippingmethods[0];
                        this.purchaseOrderService.currentInboundShippingMethod = inboundshippingmethods[0];
                    } else {
                        this.inboundShippingMethod = new InboundShippingMethod(null, this.purchaseorderid, '', '', '', null, null);
                        this.purchaseOrderService.currentInboundShippingMethod = this.inboundShippingMethod;
                        this.purchaseOrderService.currentInboundShippingMethods.push(this.inboundShippingMethod);
                    }
                },
                error => this.errorMessage = <any>error
            );

        });

    }

    get isValidShipment() {
        return (this.purchaseOrderService.validatePurchaseOrderLines() 
            && this.purchaseOrderService.validateCarton()
            && this.purchaseOrderService.validateShipping()) 
    }

    get currentStep() {
        return (this.purchaseOrderService.currentStep);
    }

    get qtyUpdated() {
        return (this.purchaseOrderService.currentPurchaseLineIsUpdated);
    }

    ngOnInit() {
        /*
        //this.cd.detach();

        this.purchaseorderid = this.route.snapshot.params['id'];

        this.loading = true;
        this.purchaseOrderSubscription = this.purchaseOrderService.getPurchaseOrder(this.purchaseorderid).subscribe(
            (purchaseorder: PurchaseOrder) => {
                this.purchaseOrderService.currentPurchaseOrderEdit = purchaseorder;
                this.purchaseorder = this.purchaseOrderService.currentPurchaseOrderEdit;
                this.headerLabel = purchaseorder.PackingSlipNumber;
                this.origStatus = this.purchaseorder.Status;

                this.loading = false;
            },
            error => {
                //this.errorMessage = <any>error;
                this.loading = false;
                this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                this.router.navigate(['/inbound-shipment']);
            }
        );

        this.purchaseOrderLineSubscription = this.purchaseOrderService.getPurchaseOrderLines(this.purchaseorderid).subscribe(
            (purchaseorderlines: PurchaseOrderLine[]) => {
                this.purchaseOrderService.currentPurchaseOrderLines = purchaseorderlines;
                this.purchaseorderlines = purchaseorderlines;
            },
            error => this.errorMessage = <any>error
        );

        // this.inboundShippingMethod = new InboundShippingMethod(null, this.purchaseorderid, '', '', '', null, null);
        // this.purchaseOrderService.currentInboundShippingMethod = this.inboundShippingMethod;

        this.inboundShippingMethodSubscription = this.purchaseOrderService.getInboundShippingMethods(this.purchaseorderid).subscribe(
            (inboundshippingmethods: InboundShippingMethod[]) => {
                this.purchaseOrderService.currentInboundShippingMethods = inboundshippingmethods;
                if (inboundshippingmethods && inboundshippingmethods[0]) {
                    this.inboundShippingMethod = inboundshippingmethods[0];
                    this.purchaseOrderService.currentInboundShippingMethod = inboundshippingmethods[0];
                } else {
                    this.inboundShippingMethod = new InboundShippingMethod(null, this.purchaseorderid, '', '', '', null, null);
                    this.purchaseOrderService.currentInboundShippingMethod = this.inboundShippingMethod;
                    this.purchaseOrderService.currentInboundShippingMethods.push(this.inboundShippingMethod);
                }
            },
            error => this.errorMessage = <any>error
        );

        // if(!this.purchaseOrderService.currentInboundShippingMethods)
        // {
        //     this.inboundShippingMethod = new InboundShippingMethod(null, this.purchaseorderid, '', '', '', null, null);
        //     this.purchaseOrderService.currentInboundShippingMethod = this.inboundShippingMethod;
        //     this.purchaseOrderService.currentInboundShippingMethods.push(this.inboundShippingMethod);
        // }
        */
    }

    ngAfterViewInit() {
        //this.cd.detectChanges();
        //setTimeout(() => this.cd.reattach());
    }

    get purchaseorder(): PurchaseOrder {
        return this.currentPurchaseOrder;
    }
    set purchaseorder(value: PurchaseOrder) {
        this.currentPurchaseOrder = value;
        // Clone the object to retain a copy
        this.originalPurchaseOrder = Object.assign({}, value);
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
        // Clear the validation object
        this.dataIsValid = {};

        // 'Line' tab
        if (this.purchaseorder && this.purchaseOrderService.validatePurchaseOrderLines()) {
            this.dataIsValid['line'] = true;
        } else {
            this.dataIsValid['line'] = false;
        }

        // 'Carton' tab
        if (this.purchaseorder && this.purchaseOrderService.validateCarton()) {
            this.dataIsValid['carton'] = true;
        } else {
            this.dataIsValid['carton'] = false;
        }

        // 'Shipping' tab
        if (this.purchaseorder && this.purchaseOrderService.validateShipping()) {
            this.dataIsValid['shipping'] = true;
        } else {
            this.dataIsValid['shipping'] = false;
        }
    }

    // validatePurchaseOrderLines() {
    //     return (this.purchaseorderlines
    //         && this.purchaseorderlines.length > 0);
    // }

    // validateCarton() {
    //     return (this.purchaseorderlines && !this.purchaseorderlines.find(x => x.CartonQuantity !== x.Quantity));
    // }

    // validateShipping() {
    //     return this.purchaseOrderService.validateShipping();
    // }

    saveInboundShipment(printLabel: boolean = false): void {
        if (this.purchaseorder) {      
            
            if(this.purchaseorder.Status == 'Pending')
            {
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
            this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'line','list']);
        } else if (this.isShippingInstruction()) {
            this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'carton', 'list', 'line']);
        } else if (this.isShipping()) {
            this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'shippinginstruction']);
        } 
    }

    saveInboundShipmentAndContinue() {
        if (this.purchaseorder) {
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
        return this.purchaseorder.Status == 'Pending';        
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
        this.pendingSave = true;        

        const newPurchaseOrder = this.purchaseOrderService.copyPurchaseOrder(this.purchaseorder);

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

                    if(c.CartonLines) {
                        const pendingCartonLineIndex = c.CartonLines.findIndex(i => i.pendingAdd === true);
                        if (pendingCartonLineIndex > -1) {
                            c.CartonLines.splice(pendingCartonLineIndex, 1);
                        }
                    }
                });
            }
        }

        this.loading = true;

        this.purchaseOrderService.editPurchaseOrder(newPurchaseOrder).subscribe(
            (purchaseorder: PurchaseOrder) => {
                this.purchaseOrderService.replacePurchaseOrder(purchaseorder.PurchaseOrderID, purchaseorder);
                this.purchaseOrderService.currentPurchaseOrderEdit = purchaseorder;
                this.purchaseorder = this.purchaseOrderService.currentPurchaseOrderEdit;

                this.origStatus = this.purchaseorder.Status;
                this.pendingSave = false;
                this.purchaseOrderService.currentPurchaseLineIsUpdated = false;

                this.loading = false;

                this.onSaveComplete(`${this.purchaseorder.PackingSlipNumber} was saved`);

                if(printLabel) {
                    this.onPrintLabel();
                }
            },
            (error: any) => {
                this.purchaseorder.Status = this.origStatus;
                this.pendingSave = false;
                this.loading = false;
                //this.errorMessage = <any>error;
                this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: <any>error });
            }
        );    
    }

    saveAndShipInboundShipment(): void {
        // console.log(this.purchaseorder);
        // console.log(this.inboundShippingMethod);
        if (this.purchaseorder && this.purchaseorder.ShipmentDate && this.purchaseorder.InboundShippingMethods[0].BillingOfLading && this.purchaseorder.InboundShippingMethods[0].ContainerNumber) { // && this.purchaseorder.ShipmentDate !== '') {
            this.purchaseorder.Status = 'Shipping';
            this.save();
        } else {
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Invalid Data', content: 'Shipment Date, B/L, and Container Number is required!' });
        }
    }

    // saveAndContinue(): void {
    //     if(this.currentStep == 1) {
    //         if(this.purchaseOrderService.validatePurchaseOrderLines) {
    //             this.save();
    //             this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'carton']);
    //         }
    //     }
    //     else if(this.currentStep == 2) {
    //         if(this.purchaseOrderService.validateCarton) {
    //             this.save();
    //             this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'shipping']);
    //         }
    //     }
    // }

    cancelPurchaseOrder(): void {
        this.purchaseorder.Status = 'Canceled';
        this.save();
    }

    onPrintAllCartonLabels() {
        this.purchaseOrderService.downloadAllCartonLabel(this.purchaseorderid, "yes").subscribe(
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
            data: this.purchaseorder
        });

        dialogRef.afterClosed().subscribe(result => {
            if(this.isInboundShipmentPending()) {
                //this.save();

                this.pendingSave = true;        
                const newPurchaseOrder = this.purchaseOrderService.copyPurchaseOrder(this.purchaseorder);
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

                            if(c.CartonLines) {
                                const pendingCartonLineIndex = c.CartonLines.findIndex(i => i.pendingAdd === true);
                                if (pendingCartonLineIndex > -1) {
                                    c.CartonLines.splice(pendingCartonLineIndex, 1);
                                }
                            }
                        });
                    }
                }
                this.loading = true;
                this.purchaseOrderService.editPurchaseOrder(newPurchaseOrder).subscribe(
                    (purchaseorder: PurchaseOrder) => {
                        this.purchaseOrderService.replacePurchaseOrder(purchaseorder.PurchaseOrderID, purchaseorder);
                        this.purchaseOrderService.currentPurchaseOrderEdit = purchaseorder;
                        this.purchaseorder = this.purchaseOrderService.currentPurchaseOrderEdit;

                        this.origStatus = this.purchaseorder.Status;
                        this.pendingSave = false;
                        this.purchaseOrderService.currentPurchaseLineIsUpdated = false;

                        this.loading = false;

                        this.onSaveComplete(`${this.purchaseorder.PackingSlipNumber} was saved`);
                    
                        if(result.Size == "small") {
                            this.onPrintAllItemLabels(result.Border);
                        }
                        else {
                            this.onPrintAllItemLargeLabels(result.Border);
                        }
                    },
                    (error: any) => {
                        this.purchaseorder.Status = this.origStatus;
                        this.pendingSave = false;
                        this.loading = false;
                        //this.errorMessage = <any>error;
                        this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: <any>error });
                    }
                );  
            } else if(result.Size == "small") {
                this.onPrintAllItemLabels(result.Border);
            }
            else {
                this.onPrintAllItemLargeLabels(result.Border);
            }
        });
        //downloadAllItemLabel
    }

    onPrintAllItemLabels(border: string) {
        this.purchaseOrderService.downloadAllItemLabel(this.purchaseorder.PurchaseOrderID, border).subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = 'Item_' +  this.purchaseorder.PackingSlipNumber;
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
                    a.download = 'Item_' + this.purchaseorder.PackingSlipNumber;
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }

    onPrintAllItemLargeLabels(border: string) {
        this.purchaseOrderService.downloadAllItemLargeLabel(this.purchaseorder.PurchaseOrderID, border).subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = 'Item_' + this.purchaseorder.PackingSlipNumber + '_Large';
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
                    a.download = 'Item_' + this.purchaseorder.PackingSlipNumber + '_Large';
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }

    onPrintLabel() {
        this.purchaseOrderService.downloadPurchaseOrderLabel(this.purchaseorder.PurchaseOrderID).subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = this.purchaseorder.PackingSlipNumber;
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
                    a.download = this.purchaseorder.PackingSlipNumber;
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }

    ngOnDestroy() {
        this.purchaseOrderSubscription.unsubscribe();
        this.inboundShippingMethodSubscription.unsubscribe();
        this.purchaseOrderLineSubscription.unsubscribe();
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
    //templateUrl: 'inbound-shipment-edit.component-item-print-dialog.html',
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
        this.lineItemLabelPrintDialog = new LineItemLabelPrintDialog("small","yes");
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}

