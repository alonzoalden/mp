import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SalesOrderLine } from '../../../../../../shared/class/sales-order-line';
import { SalesOrder } from '../../../../../../shared/class/sales-order';
import { BOLRequest, BOLRequestLine } from '../../../../../../shared/class/bol-request';
import { SalesOrderService } from '../../../../sales-order.service';
import { environment } from '../../../../../../../environments/environment';
import * as salesOrderActions from '../../../../state/sales-order.actions';
import * as fromSalesOrder from '../../../../state';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import * as companyActions from '../../../../../company/company-info/state/company-info.actions';
import * as fromCompany from '../../../../../company/company-info/state';
import { CompanyInfo } from '../../../../../../shared/class/company-info';
import { AddressCountry, AddressState } from '../../../../../../shared/class/address';

@Component({
    selector: 'sales-order-view-bol.component-request-dialog',
    templateUrl: './sales-order-view-bol.component-request-dialog.html',
})

export class SalesOrderViewBOLRequestComponentDialog implements OnInit, OnDestroy {
    imageURL = environment.imageURL;
    linkURL = environment.linkURL;
    errorMessage: string;
    fulfilledby: string;
    orderid: number;
    salesOrder: SalesOrder;
    hasCancellationQty: boolean = false;
    salesOrderLinesMatTable: MatTableDataSource<SalesOrderLine>;
    deliveryDetail: string;
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
        },
        {
            Value: 'Parcel'
        }
    ];

    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2040, 0, 1);

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {salesorder: SalesOrder, orderid: number},
        public dialogRef: MatDialogRef<SalesOrderViewBOLRequestComponentDialog>,
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
                    this.bolRequest.Name = companyinfo.CompanyName;
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
        } else {
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
        if (this.companyInfo.ShippingCountryID === 'US') {
            this.getShippingAddressState();
            this.companyInfo.ShippingState = 'Alabama';
        } else if (this.companyInfo.ShippingCountryID === 'CA') {
            this.getShippingAddressState();
            this.companyInfo.ShippingState = 'Alberta';
        } else {
            this.companyInfo.ShippingState = '';
        }
    }
    getShippingAddressState() {
        this.companyStore.dispatch(new companyActions.LoadShippingAddressState(this.companyInfo.ShippingCountryID));
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
    onRemoveRequestline(requestline: BOLRequestLine, index: number) {
        const confirmation = confirm(`Remove ${requestline.PackageType}?`);
        if (confirmation) {
            this.bolRequest.BOLRequestLines.splice(index, 1);
            this.refreshDataSource(this.bolRequest.BOLRequestLines);
            this.currentIndex = this.bolRequest.BOLRequestLines.length - 1;
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
