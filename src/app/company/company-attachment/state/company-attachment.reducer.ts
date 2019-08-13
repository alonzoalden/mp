import { CompanyAttachmentActions, CompanyAttachmentActionTypes } from './company-attachment.actions';
import { VendorBrand } from 'app/shared/class/vendor-brand';
import { AddressCountry, AddressState } from 'app/shared/class/address';
import { CompanyInfo } from '../../../shared/class/company-info';
import { VendorAttachment } from 'app/shared/class/vendor-attachment';
import { MatTableDataSource } from '@angular/material';

// State for this feature (Item Variation)
export interface CompanyAttachmentState {
    vendorAttachments: MatTableDataSource<VendorAttachment>;
    vendorAttachmentID: number;
    isVendorAttachmentsLoading: boolean;
    error: string;
};

const initialState: CompanyAttachmentState = {
    vendorAttachments: null,
    vendorAttachmentID: null,
    isVendorAttachmentsLoading: true,
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
                vendorAttachments: null,
                error: action.payload,
                isVendorAttachmentsLoading: false,
            };
        
        default:
            return state;
    }
}
