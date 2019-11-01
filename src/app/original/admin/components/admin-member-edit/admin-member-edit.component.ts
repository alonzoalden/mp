import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Member } from '../../../../shared/class/member';
import { VendorList } from '../../../../shared/class/vendor';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'o-admin-member-edit',
  templateUrl: './admin-member-edit.component.html'
})

export class AdminMemberEditComponent implements OnInit, OnChanges {
    memberForm: any;

    @Input() userInfo: Member;
    @Input() member: Member;
    @Input() vendorList: VendorList[];
    @Input() pendingSave: boolean;
    @Input() errorMessage: string;
    @Output() getVendorList = new EventEmitter<void>();
    @Output() getMember = new EventEmitter<number>();
    @Output() editMember = new EventEmitter<Member>();

    constructor(private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private adminService: AdminService) {

        this.memberForm = this.formBuilder.group({
            'memberData': this.formBuilder.group({
                'memberFirstName' : [Validators.required],
                'memberLastName' : [Validators.required],
                'memberVendorID' : [Validators.required],
                'memberIsActive' : []
            })
        });
    }
    ngOnChanges(changes: SimpleChanges): void {
        // Current User must be Admin - redirect to home/dashboard
        if (changes.userInfo && changes.userInfo.currentValue) {
            if (!changes.userInfo.currentValue.IsAdmin) {
                this.router.navigate(['/home']);
            }
        }
        if (changes.member && !changes.member.currentValue && changes.member.firstChange) {
            this.getMember.emit(this.route.snapshot.params['id']);
        }
    }
    ngOnInit(): void {
        this.getVendorList.emit();
    }
    onVendorChanged(newValue: number) {
        if (this.vendorList.length) {
            const selectedVendor = this.vendorList.find(x => x.VendorID === newValue);
            if (selectedVendor) {
                this.member.VendorName = selectedVendor.VendorName;
            }
        }
    }
    onEditMember(): void {
        if (this.isValid()) {
            this.editMember.emit(this.member);
        }
    }
    isValid(): boolean {
        if (this.member
            && this.member.FirstName
            && this.member.LastName
            && this.member.VendorID
            && this.memberForm.valid) {
            return true;
        } else {
            if (!this.member.FirstName || !this.member.LastName || !this.member.VendorID) {
                this.adminService.sendNotification({ type: 'error', title: 'Invalid Data', content: 'Please enter all required fields' });
            }
            return false;
        }
    }
}
