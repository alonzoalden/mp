import {Action} from '@ngrx/store';
import {
    VendorCertificate,
    VendorDevelopment,
    VendorFactoryTour,
    VendorImage,
    VendorOM,
    VendorQC,
    VendorService,
    VendorTradeShow
} from '../../../../shared/class/vendor-b2b';
import {Contact} from '../../../../shared/class/contact';

export enum CompanyB2BActionTypes {
    LoadVendorFactoryTour = '[Company] Load Vendor Factory Tour',
    LoadVendorFactoryTourSuccess = '[Company] Load Vendor Factory Tour Success',
    LoadVendorFactoryTourFail = '[Company] Load Vendor Factory Tour Fail',
    UpdateVendorFactoryTour = '[Company] Update Vendor Factory Tour',
    UpdateVendorFactoryTourSuccess = '[Company] Update Vendor Factory Tour Success',
    UpdateVendorFactoryTourFail = '[Company] Update Vendor Factory Tour Fail',
    UploadVendorImage = '[Company] Upload Vendor Image',
    UploadVendorImageSuccess = '[Company] Upload Vendor Image Success',
    UploadVendorImageFail = '[Company] Upload Vendor Image Fail',
    DeleteFactoryImage = '[Company] Delete Vendor Factory Image',
    DeleteDevelopmentImage = '[Company] Delete Vendor Development Image',
    DeleteOMImage = '[Company] Delete Vendor OM Image',
    DeleteQCImage = '[Company] Delete Vendor QC Image',
    ClearUploadList = '[Company] Clear Upload List',
    LoadVendorDevelopment = '[Company] Load Vendor Development',
    LoadVendorDevelopmentSuccess = '[Company] Load Vendor Development Success',
    LoadVendorDevelopmentFail = '[Company] Load Vendor Development Fail',
    UpdateVendorDevelopment = '[Company] Update Vendor Development',
    UpdateVendorDevelopmentSuccess = '[Company] Update Vendor Development Success',
    UpdateVendorDevelopmentFail = '[Company] Update Vendor Development Fail',
    UpdateVendorFactoryImageList = '[Company] Update Vendor Factory Image List',
    UpdateVendorDevelopmentImageList = '[Company] Update Vendor Development Image List',
    UpdateVendorOMImageList = '[Company] Update Vendor OM Image List',
    LoadVendorOM = '[Company] Load Vendor OM',
    LoadVendorOMSuccess = '[Company] Load Vendor OM Success',
    LoadVendorOMFail = '[Company] Load Vendor OM Fail',
    UpdateVendorOM = '[Company] Update Vendor OM',
    UpdateVendorOMSuccess = '[Company] Update Vendor OM Success',
    UpdateVendorOMFail = '[Company] Update Vendor OM Fail',
    UpdateVendorQCImageList = '[Company] Update Vendor QC Image List',
    LoadVendorQC = '[Company] Load Vendor QC',
    LoadVendorQCSuccess = '[Company] Load Vendor QC Success',
    LoadVendorQCFail = '[Company] Load Vendor QC Fail',
    UpdateVendorQC = '[Company] Update Vendor QC',
    UpdateVendorQCSuccess = '[Company] Update Vendor QC Success',
    UpdateVendorQCFail = '[Company] Update Vendor QC Fail',
    LoadVendorService = '[Company] Load Vendor Service',
    LoadVendorServiceSuccess = '[Company] Load Vendor Service Success',
    LoadVendorServiceFail = '[Company] Load Vendor Service Fail',
    UpdateVendorService = '[Company] Update Vendor Service',
    UpdateVendorServiceSuccess = '[Company] Update Vendor Service Success',
    UpdateVendorServiceFail = '[Company] Update Vendor Service Fail',
    UpdateVendorServiceImageList = '[Company] Update Vendor Service Image List',
    DeleteServiceImage = '[Company] Delete Vendor Service Image',
    LoadVendorCertificate = '[Company] Load Vendor Certificate',
    LoadVendorCertificateSuccess = '[Company] Load Vendor Certificate Success',
    LoadVendorCertificateFail = '[Company] Load Vendor Certificate Fail',
    UpdateVendorCertificate = '[Company] Update Vendor Certificate',
    UpdateVendorCertificateSuccess = '[Company] Update Vendor Certificate Success',
    UpdateVendorCertificateFail = '[Company] Update Vendor Certificate Fail',
    UpdateVendorCertificateImageList = '[Company] Update Vendor Certificate Image List',
    DeleteCertificateImage = '[Company] Delete Vendor Certificate Image',
    LoadVendorTradeShow = '[Company] Load Vendor TradeShow',
    LoadVendorTradeShowSuccess = '[Company] Load Vendor TradeShow Success',
    LoadVendorTradeShowFail = '[Company] Load Vendor TradeShow Fail',
    UpdateVendorTradeShow = '[Company] Update Vendor TradeShow',
    UpdateVendorTradeShowSuccess = '[Company] Update Vendor TradeShow Success',
    UpdateVendorTradeShowFail = '[Company] Update Vendor TradeShow Fail',
    DeleteVendorTradeShow = '[Company] Delete Vendor TradeShow',
    DeleteVendorTradeShowSuccess = '[Company] Delete Vendor TradeShow Success',
    DeleteVendorTradeShowFail = '[Company] Delete Vendor TradeShow Fail',
    LoadVendorContact = '[Company] Load Vendor Contact',
    LoadVendorContactSuccess = '[Company] Load Vendor Contact Success',
    LoadVendorContactFail = '[Company] Load Vendor Contact Fail',
}

