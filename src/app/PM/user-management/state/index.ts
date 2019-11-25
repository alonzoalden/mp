import * as fromRoot from '../../../state/app.state';
import * as fromUserManagement from './usermanagement.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MatTableDataSource} from '@angular/material';
import {Member} from '../../../shared/class/member';
import {Vendor} from '../../../shared/class/vendor';

export interface State extends fromRoot.State {
    management: fromUserManagement.UsermanagementState;
}

const getUserManageFeatureState = createFeatureSelector<fromUserManagement.UsermanagementState>('user-management');


export const getMemberListLoading = createSelector(
    getUserManageFeatureState,
    state => state.isMemberListLoading
);
export const getMemeberList = createSelector(
    getUserManageFeatureState,
    state => new MatTableDataSource<Member>(state.memberList)
);
export const getCurrentMember = createSelector(
    getUserManageFeatureState,
    state => state.currentMember
);
export const getRelatedVendorList = createSelector(
    getUserManageFeatureState,
    state => new MatTableDataSource<Vendor>(state.relatedVendorList)
);
export const getRelatedVendorListLoading = createSelector(
    getUserManageFeatureState,
    state => state.isRelatedVendorListLoading
);
export const getUnRelatedVendorListLoading = createSelector(
    getUserManageFeatureState,
    state => state.isUnRelatedVendorListLoading
);
export const getUnRelatedVendorList = createSelector(
    getUserManageFeatureState,
    state => new MatTableDataSource<Vendor>(state.unRelatedVendorList)
);
