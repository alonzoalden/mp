import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromCompany from './company.reducer';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    companies: fromCompany.CompanyState;
};

// Selector functions
const getCompanyFeatureState = createFeatureSelector<fromCompany.CompanyState>('Company');

export const getVendorBrands = createSelector(
    getCompanyFeatureState,
    state => state.vendorBrands
);
export const getCompanyInfo = createSelector(
    getCompanyFeatureState,
    state => state.companyInfo
);
export const getLoadingStatus = createSelector(
    getCompanyFeatureState,
    state => state.isLoading
);
export const getError = createSelector(
    getCompanyFeatureState,
    state => state.error
);
