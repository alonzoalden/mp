import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { VendorBrand } from '../../../../../shared/class/vendor-brand';

@Component({
    selector: 'o-company-info-brand',
    templateUrl: './company-info-brand.component.html'
})

export class CompanyInfoBrandComponent implements OnInit {
    @Input() vendorBrands: VendorBrand[];
    @Input() errorMessage: string;
    @Input() isVendorBrandLoading: boolean;
    @Output() loadCompanyInfoVendorBrands = new EventEmitter<void>();

    constructor() {}

    ngOnInit() {
        this.loadCompanyInfoVendorBrands.emit();
    }
}
