import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Member } from '../../../shared/class/member';
import { VendorList } from '../../../shared/class/vendor';

import { AdminService } from '../../admin.service';
import { AppService } from '../../../app.service';

@Component({
  selector: 'o-admin-member-edit',
  templateUrl: './admin-member-edit.component.html'
})

export class AdminMemberEditComponent implements OnInit, OnChanges {
    memberForm: any;
    subscription: Subscription;

    //errorMessage: string;
    //member: Member;
    vendorList: VendorList[];

    memberid: number;

    @Input() userInfo: Member;
    @Input() member: Member;
    @Input() errorMessage: string;
    @Output() getMember = new EventEmitter<number>();
    @Output() getMembers = new EventEmitter<void>();
    @Output() setMemberID = new EventEmitter<number>(); 

    private dataIsValid: boolean;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private appService: AppService) {

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
        console.log(changes);
        // Current User must be Admin - redirect to home/dashboard
        if (changes.userInfo && changes.userInfo.currentValue) {
            if (!changes.userInfo.currentValue.IsAdmin) {
                this.router.navigate(['/home']);
            }
        }
        if (changes.member && changes.member.currentValue && changes.member.firstChange) {
            
            //this.member = changes.member.currentValue;
            this.getMember.emit(this.route.snapshot.firstChild.params['id']);
            console.log('huh');
            console.log(this.route.snapshot.firstChild.params['id'])
            //this.getMembers.emit();
            //this.setMemberID.emit(this.route.snapshot.firstChild.params['id']);

        }
    }

    ngOnInit(): void {
        // Current User must be Admin - redirect to home/dashboard
        if (!this.appService.currentMember || !this.appService.currentMember.IsAdmin) {
            this.router.navigate(['/home']);
        }

        this.memberid = this.route.snapshot.params['id'];
        
        // this.adminService.getMember(this.memberid).subscribe(
        //     (member: Member) => {
        //         this.member = member;
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );

        this.adminService.getVendorList().subscribe(
            (vendorList: VendorList[]) => {
                this.vendorList = vendorList;
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    onVendorChanged(newValue: number) {
        if (this.vendorList) {
            const selectedVendor = this.vendorList.find(x => x.VendorID === newValue);
            if (selectedVendor) {
                this.member.VendorName = selectedVendor.VendorName;
            }
        }
    }

    onEditMember() {
        if (this.isValid()) {
            this.adminService.editMember(this.member)
                .subscribe(
                    () => {
                        this.adminService.replaceMember(this.member.MemberID, this.member);
                        this.onSaveComplete(`${this.member.Email} was saved`);
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                        this.adminService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                        this.router.navigate(['/admin']);
                    }
                );
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
                //alert('Please enter all required fields');
                this.adminService.sendNotification({ type: 'error', title: 'Invalid Data', content: 'Please enter all required fields' });
            }
            return false;
        }
    }

    onSaveComplete(message?: string) {
        this.adminService.sendNotification({ type: 'success', title: 'Successfully Created', content: message });
        this.router.navigate(['/admin']);
        window.location.reload();
    }
}
