import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRoot from '../../../../state/app.state';
import * as fromCompany from './company-b2b.reducer';
import {MatTableDataSource} from '@angular/material';
import {VendorImage, VendorTradeShow} from '../../../../shared/class/vendor-b2b';
import {Contact} from '../../../../shared/class/contact';

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    companies: fromCompany.CompanyB2BState;
}

// Selector functions
const getCompanyFeatureState = createFeatureSelector<fromCompany.CompanyB2BState>('CompanyB2B');

export const getVendorFactoryTour = createSelector(
    getCompanyFeatureState,
    state => state.factoryTour
);
export const getFactoryTourLoading = createSelector(
    getCompanyFeatureState,
    state => state.isFactoryTourLoading
);
export const getPendingUploading = createSelector(
    getCompanyFeatureState,
    state => state.pendingUpload
);

export const getFactoryTourImageList = createSelector(
    getCompanyFeatureState,
    state => new MatTableDataSource<VendorImage>(state.factoryTourImageList)
);

export const getFileToUpload = createSelector(
    getCompanyFeatureState,
    state => state.filesToUpload
);
export const getSelectedFileNames = createSelector(
    getCompanyFeatureState,
    state => state.selectedFileNames
);
export const getDevelopmentLoading = createSelector(
    getCompanyFeatureState,
    state => state.isDevelopmentLoading
);
export const getVendorDevelopment = createSelector(
    getCompanyFeatureState,
    state => state.development
);
export const getDevelopmentImageList = createSelector(
    getCompanyFeatureState,
    state => new MatTableDataSource<VendorImage>(state.developmentImageList)
);
export const getOMLoading = createSelector(
    getCompanyFeatureState,
    state => state.isOMLoading
);
export const getOMImageList = createSelector(
    getCompanyFeatureState,
    state => new MatTableDataSource<VendorImage>(state.OMImageList)
);
export const getVendorOM = createSelector(
    getCompanyFeatureState,
    state => state.OM
);

export const getQCLoading = createSelector(
    getCompanyFeatureState,
    state => state.isQCLoading
);
export const getQCImageList = createSelector(
    getCompanyFeatureState,
    state => new MatTableDataSource<VendorImage>(state.QCImageList)
);
export const getVendorQC = createSelector(
    getCompanyFeatureState,
    state => state.QC
);

export const getServiceLoading = createSelector(
    getCompanyFeatureState,
    state => state.isServiceLoading
);
export const getServiceImageList = createSelector(
    getCompanyFeatureState,
    state => new MatTableDataSource<VendorImage>(state.serviceImageList)
);
export const getVendorService = createSelector(
    getCompanyFeatureState,
    state => state.service
);

export const getCertificateLoading = createSelector(
    getCompanyFeatureState,
    state => state.isCertificateLoading
);
export const getCertificateImageList = createSelector(
    getCompanyFeatureState,
    state => new MatTableDataSource<VendorImage>(state.certificateImageList)
);
export const getTradeShowList = createSelector(
    getCompanyFeatureState,
    state => new MatTableDataSource<VendorTradeShow>(state.tradeShowList)
);
export const getTradeShowLoading = createSelector(
    getCompanyFeatureState,
    state => state.isTradeShowLoading
);
export const getContactList = createSelector(
    getCompanyFeatureState,
    state => new MatTableDataSource<Contact>(state.contact)
);
export const getContactLoading = createSelector(
    getCompanyFeatureState,
    state => state.isContactLoading
);