// Action Creators

export class LoadVendorFactoryTour implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorFactoryTour;

    constructor() {
    }
}

export class LoadVendorFactoryTourSuccess implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorFactoryTourSuccess;

    constructor(public payload: VendorFactoryTour) {
    }
}

export class LoadVendorFactoryTourFail implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorFactoryTourFail;

    constructor(public payload: string) {
    }
}

export class UpdateVendorFactoryTour implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorFactoryTour;

    constructor(public payload: VendorFactoryTour) {
    }
}

export class UpdateVendorFactoryTourSuccess implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorFactoryTourSuccess;

    constructor(public payload: VendorFactoryTour) {
    }
}

export class UpdateVendorFactoryTourFail implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorFactoryTourFail;

    constructor(public payload: string) {
    }
}

export class UploadVendorImage implements Action {
    readonly type = CompanyB2BActionTypes.UploadVendorImage;

    constructor(public payload: { form: FormData, title: string }) {
    }
}

export class UploadVendorImageSuccess implements Action {
    readonly type = CompanyB2BActionTypes.UploadVendorImageSuccess;

    constructor(public payload: VendorImage) {
    }
}

export class UploadVendorImageFail implements Action {
    readonly type = CompanyB2BActionTypes.UploadVendorImageFail;

    constructor(public payload: string) {
    }
}

export class DeleteFactoryImage implements Action {
    readonly type = CompanyB2BActionTypes.DeleteFactoryImage;

    constructor(public payload: string) {
    }
}

export class DeleteDevelopmentImage implements Action {
    readonly type = CompanyB2BActionTypes.DeleteDevelopmentImage;

    constructor(public payload: string) {
    }
}

export class DeleteOMImage implements Action {
    readonly type = CompanyB2BActionTypes.DeleteOMImage;

    constructor(public payload: string) {
    }
}

export class DeleteQCImage implements Action {
    readonly type = CompanyB2BActionTypes.DeleteQCImage;

    constructor(public payload: string) {
    }
}

export class ClearUploadList implements Action {
    readonly type = CompanyB2BActionTypes.ClearUploadList;

    constructor() {
    }
}

export class LoadVendorDevelopment implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorDevelopment;

    constructor() {
    }
}

export class LoadVendorDevelopmentSuccess implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorDevelopmentSuccess;

    constructor(public payload: VendorDevelopment) {
    }
}

export class LoadVendorDevelopmentFail implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorDevelopmentFail;

    constructor(public payload: string) {
    }
}

export class UpdateVendorDevelopment implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorDevelopment;

    constructor(public payload: VendorDevelopment) {
    }
}

