/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanyActions, CompanyActionTypes } from './company.actions';

import { VendorBrand } from 'app/shared/class/vendor-brand';
import { AddressCountry } from 'app/shared/class/address';
import { CompanyInfo } from '../../shared/class/company-info';
import { MatTableDataSource } from '@angular/material';


// State for this feature (Item Variation)
export interface CompanyState {
    //vendorBrands: VendorBrand[];
    vendorBrands: MatTableDataSource<VendorBrand>;
    companyInfo: CompanyInfo;
    addressCountry: AddressCountry[];
    pendingSave: boolean;
    pendingDelete: boolean;
    isLoading: boolean;
    error: string;
};

const initialState: CompanyState = {
    vendorBrands: null,
    companyInfo: null,
    addressCountry: [],
    pendingSave: false,
    pendingDelete: false,
    isLoading: true,
    error: ''
};

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
                vendorBrands: null,
                error: action.payload,
                //isLoading: false,
            };

        default:
            return state;
    }
}
