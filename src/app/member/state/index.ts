import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromMember from './member.reducer';
import { MatTableDataSource } from '@angular/material';
import { Member } from 'app/shared/class/member';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    members: fromMember.MemberState;
};

// Selector functions
const getCompanyFeatureState = createFeatureSelector<fromMember.MemberState>('Member');

export const getMember = createSelector(
    getCompanyFeatureState,
    state => state.member
);
export const getMembers = createSelector(
    getCompanyFeatureState,
    state => state.members
);
export const getMembersMatTable = createSelector(
    getCompanyFeatureState,
    state => new MatTableDataSource<Member>(state.members)
);
export const getPendingDelete = createSelector(
    getCompanyFeatureState,
    state => state.pendingDelete
);
export const pendingRegister = createSelector(
    getCompanyFeatureState,
    state => state.pendingRegister
);

export const getError = createSelector(
    getCompanyFeatureState,
    state => state.error
);
