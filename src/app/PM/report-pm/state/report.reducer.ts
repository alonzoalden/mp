import {ReportActions, ReportActionTypes} from './report.actions';
import {ItemList} from 'app/shared/class/item';
import {Vendor, VendorList} from '../../../shared/class/vendor';
import {InventoryReport, VendorReport} from 'app/shared/class/report';


export interface ReportState {
    itemList: ItemList[];
    isItemReportLoading: boolean;
    isSubVendorReportLoading: boolean;
    inventoryReport: InventoryReport[];
    error: string;
    VendorList: Vendor[];
    vendorReport: VendorReport[];
}

const initialState: ReportState = {
    itemList: null,
    isItemReportLoading: false,
    isSubVendorReportLoading: false,
    inventoryReport: [],
    VendorList: null,
    error: '',
    vendorReport: []
};

export function ReportReducer(state = initialState, action: ReportActions): ReportState {
    switch (action.type) {
        // case ReportActionTypes.LoadItemListWithVendors:
        //     return {
        //         ...state
        //     };
        case ReportActionTypes.LoadItemListWithVendorsSuccess:
            return {
                ...state, itemList: action.payload, error: ''
            };
        case ReportActionTypes.LoadItemListWithVendorsFail:
            return {
                ...state, error: action.payload, itemList: []
            };
        case ReportActionTypes.LoadItemReport:
            return {
                ...state, isItemReportLoading: true
            };
        case ReportActionTypes.LoadItemReportSuccess:
            return {
                ...state, inventoryReport: action.payload, isItemReportLoading: false, error: ''
            };
        case ReportActionTypes.LoadItemReportFail:
            return {
                ...state, isItemReportLoading: false, error: action.payload, inventoryReport: []
            };
        case ReportActionTypes.LoadVendorList: {
            return {
                ...state, error: ''
            };
        }
        case ReportActionTypes.LoadVendorListFail:
            return {
                ...state, error: action.payload, VendorList: []
            };
        case ReportActionTypes.LoadVendorListSuccess:
            return {
                ...state, error: '', VendorList: action.payload
            };
        case ReportActionTypes.LoadVendorReport:
            return {
                ...state, error: '', isSubVendorReportLoading: true
            };
        case ReportActionTypes.LoadVendorReportSuccess:
            return {
                ...state, error: '', isSubVendorReportLoading: false, vendorReport: action.payload
            };
        case ReportActionTypes.LoadVendorReportFail:
            return {
                ...state, error: action.payload, isSubVendorReportLoading: false, vendorReport: null
            };
        default:
            return state;
    }
}
