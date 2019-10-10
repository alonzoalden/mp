import { Component, OnInit, ViewChild, Inject, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseOrder, Carton, CartonLine, PurchaseOrderLineList } from '../../../../../shared/class/purchase-order';
import { PurchaseOrderService } from '../../../../purchase-order.service';
@Component({
    selector: 'o-inbound-shipment-edit-carton-list',
    templateUrl: './inbound-shipment-edit-carton-list.component.html'
})

export class InboundShipmentEditCartonListComponent implements OnInit, OnChanges {
    @Input() purchaseOrder: PurchaseOrder;
    @Input() errorMessage: string;
    @Output() getCartons = new EventEmitter<number>();
    @Output() setSelectedCarton = new EventEmitter<Carton>();
    @Output() downloadAllCartonLabel = new EventEmitter<PurchaseOrder>();
    @Output() downloadCartonLabelCount = new EventEmitter<{carton: Carton, count: number, border: string}>();

    purchaseorderid: number;
    pendingCopy: boolean;
    orderStatus: string;
    pendingAdd: boolean;
    currentIndex: number;
    displayedColumns = ['Add', 'Position', 'Weight', 'Dimension', 'LabelQty', 'CartonNumber', 'TotalUnits', 'Actions'];
    dataSource: any = null;
    formDirty = false;
    canAdd = false;

