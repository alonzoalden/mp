import { SettingActions, SettingActionTypes } from './setting.actions';
import { MemberVendor } from 'app/shared/class/member';

// State for this feature (Item Variation)
export interface SettingState {
    memberVendors: MemberVendor[];
    currentMemberID: number;
    isLoading: boolean;
    pendingDelete: boolean;
    pendingSave: boolean;
    error: string;
}

const initialState: SettingState = {
    memberVendors: [],
    currentMemberID: null,
    isLoading: false,
    pendingDelete: false,
    pendingSave: false,
    error: ''
};

export function settingReducer(state = initialState, action: SettingActions): SettingState {

    switch (action.type) {
        case SettingActionTypes.LoadMemberVendors:
            return {
                ...state,
                isLoading: true,
                error: '',
            };

        case SettingActionTypes.LoadMemberVendorsSuccess:
            return {
                ...state,
                memberVendors: action.payload,
                isLoading: false,
                error: '',
            };
        case SettingActionTypes.LoadMemberVendorsFail:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case SettingActionTypes.EditCurrentMember:
            return {
                ...state,
                pendingSave: true,
                error: '',
            };

        case SettingActionTypes.EditCurrentMemberSuccess:
            return {
                ...state,
                pendingSave: false,
                error: '',
            };
        case SettingActionTypes.EditCurrentMemberFail:
            return {
                ...state,
                pendingSave: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
