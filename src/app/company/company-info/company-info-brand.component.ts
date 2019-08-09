import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { CompanyService } from '../company.service';
import { Subscription, Observable } from 'rxjs';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { TranslateService } from '@ngx-translate/core';
/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromCompany from '../state/company.reducer';
import * as companyActions from '../state/company.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
    selector: 'o-company-info-brand',
    templateUrl: './company-info-brand.component.html',
    styleUrls: ['../company.component.scss']
})

export class CompanyInfoBrandComponent implements OnInit, OnDestroy {
    //subscription: Subscription;
    errorMessage: string;
    //vendorBrands$: Observable<VendorBrand[]>
    vendorBrands: VendorBrand[];
    
    displayedColumns = ['BrandName'];
    dataSource: any = null;
    componentActive: boolean = true;

    constructor(private route: ActivatedRoute,
        private companyService: CompanyService,
        private translate: TranslateService,
        private store: Store<fromCompany.State>) {
    }

    ngOnInit() {

        // Do NOT subscribe here because it uses an async pipe
        // This gets the initial values until the load is complete.
        // this.products$ = this.store.pipe(select(fromProduct.getProducts)) as Observable<Product[]>;

        // // Do NOT subscribe here because it used an async pipe
        // this.errorMessage$ = this.store.pipe(select(fromProduct.getError));

        // this.store.dispatch(new productActions.Load());

        // // Subscribe here because it does not use an async pipe
        // this.store.pipe(
        // select(fromProduct.getCurrentProduct),
        // takeWhile(() => this.componentActive)
        // ).subscribe(
        // currentProduct => this.selectedProduct = currentProduct
        // );

        // // Subscribe here because it does not use an async pipe
        // this.store.pipe(
        // select(fromProduct.getShowProductCode),
        // takeWhile(() => this.componentActive)
        // ).subscribe(
        // showProductCode => this.displayCode = showProductCode
        // );
        this.store.dispatch(new companyActions.LoadVendorBrands());
        
        this.store.pipe(
            select(fromCompany.getVendorBrands),
            takeWhile(() => this.componentActive)
        ).subscribe(
            (vendorBrands: VendorBrand[]) => {
                this.vendorBrands = vendorBrands;
                this.refreshDataSource(this.vendorBrands);
            },
            (error: any) => {
                this.errorMessage = <any>error;                
            }
        );
    }

    refreshDataSource(vendorBrands: VendorBrand[]) {
        this.dataSource = new MatTableDataSource<VendorBrand>(vendorBrands);
    }

    ngOnDestroy() {
        this.componentActive = false;
    }

}