    @ViewChild(MatSort, { static: false }) sort: MatSort;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private purchaseOrderService: PurchaseOrderService,
                private cartonPrintDialog: MatDialog) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.purchaseOrder && (!changes.purchaseOrder.currentValue.Cartons.length || changes.purchaseOrder.currentValue.Cartons[changes.purchaseOrder.currentValue.Cartons.length - 1].CartonID)) {
            this.setSelectedCarton.emit(null);
            this.addPendingLine();
            this.refreshDataSource(this.purchaseOrder.Cartons);
            this.currentIndex = this.purchaseOrder.Cartons.length - 1;
        }
        if (changes.purchaseOrder && changes.purchaseOrder.currentValue) {
            this.orderStatus = this.purchaseOrder.Status;
            this.purchaseOrderService.updatePurchaseLineCartonQuantity(this.purchaseOrder);
            if (!this.purchaseOrder.Cartons || !this.purchaseOrder.Cartons.length) {
                this.getCartons.emit(this.route.parent.snapshot.params['id']);
            }
        }
    }

    ngOnInit() {
        this.purchaseorderid = this.route.parent.snapshot.params['id'];
    }

    getTotalQuantity(cartonLines: CartonLine[]) {
        if (!cartonLines) { return; }
        return cartonLines.filter(c => !c.pendingAdd).map(i => i.Quantity).reduce((a, b) => a + b, 0);
    }

    addPendingLine() {
        const _temp = new Carton(null, this.purchaseorderid, null, null, this.purchaseOrder.Cartons.length + 1, null, null, null, null, 4, null, null, [], true);
        if (!this.purchaseOrder) { return; }
        this.purchaseOrder.Cartons.push(_temp);
    }

    removePendingLine() {
        const foundIndex = this.purchaseOrder.Cartons.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.purchaseOrder.Cartons.splice(foundIndex, 1);
        }
    }

    openDialogPrintCartonLabel(carton: Carton) {
        const dialogRef = this.cartonPrintDialog.open(InboundShipmentEditCartonListComponentCartonPrintDialog, {
          width: '250px',
          data: carton
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.Quantity > 0) {
                this.saveAndPrint(carton, result.Quantity, result.Border);
            }
        });
    }

    saveAndPrint(carton: Carton, quantity: number, border: string) {
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
        this.purchaseOrderService.editPurchaseOrder(newPurchaseOrder).subscribe(
            (purchaseOrder: PurchaseOrder) => {
                this.purchaseOrderService.replacePurchaseOrder(purchaseOrder.PurchaseOrderID, purchaseOrder);
                this.purchaseOrderService.currentPurchaseOrderEdit = purchaseOrder;
                this.purchaseOrder = this.purchaseOrderService.currentPurchaseOrderEdit;
                this.purchaseOrderService.currentPurchaseLineIsUpdated = false;

                this.removePendingLine();
                this.addPendingLine();
                this.refreshDataSource(this.purchaseOrder.Cartons);

                this.onPrintLabel(carton, quantity, border);

                this.purchaseOrderService.sendNotification({ type: 'success', title: 'Successfully Updated', content: this.purchaseOrder.PackingSlipNumber + ' was saved' });
            },
            (error: any) => {
                this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: <any>error });
            }
        );
    }

    refreshDataSource(cartons: Carton[]) {
        this.dataSource = new MatTableDataSource<Carton>(cartons);
        this.dataSource.sort = this.sort;
    }

    addCarton() {
        this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'carton', 'list', 'add']);
    }

    moveDownCarton(carton: Carton) {
        this.move(this.purchaseOrder.Cartons, carton, 1);
        this.purchaseOrder.Cartons.forEach((value, i) => {
            value.Position = i + 1;
        });
        this.refreshDataSource(this.purchaseOrder.Cartons);
    }

    moveUpCarton(carton: Carton) {
        this.move(this.purchaseOrder.Cartons, carton, -1);
        this.purchaseOrder.Cartons.forEach((value, i) => {
            value.Position = i + 1;
        });
        this.refreshDataSource(this.purchaseOrder.Cartons);
    }

    move(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a, b) => a - b); // Sort the indexes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    compare(a, b) {
        return a - b;
    }

    onAddCarton(carton: Carton, index: number) {
        if (this.isRequirementValid(carton)) {
            this.pendingAdd = true;
            carton.pendingAdd = false;
            this.addPendingCartonLine(carton);

            this.addPendingLine();
            this.refreshDataSource(this.purchaseOrder.Cartons);

            this.onShowCartonLine(carton, index);
        }
    }

    isRequirementValid(carton: Carton) {
        if (carton && carton.Weight && carton.Length && carton.Width && carton.Height) {
            return true;
        } else {
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: 'Please enter the weight and dimension' });
            return false;
        }
    }

    addPendingCartonLine(carton: Carton) {
        const _temp = new CartonLine(null, null, this.purchaseorderid, null, null, null, null, null, 1, null, null, null, null, true);
        carton.CartonLines.push(_temp);
    }

    onPrintAllCartonLabels() {
        this.downloadAllCartonLabel.emit(this.purchaseOrder);
    }

    onPrintLabel(carton: Carton, count: number, border: string) {
        this.downloadCartonLabelCount.emit({carton, count, border});
    }

    onRemoveCarton(carton: Carton, index: number) {
        this.onShowCartonLine(carton, index);
        const confirmation = confirm(`Remove position ${index + 1}?`);
        if (confirmation) {

            this.purchaseOrder.Cartons.splice(index, 1);
            this.refreshDataSource(this.purchaseOrder.Cartons);

            this.currentIndex = this.purchaseOrder.Cartons.length - 1;
            this.purchaseOrderService.currentCartonID = null;

            this.purchaseOrderService.updatePurchaseLineCartonQuantity(this.purchaseOrder);
        }
    }

    onEditCarton(carton: Carton) {
        this.router.navigate(['/inbound-shipment', this.purchaseorderid, 'edit', 'carton', 'list', carton.CartonID, 'edit']);
    }

    onCopyCarton(carton: Carton, index: number) {
        this.pendingCopy = true;

        const newCarton = new Carton(null, carton.PurchaseOrderID, carton.PackingSlipNumber, null, this.purchaseOrder.Cartons.length,
            carton.Length, carton.Width, carton.Height, carton.Weight, carton.LabelQty, null, null, [], carton.pendingAdd);

        carton.CartonLines.forEach((cartonline) => {
            const newCartonLine = new CartonLine(null, null, carton.PurchaseOrderID, cartonline.PurchaseOrderLineID, cartonline.ItemName,
                cartonline.ItemVendorSKU, cartonline.TPIN, cartonline.URLKey, cartonline.Quantity, cartonline.RemainingQuantity, null, null, cartonline.PrevPurchaseOrderLineID, cartonline.pendingAdd);

            newCarton.CartonLines.push(newCartonLine);
        });

        var isValid: boolean = true;

        newCarton.CartonLines.forEach((cartonline, i) => {
            if (isValid && !this.isValidQuantity(cartonline)) {
                isValid = false;
            }

            if (i == newCarton.CartonLines.length - 1 && isValid) {

                this.purchaseOrder.Cartons.splice(this.purchaseOrder.Cartons.length - 1, 0, newCarton);

                this.refreshDataSource(this.purchaseOrder.Cartons);

            }
        });

        this.purchaseOrderService.updatePurchaseLineCartonQuantity(this.purchaseOrder);
        this.pendingCopy = false;

    }

    isValidQuantity(cartonline: CartonLine) {

        const foundPurchaseOrderLine = this.purchaseOrder.PurchaseOrderLines.find(x => x.PurchaseOrderLineID === cartonline.PurchaseOrderLineID);

        if (foundPurchaseOrderLine) {
            var RemainingQuantity: number = foundPurchaseOrderLine.Quantity;

            this.purchaseOrder.Cartons.forEach((carton, ci) => {
                carton.CartonLines.forEach((cartonline2, cli) => {
                    if (cartonline2.PurchaseOrderLineID == cartonline.PurchaseOrderLineID) {
                        RemainingQuantity = RemainingQuantity - cartonline2.Quantity;
                    }
                });
            });
        }

        if (RemainingQuantity - cartonline.Quantity < 0) {
            this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: 'Exceeded line quantity' });
            return false;
        } else {
            return true;
        }
    }

    onShowCartonLine(carton: Carton, index: number) {
        this.setSelectedCarton.emit(null);
        if (this.pendingAdd) {
            this.currentIndex = this.purchaseOrder.Cartons.length - 1;
            this.pendingAdd = false;
        } else {
            this.currentIndex = index;

            if (index !== this.purchaseOrder.Cartons.length - 1) {
                this.setSelectedCarton.emit(carton);
            }

            if (this.currentIndex != this.purchaseOrder.Cartons.length - 1) {
                const foundIndex = carton.CartonLines.findIndex(i => i.pendingAdd === true);
                if (foundIndex < 0) {
                    this.addPendingCartonLine(carton);
                }
            }

            this.purchaseOrderService.currentCartonLines.next(carton.CartonLines);
            this.purchaseOrderService.currentCartonID = carton.CartonID;

            if (!carton.CartonNumber && this.currentIndex != this.purchaseOrder.Cartons.length - 1) {
                this.removePendingLine();
                this.addPendingLine();
                this.refreshDataSource(this.purchaseOrder.Cartons);
            }

            this.purchaseOrderService.newCartonLineIsSelected = true;
        }
    }

    clearFields(form) {
        this.formDirty = false;
        this.canAdd = false;
        form.Weight = '';
        form.Length = '';
        form.Width = '';
        form.Height = '';
        form.LabelQty = 1;
    }


}

export class CartonLabelPrintDialog {
    constructor(
        public Quantity: number,
        public Border: string
    ) {}
}

@Component({
    selector: 'inbound-shipment-edit-carton-list.component-carton-print-dialog',
    templateUrl: 'inbound-shipment-edit-carton-list.component-carton-print-dialog.html',
  })

export class InboundShipmentEditCartonListComponentCartonPrintDialog implements OnInit {
    //quantity: number;
    cartonLabelPrintDialog: CartonLabelPrintDialog;

    constructor(
        public dialogRef: MatDialogRef<InboundShipmentEditCartonListComponentCartonPrintDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Carton) {}

    ngOnInit() {
        //this.quantity = this.data.LabelQty;
        this.cartonLabelPrintDialog = new CartonLabelPrintDialog(this.data.LabelQty, 'yes');
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}