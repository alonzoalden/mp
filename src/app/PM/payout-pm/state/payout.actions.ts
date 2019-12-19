import {Action} from '@ngrx/store';
import {Payout, PayoutLog} from '../../../shared/class/payout';
import {Vendor} from '../../../shared/class/vendor';

export enum PayoutActionTypes {
    LoadPayoutList = '[Payout] Load Payout List',
    LoadPayoutListSuccess = '[Payout] Load Payout List Success',
    LoadPayoutListFail = '[Payout] Load Payout List Fail',
    LoadVendorList = '[Payout] Load VendorList',
    LoadVendorListSuccess = '[Payout] Load VendorList Success',
    LoadVendorListFail = '[Payout] Load VendorList Fail',
    LoadMyVendorList = '[Payout] Load My VendorList',
    LoadMyVendorListSuccess = '[Payout] Load My VendorList Success',
    LoadMyVendorListFail = '[Payout] Load My VendorList Fail',
    LoadVendorPayoutLog = '[Payout] Load Vendor PayoutLog',
    LoadVendorPayoutLogSuccess = '[Payout] Load Vendor PayoutLogSuccess',
    LoadVendorPayoutLogFail = '[Payout] Load Vendor PayoutLogFail',
    LoadVendorPayoutDetail = '[Payout] Load Vendor Payout Detail',
    LoadVendorPayoutDetailSuccess = '[Payout] Load Vendor PayoutDetailSuccess',
    LoadVendorPayoutDetailFail = '[Payout] Load Vendor PayoutDetailFail',

}

export class LoadPayoutList implements Action {
    readonly type = PayoutActionTypes.LoadPayoutList;

    constructor(public payload: Vendor) {

    }
}

export class LoadPayoutListSuccess implements Action {
    readonly type = PayoutActionTypes.LoadPayoutListSuccess;

    constructor(public payload: PayoutLog[]) {
    }
}

export class LoadPayoutListFail implements Action {
    readonly type = PayoutActionTypes.LoadPayoutListFail;

    constructor(public payload: string) {

    }
}

export class LoadVendorList implements Action {
    readonly type = PayoutActionTypes.LoadVendorList;

    constructor() {
    }
}

export class LoadVendorListSuccess implements Action {
    readonly type = PayoutActionTypes.LoadVendorListSuccess;

    constructor(public payload: Vendor[]) {
    }
}

export class LoadVendorListFail implements Action {
    readonly type = PayoutActionTypes.LoadVendorListFail;

    constructor(public payload: string) {
    }
}
export class LoadMyVendorList implements Action {
    readonly type = PayoutActionTypes.LoadMyVendorList;

    constructor() {
    }
}

export class LoadMyVendorListSuccess implements Action {
    readonly type = PayoutActionTypes.LoadMyVendorListSuccess;

    constructor(public payload: Vendor[]) {
    }
}

export class LoadMyVendorListFail implements Action {
    readonly type = PayoutActionTypes.LoadMyVendorListFail;

    constructor(public payload: string) {
    }
}

export class LoadVendorPayoutLog implements Action {
    readonly type = PayoutActionTypes.LoadVendorPayoutLog;

    constructor() {
    }
}

export class LoadVendorPayoutLogSuccess implements Action {
    readonly type = PayoutActionTypes.LoadVendorPayoutLogSuccess;

    constructor(public payload: Vendor[]) {
    }
}

export class LoadVendorPayoutLogFail implements Action {
    readonly type = PayoutActionTypes.LoadVendorPayoutLogFail;

    constructor(public payload: string) {
    }
}

export class LoadVendorPayoutDetail implements Action {
    readonly type = PayoutActionTypes.LoadVendorPayoutDetail;

    constructor(public payload: string) {
    }
}

export class LoadVendorPayoutDetailSuccess implements Action {
    readonly type = PayoutActionTypes.LoadVendorPayoutDetailSuccess;

    constructor(public payload: Payout[]) {
    }
}

export class LoadVendorPayoutDetailFail implements Action {
    readonly type = PayoutActionTypes.LoadVendorPayoutDetailFail;

    constructor(public payload: string) {
    }
}

export type PayoutActions =
    | LoadPayoutList
    | LoadPayoutListSuccess
    | LoadPayoutListFail
    | LoadVendorList
    | LoadVendorListSuccess
    | LoadVendorListFail
    | LoadVendorPayoutLog
    | LoadVendorPayoutLogSuccess
    | LoadVendorPayoutLogFail
    | LoadVendorPayoutDetail
    | LoadVendorPayoutDetailSuccess
    | LoadVendorPayoutDetailFail
    | LoadMyVendorList
    | LoadMyVendorListFail
    | LoadMyVendorListSuccess
    ;
