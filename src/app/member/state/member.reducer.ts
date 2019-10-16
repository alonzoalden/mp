import { MemberActions, MemberActionTypes } from './member.actions';
import { Member } from 'app/shared/class/member';

// State for this feature (Member)
export interface MemberState {
    member: Member;
    members: Member[];
    isLoading: boolean;
    pendingDelete: boolean;
    pendingRegister: boolean;
    error: string;
}

const initialState: MemberState = {
    member: null,
    members: [],
    isLoading: false,
    pendingDelete: false,
    pendingRegister: false,
    error: ''
};

export function memberReducer(state = initialState, action: MemberActions): MemberState {

    switch (action.type) {
        case MemberActionTypes.SetVendorAttachmentID:
            return {
                ...state,
            };
        case MemberActionTypes.LoadMemberByInviteGUIDSuccess:
            return {
                ...state,
                member: action.payload,
                error: '',
            };
        case MemberActionTypes.LoadMemberByInviteGUIDFail:
            return {
                ...state,
                member: null,
                error: action.payload,
            };
        case MemberActionTypes.EditMemberRegistration:
            return {
                ...state,
                pendingRegister: true,
            };
        case MemberActionTypes.EditMemberRegistrationSuccess:
            return {
                ...state,
                member: action.payload,
                pendingRegister: false,
                error: '',
            };
        case MemberActionTypes.EditMemberRegistrationFail:
            return {
                ...state,
                member: null,
                pendingRegister: false,
                error: action.payload,
            };
        case MemberActionTypes.LoadMembers:
            return {
                ...state,
                isLoading: true
            };
        case MemberActionTypes.LoadMembersSuccess:
            return {
                ...state,
                members: action.payload,
                isLoading: false,
                error: '',
            };
        case MemberActionTypes.LoadMembersFail:
            return {
                ...state,
                members: null,
                isLoading: false,
                error: action.payload,
            };
        case MemberActionTypes.DeleteMember:
            return {
                ...state,
                pendingDelete: true,
            };
        case MemberActionTypes.DeleteMemberSuccess:
            const _updatedMembers = state.members.filter(member => member.MemberID !== action.payload.MemberID);
            return {
                ...state,
                members: _updatedMembers,
                pendingDelete: false,
                error: '',
            };
        case MemberActionTypes.DeleteMemberFail:
            return {
                ...state,
                pendingDelete: false,
                error: action.payload,
            };

        default:
            return state;
    }
}
