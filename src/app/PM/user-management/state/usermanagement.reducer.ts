import {UsermanagementActions, UserManangementActionTypes} from './usermanagement.actions';
import {Member} from '../../../shared/class/member';
import {Vendor} from '../../../shared/class/vendor';


export interface UsermanagementState {
    isMemberListLoading: boolean;
    memberList: Member[];
    error: string;
    currentMember: Member;
    relatedVendorList: Vendor[];
    unRelatedVendorList: Vendor[];
    isRelatedVendorListLoading: boolean;
    isUnRelatedVendorListLoading: boolean;
}

const initialState: UsermanagementState = {
    isMemberListLoading: false,
    memberList: [],
    error: '',
    currentMember: null,
    relatedVendorList: [],
    unRelatedVendorList: [],
    isRelatedVendorListLoading: false,
    isUnRelatedVendorListLoading: false
};

export function UsermanagementReducer(state = initialState, action: UsermanagementActions): UsermanagementState {
    switch (action.type) {
        case UserManangementActionTypes.LoadMemberList:
            return {
                ...state, isMemberListLoading: true
            };
        case UserManangementActionTypes.LoadMemberListSuccess:
            return {
                ...state, isMemberListLoading: false, memberList: action.payload
            };
        case UserManangementActionTypes.LoadMemberListFail:
            return {
                ...state, isMemberListLoading: false, memberList: [], error: action.payload
            };
        // case UserManangementActionTypes.SetCurrentMember:
        //     return {
        //         ...state, currentMember: action.payload, error: ''
        //     };
        // case UserManangementActionTypes.SetCurrentMemberSuccess:
        case UserManangementActionTypes.LoadCurrentMemberRelatedVendors:
            return {
                ...state, isRelatedVendorListLoading: true, relatedVendorList: []
            };
        case UserManangementActionTypes.LoadCurrentMemberRelatedVendorsFail:
            return {
                ...state, isRelatedVendorListLoading: false, relatedVendorList: []
            };
        case UserManangementActionTypes.LoadCurrentMemberRelatedVendorsSuccess:
            return {
                ...state, isRelatedVendorListLoading: false, relatedVendorList: action.payload
            };
        case UserManangementActionTypes.LoadCurrentMemberUnRelatedVendors:
            return {
                ...state, isUnRelatedVendorListLoading: true, unRelatedVendorList: []
            };
        case UserManangementActionTypes.LoadCurrentMemberUnRelatedVendorsFail:
            return {
                ...state, isUnRelatedVendorListLoading: false, unRelatedVendorList: []
            };
        case UserManangementActionTypes.LoadCurrentMemberUnRelatedVendorsSuccess:
            return {
                ...state, isUnRelatedVendorListLoading: false, unRelatedVendorList: action.payload
            };
        case UserManangementActionTypes.AddVendorRelationToMember:
            return {
                // ...state, relatedVendorList: [action.payload, ...state.relatedVendorList]
                ...state, isUnRelatedVendorListLoading: true, isRelatedVendorListLoading: true
            };
        case UserManangementActionTypes.AddVendorRelationToMemberSuccess:
            return {
                ...state, error: ''
            };
        case UserManangementActionTypes.AddVendorRelationToMemberFail:
            return {
                ...state, error: action.payload
            };
        case UserManangementActionTypes.RemoveVendorRelationToMember:
            return {
                ...state, isUnRelatedVendorListLoading: true, isRelatedVendorListLoading: true
            };
        case UserManangementActionTypes.RemoveVendorRelationToMemberSuccess:
            return {
                ...state, error: ''
            };
        case UserManangementActionTypes.RemoveVendorRelationToMemberFail:
            return {
                ...state, error: action.payload
            };
        default:
            return state;
    }
}
