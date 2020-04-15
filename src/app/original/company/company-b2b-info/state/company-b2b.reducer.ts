import {CompanyB2bActions, CompanyB2BActionTypes, DeleteDevelopmentImage} from './company-b2b.actions';
import {
    VendorDevelopment,
    VendorFactoryTour,
    VendorImage,
    VendorOM,
    VendorQC, VendorService, VendorTradeShow
} from '../../../../shared/class/vendor-b2b';

// State for this feature (Item Variation)
export interface CompanyB2BState {
    factoryTour: VendorFactoryTour;
    development: VendorDevelopment;
    OM: VendorOM;
    service: VendorService;
    isFactoryTourLoading: boolean;
    isDevelopmentLoading: boolean;
    isServiceLoading: boolean;
    isOMLoading: boolean;
    error: string;
    factoryTourImageList: VendorImage[];
    developmentImageList: VendorImage[];
    OMImageList: VendorImage[];
    QCImageList: VendorImage[];
    pendingUpload: boolean;
    filesToUpload: Array<File>;
    selectedFileNames: string[];

    QC: VendorQC;
    isQCLoading: boolean;
    serviceImageList;

    isCertificateLoading: boolean;
    certificateImageList: VendorImage[];
    isTradeShowLoading: boolean;
    tradeShowList: VendorTradeShow[];

}

const initialState: CompanyB2BState = {
    service: null,
    factoryTour: null,
    development: null,
    OM: null,
    isFactoryTourLoading: false,
    isDevelopmentLoading: false,
    isOMLoading: false,
    error: '',
    factoryTourImageList: [],
    developmentImageList: [],
    OMImageList: [],
    QCImageList: [],
    pendingUpload: false,
    filesToUpload: [],
    selectedFileNames: [],
    QC: null,
    isQCLoading: false,
    isServiceLoading: false,
    serviceImageList: [],
    isCertificateLoading: false,
    certificateImageList: [],
    isTradeShowLoading: false,
    tradeShowList: []
};

