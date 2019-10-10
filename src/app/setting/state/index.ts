import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromSetting from './setting.reducer';
import { MatTableDataSource } from '@angular/material';
import { MemberVendor } from 'app/shared/class/member';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    setting: fromSetting.SettingState;
}

// Selector functions
const getSettingFeatureState = createFeatureSelector<fromSetting.SettingState>('Setting');

export const getMemberVendorList = createSelector(
    getSettingFeatureState,
    state => state.memberVendors
);
export const getMemberVendorListMatTable = createSelector(
    getSettingFeatureState,
    state => new MatTableDataSource<MemberVendor>(state.memberVendors)
);
export const getPendingSave = createSelector(
    getSettingFeatureState,
    state => state.pendingSave
);
export const getError = createSelector(
    getSettingFeatureState,
    state => state.error
);
