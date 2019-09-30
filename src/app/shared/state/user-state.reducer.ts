import { Member } from '../class/member';
import * as fromRoot from '../../state/app.state';

/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user-state.actions';

export interface State extends fromRoot.State {
    user: UserState;
}

// State for this feature (User)
export interface UserState {
    currentUser: Member;
    currentUserDefaultPageSize: Number;
    error: string;
}

const initialState: UserState = {
    currentUser: null,
    currentUserDefaultPageSize: null,
    error: ''
};

// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getCurrentUser = createSelector(
    getUserFeatureState,
    state => state.currentUser
);
export const getCurrentUserDefaultPageSize = createSelector(
    getUserFeatureState,
    state => state.currentUserDefaultPageSize
);

export function userreducer(state = initialState, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.GetCurrentUserSuccess:
            return {
                ...state,
                currentUser: action.payload,
                currentUserDefaultPageSize: action.payload.DefaultPageSize,
                error: ''
            };

        case UserActionTypes.GetCurrentUserFail:
            return {
                ...state,
                currentUser: null,
                currentUserDefaultPageSize: null,
                error: action.payload
            };

        default:
            return state;
    }
}
