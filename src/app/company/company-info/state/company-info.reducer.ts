import { CompanyInfoActions, CompanyInfoActionTypes } from './company-info.actions';
import { VendorBrand } from 'app/shared/class/vendor-brand';
import { AddressCountry, AddressState } from 'app/shared/class/address';
import { CompanyInfo } from '../../../shared/class/company-info';

// State for this feature (Item Variation)
export interface CompanyInfoState {
    vendorBrands: VendorBrand[];
    companyInfo: CompanyInfo;
    addressCountry: AddressCountry[];
    shippingAddressStates: AddressState[];
    billingAddressStates: AddressState[];
    pendingSave: boolean;
    pendingDelete: boolean;
    isVendorBrandLoading: boolean;
    isInfoDescriptionLoading: boolean;
    error: string;
};

const initialState: CompanyInfoState = {
    vendorBrands: [],
    companyInfo: null,
    addressCountry: [],
    shippingAddressStates: [],
    billingAddressStates: [],
    pendingSave: false,
    pendingDelete: false,
    isVendorBrandLoading: true,
    isInfoDescriptionLoading: true,
    error: ''
};

export function companyInfoReducer(state = initialState, action: CompanyInfoActions): CompanyInfoState {

    switch (action.type) {
        case CompanyInfoActionTypes.LoadVendorBrandsSuccess:
            return {
                ...state,
                vendorBrands: action.payload,
                error: '',
                isVendorBrandLoading: false,
            };
        case CompanyInfoActionTypes.LoadVendorBrandsFail:
            return {
                ...state,
                vendorBrands: [],
                error: action.payload,
                isVendorBrandLoading: false,
            };
        case CompanyInfoActionTypes.LoadCompanyInfoSuccess:
            return {
                ...state,
                companyInfo: action.payload,
                isInfoDescriptionLoading: false,
                error: ''
            };
        case CompanyInfoActionTypes.LoadCompanyInfoFail:
            return {
                ...state,
                companyInfo: null,
                isInfoDescriptionLoading: false,
                error: action.payload
            };
        case CompanyInfoActionTypes.LoadAddressCountrySuccess:
            return {
                ...state,
                addressCountry: action.payload,
                error: ''
            };
        case CompanyInfoActionTypes.LoadAddressCountryFail:
            return {
                ...state,
                addressCountry: [],
                error: action.payload,
            };
        case CompanyInfoActionTypes.LoadShippingAddressStateSuccess:
            return {
                ...state,
                shippingAddressStates: action.payload,
                error: ''
            };
        case CompanyInfoActionTypes.LoadShippingAddressStateFail:
            return {
                ...state,
                shippingAddressStates: [],
                error: action.payload,
            };
        case CompanyInfoActionTypes.LoadBillingAddressStateSuccess:
            return {
                ...state,
                billingAddressStates: action.payload,
                error: ''
            };
        case CompanyInfoActionTypes.LoadBillingAddressStateFail:
            return {
                ...state,
                billingAddressStates: [],
                error: action.payload,
            };
        case CompanyInfoActionTypes.UpdateCompanyInfoShippingAddressSuccess:
            return {
                ...state,
                companyInfo: action.payload,
                error: ''
            };
        case CompanyInfoActionTypes.UpdateCompanyInfoShippingAddressFail:
            return {
                ...state,
                companyInfo: null,
                error: action.payload
            };
        case CompanyInfoActionTypes.UpdateCompanyInfoBillingAddressSuccess:
            return {
                ...state,
                companyInfo: action.payload,
                error: ''
            };
        case CompanyInfoActionTypes.UpdateCompanyInfoBillingAddressFail:
            return {
                ...state,
                companyInfo: null,
                error: action.payload,
            };
        default:
            return state;
    }
}