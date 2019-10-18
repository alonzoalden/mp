import { AdminActions, AdminActionTypes } from './admin.actions';
import { Member } from 'app/shared/class/member';
import { VendorList } from 'app/shared/class/vendor';

// State for this feature (Item Variation)
export interface AdminState {
    members: Member[];
    vendorList: VendorList[];
    currentMemberID: number;
    isLoading: boolean;
    pendingDelete: boolean;
    pendingSave: boolean;
    error: string;
}

const initialState: AdminState = {
    members: [],
    vendorList: [],
    currentMemberID: null,
    isLoading: false,
    pendingDelete: false,
    pendingSave: false,
    error: ''
};

export function adminReducer(state = initialState, action: AdminActions): AdminState {

    switch (action.type) {
        case AdminActionTypes.SetMemberID:
            return {
                ...state,
                currentMemberID: action.payload,
                error: '',
            };
        case AdminActionTypes.LoadMembers:
            return {
                ...state,
                isLoading: true,
                error: '',
            };

        case AdminActionTypes.LoadMembersSuccess:
            return {
                ...state,
                members: action.payload,
                isLoading: false,
                error: '',
            };
        case AdminActionTypes.LoadMembersFail:
            return {
                ...state,
                members: [],

                error: action.payload,
            };

        case AdminActionTypes.LoadMemberSuccess:
            return {
                ...state,
                members: state.members.length ? state.members : [action.payload],
                currentMemberID: action.payload.MemberID,
                error: ''
            };
        case AdminActionTypes.LoadMemberFail:
            return {
                ...state,
                currentMemberID: null,
                error: ''
            };
        case AdminActionTypes.LoadVendorListSuccess:
            return {
                ...state,
                vendorList: action.payload,
                isLoading: false,
                error: '',
            };

        case AdminActionTypes.LoadVendorListFail:
            return {
                ...state,
                vendorList: [],
                error: action.payload,
            };
        case AdminActionTypes.AddMember:
        return {
            ...state,
            pendingSave: true,
            error: '',
        };

        case AdminActionTypes.AddMemberSuccess:
            return {
                ...state,
                members: [...state.members, action.payload],
                currentMemberID: action.payload.MemberID,
                pendingSave: false,
                error: '',
            };

        case AdminActionTypes.AddMemberFail:
            return {
                ...state,
                members: [],
                error: action.payload,
            };
        case AdminActionTypes.EditMember:
            return {
                ...state,
                pendingSave: true,
                error: ''
            };
        case AdminActionTypes.EditMemberSuccess:
            let _memberslist = [];
            const _member = state.members.find(item => action.payload.MemberID === item.MemberID);
            if (_member) {
                _memberslist = state.members.map(item => action.payload.MemberID === item.MemberID ? action.payload : item);
            } else {
                _memberslist = [...state.members, action.payload];
            }

            return {
                ...state,
                members: _memberslist,
                pendingSave: false,
                error: ''
            };
        case AdminActionTypes.EditMemberFail:
            return {
                ...state,
                error: action.payload,
                pendingSave: false,
            };

        default:
            return state;
    }
}