export class UpdateVendorDevelopmentSuccess implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorDevelopmentSuccess;

    constructor(public payload: VendorDevelopment) {
    }
}

export class UpdateVendorDevelopmentFail implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorDevelopmentFail;

    constructor(public payload: string) {
    }
}

export class UpdateVendorFactoryImageList implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorFactoryImageList;

    constructor(public payload: VendorImage) {
    }
}

export class UpdateVendorDevelopmentImageList implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorDevelopmentImageList;

    constructor(public payload: VendorImage) {
    }
}

export class UpdateVendorOMImageList implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorOMImageList;

    constructor(public payload: VendorImage) {
    }
}

export class LoadVendorOM implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorOM;

    constructor() {
    }
}

export class LoadVendorOMSuccess implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorOMSuccess;

    constructor(public payload: VendorOM) {
    }
}

export class LoadVendorOMFail implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorOMFail;

    constructor(public payload: string) {
    }
}

export class UpdateVendorOM implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorOM;

    constructor(public payload: VendorOM) {
    }
}

export class UpdateVendorOMSuccess implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorOMSuccess;

    constructor(public payload: VendorOM) {
    }
}

export class UpdateVendorOMFail implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorOMFail;

    constructor(public payload: string) {
    }
}

export class UpdateVendorQCImageList implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorQCImageList;

    constructor(public payload: VendorImage) {
    }
}

export class LoadVendorQC implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorQC;

    constructor() {
    }
}

export class LoadVendorQCSuccess implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorQCSuccess;

    constructor(public payload: VendorQC) {
    }
}

export class LoadVendorQCFail implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorQCFail;

    constructor(public payload: string) {
    }
}

export class UpdateVendorQC implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorQC;

    constructor(public payload: VendorQC) {
    }
}

export class UpdateVendorQCSuccess implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorQCSuccess;

    constructor(public payload: VendorQC) {
    }
}

export class UpdateVendorQCFail implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorQCFail;

    constructor(public payload: string) {
    }
}

export class UpdateVendorServiceImageList implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorServiceImageList;

    constructor(public payload: VendorImage) {
    }
}

export class LoadVendorService implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorService;

    constructor() {
    }
}

export class LoadVendorServiceSuccess implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorServiceSuccess;

    constructor(public payload: VendorService) {
    }
}

export class LoadVendorServiceFail implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorServiceFail;

    constructor(public payload: string) {
    }
}

export class UpdateVendorService implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorService;

    constructor(public payload: VendorService) {
    }
}

export class UpdateVendorServiceSuccess implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorServiceSuccess;

    constructor(public payload: VendorService) {
    }
}

export class UpdateVendorServiceFail implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorServiceFail;

    constructor(public payload: string) {
    }
}

export class DeleteServiceImage implements Action {
    readonly type = CompanyB2BActionTypes.DeleteServiceImage;

    constructor(public payload: string) {
    }
}

export class UpdateVendorCertificateImageList implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorCertificateImageList;

    constructor(public payload: VendorImage) {
    }
}

export class LoadVendorCertificate implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorCertificate;

    constructor() {
    }
}

export class LoadVendorCertificateSuccess implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorCertificateSuccess;

    constructor(public payload: VendorImage[]) {
    }
}

export class LoadVendorCertificateFail implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorCertificateFail;

    constructor(public payload: string) {
    }
}

export class UpdateVendorCertificate implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorCertificate;

    constructor(public payload: VendorCertificate) {
    }
}

export class UpdateVendorCertificateSuccess implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorCertificateSuccess;

    constructor(public payload: VendorCertificate) {
    }
}

export class UpdateVendorCertificateFail implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorCertificateFail;

    constructor(public payload: string) {
    }
}

export class DeleteCertificateImage implements Action {
    readonly type = CompanyB2BActionTypes.DeleteCertificateImage;

    constructor(public payload: string) {
    }
}

export class LoadVendorTradeShow implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorTradeShow;

    constructor() {
    }
}

