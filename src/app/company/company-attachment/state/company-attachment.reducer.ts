import { CompanyAttachmentActions, CompanyAttachmentActionTypes } from './company-attachment.actions';
import { VendorAttachment, VendorAttachmentInsert } from 'app/shared/class/vendor-attachment';

// State for this feature (Item Variation)
export interface CompanyAttachmentState {
    vendorAttachments: VendorAttachment[];
    currentVendorAttachmentID: number;
    isVendorAttachmentsLoading: boolean;
    pendingDelete: boolean,
    pendingUpload: boolean,
    error: string;
};

const initialState: CompanyAttachmentState = {
    vendorAttachments: [],
    currentVendorAttachmentID: null,
    isVendorAttachmentsLoading: true,
    pendingDelete: false,
    pendingUpload: false,
    error: ''
};

export function companyAttachmentReducer(state = initialState, action: CompanyAttachmentActions): CompanyAttachmentState {

    switch (action.type) {
        case CompanyAttachmentActionTypes.SetVendorAttachmentID:
            return {
                ...state,
                currentVendorAttachmentID: action.payload,
                error: '',
            };
        case CompanyAttachmentActionTypes.LoadVendorAttachmentsSuccess:
            return {
                ...state,
                vendorAttachments: action.payload,
                error: '',
                isVendorAttachmentsLoading: false,
            };
        case CompanyAttachmentActionTypes.LoadVendorAttachmentsFail:
            return {
                ...state,
                vendorAttachments: [],
                error: action.payload,
                isVendorAttachmentsLoading: false,
            };
            case CompanyAttachmentActionTypes.DeleteVendorAttachment:
                    return {
                        ...state,
                        pendingDelete: true
                    };
        case CompanyAttachmentActionTypes.DeleteVendorAttachmentSuccess:
            const _updatedVendorAttachments = state.vendorAttachments.filter(attachment => attachment.VendorAttachmentID !== action.payload);
            return {
                ...state,
                vendorAttachments: _updatedVendorAttachments,
                pendingDelete: false,
                error: ''
            };
        

        case CompanyAttachmentActionTypes.DeleteVendorAttachmentFail:
            return {
                ...state,
                pendingDelete: false,
                error: action.payload
            };
        
        case CompanyAttachmentActionTypes.EditVendorAttachmentSuccess:
            let _attachmentsList = [];
            let _attachment = state.vendorAttachments.find(item => action.payload.VendorAttachmentID === item.VendorAttachmentID);

            if (_attachment) {
                _attachmentsList = state.vendorAttachments.map(
                    item => action.payload.VendorAttachmentID === item.VendorAttachmentID ? action.payload : item);
            }
            else {
                _attachmentsList = [...state.vendorAttachments, action.payload]
            }

            return {
                ...state,
                vendorAttachments: _attachmentsList,
                pendingUpload: false,
                error: ''
            };

            // const _updatedAttachments = state.vendorAttachments.map(
            //     item => action.payload.VendorAttachmentID === item.VendorAttachmentID ? action.payload : item);
            // return {
            //     ...state,
            //     vendorAttachments: _updatedAttachments,
            //     pendingUpload: false,
            //     error: ''
            // };
    
        case CompanyAttachmentActionTypes.EditVendorAttachmentFail:
            return {
                ...state,
                error: action.payload,
                pendingUpload: false,
            };
        // case CompanyAttachmentActionTypes.UploadVendorAttachmentSuccess:
        //     return {
        //         ...state
        //     };

        // case CompanyAttachmentActionTypes.UploadVendorAttachmentFail:
        //     return {
        //         ...state,
        //     };

        
        case CompanyAttachmentActionTypes.GetVendorAttachmentSuccess:
            return {
                ...state,
                vendorAttachments: state.vendorAttachments.length ? state.vendorAttachments : [action.payload],
                currentVendorAttachmentID: action.payload.VendorAttachmentID,
                error: ''
            };
        case CompanyAttachmentActionTypes.UploadVendorAttachment:
            return {
                ...state,
                pendingUpload: true
            }
        case CompanyAttachmentActionTypes.UploadUpdateVendorAttachment:
            return {
                ...state,
                pendingUpload: true
            }
        case CompanyAttachmentActionTypes.EditVendorAttachment:
            return {
                ...state,
                pendingUpload: true
            }
            

        default:
            return state;
    }
}
