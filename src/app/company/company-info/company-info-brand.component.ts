import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { CompanyService } from '../company.service';
import { Subscription } from 'rxjs';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'o-company-info-brand',
    templateUrl: './company-info-brand.component.html',
    styleUrls: ['../company.component.scss']
})

export class CompanyInfoBrandComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    errorMessage: string;
    vendorBrands: VendorBrand[];
    
    displayedColumns = ['BrandName'];
    dataSource: any = null;

    constructor(private route: ActivatedRoute,
        private companyService: CompanyService,
        private translate: TranslateService) {
    }

    ngOnInit() {
        this.subscription = this.companyService.getVendorBrands().subscribe(
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
        this.subscription.unsubscribe();
    }

}
