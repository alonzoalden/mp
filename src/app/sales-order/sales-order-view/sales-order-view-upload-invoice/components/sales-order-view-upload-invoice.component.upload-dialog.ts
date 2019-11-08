import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SalesOrder } from '../../../../shared/class/sales-order';
import { BOLRequest } from '../../../../shared/class/bol-request';
import { SalesOrderService } from '../../../sales-order.service';
import { environment } from '../../../../../environments/environment';
import * as salesOrderActions from '../../../state/sales-order.actions';
import * as fromSalesOrder from '../../../state';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';

@Component({
    selector: 'sales-order-view-bol.component-upload-dialog',
    templateUrl: './sales-order-view-bol.component-upload-dialog.html',
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
    filesToUpload: Array<File> = [];
    selectedFileNames: string[] = [];
    name: string;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {salesorder: SalesOrder, orderid: number},
        public dialogRef: MatDialogRef<SalesOrderViewUploadInvoiceComponentDialog>,
        private store: Store<fromSalesOrder.State>,
        private salesorderService: SalesOrderService
    ) {}

    ngOnInit() {
        this.orderid = this.data.orderid;
        this.salesOrder = this.data.salesorder;
        this.store.pipe(
            select(fromSalesOrder.getBOLRequest),
            takeWhile(() => this.componentActive)
        ).subscribe(
            (bolrequest: BOLRequest) => {
                if (bolrequest) {
                    this.BOLRequest = bolrequest;
                    if (bolrequest.BOLPath) {
                        this.selectedFileNames.push(bolrequest.BOLPath);
                    }
                }
            }
        );
        this.store.pipe(
            select(fromSalesOrder.getPendingAdd),
            takeWhile(() => this.componentActive)
        ).subscribe(
            (pendingadd: boolean) => {
                if (typeof pendingadd === 'boolean') {
                    this.pendingAdd = pendingadd;
                }
            }
        );
    }
    fileChangeEvent(fileInput: any) {
        // Clear Uploaded Files result message
        this.filesToUpload = <Array<File>>fileInput.target.files;
        for (let i = 0; i < this.filesToUpload.length; i++) {
            this.selectedFileNames.push(this.filesToUpload[i].name);
        }
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
            this.store.dispatch(new salesOrderActions.UploadBOLAttachment({
                id: this.orderid,
                form: formData,
                dialogRef: this.dialogRef
            }));
        }
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

