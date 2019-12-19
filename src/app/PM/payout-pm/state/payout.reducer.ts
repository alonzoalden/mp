import {PayoutActions, PayoutActionTypes} from './payout.actions';
import {Payout, PayoutLog} from '../../../shared/class/payout';
import {Vendor} from '../../../shared/class/vendor';


export interface PayoutState {
    isPayoutItemLoading: boolean;
    isPayoutDetailLoading: boolean;
    vendorList: Vendor[];
    error: string;
    payoutItemList: PayoutLog[];
    payoutDetailList: Payout[];
}

const initialState: PayoutState = {
    isPayoutItemLoading: false,
    isPayoutDetailLoading: false,
    error: '',
    payoutItemList: [],
    vendorList: null,
    payoutDetailList: []
};

export function PayoutReducer(state = initialState, action: PayoutActions): PayoutState {
    switch (action.type) {
        case PayoutActionTypes.LoadPayoutList:
            return {
                ...state, isPayoutItemLoading: true, error: ''
            };
        case PayoutActionTypes.LoadPayoutListSuccess:
            return {
                ...state, isPayoutItemLoading: false, payoutItemList: action.payload
            };
        case PayoutActionTypes.LoadPayoutListFail:
            return {
                ...state, isPayoutItemLoading: false, error: action.payload
            };
        case PayoutActionTypes.LoadVendorList: {
            return {
                ...state, error: '', vendorList: null, payoutItemList: null
            };
        }
        case PayoutActionTypes.LoadVendorListFail:
            return {
                ...state, error: action.payload, vendorList: []
            };
        case PayoutActionTypes.LoadVendorListSuccess:
            return {
                ...state, error: '', vendorList: action.payload
            };
        case PayoutActionTypes.LoadMyVendorList: {
            return {
                ...state, error: '', vendorList: null, payoutItemList: null
            };
        }
        case PayoutActionTypes.LoadMyVendorListFail:
            return {
                ...state, error: action.payload, vendorList: []
            };
        case PayoutActionTypes.LoadMyVendorListSuccess:
            return {
                ...state, error: '', vendorList: action.payload
            };
        case PayoutActionTypes.LoadVendorPayoutDetail:
            return {
                ...state, error: '', isPayoutDetailLoading: true
            };
        case PayoutActionTypes.LoadVendorPayoutDetailFail:
            return {
                ...state, error: action.payload, isPayoutDetailLoading: false
            };
        case PayoutActionTypes.LoadVendorPayoutDetailSuccess:
            return {
                ...state, error: '', payoutDetailList: action.payload, isPayoutDetailLoading: false
            };
        default:
            return state;
    }
}
