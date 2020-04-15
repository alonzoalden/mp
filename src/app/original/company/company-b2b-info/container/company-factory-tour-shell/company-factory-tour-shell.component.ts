import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {VendorFactoryTour, VendorImage} from '../../../../../shared/class/vendor-b2b';
import * as fromCompany from '../../state';
import {select, Store} from '@ngrx/store';
import * as companyActions from '../../state/company-b2b.actions';
import {MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-company-b2b-info-factory-tour-container',
    templateUrl: './company-factory-tour-shell.component.html',
})
export class CompanyFactoryTourShellComponent implements OnInit {
    vendorFactoryTour$: Observable<VendorFactoryTour>;
    isFactoryTourLoading$: Observable<boolean>;
    factoryTourImageList$: Observable<MatTableDataSource<VendorImage>>;


    constructor(
        private store: Store<fromCompany.State>
    ) {
    }

    ngOnInit() {
        this.vendorFactoryTour$ = this.store.pipe(select(fromCompany.getVendorFactoryTour));
        this.factoryTourImageList$ = this.store.pipe(select(fromCompany.getFactoryTourImageList));

        setTimeout(() => {
            this.isFactoryTourLoading$ = this.store.pipe(select(fromCompany.getFactoryTourLoading));
        });
    }

    loadVendorInfo() {
        this.store.dispatch(new companyActions.LoadVendorFactoryTour());
    }

    updateVendorFactoryTour(vendorFactoryTour: VendorFactoryTour) {
        this.store.dispatch(new companyActions.UpdateVendorFactoryTour(vendorFactoryTour));
    }

    updateImage(vendorImage: VendorImage) {
        this.store.dispatch(new companyActions.UpdateVendorFactoryImageList(vendorImage));
    }

    deleteImage(path: string) {
        this.store.dispatch(new companyActions.DeleteFactoryImage(path));
    }
}