export function companyB2bReducer(state = initialState, action: CompanyB2bActions): CompanyB2BState {

    switch (action.type) {
        case CompanyB2BActionTypes.LoadVendorFactoryTour:
            return {
                ...state, isFactoryTourLoading: true
            };
        case CompanyB2BActionTypes.LoadVendorFactoryTourSuccess:
            return {
                ...state,
                factoryTour: action.payload,
                factoryTourImageList: action.payload.VendorImages,
                isFactoryTourLoading: false,
                error: '',
            };
        case CompanyB2BActionTypes.LoadVendorFactoryTourFail:
            return {
                ...state, isFactoryTourLoading: false,
                factoryTourImageList: [],
                error: action.payload
            };
        case CompanyB2BActionTypes.UploadVendorImage:
            return {
                ...state, pendingUpload: true
            };
        case CompanyB2BActionTypes.UpdateVendorFactoryImageList:
            return {
                ...state, factoryTourImageList: [...state.factoryTourImageList, action.payload], pendingUpload: false
            };
        case CompanyB2BActionTypes.UpdateVendorDevelopmentImageList:
            return {
                ...state, developmentImageList: [...state.developmentImageList, action.payload], pendingUpload: false
            };
        case CompanyB2BActionTypes.UpdateVendorOMImageList:
            return {
                ...state, OMImageList: [...state.OMImageList, action.payload], pendingUpload: false
            };
        case CompanyB2BActionTypes.UploadVendorImageSuccess:
            return {
                ...state, filesToUpload: [], selectedFileNames: [], pendingUpload: false
            };
        case CompanyB2BActionTypes.UploadVendorImageFail:
            return {
                ...state, pendingUpload: false, error: action.payload
            };
        case CompanyB2BActionTypes.DeleteFactoryImage: {
            const newImageList = state.factoryTourImageList.filter(image => image.Path !== action.payload);
            return {
                ...state, factoryTourImageList: newImageList
            };
        }
        case CompanyB2BActionTypes.DeleteDevelopmentImage: {
            const newImageList = state.developmentImageList.filter(image => image.Path !== action.payload);
            return {
                ...state, developmentImageList: newImageList
            };
        }
        case CompanyB2BActionTypes.DeleteOMImage: {
            const newImageList = state.OMImageList.filter(image => image.Path !== action.payload);
            return {
                ...state, OMImageList: newImageList
            };
        }
        case CompanyB2BActionTypes.ClearUploadList:
            return {
                ...state, filesToUpload: [], selectedFileNames: []
            };
        case CompanyB2BActionTypes.LoadVendorDevelopment:
            return {
                ...state, isDevelopmentLoading: true
            };
        case CompanyB2BActionTypes.LoadVendorDevelopmentSuccess:
            return {
                ...state,
                development: action.payload,
                isDevelopmentLoading: false,
                developmentImageList: action.payload.VendorImages
            };
        case CompanyB2BActionTypes.LoadVendorDevelopmentFail:
            return {
                ...state, development: null, isDevelopmentLoading: false, error: action.payload
            };
        case CompanyB2BActionTypes.UpdateVendorFactoryTour:
            return {
                ...state, isDevelopmentLoading: true
            };
        case CompanyB2BActionTypes.UpdateVendorFactoryTourSuccess:
            return {
                ...state, isDevelopmentLoading: false
            };
        case CompanyB2BActionTypes.UpdateVendorFactoryTourFail:
            return {
                ...state, isDevelopmentLoading: false, error: action.payload
            };
        case CompanyB2BActionTypes.LoadVendorOM:
            return {
                ...state, isOMLoading: true
            };
        case CompanyB2BActionTypes.LoadVendorOMSuccess:
            return {
                ...state, isOMLoading: false, OM: action.payload, OMImageList: action.payload.VendorImages
            };
        case CompanyB2BActionTypes.LoadVendorOMFail:
            return {
                ...state, OM: null, error: action.payload
            };

        case CompanyB2BActionTypes.DeleteQCImage: {
            const newImageList = state.QCImageList.filter(image => image.Path !== action.payload);
            return {
                ...state, QCImageList: newImageList
            };
        }
        case CompanyB2BActionTypes.LoadVendorQC:
            return {
                ...state, isQCLoading: true
            };
        case CompanyB2BActionTypes.LoadVendorQCSuccess:
            return {
                ...state, isQCLoading: false, QC: action.payload, QCImageList: action.payload.VendorImages
            };
        case CompanyB2BActionTypes.LoadVendorQCFail:
            return {
                ...state, QC: null, error: action.payload
            };
        case CompanyB2BActionTypes.UpdateVendorQC:
            return {
                ...state, isQCLoading: true
            };
        case CompanyB2BActionTypes.UpdateVendorQCSuccess:
            return {
                ...state, isQCLoading: false
            };
        case CompanyB2BActionTypes.UpdateVendorQCFail:
            return {
                ...state, isQCLoading: false, error: action.payload
            };
        case CompanyB2BActionTypes.UpdateVendorQCImageList:
            return {
                ...state, QCImageList: [...state.QCImageList, action.payload], pendingUpload: false
            };

        case CompanyB2BActionTypes.DeleteServiceImage: {
            const newImageList = state.serviceImageList.filter(image => image.Path !== action.payload);
            return {
                ...state, serviceImageList: newImageList
            };
        }
        case CompanyB2BActionTypes.LoadVendorService:
            return {
                ...state, isServiceLoading: true
            };
        case CompanyB2BActionTypes.LoadVendorServiceSuccess:
            return {
                ...state,
                isServiceLoading: false,
                service: action.payload,
                serviceImageList: action.payload.VendorImages
            };
        case CompanyB2BActionTypes.LoadVendorServiceFail:
            return {
                ...state, service: null, error: action.payload
            };
        case CompanyB2BActionTypes.UpdateVendorService:
            return {
                ...state, isServiceLoading: true
            };
        case CompanyB2BActionTypes.UpdateVendorServiceSuccess:
            return {
                ...state, isServiceLoading: false
            };
        case CompanyB2BActionTypes.UpdateVendorServiceFail:
            return {
                ...state, isServiceLoading: false, error: action.payload
            };
        case CompanyB2BActionTypes.UpdateVendorServiceImageList:
            return {
                ...state, serviceImageList: [...state.serviceImageList, action.payload], pendingUpload: false
            };

        case CompanyB2BActionTypes.DeleteCertificateImage: {
            const newImageList = state.certificateImageList.filter(image => image.Path !== action.payload);
            return {
                ...state, certificateImageList: newImageList
            };
        }
        case CompanyB2BActionTypes.LoadVendorCertificate:
            return {
                ...state, isCertificateLoading: true
            };
        case CompanyB2BActionTypes.LoadVendorCertificateSuccess:
            return {
                ...state,
                isCertificateLoading: false,
                certificateImageList: action.payload
            };
        case CompanyB2BActionTypes.LoadVendorCertificateFail:
            return {
                ...state, certificateImageList: [], error: action.payload
            };
        case CompanyB2BActionTypes.UpdateVendorCertificate:
            return {
                ...state, isCertificateLoading: true
            };
        case CompanyB2BActionTypes.UpdateVendorCertificateSuccess:
            return {
                ...state, isCertificateLoading: false
            };
        case CompanyB2BActionTypes.UpdateVendorCertificateFail:
            return {
                ...state, isCertificateLoading: false, error: action.payload
            };
        case CompanyB2BActionTypes.UpdateVendorCertificateImageList:
            return {
                ...state, certificateImageList: [...state.certificateImageList, action.payload], pendingUpload: false
            };
        case CompanyB2BActionTypes.LoadVendorTradeShow:
            return {
                ...state, isTradeShowLoading: true, tradeShowList: []
            };
        case CompanyB2BActionTypes.LoadVendorTradeShowFail:
            return {
                ...state, isTradeShowLoading: false, tradeShowList: [], error: action.payload
            };
        case CompanyB2BActionTypes.LoadVendorTradeShowSuccess:
            return {
                ...state, isTradeShowLoading: false, tradeShowList: action.payload
            };
        case CompanyB2BActionTypes.UpdateVendorCertificate:
            return {
                ...state, isTradeShowLoading: true
            };
        case CompanyB2BActionTypes.UpdateVendorCertificateSuccess:
            return {
                ...state, isTradeShowLoading: false
            };
        case CompanyB2BActionTypes.UpdateVendorCertificateFail:
            return {
                ...state, isTradeShowLoading: false, error: action.payload
            };
        default:
            return state;
    }
}
