/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanyActions, CompanyActionTypes } from './company.actions';

import { VendorBrand } from 'app/shared/class/vendor-brand';
import { AddressCountry, AddressState } from 'app/shared/class/address';
import { CompanyInfo } from '../../shared/class/company-info';


// State for this feature (Item Variation)
export interface CompanyState {
    vendorBrands: VendorBrand[];
    //vendorBrands: MatTableDataSource<VendorBrand>;
    companyInfo: CompanyInfo;
    addressCountry: AddressCountry[];
    shippingAddressStates: AddressState[];
    billingAddressStates: AddressState[];
    pendingSave: boolean;
    pendingDelete: boolean;
    isLoading: boolean;
    error: string;
};

const initialState: CompanyState = {
    vendorBrands: [],
    companyInfo: null,
    addressCountry: [],
    shippingAddressStates: [],
    billingAddressStates: [],
    pendingSave: false,
    pendingDelete: false,
    isLoading: true,
    error: ''
};

export function reducer(state = initialState, action: CompanyActions): CompanyState {

    switch (action.type) {
        case CompanyActionTypes.SetLoadingStatus:
            return {
                ...state,
                isLoading: action.payload
            };

        case CompanyActionTypes.LoadVendorBrandsSuccess:
            return {
                ...state,
                vendorBrands: action.payload,
                error: '',
                isLoading: false,
            };

        case CompanyActionTypes.LoadVendorBrandsFail:
            return {
                ...state,
                vendorBrands: [],
                error: action.payload,
                isLoading: false,
            };
        case CompanyActionTypes.LoadCompanyInfoSuccess:
            return {
                ...state,
                companyInfo: action.payload,
                error: ''
            };

        case CompanyActionTypes.LoadCompanyInfoFail:
            return {
                ...state,
                companyInfo: null,
                error: action.payload
            };
        case CompanyActionTypes.LoadAddressCountrySuccess:
            return {
                ...state,
                addressCountry: action.payload,
                error: ''
            };

        case CompanyActionTypes.LoadAddressCountryFail:
            return {
                ...state,
                addressCountry: [],
                error: action.payload,
            };
        case CompanyActionTypes.LoadShippingAddressStateSuccess:
            return {
                ...state,
                shippingAddressStates: action.payload,
                error: ''
            };

        case CompanyActionTypes.LoadShippingAddressStateFail:
            return {
                ...state,
                shippingAddressStates: [],
                error: action.payload,
            };
        case CompanyActionTypes.LoadBillingAddressStateSuccess:
            return {
                ...state,
                billingAddressStates: action.payload,
                error: ''
            };

        case CompanyActionTypes.LoadBillingAddressStateFail:
            return {
                ...state,
                billingAddressStates: [],
                error: action.payload,
            };

        default:
            return state;
    }
}
