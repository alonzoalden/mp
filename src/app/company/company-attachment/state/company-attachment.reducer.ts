import { CompanyAttachmentActions, CompanyAttachmentActionTypes } from './company-attachment.actions';
import { VendorBrand } from 'app/shared/class/vendor-brand';
import { AddressCountry, AddressState } from 'app/shared/class/address';
import { CompanyInfo } from '../../../shared/class/company-info';
import { VendorAttachment } from 'app/shared/class/vendor-attachment';
import { MatTableDataSource } from '@angular/material';

// State for this feature (Item Variation)
export interface CompanyAttachmentState {
    vendorAttachments: MatTableDataSource<VendorAttachment>;
    //vendorAttachmentsList: VendorAttachment[];
    vendorAttachmentID: number;
    isVendorAttachmentsLoading: boolean;
    pendingDelete: boolean,
    error: string;
};

const initialState: CompanyAttachmentState = {
    vendorAttachments: new MatTableDataSource<VendorAttachment>([]),
    //vendorAttachmentsList: [],
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
                vendorAttachments: null,
                error: action.payload,
                isVendorAttachmentsLoading: false,
            };
        case CompanyAttachmentActionTypes.DeleteVendorAttachmentSuccess:
            const _updatedVendorAttachments = state.vendorAttachments.data.filter(attachment => attachment.VendorAttachmentID !== action.payload)
            return {
                ...state,
                vendorAttachments: new MatTableDataSource<VendorAttachment>(_updatedVendorAttachments),
                pendingDelete: false,
                error: ''
            };

        case CompanyAttachmentActionTypes.DeleteVendorAttachmentFail:
            return {
                ...state,
                pendingDelete: false,
                error: action.payload
            };
        default:
            return state;
    }
}
