import {Action} from '@ngrx/store';
import {ItemList} from '../../../shared/class/item';
import {Vendor, VendorList} from '../../../shared/class/vendor';
import {InventoryReport, VendorReport} from '../../../shared/class/report';

export enum ReportActionTypes {
    LoadItemListWithVendors = '[Report] Load ItemList With Vendors',
    LoadItemListWithVendorsSuccess = '[Report] Load ItemList With Vendors Success',
    LoadItemListWithVendorsFail = '[Report] Load ItemList With Vendors Fail',
    LoadItemReport = '[Report] Load Item Report',
    LoadItemReportSuccess = '[Report] Load Item Report Success',
    LoadItemReportFail = '[Report] Load Item Report Fail',
    LoadVendorList = '[Report] Load VendorList',
    LoadVendorListSuccess = '[Report] Load VendorList Success',
    LoadVendorListFail = '[Report] Load VendorList Fail',
    LoadVendorReport = '[Report] Load Vendor Report',
    LoadVendorReportSuccess = '[Report] Load Vendor Report Success',
    LoadVendorReportFail = '[Report] Load Vendor Report Fail',

}

export class LoadItemListWithVendors implements Action {
    readonly type = ReportActionTypes.LoadItemListWithVendors;
}

export class LoadItemListWithVendorsSuccess implements Action {
    readonly type = ReportActionTypes.LoadItemListWithVendorsSuccess;

    constructor(public payload: ItemList[]) {
    }
}

export class LoadItemListWithVendorsFail implements Action {
    readonly type = ReportActionTypes.LoadItemListWithVendorsFail;

    constructor(public payload: string) {
    }
}

export class LoadItemReport implements Action {
    readonly type = ReportActionTypes.LoadItemReport;

    constructor(public payload: ItemList) {
    }
}

export class LoadItemReportSuccess implements Action {
    readonly type = ReportActionTypes.LoadItemReportSuccess;

    constructor(public payload: InventoryReport[]) {
    }
}

export class LoadItemReportFail implements Action {
    readonly type = ReportActionTypes.LoadItemReportFail;

    constructor(public payload: string) {
    }
}

export class LoadVendorList implements Action {
    readonly type = ReportActionTypes.LoadVendorList;

    constructor() {
    }
}

export class LoadVendorListSuccess implements Action {
    readonly type = ReportActionTypes.LoadVendorListSuccess;

    constructor(public payload: Vendor[]) {
    }
}

export class LoadVendorListFail implements Action {
    readonly type = ReportActionTypes.LoadVendorListFail;

    constructor(public payload: string) {
    }
}

export class LoadVendorReport implements Action {
    readonly type = ReportActionTypes.LoadVendorReport;

    constructor(public payload: Vendor) {
    }
}

export class LoadVendorReportSuccess implements Action {
    readonly type = ReportActionTypes.LoadVendorReportSuccess;

    constructor(public payload: VendorReport[]) {
    }
}

export class LoadVendorReportFail implements Action {
    readonly type = ReportActionTypes.LoadVendorReportFail;

    constructor(public payload: string) {
    }
}

export type ReportActions =
    | LoadItemListWithVendors
    | LoadItemListWithVendorsSuccess
    | LoadItemListWithVendorsFail
    | LoadItemReport
    | LoadItemReportSuccess
    | LoadItemReportFail
    | LoadVendorList
    | LoadVendorListFail
    | LoadVendorListSuccess
    | LoadVendorReport
    | LoadVendorReportSuccess
    | LoadVendorReportFail;
