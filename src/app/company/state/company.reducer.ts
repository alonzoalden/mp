/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanyActions, CompanyActionTypes } from './company.actions';
import * as fromRoot from '../../state/app.state';
import { VendorBrand } from 'app/shared/class/vendor-brand';
import { AddressCountry } from 'app/shared/class/address';
import { CompanyInfo } from '../../shared/class/company-info';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    companies: CompanyState;
};

// State for this feature (Item Variation)
export interface CompanyState {
    vendorBrands: VendorBrand[];
    companyInfo: CompanyInfo;
    addressCountry: AddressCountry[];
    
    pendingSave: boolean;
    pendingDelete: boolean;
    isLoading: boolean;
    error: string;
};

const initialState: CompanyState = {
    vendorBrands: [],
    companyInfo: null,
    addressCountry: [],
    pendingSave: false,
    pendingDelete: false,
    isLoading: true,
    error: ''
};

// Selector functions
const getCompanyFeatureState = createFeatureSelector<CompanyState>('Company');

export const getVendorBrands = createSelector(
    getCompanyFeatureState,
    state => state.vendorBrands
);
export const getLoadingStatus = createSelector(
    getCompanyFeatureState,
    state => state.isLoading
);


export function reducer(state = initialState, action: CompanyActions): CompanyState {

    switch (action.type) {

        case CompanyActionTypes.LoadVendorBrandsSuccess:
            return {
                ...state,
                vendorBrands: action.payload,
                error: '',
                //isLoading: false,
            };

        case CompanyActionTypes.LoadVendorBrandsFail:
            return {
                ...state,
                vendorBrands: [],
                error: action.payload,
                //isLoading: false,
            };

        default:
            return state;
    }
}
