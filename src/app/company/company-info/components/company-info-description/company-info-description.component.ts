import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompanyService } from '../../../company.service';
import { CompanyInfo } from '../../../../shared/class/company-info';
import { AddressCountry, AddressState } from '../../../../shared/class/address';

@Component({
  selector: 'o-company-info-description',
  templateUrl: './company-info-description.component.html'
})

export class CompanyInfoDescriptionComponent implements OnInit {
    @Input() companyInfo: CompanyInfo;
    @Input() errorMessage: string;
    @Input() shippingAddressStates: AddressState[];
    @Input() addressCountries: AddressCountry[];
    @Input() billingAddressStates: AddressState[];
    @Input() isInfoDescriptionLoading: boolean;
    @Output() loadCompanyInfoDescription = new EventEmitter<void>();
    @Output() loadBillingAddressState = new EventEmitter<number | string>();
    @Output() loadShippingAddressState = new EventEmitter<number | string>();
    @Output() updateCompanyInfoShippingAddress = new EventEmitter<CompanyInfo>();
    @Output() updateCompanyInfoBillingAddress = new EventEmitter<CompanyInfo>();


    constructor(private companyService: CompanyService) { }

    ngOnInit(): void {
        this.loadCompanyInfoDescription.emit();
    }

    getShippingAddressState() {
        this.loadShippingAddressState.emit(this.companyInfo.ShippingCountryID);
    }

    getBillingAddressState() {
        this.loadBillingAddressState.emit(this.companyInfo.ShippingCountryID);
    }

    updateShippingAddress() {
        if (this.isShippingAddressValid()) {
            this.updateCompanyInfoShippingAddress.emit(this.companyInfo);
        }
    }

    isShippingAddressValid(): boolean {
        if (this.companyInfo
            && this.companyInfo.ShippingStoreName
            && this.companyInfo.ShippingAddress
            && this.companyInfo.ShippingCity
            && this.companyInfo.ShippingState
            && this.companyInfo.ShippingZip) {
            return true;
        } else {
            this.companyService.sendNotification({ type: 'error', title: 'Error', content: 'Please enter all required fields' });
            return false;
        }
    }

    updateBillingAddress() {
        if (this.isBillingAddressValid()) {
            this.updateCompanyInfoBillingAddress.emit(this.companyInfo);
        }
    }

    isBillingAddressValid(): boolean {
        if (this.companyInfo
            && this.companyInfo.BillingAddress
            && this.companyInfo.BillingCity
            && this.companyInfo.BillingState
            && this.companyInfo.BillingZip) {
            return true;
        } else {
            this.companyService.sendNotification({ type: 'error', title: 'Error', content: 'Please enter all required fields' });
            return false;
        }
    }

    onShippingCountryChange() {
        if (this.companyInfo.ShippingCountryID === 'US') {
            this.getShippingAddressState();
            this.companyInfo.ShippingState = 'Alabama';
        } else if (this.companyInfo.ShippingCountryID === 'CA') {
            this.getShippingAddressState();
            this.companyInfo.ShippingState = 'Alberta';
        } else {
            this.companyInfo.ShippingState = '';
        }
    }

    onBillingCountryChange() {
        if (this.companyInfo.BillingCountryID === 'US') {
            this.getBillingAddressState();
            this.companyInfo.BillingState = 'Alabama';
        } else if (this.companyInfo.BillingCountryID === 'CA') {
            this.getBillingAddressState();
            this.companyInfo.BillingState = 'Alberta';
        } else {
            this.companyInfo.BillingState = '';
        }
    }
}
