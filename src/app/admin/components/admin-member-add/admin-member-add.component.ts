import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { MemberInsert, Member } from '../../../shared/class/member';

import { AdminService } from '../../admin.service';
import { AppService } from '../../../app.service';

@Component({
  selector: 'o-admin-member-add',
  templateUrl: './admin-member-add.component.html'
})

export class AdminMemberAddComponent implements OnInit, OnChanges {
    memberForm: any;

    //errorMessage: string;
    member: MemberInsert;
    pendingCreate: boolean;

    @Input() userInfo: Member;
    @Input() pendingSave: boolean = false;
    @Input() errorMessage: string;
    @Output() addMember = new EventEmitter<MemberInsert>();


    private dataIsValid: boolean;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private appService: AppService) {

        this.memberForm = this.formBuilder.group({
            'memberData': this.formBuilder.group({
                'memberEmail': [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$')],
                'memberFirstName' : [Validators.required],
                'memberLastName' : [Validators.required],
                'memberPassword' : [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/)],
                'memberConfirmPassword' : [Validators.required]
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
    }
    ngOnInit(): void {
        // Current User must be Admin - redirect to home/dashboard
        
        // if (!this.appService.currentMember || !this.appService.currentMember.IsAdmin) {
        //     this.router.navigate(['/home']);
        // }
        this.member = new MemberInsert('', '', '', '', false, false, '', '');
    }

    onAddMember() {
        if (this.isValid()) {
            this.member.IsAdmin = true;
            this.member.IsSuperAdmin = true;
            //this.pendingCreate = true;
            
            this.addMember.emit(this.member)

            // this.adminService.addMember(this.member)
            //     .subscribe(
            //         (member) => {
            //             this.member = member;
            //             this.pendingCreate = false;
            //             console.log(this.member);
            //             this.onAddComplete(`${this.member.Email} was saved`);
            //         },
            //         (error: any) => {
            //             this.pendingCreate = false;
            //             this.errorMessage = <any>error;
            //             this.adminService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
            //             this.router.navigate(['/admin']);
            //         }
            //     );
        }
    }

    isValid(): boolean {
        if (this.member
            && this.member.Email
            && this.member.FirstName
            && this.member.LastName
            && this.member.Password
            && this.member.ConfirmPassword
            && this.member.Password === this.member.ConfirmPassword
            && this.memberForm.valid) {
            return true;
        } else {
            if (!this.member.Email || !this.member.FirstName || !this.member.LastName || !this.member.Password) {
                //alert('Please enter all required fields');
                this.adminService.sendNotification({ type: 'error', title: 'Invalid Data', content: 'Please enter all required fields' });
            } else if (!this.memberForm.controls['memberData'].controls['memberEmail'].valid) {
                //alert('Invalid email');
                this.adminService.sendNotification({ type: 'error', title: 'Invalid Email', content: '' });
            } else if (!this.memberForm.controls['memberData'].controls['memberPassword'].valid) {
                //alert('Invalid Password');
                this.adminService.sendNotification({ type: 'error', title: 'Invalid Password'
                    , content: 'Must contain the following:<br>-Minimum of 6 characters<br>-Number<br>-Lower case letter<br>-Upper case letter<br>-Special character(non-letter/non-numeric)' });
            } else if (this.member.Password !== this.member.ConfirmPassword) {
                //alert('Confirm Password must match the Password');
                this.adminService.sendNotification({ type: 'error', title: 'Confirm Password must match the Password', content: '' });
            } else {
                //alert('Invalid entry');
                this.adminService.sendNotification({ type: 'error', title: 'Invalid entry', content: '' });
            }
            return false;
        }
    }

    onAddComplete(message?: string) {
        this.adminService.sendNotification({ type: 'success', title: 'Successfully Created', content: message });
        this.router.navigate(['/admin']);
    }
}
