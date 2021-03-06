import {Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RegistrationService} from './registration.service';
import {OAuthService} from 'angular-oauth2-oidc';
import {FormBuilder, Validators} from '@angular/forms';
import {VendorRegistrationB2B} from '../shared/class/vendor-registration';

import {Subscription} from 'rxjs';

import {NotificationComponent} from '../shared/tool/notification/notification.component';

@Component({
    selector: 'o-registration-b2b',
    templateUrl: './registration-b2b.component.html',
    styleUrls: ['../home/home.component.scss']
})

export class RegistrationB2bComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    registrationForm: any;
    id: any;

    vendorRegistration: VendorRegistrationB2B;
    errorMessage: string;
    pendingCreate: boolean;

    registrationCompleted: boolean;

    @ViewChild(NotificationComponent, {static: true})
    private notificationComponent: NotificationComponent;


    constructor(
        private formBuilder: FormBuilder,
        private oauthService: OAuthService,
        private registrationService: RegistrationService) {

        this.registrationForm = this.formBuilder.group({
            'registrationData': this.formBuilder.group({
                'registrationCompanyName': [Validators.required],
                'registrationMerchantID': [Validators.required, Validators.pattern('[A-Za-z]{1,40}')],
                'registrationAddress': [Validators.required],
                'registrationCity': [Validators.required],
                'registrationState': [Validators.required],
                'registrationZip': [Validators.required],
                'registrationRegion': [Validators.required],
                'registrationFirstName': [Validators.required],
                'registrationLastName': [Validators.required],
                'registrationPhone': [Validators.required],
                'registrationEmail': [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$')]
            })
        });
    }

    get isLoggedin() {
        return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
    }

    ngOnInit() {
        this.subscription = this.registrationService.subject.subscribe(
            notification => this.doNotification(notification)
        );

        this.vendorRegistration = new VendorRegistrationB2B(null, null, null, null, null, null,
            null, 'China', null, null, null, null, null, null, null, null, null);
    }

    logout() {
        this.oauthService.logOut();
    }

    onAddRegistration() {
        if (this.isValid()) {
            this.pendingCreate = true;
            this.registrationService.addVendorRegistrationB2B(this.vendorRegistration).subscribe(
                () => {
                    this.pendingCreate = false;
                    this.onAddComplete(`${this.vendorRegistration.CompanyName} was saved`);
                },
                (error: any) => {
                    this.pendingCreate = false;
                    this.errorMessage = <any>error;
                    this.registrationService.sendNotification({
                        type: 'error',
                        title: 'Error',
                        content: this.errorMessage
                    });
                    //this.router.navigate(['/home']);
                }
            );
        }
    }

    isValid(): boolean {
        if (this.vendorRegistration
            && this.vendorRegistration.CompanyName
            && this.vendorRegistration.MerchantID
            && this.vendorRegistration.Address
            && this.vendorRegistration.City
            && this.vendorRegistration.State
            && this.vendorRegistration.PostalCode
            && this.vendorRegistration.FirstName
            && this.vendorRegistration.LastName
            && this.vendorRegistration.PhoneNumber
            && this.vendorRegistration.Email
            && this.registrationForm.valid) {
            return true;
        } else {
            if (!this.vendorRegistration.CompanyName
                || !this.vendorRegistration.MerchantID
                || !this.vendorRegistration.Address
                || !this.vendorRegistration.City
                || !this.vendorRegistration.State
                || !this.vendorRegistration.PostalCode
                || !this.vendorRegistration.FirstName
                || !this.vendorRegistration.LastName
                || !this.vendorRegistration.PhoneNumber
                || !this.vendorRegistration.Email) {
                //alert('Please enter all required fields');
                this.registrationService.sendNotification({
                    type: 'error',
                    title: 'Invalid Data',
                    content: 'Please enter all required fields'
                });
            } else if (!this.registrationForm.controls['registrationData'].controls['registrationEmail'].valid) {
                //alert('Invalid Email');
                this.registrationService.sendNotification({type: 'error', title: 'Invalid Email', content: ''});
            } else {
                //alert('Invalid entry');
                this.registrationService.sendNotification({type: 'error', title: 'Invalid entry', content: ''});
            }
            return false;
        }
    }

    onAddComplete(message?: string) {
        //this.registrationService.sendNotification({ type: 'success', title: 'Successfully Created', content: message });
        //this.router.navigate(['/admin']);
        this.registrationCompleted = true;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    login() {
        this.oauthService.initImplicitFlow();
    }

    doNotification(notification) {
        this.notificationComponent.notify(notification);
    }
}
