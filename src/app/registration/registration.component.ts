import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from './registration.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { FormBuilder, Validators } from '@angular/forms';
import { VendorRegistration } from '../shared/class/vendor-registration';

import { Subscription } from 'rxjs';

import { NotificationComponent } from '../shared/tool/notification/notification.component';

@Component({
    selector: 'o-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['../home/home.component.scss']
})

export class RegistrationComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    registrationForm: any;
    id: any;

    vendorRegistration: VendorRegistration;
    errorMessage: string;
    pendingCreate: boolean;

    registrationCompleted: boolean;

    @ViewChild(NotificationComponent, { static: true })
    private  notificationComponent: NotificationComponent;


    constructor(
        private formBuilder: FormBuilder,
        private oauthService: OAuthService,
        private registrationService: RegistrationService) {

        this.registrationForm = this.formBuilder.group({
            'registrationData': this.formBuilder.group({
                'registrationCompanyName' : [Validators.required],
                'registrationAddress' : [Validators.required],
                'registrationCity' : [Validators.required],
                'registrationState' : [Validators.required],
                'registrationZip' : [Validators.required],
                'registrationRegion' : [Validators.required],
                'registrationFirstName' : [Validators.required],
                'registrationLastName' : [Validators.required],
                'registrationPhone' : [Validators.required],
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

        this.vendorRegistration = new VendorRegistration(null, null, null, null, null, null, null, 'United States', null, null, null, null, null, null);
    }

    onAddRegistration() {
        if (this.isValid()) {
            this.pendingCreate = true;
            this.registrationService.addVendorRegistration(this.vendorRegistration).subscribe(
                () => {
                    this.pendingCreate = false;
                    this.onAddComplete(`${this.vendorRegistration.CompanyName} was saved`);
                },
                (error: any) => {
                    this.pendingCreate = false;
                    this.errorMessage = <any>error;
                    this.registrationService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    //this.router.navigate(['/home']);
                }
            );
        }
    }

    isValid(): boolean {
        if (this.vendorRegistration
            && this.vendorRegistration.CompanyName
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
                    || !this.vendorRegistration.Address
                    || !this.vendorRegistration.City
                    || !this.vendorRegistration.State
                    || !this.vendorRegistration.PostalCode
                    || !this.vendorRegistration.FirstName
                    || !this.vendorRegistration.LastName
                    || !this.vendorRegistration.PhoneNumber
                    || !this.vendorRegistration.Email) {
                //alert('Please enter all required fields');
                this.registrationService.sendNotification({ type: 'error', title: 'Invalid Data', content: 'Please enter all required fields' });
            } else if (!this.registrationForm.controls['registrationData'].controls['registrationEmail'].valid) {
                //alert('Invalid Email');
                this.registrationService.sendNotification({ type: 'error', title: 'Invalid Email', content: '' });
            } else {
                //alert('Invalid entry');
                this.registrationService.sendNotification({ type: 'error', title: 'Invalid entry', content: '' });
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
        console.log(this.notificationComponent);
        this.notificationComponent.notify(notification);
    }
}