export class LoadVendorTradeShowSuccess implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorTradeShowSuccess;

    constructor(public payload: VendorTradeShow[]) {
    }
}

export class LoadVendorTradeShowFail implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorTradeShowFail;

    constructor(public payload: string) {
    }
}

export class UpdateVendorTradeShow implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorTradeShow;

    constructor(public payload: VendorTradeShow) {
    }
}

export class UpdateVendorTradeShowSuccess implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorTradeShowSuccess;

    constructor(public payload: VendorTradeShow) {
    }
}

export class UpdateVendorTradeShowFail implements Action {
    readonly type = CompanyB2BActionTypes.UpdateVendorTradeShowFail;

    constructor(public payload: string) {
    }
}

export class DeleteVendorTradeShow implements Action {
    readonly type = CompanyB2BActionTypes.DeleteVendorTradeShow;

    constructor(public payload: VendorTradeShow) {
    }
}

export class DeleteVendorTradeShowSuccess implements Action {
    readonly type = CompanyB2BActionTypes.DeleteVendorTradeShowSuccess;
}

export class DeleteVendorTradeShowFail implements Action {
    readonly type = CompanyB2BActionTypes.DeleteVendorTradeShowFail;

    constructor(public payload: string) {
    }
}
export class LoadVendorContact implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorContact;

    constructor() {
    }
}

export class LoadVendorContactSuccess implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorContactSuccess;

    constructor(public payload: Contact[]) {
    }
}

export class LoadVendorContactFail implements Action {
    readonly type = CompanyB2BActionTypes.LoadVendorContactFail;

    constructor(public payload: string) {
    }
}
// Union the valid types
export type CompanyB2bActions =
    | LoadVendorFactoryTour
    | LoadVendorFactoryTourSuccess
    | LoadVendorFactoryTourFail
    | UpdateVendorFactoryTour
    | UpdateVendorFactoryTourFail
    | UpdateVendorFactoryTourSuccess
    | UploadVendorImage
    | UploadVendorImageFail
    | UploadVendorImageSuccess
    | DeleteFactoryImage
    | ClearUploadList
    | LoadVendorDevelopment
    | LoadVendorDevelopmentFail
    | LoadVendorDevelopmentSuccess
    | UpdateVendorDevelopment
    | UpdateVendorDevelopmentFail
    | UpdateVendorDevelopmentSuccess
    | UpdateVendorFactoryImageList
    | UpdateVendorDevelopmentImageList
    | DeleteDevelopmentImage
    | DeleteOMImage
    | LoadVendorOM
    | LoadVendorOMFail
    | LoadVendorOMSuccess
    | UpdateVendorOM
    | UpdateVendorOMFail
    | UpdateVendorOMSuccess
    | UpdateVendorOMImageList
    | LoadVendorQC
    | LoadVendorQCFail
    | LoadVendorQCSuccess
    | UpdateVendorQC
    | UpdateVendorQCFail
    | UpdateVendorQCImageList
    | UpdateVendorQCSuccess
    | DeleteQCImage
    | LoadVendorService
    | LoadVendorServiceFail
    | LoadVendorServiceSuccess
    | UpdateVendorService
    | UpdateVendorServiceFail
    | UpdateVendorServiceImageList
    | UpdateVendorServiceSuccess
    | DeleteServiceImage
    | LoadVendorCertificate
    | LoadVendorCertificateFail
    | LoadVendorCertificateSuccess
    | UpdateVendorCertificate
    | UpdateVendorCertificateFail
    | UpdateVendorCertificateImageList
    | UpdateVendorCertificateSuccess
    | DeleteCertificateImage
    | LoadVendorTradeShow
    | LoadVendorTradeShowFail
    | LoadVendorTradeShowSuccess
    | UpdateVendorTradeShow
    | UpdateVendorTradeShowFail
    | UpdateVendorTradeShowSuccess
    | DeleteVendorTradeShow
    | DeleteVendorTradeShowFail
    | DeleteVendorTradeShowSuccess
    | LoadVendorContact
    | LoadVendorContactFail
    | LoadVendorContactSuccess
    ;
