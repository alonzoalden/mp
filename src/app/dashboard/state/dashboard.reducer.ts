import { DashboardActions, DashboardActionTypes } from './dashboard.actions';
import { Member } from 'app/shared/class/member';
import { VendorList } from 'app/shared/class/vendor';

// State for this feature (Item Variation)
export interface DashboardState {
    members: Member[];    
    pendingSave: boolean,
    error: string;
};

const initialState: DashboardState = {
    members: [],
    pendingSave: false,
    error: ''
};

export function dashboardReducer(state = initialState, action: DashboardActions): DashboardState {

    switch (action.type) {
        // case DashboardActionTypes.LoadMembers:
        //     return {
        //         ...state,
        //         isLoading: true,
        //         error: '',
        //     };

        // case DashboardActionTypes.LoadMembersSuccess:
        //     return {
        //         ...state,
        //         members: action.payload,
        //         isLoading: false,
        //         error: '',
        //     };
        // case DashboardActionTypes.LoadMembersFail:
        //     return {
        //         ...state,
        //         members: [],
                
        //         error: action.payload,
        //     };

        // case DashboardActionTypes.LoadMemberSuccess:
        //     return {
        //         ...state,
        //         members: state.members.length ? state.members : [action.payload],
        //         currentMemberID: action.payload.MemberID,
        //         error: ''
        //     };
        // case DashboardActionTypes.LoadMemberFail:
        //     return {
        //         ...state,
        //         currentMemberID: null,
        //         error: ''
        //     };
        // case DashboardActionTypes.LoadVendorListSuccess:
        //     return {
        //         ...state,
        //         vendorList: action.payload,
        //         isLoading: false,
        //         error: '',
        //     };
            
        // case DashboardActionTypes.LoadVendorListFail:
        //     return {
        //         ...state,
        //         vendorList: [],
        //         error: action.payload,
        //     };
        // case DashboardActionTypes.AddMember:
        // return {
        //     ...state,
        //     pendingSave: true,
        //     error: '',
        // };

        // case DashboardActionTypes.AddMemberSuccess:
        //     return {
        //         ...state,
        //         members: [...state.members, action.payload],
        //         currentMemberID: action.payload.MemberID,
        //         pendingSave: false,
        //         error: '',
        //     };
            
        // case DashboardActionTypes.AddMemberFail:
        //     return {
        //         ...state,
        //         members: [],
        //         error: action.payload,
        //     };
        // case DashboardActionTypes.EditMember:
        //     return {
        //         ...state,
        //         pendingSave: true,
        //         error: ''
        //     };
        // case DashboardActionTypes.EditMemberSuccess:
        //     let _memberslist = [];
        //     let _member = state.members.find(item => action.payload.MemberID === item.MemberID);
        //     if (_member) {
        //         _memberslist = state.members.map(item => action.payload.MemberID === item.MemberID ? action.payload : item);
        //     }
        //     else {
        //         _memberslist = [...state.members, action.payload]
        //     }

        //     return {
        //         ...state,
        //         members: _memberslist,
        //         pendingSave: false,
        //         error: ''
        //     };
        // case DashboardActionTypes.EditMemberFail:
        //     return {
        //         ...state,
        //         error: action.payload,
        //         pendingSave: false,
        //     };
        

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
