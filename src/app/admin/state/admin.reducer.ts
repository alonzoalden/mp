import { AdminActions, AdminActionTypes } from './admin.actions';
import { Member } from 'app/shared/class/member';

// State for this feature (Item Variation)
export interface AdminState {
    members: Member[];
    currentMemberID: number;
    isLoading: boolean;
    pendingDelete: boolean,
    pendingSave: boolean,
    error: string;
};

const initialState: AdminState = {
    members: [],
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
        case AdminActionTypes.EditMemberSuccess:
            let _memberslist = [];
            let _member = state.members.find(item => action.payload.MemberID === item.MemberID);

            if (_member) {
                _memberslist = state.members.map(
                    item => action.payload.MemberID === item.MemberID ? action.payload : item);
            }
            else {
                _memberslist = [...state.members, action.payload]
            }

            return {
                ...state,
                members: _memberslist,
                pendingSave: false,
                error: ''
            };
        // case CompanyAttachmentActionTypes.LoadVendorAttachmentsSuccess:
        //     return {
        //         ...state,
        //         vendorAttachments: action.payload,
        //         error: '',
        //         isVendorAttachmentsLoading: false,
        //     };
        // case CompanyAttachmentActionTypes.LoadVendorAttachmentsFail:
        //     return {
        //         ...state,
        //         vendorAttachments: [],
        //         error: action.payload,
        //         isVendorAttachmentsLoading: false,
        //     };
        //     case CompanyAttachmentActionTypes.DeleteVendorAttachment:
        //             return {
        //                 ...state,
        //                 pendingDelete: true
        //             };
        // case CompanyAttachmentActionTypes.DeleteVendorAttachmentSuccess:
        //     const _updatedVendorAttachments = state.vendorAttachments.filter(attachment => attachment.VendorAttachmentID !== action.payload);
        //     return {
        //         ...state,
        //         vendorAttachments: _updatedVendorAttachments,
        //         pendingDelete: false,
        //         error: ''
        //     };
        

        // case CompanyAttachmentActionTypes.DeleteVendorAttachmentFail:
        //     return {
        //         ...state,
        //         pendingDelete: false,
        //         error: action.payload
        //     };
        
        // case CompanyAttachmentActionTypes.EditVendorAttachmentSuccess:
        //     let _attachmentsList = [];
        //     let _attachment = state.vendorAttachments.find(item => action.payload.VendorAttachmentID === item.VendorAttachmentID);

        //     if (_attachment) {
        //         _attachmentsList = state.vendorAttachments.map(
        //             item => action.payload.VendorAttachmentID === item.VendorAttachmentID ? action.payload : item);
        //     }
        //     else {
        //         _attachmentsList = [...state.vendorAttachments, action.payload]
        //     }

        //     return {
        //         ...state,
        //         vendorAttachments: _attachmentsList,
        //         pendingUpload: false,
        //         error: ''
        //     };

        //     // const _updatedAttachments = state.vendorAttachments.map(
        //     //     item => action.payload.VendorAttachmentID === item.VendorAttachmentID ? action.payload : item);
        //     // return {
        //     //     ...state,
        //     //     vendorAttachments: _updatedAttachments,
        //     //     pendingUpload: false,
        //     //     error: ''
        //     // };
    
        // case CompanyAttachmentActionTypes.EditVendorAttachmentFail:
        //     return {
        //         ...state,
        //         error: action.payload,
        //         pendingUpload: false,
        //     };
        // // case CompanyAttachmentActionTypes.UploadVendorAttachmentSuccess:
        // //     return {
        // //         ...state
        // //     };

        // // case CompanyAttachmentActionTypes.UploadVendorAttachmentFail:
        // //     return {
        // //         ...state,
        // //     };

        
        // case CompanyAttachmentActionTypes.GetVendorAttachmentSuccess:
        //     return {
        //         ...state,
        //         vendorAttachments: state.vendorAttachments.length ? state.vendorAttachments : [action.payload],
        //         currentVendorAttachmentID: action.payload.VendorAttachmentID,
        //         error: ''
        //     };
        // case CompanyAttachmentActionTypes.UploadVendorAttachment:
        //     return {
        //         ...state,
        //         pendingUpload: true
        //     }
        // case CompanyAttachmentActionTypes.UploadUpdateVendorAttachment:
        //     return {
        //         ...state,
        //         pendingUpload: true
        //     }
        // case CompanyAttachmentActionTypes.EditVendorAttachment:
        //     return {
        //         ...state,
        //         pendingUpload: true
        //     }
            

        default:
            return state;
    }
}
