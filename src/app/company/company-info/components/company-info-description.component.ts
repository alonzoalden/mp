import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../company.service';

import { CompanyInfo } from '../../../shared/class/company-info';
import { AddressCountry, AddressState } from '../../../shared/class/address';
import { TranslateService } from '@ngx-translate/core';

/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromCompany from '../state';
import * as companyActions from '../state/company-info.actions';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'o-company-info-description',
  templateUrl: './company-info-description.component.html',
  styleUrls: ['../../company.component.scss']
})

export class CompanyInfoDescriptionComponent implements OnInit {
    // errorMessage: string;
    // companyInfo: CompanyInfo;
    @Input() companyInfo: CompanyInfo;
    @Input() errorMessage: string;
    
    @Input() shippingAddressStates: AddressState[];
    @Input() addressCountries: AddressCountry[];
    @Input() billingAddressStates: AddressState[];
    @Input() isInfoDescriptionLoading: boolean;

    constructor(
        private store: Store<fromCompany.State>,
        private route: ActivatedRoute,
        private companyService: CompanyService,
        private translate: TranslateService) { }

    ngOnInit(): void {
        // this.store.dispatch(new companyActions.LoadVendorBrands());
        
        // this.store.pipe(
        //     select(fromCompany.getVendorBrands),
        //     takeWhile(() => this.componentActive)
        // ).subscribe(
        //     (vendorBrands: VendorBrand[]) => {
        //         this.vendorBrands = vendorBrands;
        //     },
        //     (error: any) => {
        //         this.errorMessage = <any>error;                
        //     }
        // );
        this.store.dispatch(new companyActions.LoadCompanyInfo());
        this.store.dispatch(new companyActions.LoadAddressCountry());
        // if (this.companyInfo) {
        //     if(this.companyInfo.ShippingCountryID == 'US' || this.companyInfo.ShippingCountryID == 'CA') {
        //         this.getShippingAddressState();
        //     }
        //     if(this.companyInfo.BillingCountryID == 'US' || this.companyInfo.BillingCountryID == 'CA') {
        //         this.getBillingAddressState();
        //     }
        // }
        // this.companyService.getCompanyInfo().subscribe(
        //     (companyInfo: CompanyInfo) => {
        //         this.companyInfo = companyInfo;

        //         if(this.companyInfo.ShippingCountryID == 'US' || this.companyInfo.ShippingCountryID == 'CA') {
        //             //this.getShippingAddressState();
        //         }
        
        //         if(this.companyInfo.BillingCountryID == 'US' || this.companyInfo.BillingCountryID == 'CA') {
        //             //this.getBillingAddressState();
        //         }
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );        

        // this.companyService.getAddressCountry().subscribe(
        //     (addresscountries: AddressCountry[]) => {
        //         this.addressCountries = addresscountries;
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );
    }

    getShippingAddressState() {
        this.store.dispatch(new companyActions.LoadShippingAddressState(this.companyInfo.ShippingCountryID));
        // this.companyService.getAddressState(this.companyInfo.ShippingCountryID).subscribe(
        //     (addresssState: AddressState[]) => {
        //         this.shippingAddressStates = addresssState;
        //         //console.log(this.shippingAddressStates);
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );
    }

    getBillingAddressState() {
        this.store.dispatch(new companyActions.LoadBillingAddressState(this.companyInfo.ShippingCountryID));
        // this.companyService.getAddressState(this.companyInfo.BillingCountryID).subscribe(
        //     (addresssState: AddressState[]) => {
        //         this.billingAddressStates = addresssState;
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );
    }

    updateShippingAddress() {
        if(this.isShippingAddressValid()) {
            this.companyService.editCompanyInfoShippingAddress(this.companyInfo).subscribe(
                () => {
                    this.companyService.sendNotification({ type: 'success', title: 'Successfully Updated', content: "Shipping address has been updated" }); 
                },
                (error: any) => {
                    this.companyService.sendNotification({ type: 'error', title: 'Error', content: <any>error });
                }
            );
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
        }
        else {
            this.companyService.sendNotification({ type: 'error', title: 'Error', content: 'Please enter all required fields' });
            return false;
        }
    }

    updateBillingAddress() {
        if(this.isBillingAddressValid()) {
            this.companyService.editCompanyInfoBillingAddress(this.companyInfo).subscribe(
                () => {
                    this.companyService.sendNotification({ type: 'success', title: 'Successfully Updated', content: "Billing address has been updated" }); 
                },
                (error: any) => {
                    this.companyService.sendNotification({ type: 'error', title: 'Error', content: <any>error });
                }
            );
        }
    }

    isBillingAddressValid(): boolean {
        if (this.companyInfo
            && this.companyInfo.BillingAddress
            && this.companyInfo.BillingCity
            && this.companyInfo.BillingState
            && this.companyInfo.BillingZip) {
            return true;
        }
        else {
            this.companyService.sendNotification({ type: 'error', title: 'Error', content: 'Please enter all required fields' });
            return false;
        }
    }

    onShippingCountryChange() {
        if(this.companyInfo.ShippingCountryID == 'US') {
            this.getShippingAddressState();
            this.companyInfo.ShippingState = "Alabama";
        }
        else if(this.companyInfo.ShippingCountryID == 'CA') {
            this.getShippingAddressState();
            this.companyInfo.ShippingState = "Alberta";
        }
        else {
            this.companyInfo.ShippingState = '';
        }
    }

    onBillingCountryChange() {
        if(this.companyInfo.BillingCountryID == 'US') {
            this.getBillingAddressState();
            this.companyInfo.BillingState = "Alabama";
        }
        else if(this.companyInfo.BillingCountryID == 'CA') {
            this.getBillingAddressState();
            this.companyInfo.BillingState = "Alberta";
        }        
        else {
            this.companyInfo.BillingState = '';
        }
    }
}
