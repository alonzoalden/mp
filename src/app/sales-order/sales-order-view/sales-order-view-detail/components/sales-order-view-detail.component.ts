import { Component, OnInit, ViewChild, OnDestroy, Inject, Output, Input, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SalesOrderLine } from '../../../../shared/class/sales-order-line';
import { SalesOrder } from '../../../../shared/class/sales-order';
import { BOLRequest, BOLRequestLine } from '../../../../shared/class/bol-request';
import { SalesOrderService } from '../../../sales-order.service';
import { environment } from '../../../../../environments/environment';
import { Member } from '../../../../shared/class/member';
import * as salesOrderActions from '../../../state/sales-order.actions';
import * as fromSalesOrder from '../../../state';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import * as companyActions from '../../../../company/company-info/state/company-info.actions';
import * as fromCompany from '../../../../company/company-info/state/';
import { CompanyInfo } from '../../../../shared/class/company-info';
import { AddressCountry, AddressState } from 'app/shared/class/address';



@Component({
  selector: 'o-sales-order-detail',
  templateUrl: './sales-order-view-detail.component.html',
  styleUrls: ['../../../sales-order.component.css']
})

export class SalesOrderDetailComponent implements OnInit {
    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;
    @Input() userInfo: Member;
    @Input() salesOrder: SalesOrder;
    @Input() salesOrderLinesMatTable: MatTableDataSource<SalesOrderLine>;
    @Input() errorMessage: string;
    @Input() isLoading: boolean;
    @Input() isSalesOrderLinesLoading: boolean;
    @Input() isBOLRequestLoading: boolean;
    @Input() BOLRequest: BOLRequest;
    @Output() addBOLRequest = new EventEmitter<BOLRequest>();
    @Output() getBOLRequest = new EventEmitter<number>();
    @Output() getFulfilledBySalesOrder = new EventEmitter<{orderid: number, fulfilledby: string}>();
    @Output() getSalesOrderLineByVendor = new EventEmitter<{orderid: number, fulfilledby: string}>();
    @Output() cancelSalesOrderLines = new EventEmitter<SalesOrderLine[]>();
    @Output() getSalesOrderByVendor = new EventEmitter<{fulfilledby: string, status: string}>();
    @Output() downloadSalesOrderPackingSlip = new EventEmitter<{salesorder: SalesOrder, orderid: number}>();
    fulfilledby: string;
    orderid: number;
    displayedColumns = ['ItemImage', 'ProductDetails', 'Quantity', 'MerchantStatus', 'UnitPrice', 'LineSubTotal'];
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    isMerchant: boolean;

    constructor(private route: ActivatedRoute,
        public printDialog: MatDialog) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.salesOrderLinesMatTable && changes.salesOrderLinesMatTable.currentValue.data.length) {
            this.salesOrderLinesMatTable.paginator = this.paginator;
            this.salesOrderLinesMatTable.sort = this.sort;
        }
        if (changes.BOLRequest && changes.BOLRequest.currentValue) {
        }
    }
    ngOnInit() {
        this.orderid = this.route.parent.snapshot.params['id'];
        this.fulfilledby = this.route.parent.snapshot.params['fulfilledby'];
        if (this.fulfilledby == 'merchant') {
            this.isMerchant = true;
        } else {
            this.isMerchant = false;
        }
        this.getSalesOrderLineByVendor.emit({orderid: this.orderid, fulfilledby: this.fulfilledby});
        this.getBOLRequest.emit(this.orderid);
    }

    onPrintPackingSlip() {
        this.downloadSalesOrderPackingSlip.emit({salesorder: this.salesOrder, orderid: this.orderid});
    }

    openDialogCancelOrder(salesorder) {
        const dialogRef = this.printDialog.open(SalesOrderCancelComponentPrintDialog, {
            data: salesorder,
            width: '840px'
        });

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.getFulfilledBySalesOrder.emit({orderid: this.orderid, fulfilledby: this.fulfilledby});
                this.getSalesOrderLineByVendor.emit({orderid: this.orderid, fulfilledby: this.fulfilledby});
            }
        });
    }

    openDialogBOL(salesorder) {
        const _data = {
            salesorder,
            orderid: this.orderid
        }
        const dialogRef = this.printDialog.open(SalesOrderOpenBOLComponentDialog, {
            data: _data,
            width: '1040px'
        });

        dialogRef.afterClosed().subscribe((bolrequest) => {
            if (bolrequest) {
                
            }
        });
    }
    openDialogUploadBOLRequest(salesorder) {
        const _data = {
            salesorder,
            orderid: this.orderid
        }
        const dialogRef = this.printDialog.open(SalesOrderUploadBOLComponentDialog, {
            data: _data,
            width: '1040px'
        });

        dialogRef.afterClosed().subscribe(() => {

        });
    }

    formatPhoneNumber(phoneNumberString) {
        if (!phoneNumberString) { return; }
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    }
}

