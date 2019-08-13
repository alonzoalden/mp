import { CompanyAttachmentActions, CompanyAttachmentActionTypes } from './company-attachment.actions';
import { VendorBrand } from 'app/shared/class/vendor-brand';
import { AddressCountry, AddressState } from 'app/shared/class/address';
import { CompanyInfo } from '../../../shared/class/company-info';

// State for this feature (Item Variation)
export interface CompanyAttachmentState {
    vendorBrands: VendorBrand[];
    vendorAttachmentID: number;
    isInfoDescriptionLoading: boolean;
    error: string;
};

const initialState: CompanyAttachmentState = {
    vendorBrands: [],
    vendorAttachmentID: null,
    isInfoDescriptionLoading: true,
    error: ''
};

export function companyAttachmentReducer(state = initialState, action: CompanyAttachmentActions): CompanyAttachmentState {

    switch (action.type) {
        case CompanyAttachmentActionTypes.SetVendorAttachmentID:
            return {
                ...state,
                vendorAttachmentID: action.payload,
                error: '',
                // isVendorBrandLoading: false,
            };
        case CompanyAttachmentActionTypes.LoadVendorBrandsSuccess:
            return {
                ...state,
                vendorBrands: action.payload,
                error: '',
                // isVendorBrandLoading: false,
            };
        case CompanyAttachmentActionTypes.LoadVendorBrandsFail:
            return {
                ...state,
                vendorBrands: [],
                // error: action.payload,
                //isVendorBrandLoading: false,
            };
        
        default:
            return state;
    }
}
