import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort} from '@angular/material';
import { SalesOrder } from '../../../../shared/class/sales-order';
import { BOLRequest } from '../../../../shared/class/bol-request';
import { SalesOrderService } from '../../../sales-order.service';
import { environment } from '../../../../../environments/environment';
import * as salesOrderActions from '../../../state/sales-order.actions';
import * as fromSalesOrder from '../../../state';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { PurchaseOrderMerchantInvoice } from 'app/shared/class/purchase-order';


@Component({
    selector: 'sales-order-view-upload-invoice.component-upload-dialog',
    templateUrl: './sales-order-view-upload-invoice.component-upload-dialog.html',
})

export class SalesOrderViewUploadInvoiceComponentDialog implements OnInit, OnDestroy {
    bolURL = environment.bolURL;
    invoiceURL = environment.invoiceURL;
    errorMessage: string;
    fulfilledby: string;
    orderid: number;
    salesOrder: SalesOrder;
    pendingAdd: boolean;
    componentActive: boolean = true;
    BOLRequest: BOLRequest;
    invoices: any[] = [];
    displayedColumns = ['Add', 'Invoice', 'InvoiceAmount', 'ShippingAmount', 'Remove'];
    filesToUpload: Array<File> = [];
    selectedFileNames: string[] = [];
    name: string;
    dataSource: MatTableDataSource<any>;
    currentIndex: number;
    isLoadingData: boolean = false;
    formDirty: boolean;

    @ViewChild(MatSort, { static: false }) sort: MatSort;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {salesorder: SalesOrder, orderid: number},
        public dialogRef: MatDialogRef<SalesOrderViewUploadInvoiceComponentDialog>,
        private store: Store<fromSalesOrder.State>,
        private salesorderService: SalesOrderService
    ) {}

    ngOnInit() {
        this.addPendingLine();
        this.orderid = this.data.orderid;
        this.salesOrder = this.data.salesorder;
        this.currentIndex = this.invoices.length - 1;
        // this.store.pipe(
        //     select(fromSalesOrder.getBOLRequest),
        //     takeWhile(() => this.componentActive)
        // ).subscribe(
        //     (bolrequest: BOLRequest) => {
        //         if (bolrequest) {
        //             this.BOLRequest = bolrequest;
        //             if (bolrequest.BOLPath) {
        //                 this.selectedFileNames.push(bolrequest.BOLPath);
        //             }
        //         }
        //     }
        // );
        // this.store.pipe(
        //     select(fromSalesOrder.getPendingAdd),
        //     takeWhile(() => this.componentActive)
        // ).subscribe(
        //     (pendingadd: boolean) => {
        //         if (typeof pendingadd === 'boolean') {
        //             this.pendingAdd = pendingadd;
        //         }
        //     }
        // );
    }
    fileChangeEvent(fileInput: any) {
        // Clear Uploaded Files result message
        this.filesToUpload = <Array<File>>fileInput.target.files;
        this.selectedFileNames.splice(0);
        for (let i = 0; i < this.filesToUpload.length; i++) {
            this.selectedFileNames.push(this.filesToUpload[i].name);
        }
        this.upload();
    }
    onAdd() {
        this.addPendingLine();
        this.pendingAdd = true;
    }
    addPendingLine() {
        const newInvoice = new PurchaseOrderMerchantInvoice(null, this.data.orderid, 0, 0, null, null, null, this.invoices.length + 1, true);
        this.invoices.push(newInvoice);
        this.refreshDataSource(this.invoices);
        this.currentIndex = this.invoices.length - 1;
    }
    upload() {
        if (this.selectedFileNames.length === 0) {
            this.salesorderService.sendNotification({ type: 'error', title: 'Invalid Upload', content: 'Please select at least 1 files to upload!' });
        } else {
            this.uploadFiles();
        }
    }

    uploadFiles() {
        if (this.filesToUpload.length > 0) {
            const formData: FormData = new FormData();
            for (let i = 0; i < this.filesToUpload.length; i++) {
                formData.append('uploadedFiles', this.filesToUpload[i], this.filesToUpload[i].name);
            }
            this.isLoadingData = true;
            this.salesorderService.uploadMerchantInvoiceAttachment(this.orderid, formData).subscribe((filepath: string) => {
                this.invoices[this.currentIndex].FilePath = filepath;
                this.salesorderService.sendNotification({ type: 'success', title: 'Upload Successful', content: `Invoice Attachment saved` });
                //this.dialogRef.close();
                this.isLoadingData = false;
                //this.currentIndex = this.invoices.length - 1;
                //return;
                this.filesToUpload = [];
                this.selectedFileNames = [];
            });

            // this.store.dispatch(new salesOrderActions.UploadBOLAttachment({
            //     id: this.orderid,
            //     form: formData,
            //     dialogRef: this.dialogRef
            // }));

        }
    }

    isInvoiceValid(invoice: PurchaseOrderMerchantInvoice) {
        return !!(invoice
            && invoice.ShippingAmount !== null
            && invoice.InvoiceAmount !== null
            && invoice.FilePath
        );
    }
    clearFields(invoice: PurchaseOrderMerchantInvoice) {
        if (invoice.FilePath) {
            const confirmation = confirm(`Are you sure you want to remove?`);
        }
        invoice.ShippingAmount = 0;
        invoice.InvoiceAmount = 0;
        invoice.FilePath = null;
        this.formDirty = false;
    }
    refreshDataSource(invoices: PurchaseOrderMerchantInvoice[]) {
        this.dataSource = new MatTableDataSource<PurchaseOrderMerchantInvoice>(invoices);
        this.dataSource.sort = this.sort;
    }
    cancelUpload() {
        this.filesToUpload = [];
        this.selectedFileNames = [];
    }
    onCloseClick(): void {
        this.dialogRef.close();
    }
    ngOnDestroy(): void {
        this.componentActive = false;
    }

    onEditCurrentInvoice(index: number) {
        if (this.pendingAdd) {
            this.currentIndex = this.invoices.length - 1;
            this.pendingAdd = false;
        } else {
            this.currentIndex = index;
        }
    }
    onRemoveInvoice(invoice: PurchaseOrderMerchantInvoice, index: number) {
        const confirmation = confirm(`Remove invoice?`);
        if (confirmation) {
            this.invoices.splice(index, 1);
            this.refreshDataSource(this.invoices);
            this.currentIndex = this.invoices.length - 1;
        }
    }
}

