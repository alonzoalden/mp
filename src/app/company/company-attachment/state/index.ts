import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../../state/app.state';
import * as fromCompany from './company-attachment.reducer';
import { MatTableDataSource } from '@angular/material';
import { VendorAttachment } from 'app/shared/class/vendor-attachment';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    companies: fromCompany.CompanyAttachmentState;
}

// Selector functions
const getCompanyFeatureState = createFeatureSelector<fromCompany.CompanyAttachmentState>('CompanyAttachment');

export const getVendorAttachments = createSelector(
    getCompanyFeatureState,
    state => state.vendorAttachments
);
export const getCurrentVendorAttachment = createSelector(
    getCompanyFeatureState,
    state => state.vendorAttachments.find(item => item.VendorAttachmentID === state.currentVendorAttachmentID)
);

export const getVendorAttachmentsMatTable = createSelector(
    getCompanyFeatureState,
    state => new MatTableDataSource<VendorAttachment>(state.vendorAttachments)
);
export const getPendingUpload = createSelector(
    getCompanyFeatureState,
    state => state.pendingUpload
);
export const getPendingDelete = createSelector(
    getCompanyFeatureState,
    state => state.pendingDelete
);
export const getIsVendorAttachmentsLoading = createSelector(
    getCompanyFeatureState,
    state => state.isVendorAttachmentsLoading
);
export const getError = createSelector(
    getCompanyFeatureState,
    state => state.error
);
