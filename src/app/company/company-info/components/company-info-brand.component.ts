import { Component, Input, OnInit } from '@angular/core';
import { VendorBrand } from '../../../shared/class/vendor-brand';

/* NgRx */
import { Store } from '@ngrx/store';
import * as fromCompany from '../state';
import * as companyActions from '../state/company-info.actions';

@Component({
    selector: 'o-company-info-brand',
    templateUrl: './company-info-brand.component.html',
    styleUrls: ['../../company.component.scss']
})

export class CompanyInfoBrandComponent implements OnInit {
    @Input() vendorBrands: VendorBrand[];
    @Input() errorMessage: string;
    @Input() isVendorBrandLoading: boolean;

    constructor(private store: Store<fromCompany.State>) {
    }

    ngOnInit() {
        console.log(this.vendorBrands)

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

        // this.store.dispatch(new companyActions.SetLoadingStatus(true));
        this.store.dispatch(new companyActions.LoadVendorBrands());
        
        // this.store.pipe(
        //     select(fromCompany.getVendorBrands),
        //     takeWhile(() => this.componentActive)
        // ).subscribe(
        //     (vendorBrands: VendorBrand[]) => {
        //         this.vendorBrands = vendorBrands;
        //         this.refreshDataSource(this.vendorBrands);
        //     },
        //     (error: any) => {
        //         this.errorMessage = <any>error;                
        //     }
        // );
    }

    // refreshDataSource(vendorBrands: VendorBrand[]) {
    //     this.dataSource = new MatTableDataSource<VendorBrand>(vendorBrands);
    // }

    // ngOnDestroy() {
    //     //this.componentActive = false;
    // }

}
