import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromAdmin from './admin.reducer';
import { MatTableDataSource } from '@angular/material';
import { Member } from 'app/shared/class/member';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    admin: fromAdmin.AdminState;
}

// Selector functions
const getAdminFeatureState = createFeatureSelector<fromAdmin.AdminState>('Admin');

export const getMembers = createSelector(
    getAdminFeatureState,
    state => state.members
);

export const getCurrentMemberID = createSelector(
    getAdminFeatureState,
    state => state.currentMemberID
);

export const getMember = createSelector(
    getAdminFeatureState,
    getCurrentMemberID,
    (state, currentMemberID) => state.members.find(item => item.MemberID === currentMemberID)
);
export const getMembersMatTable = createSelector(
    getAdminFeatureState,
    state => new MatTableDataSource<Member>(state.members)
);
export const isLoading = createSelector(
    getAdminFeatureState,
    state => state.isLoading
);
export const getPendingSave = createSelector(
    getAdminFeatureState,
    state => state.pendingSave
);
export const getPendingDelete = createSelector(
    getAdminFeatureState,
    state => state.pendingDelete
);
export const getError = createSelector(
    getAdminFeatureState,
    state => state.error
);
export const getVendorList = createSelector(
    getAdminFeatureState,
    state => state.vendorList
);

// export const getCurrentVendorAttachment = createSelector(
//     getCompanyFeatureState,
//     state => state.vendorAttachments.find(item => item.VendorAttachmentID === state.currentVendorAttachmentID)
// );

// export const getVendorAttachmentsMatTable = createSelector(
//     getCompanyFeatureState,
//     state => new MatTableDataSource<VendorAttachment>(state.vendorAttachments)
// );
// export const getPendingUpload = createSelector(
//     getCompanyFeatureState,
//     state => state.pendingUpload
// );
// export const getPendingDelete = createSelector(
//     getCompanyFeatureState,
//     state => state.pendingDelete
// );
// export const getError = createSelector(
//     getCompanyFeatureState,
//     state => state.error
// );
