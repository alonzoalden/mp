import {UsermanagementActions, UserManangementActionTypes} from './usermanagement.actions';
import {Member} from '../../../shared/class/member';
import {Vendor} from '../../../shared/class/vendor';
import {MemberRelationItemNode, MemberRelationNode} from 'app/shared/class/member-relation';
import {VendorRegistrationB2B} from '../../../shared/class/vendor-registration';


export interface UsermanagementState {
    isMemberListLoading: boolean;
    isRelatedVendorListLoading: boolean;
    isUnRelatedVendorListLoading: boolean;
    isTreeDataLoading: boolean;
    isCheckVendorListLoading: boolean;
    memberList: Member[];
    error: string;
    currentMember: Member;
    relatedVendorList: Vendor[];
    unRelatedVendorList: Vendor[];
    memberRelationTree: MemberRelationItemNode[];
    unUseMemberList: MemberRelationNode[];
    checkVendorList: VendorRegistrationB2B[];
    currentVendorRegistration: VendorRegistrationB2B;
    memberPMList: Member[];
}

const initialState: UsermanagementState = {
    isMemberListLoading: false,
    isCheckVendorListLoading: false,
    memberList: [],
    error: '',
    currentMember: null,
    relatedVendorList: [],
    unRelatedVendorList: [],
    isRelatedVendorListLoading: false,
    isUnRelatedVendorListLoading: false,
    memberRelationTree: [],
    unUseMemberList: [],
    isTreeDataLoading: null,
    checkVendorList: [],
    currentVendorRegistration: null,
    memberPMList: []
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
        case UserManangementActionTypes.LoadMemberRelationTreeSuccess:
            return {
                ...state, memberRelationTree: action.payload, isTreeDataLoading: false
            };
        case UserManangementActionTypes.UpdateMemberRelationTree:
            return {
                ...state, memberRelationTree: action.payload
            };
        case UserManangementActionTypes.LoadUnRelatedMemberRelationListSuccess:
            return {
                ...state, unUseMemberList: action.payload
            };
        case UserManangementActionTypes.DeleteFromUnRelatedMemberRelationList: {
            let _unUseMemberList = [...state.unUseMemberList];
            _unUseMemberList = _unUseMemberList.filter(x => x !== action.payload);
            return {
                ...state, unUseMemberList: [..._unUseMemberList]
            };
        }
        case UserManangementActionTypes.AddToUnRelatedMemberRelationList: {
            const _unUseMemberList = [...state.unUseMemberList];
            const _payload = [...action.payload];
            _payload.filter(x => {
                const index = _unUseMemberList.findIndex(e => e.MemberID === x.MemberID);
                if (index === -1) {
                    _unUseMemberList.push(x);
                }
            });
            return {
                ...state, unUseMemberList: [..._unUseMemberList]
            };
        }
        case UserManangementActionTypes.AddRelatedMemberRelationList:
            return {
                ...state, memberRelationTree: [...state.memberRelationTree, action.payload]
            };
        case UserManangementActionTypes.DeleteRelatedMemberRelationList: {
            const _memberRelationTree = [...state.memberRelationTree].filter(x => x !== action.payload);
            return {
                ...state, memberRelationTree: [..._memberRelationTree]
            };
        }
        case UserManangementActionTypes.SaveRelatedMemberRelationListSuccess:
            return {
                ...state, isTreeDataLoading: false, memberRelationTree: action.payload
            };
        case UserManangementActionTypes.SaveRelatedMemberRelationListFail:
            return {
                ...state, error: action.payload, isTreeDataLoading: false
            };
        case UserManangementActionTypes.LoadMemberRelationTree:
            return {
                ...state, isTreeDataLoading: true
            };
        case UserManangementActionTypes.LoadMemberRelationTreeFail:
            return {
                ...state, isTreeDataLoading: false
            };
        case UserManangementActionTypes.SaveRelatedMemberRelationList:
            return {
                ...state, isTreeDataLoading: true
            };
        case UserManangementActionTypes.LoadCheckVendorList:
            return {
                ...state, isCheckVendorListLoading: true
            };
        case UserManangementActionTypes.LoadCheckVendorListFail:
            return {
                ...state, isCheckVendorListLoading: false, checkVendorList: [], error: action.payload
            };
        case UserManangementActionTypes.LoadCheckVendorListSuccess:
            return {
                ...state, isCheckVendorListLoading: false, checkVendorList: action.payload
            };
        case UserManangementActionTypes.EditCurrentVendorRegistration:
            return {
                ...state, currentVendorRegistration: action.payload
            };
        case UserManangementActionTypes.CreateVendorB2bSuccess:
            return {
                ...state, currentVendorRegistration: null
            };
        case UserManangementActionTypes.LoadMemberPMList:
            return {
                ...state, memberPMList: []
            };
        case UserManangementActionTypes.LoadMemberPMListFail:
            return {
                ...state, error: action.payload, memberPMList: []
            };
        case UserManangementActionTypes.LoadMemberPMListSuccess:
            return {
                ...state, memberPMList: action.payload
            };
        default:
            return state;
    }
}
