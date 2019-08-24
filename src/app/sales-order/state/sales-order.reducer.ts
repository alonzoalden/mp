import { SalesOrderActionTypes, SalesOrderActions } from './sales-order.actions';

// State for this feature (Item Variation)
export interface SalesOrderState {
    memberVendors: any[];
    currentMemberID: number;
    isLoading: boolean;
    pendingDelete: boolean,
    pendingSave: boolean,
    error: string;
};

const initialState: SalesOrderState = {
    memberVendors: [],
    currentMemberID: null,
    isLoading: false,
    pendingDelete: false,
    pendingSave: false,
    error: ''
};

export function salesOrderReducer(state = initialState, action: SalesOrderActions): SalesOrderState {

    switch (action.type) {
        case SalesOrderActionTypes.LoadSalesOrders:
            return {
                ...state,
                isLoading: true,
                error: '',
            };

        case SalesOrderActionTypes.LoadSalesOrdersSuccess:
            return {
                ...state,
                memberVendors: action.payload,
                isLoading: false,
                error: '',
            };
        case SalesOrderActionTypes.LoadSalesOrdersFail:
            return {
                ...state,
                memberVendors: [],
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