@Component({
    selector: 'sales-order-view-detail.component-upload-bol-dialog',
    templateUrl: './sales-order-view-detail.component-upload-bol-dialog.html',
})

export class SalesOrderUploadBOLComponentDialog implements OnInit, OnDestroy {
    private fileURL = environment.fileURL;
    itemLabelPrintDialog: SalesOrderCancelDialog;
    errorMessage: string;
    fulfilledby: string;
    orderid: number;
    salesOrder: SalesOrder;
    // hasCancellationQty: boolean = false;
    // salesOrderLinesMatTable: MatTableDataSource<SalesOrderLine>;
    // deliveryDetail: string;
    // private imageURL = environment.imageURL;
    // private linkURL = environment.linkURL;
    // formDirty: boolean = true;
    pendingAdd: boolean;
    // dataSource: MatTableDataSource<any>;
    // displayedColumns = ['Add', 'Type', 'Weight', 'Dimensions', 'Pieces', 'Remove'];
    componentActive: boolean = true;
    // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    // @ViewChild(MatSort, { static: true }) sort: MatSort;

    // bolRequest: BOLRequest;
    // companyInfo: CompanyInfo;
    // addressCountries: AddressCountry[];
    // shippingAddressStates: AddressState[];
    // currentIndex: number;
    // requestLineTypes: any =  [
    //     {
    //         Value: 'Crate'
    //     },
    //     {
    //         Value: 'Pallet'
    //     }
    // ];
    filesToUpload: Array<File> = [];
    selectedFileNames: string[] = [];
    name: string;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {salesorder: SalesOrder, orderid: number},
        public dialogRef: MatDialogRef<SalesOrderCancelComponentPrintDialog>,
        private store: Store<fromSalesOrder.State>,
        private companyStore: Store<fromCompany.State>,
        private salesorderService: SalesOrderService) {}

    ngOnInit() {
        
        this.orderid = this.data.orderid;
        
        // this.bolRequest = new BOLRequest(null, this.orderid, null, null, null, null, null, null, null, null, null, null, null, null, []);
        // this.addPendingLine();
        // this.refreshDataSource(this.bolRequest.BOLRequestLines);
        this.salesOrder = this.data.salesorder;
        // this.fulfilledby = 'merchant';

        // this.companyStore.dispatch(new companyActions.LoadCompanyInfo());
        // this.companyStore.dispatch(new companyActions.LoadAddressCountry());
        this.store.pipe(
            select(fromSalesOrder.getBOLRequest),
            takeWhile(() => this.componentActive)
        ).subscribe(
            (bolrequest: BOLRequest) => {
                if (bolrequest && bolrequest.BOLPath) {
                    console.log(bolrequest);
                    this.dialogRef.close(bolrequest);
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
            var formData: FormData = new FormData();
            for (let i = 0; i < this.filesToUpload.length; i++) {
                formData.append('uploadedFiles', this.filesToUpload[i], this.filesToUpload[i].name);
            }
            this.store.dispatch(new salesOrderActions.UploadBOLAttachment({
                id: this.orderid,
                form: formData,
                name: this.name
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


@Component({
    selector: 'sales-order-view-detail.component-edit-bol-dialog',
    templateUrl: './sales-order-view-detail.component-edit-bol-dialog.html',
})

export class SalesOrderOpenBOLComponentDialog implements OnInit, OnDestroy {
    itemLabelPrintDialog: SalesOrderCancelDialog;
    errorMessage: string;
    fulfilledby: string;
    orderid: number;
    salesOrder: SalesOrder;
    hasCancellationQty: boolean = false;
    salesOrderLinesMatTable: MatTableDataSource<SalesOrderLine>;
    deliveryDetail: string;
    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;
    formDirty: boolean = true;
    pendingAdd: boolean;
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['Add', 'Type', 'Weight', 'Dimensions', 'Pieces', 'Remove'];
    componentActive: boolean = true;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    bolRequest: BOLRequest;
    companyInfo: CompanyInfo;
    addressCountries: AddressCountry[];
    shippingAddressStates: AddressState[];
    currentIndex: number;
    requestLineTypes: any =  [
        {
            Value: 'Crate'
        },
        {
            Value: 'Pallet'
        }
    ];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {salesorder: SalesOrder, orderid: number},
        public dialogRef: MatDialogRef<SalesOrderCancelComponentPrintDialog>,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<fromSalesOrder.State>,
        private companyStore: Store<fromCompany.State>,
        private salesorderService: SalesOrderService) {}

    ngOnInit() {
        this.orderid = this.data.orderid;
        
        this.bolRequest = new BOLRequest(null, this.orderid, null, null, null, null, null, null, null, null, null, null, null, null, []);
        this.addPendingLine();
        this.refreshDataSource(this.bolRequest.BOLRequestLines);
        this.salesOrder = this.data.salesorder;
        this.fulfilledby = 'merchant';

        this.companyStore.dispatch(new companyActions.LoadCompanyInfo());
        this.companyStore.dispatch(new companyActions.LoadAddressCountry());
        this.companyStore.pipe(
            select(fromCompany.getCompanyInfo),
            takeWhile(() => this.componentActive)
        ).subscribe(
            (companyinfo) => {
                if (companyinfo) {
                    this.companyInfo = companyinfo;
                    this.bolRequest.AddressLine1 = companyinfo.ShippingAddress;
                    this.bolRequest.AddressLine2 = companyinfo.ShippingAddress2;
                    this.bolRequest.City = companyinfo.ShippingCity;
                    this.bolRequest.State = companyinfo.ShippingState;
                    this.bolRequest.PostalCode = companyinfo.ShippingZip;
                    this.bolRequest.PhoneNumber = companyinfo.PhoneNumber;
                }
            }
        );
        this.companyStore.pipe(
            select(fromCompany.getAddressCountries),
            takeWhile(() => this.componentActive)
        ).subscribe(
            (addresscountries) => {
                if (addresscountries) {
                    this.addressCountries = addresscountries;
                    this.bolRequest.CountryID = 'US';
                }   
            }
        );
        this.companyStore.pipe(
            select(fromCompany.getShippingAddressStates),
            takeWhile(() => this.componentActive)
        ).subscribe(
            (addressstates) => {
                if (addressstates) {
                    this.shippingAddressStates = addressstates;
                    if (this.companyInfo) {
                        this.bolRequest.State = this.companyInfo.ShippingState;
                    }
                }
                
            }
        );
        this.store.pipe(
            select(fromSalesOrder.getBOLRequest),
            takeWhile(() => this.componentActive)
        ).subscribe(
            (bolrequest: BOLRequest) => {
                if (bolrequest && bolrequest.BOLRequestID) {
                    this.dialogRef.close(this.bolRequest);
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

    onRequestBol() {
        const _lastIndex = this.bolRequest.BOLRequestLines.length - 1;
        const _lastItem = this.bolRequest.BOLRequestLines[_lastIndex];
        if (!_lastItem.Length || !_lastItem.Height) {
            this.bolRequest.BOLRequestLines.splice(_lastIndex, 1);
        }
        if (this.isUpBOLRequestRequirementValid()) {
            
            this.store.dispatch(new salesOrderActions.AddBOLRequest(this.bolRequest));
        }
        else {
            this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: 'Please make sure your BOL Request is complete' });
        }
    }

    onAddBOLRequestLine(bolrequestline: BOLRequestLine) {
        if (this.isUpBOLRequestLineRequirementValid(bolrequestline)) {
            this.pendingAdd = true;
            this.addPendingLine();
            this.refreshDataSource(this.bolRequest.BOLRequestLines);
            this.currentIndex = this.bolRequest.BOLRequestLines.length - 1;
            this.formDirty = false;
        
        } else {
            this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: 'Please input all fields' });
        }
    }

    isUpBOLRequestLineRequirementValid(bolrequestline: BOLRequestLine): boolean {
        if (bolrequestline
            && bolrequestline.PackageType
            && bolrequestline.Weight
            && bolrequestline.Length
            && bolrequestline.Width
            && bolrequestline.Height
            && bolrequestline.Pieces
        ) {
            return true;
        } else {
            return false;
        }
    }
    isUpBOLRequestRequirementValid(): boolean {
        if (this.bolRequest
            && this.bolRequest.BOLRequestLines.length > 0
            && this.bolRequest.PickUpDate
            && this.bolRequest.AddressLine1
            && this.bolRequest.City
            && this.bolRequest.State
            && this.bolRequest.CountryID
            && this.bolRequest.PostalCode
            && this.bolRequest.PhoneNumber
        ) {
            return true;
        } else {
            return false;
        }
    }
    onShippingCountryChange() {
        if (this.companyInfo.ShippingCountryID == 'US') {
            this.getShippingAddressState();
            this.companyInfo.ShippingState = 'Alabama';
        } else if (this.companyInfo.ShippingCountryID == 'CA') {
            this.getShippingAddressState();
            this.companyInfo.ShippingState = 'Alberta';
        } else {
            this.companyInfo.ShippingState = '';
        }
    }
    getShippingAddressState() {
        this.companyStore.dispatch(new companyActions.LoadShippingAddressState(this.companyInfo.ShippingCountryID));
        //this.loadShippingAddressState.emit(this.companyInfo.ShippingCountryID);
    }
    onEditRequestLine(i: number) {
        if (this.pendingAdd) {
            this.currentIndex = this.bolRequest.BOLRequestLines.length - 1;
            this.pendingAdd = false;
        }
        else {
            this.currentIndex = i;
        }
    }
    addPendingLine() {
        const _temp = new BOLRequestLine(null, this.bolRequest.BOLRequestID, null, null, null, null, 1, 'Crate', null, null);
        this.bolRequest.BOLRequestLines.push(_temp);
        this.currentIndex = this.bolRequest.BOLRequestLines.length - 1;
        this.refreshDataSource(this.bolRequest.BOLRequestLines);
    }
    refreshDataSource(requestlines: BOLRequestLine[]) {
        this.dataSource = new MatTableDataSource<BOLRequestLine>(requestlines);
        this.dataSource.sort = this.sort;
    }
    onCloseClick(): void {
        if (this.bolRequest.BOLRequestLines.length > 1 || this.bolRequest.PickUpDate) {
            const confirmation = confirm(`You will lose any information you may have entered. Are you sure?`);
            if (confirmation) {
                this.dialogRef.close();
            }
        }
        else {
            this.dialogRef.close();
        }
    }
    ngOnDestroy(): void {
        this.componentActive = false;
    }
    // overflowFix(bool: Boolean): void {
    //     const container = document.getElementsByClassName('ibox-content')[0];
    //     bool ? container.classList.add('overflow-visible') : container.classList.remove('overflow-visible');
    // }
    onRemoveRequestline(requestline: BOLRequestLine, index: number) {
        const confirmation = confirm(`Remove ${requestline.PackageType}?`);
        if (confirmation) {
            this.bolRequest.BOLRequestLines.splice(index, 1);
            this.refreshDataSource(this.bolRequest.BOLRequestLines);
        }
    }
    clearFields(requestline: BOLRequestLine) {
        requestline.Height = null;
        requestline.Length = null;
        requestline.Width = null;
        requestline.Weight = null;
        requestline.Pieces = 1;
        this.formDirty = false;
    }
}




export class SalesOrderCancelDialog {
    constructor(
        public Size: string,
        public Border: string
    ) {}
}

@Component({
    selector: 'sales-order-cancel.component-print-dialog',
    templateUrl: '../../sales-order-view-cancel/components/sales-order-view-cancel.component-cancel-dialog.html',
})

export class SalesOrderCancelComponentPrintDialog implements OnInit, OnDestroy {
    itemLabelPrintDialog: SalesOrderCancelDialog;
    errorMessage: string;
    fulfilledby: string;
    orderid: number;
    salesOrder: SalesOrder;
    hasCancellationQty: boolean = false;
    salesOrderLinesMatTable: MatTableDataSource<SalesOrderLine>;
    deliveryDetail: string;
    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;

    dataSource: MatTableDataSource<any>;
    displayedColumns = ['ItemImage', 'ProductDetails', 'ProductInfo', 'CancellationReason'];
    componentActive: boolean = true;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: SalesOrder,
        public dialogRef: MatDialogRef<SalesOrderCancelComponentPrintDialog>,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<fromSalesOrder.State>,
        private salesorderService: SalesOrderService) {}

    ngOnInit() {
        this.salesOrder = this.data;
        this.orderid = this.data.OrderID;
        this.fulfilledby = 'merchant';

        //this.store.dispatch(new salesOrderActions.LoadSalesOrderLines({orderid: this.orderid, fulfilledby: this.fulfilledby}));
        this.store.pipe(
            select(fromSalesOrder.getSalesOrderLines),
            takeWhile(() => this.componentActive)
          ).subscribe(
            salesorderlines => {
                salesorderlines.forEach((salesorderline) => {
                    if (salesorderline.Quantity - salesorderline.FulfilledQuantity > 0) {
                        this.hasCancellationQty = true;
                    }
                });
                return this.salesOrderLinesMatTable = new MatTableDataSource<SalesOrderLine>(salesorderlines);
            }
          );
    }

    onCancel() {
        if (this.isValid()) {
            const confirmation = confirm(`Are you sure you want to cancel this order?`);
            if (confirmation) {
                this.store.dispatch(new salesOrderActions.CancelSalesOrderLines(this.salesOrderLinesMatTable.data));
            }
        }
    }

    isValid() {
        let _ret = false;
        let _count = 0;

        this.salesOrderLinesMatTable.data.forEach((salesorderline) => {
            _count++;

            if (_count == 1) {
                _ret = true;
            }

            if (salesorderline.Quantity - salesorderline.FulfilledQuantity > 0 && !salesorderline.CancellationReason) {
                this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: 'Cancellation Reasons are required' });
                _ret = false;
            }
        });

        if (_count == 0) {
            this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: 'No Lines to cancel' });
        }

        return _ret;
    }
    onCloseClick(): void {
        this.dialogRef.close();
    }
    ngOnDestroy(): void {
        this.componentActive = false;
    }
}
