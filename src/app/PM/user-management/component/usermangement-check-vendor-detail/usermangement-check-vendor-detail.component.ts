import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {VendorRegistrationB2B} from '../../../../shared/class/vendor-registration';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Member} from '../../../../shared/class/member';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-usermangement-check-vendor-detail',
    templateUrl: './usermangement-check-vendor-detail.component.html',
    styleUrls: ['./usermangement-check-vendor-detail.component.css']
})
export class UsermangementCheckVendorDetailComponent implements OnInit, OnChanges {
    @Input() vendorRegistration: VendorRegistrationB2B;
    @Output() createVendor = new EventEmitter<VendorRegistrationB2B>();
    @Input() memberList$: Observable<Member[]>;
    @Output() getMemberPMList = new EventEmitter();

    constructor(
        private router: Router
    ) {
        this.vendorRegistration = new VendorRegistrationB2B(null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null, null);
    }

    ngOnInit() {
        this.getMemberPMList.emit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.vendorRegistration && changes.vendorRegistration.currentValue) {
            this.vendorRegistration.ShopTitle = this.vendorRegistration.MerchantID;
        }
    }

    create(form: NgForm) {
        form.form.markAllAsTouched();
        form.form.markAsDirty();
        if (form.form.invalid) {
            return;
        }
        this.createVendor.emit(this.vendorRegistration);
    }

    cancel() {
        this.router.navigate(['/PM/user/check/']);
    }
}
