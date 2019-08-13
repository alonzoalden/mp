import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../../state/app.state';
import * as fromCompany from './company-info.reducer';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    companies: fromCompany.CompanyInfoState;
};

// Selector functions
const getCompanyFeatureState = createFeatureSelector<fromCompany.CompanyInfoState>('CompanyInfo');

export const getVendorBrands = createSelector(
    getCompanyFeatureState,
    state => state.vendorBrands
);
export const getCompanyInfo = createSelector(
    getCompanyFeatureState,
    state => state.companyInfo
);
export const getShippingAddressStates = createSelector(
    getCompanyFeatureState,
    state => state.shippingAddressStates
);
export const getAddressCountries = createSelector(
    getCompanyFeatureState,
    state => state.addressCountry
);
export const getBillingAddressStates = createSelector(
    getCompanyFeatureState,
    state => state.billingAddressStates
);
export const isVendorBrandLoading = createSelector(
    getCompanyFeatureState,
    state => state.isVendorBrandLoading
);
export const isInfoDescriptionLoading = createSelector(
    getCompanyFeatureState,
    state => state.isInfoDescriptionLoading
);
export const getError = createSelector(
    getCompanyFeatureState,
    state => state.error
);
