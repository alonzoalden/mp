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


export class InvoiceInsert {
    constructor(
        public InvoiceID: number,
        public PurchaseOrderID: number,
        public Position: number,
        public InvoicePath: string,
        public BOLPath: string,
        public ProductPrice: number,
        public ShippingPrice: number,
        public pendingAdd: boolean,

    ) {}
}

@Component({
    selector: 'sales-order-view-upload-invoice.component-upload-dialog',
    templateUrl: './sales-order-view-upload-invoice.component-upload-dialog.html',
})

export class SalesOrderViewUploadInvoiceComponentDialog implements OnInit, OnDestroy {
    bolURL = environment.bolURL;
    errorMessage: string;
    fulfilledby: string;
    orderid: number;
    salesOrder: SalesOrder;
    pendingAdd: boolean;
    componentActive: boolean = true;
    BOLRequest: BOLRequest;
    invoices: any[] = [];
    displayedColumns = ['Add', 'Invoice', 'ProductPrice', 'ShippingPrice', 'Remove'];
    filesToUpload: Array<File> = [];
    selectedFileNames: string[] = [];
    name: string;
    dataSource: MatTableDataSource<any>;
    currentIndex: number;
    isLoadingData: boolean = false;

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
        this.currentIndex = this.invoices.length - 1;
    }
    addPendingLine() {
        const newInvoice = new InvoiceInsert(null, this.data.orderid, this.invoices.length - 1, null, null, 0, 0, true);
        this.invoices.push(newInvoice);
        this.refreshDataSource(this.invoices);
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
            this.salesorderService.uploadBOLAttachment(this.orderid, formData).subscribe((bolrequest: any) => {
                    this.invoices[this.currentIndex].BOLPath = bolrequest.BOLPath;
                    this.salesorderService.sendNotification({ type: 'success', title: 'Upload Successful', content: `BOL Request Attachment saved` });
                    //this.dialogRef.close();
                    this.isLoadingData = false;
                    //return;
                });

            // this.store.dispatch(new salesOrderActions.UploadBOLAttachment({
            //     id: this.orderid,
            //     form: formData,
            //     dialogRef: this.dialogRef
            // }));
            this.filesToUpload = [];
        }
    }

    isInvoiceValid(invoice: InvoiceInsert) {
        return !!(invoice
            && invoice.ShippingPrice
            && invoice.ProductPrice
            && invoice.BOLPath
        );
    }
    clearFields(invoice: InvoiceInsert) {
        invoice.ShippingPrice = null;
        invoice.ProductPrice = null;
        invoice.InvoicePath = null;
    }
    refreshDataSource(invoices: InvoiceInsert[]) {
        this.dataSource = new MatTableDataSource<InvoiceInsert>(invoices);
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
}

