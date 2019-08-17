import { CompanyAttachmentActions, CompanyAttachmentActionTypes } from './company-attachment.actions';
import { VendorAttachment } from 'app/shared/class/vendor-attachment';

// State for this feature (Item Variation)
export interface CompanyAttachmentState {
    vendorAttachments: VendorAttachment[];
    vendorAttachmentID: number;
    isVendorAttachmentsLoading: boolean;
    pendingDelete: boolean,
    error: string;
};

const initialState: CompanyAttachmentState = {
    vendorAttachments: [],
    vendorAttachmentID: null,
    isVendorAttachmentsLoading: true,
    pendingDelete: false,
    error: ''
};

export function companyAttachmentReducer(state = initialState, action: CompanyAttachmentActions): CompanyAttachmentState {

    switch (action.type) {
        case CompanyAttachmentActionTypes.SetVendorAttachmentID:
            return {
                ...state,
                vendorAttachmentID: action.payload,
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
            let _attachment = state.vendorAttachments.find(item => action.payload.VendorAttachmentID === item.VendorAttachmentID);
            
            if (_attachment) {
                _attachment = action.payload
            }
            else {
                state.vendorAttachments.push(action.payload);
            }
            
            // var _updatedAttachments = state.vendorAttachments.map(
            //         item => action.payload.VendorAttachmentID === item.VendorAttachmentID ? action.payload : item);

            return {
                ...state,
                vendorAttachments: state.vendorAttachments
            };
    
        case CompanyAttachmentActionTypes.EditVendorAttachmentFail:
            return {
                ...state,
            };
        // case CompanyAttachmentActionTypes.UploadVendorAttachmentSuccess:
        //     return {
        //         ...state
        //     };

        // case CompanyAttachmentActionTypes.UploadVendorAttachmentFail:
        //     return {
        //         ...state,
        //     };

        default:
            return state;
    }
}
