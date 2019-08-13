import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../../state/app.state';
import * as fromCompany from './company-attachment.reducer';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    companies: fromCompany.CompanyAttachmentState;
};

// Selector functions
const getCompanyFeatureState = createFeatureSelector<fromCompany.CompanyAttachmentState>('CompanyAttachment');

export const getVendorAttachments = createSelector(
    getCompanyFeatureState,
    state => state.vendorAttachments
);

export const getError = createSelector(
    getCompanyFeatureState,
    state => state.error
);
