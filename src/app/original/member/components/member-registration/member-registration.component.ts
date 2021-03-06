import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Member } from '../../../../shared/class/member';
import { MemberService } from '../../member.service';
import 'rxjs/add/operator/filter';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'o-member-registration',
    templateUrl: './member-registration.component.html'
})

export class MemberRegistrationComponent implements OnInit {
    memberForm: any;

    @Input() member: Member;
    @Input() errorMessage: string;
    @Output() getMemberByInviteGUID = new EventEmitter<string>();
    @Output() editMemberRegistration = new EventEmitter<Member>();

    inviteGUID: string;
    pendingRegister: boolean;
    merchantAgreement: boolean = false;
    private dataIsValid: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private memberService: MemberService,
        public printDialog: MatDialog) {

        this.memberForm = this.formBuilder.group({
            'memberData': this.formBuilder.group({
                'memberFirstName': [Validators.required],
                'memberLastName': [Validators.required],
                // 'memberPassword' : [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/)],
                //'memberPassword' : [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$/)],
                'memberPassword': [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*\d).{6,}$/)],
                'memberConfirmPassword': [Validators.required]
            })
        });
    }

    ngOnInit(): void {
        this.member = new Member(null, '', '', '', '', true, '', '', true, true, true, true, '', 1, true, '', '', '', '', false, false);
        this.route.queryParams
            .filter(params => params.inviteGUID)
            .subscribe(params => {
                this.inviteGUID = params.inviteGUID;
                this.getMemberByInviteGUID.emit(this.inviteGUID);
            });


    }

    onRegisterMember() {
        if (this.isValid()) {
            this.member.IsConfirmed = true;
            this.editMemberRegistration.emit(this.member);
        }
    }

    onSaveComplete(message?: string): void {
        this.memberService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
        // Navigate back to the item list
        this.router.navigate(['/dashboard']);
    }

    isValid(): boolean {
        if (this.member
            && this.member.FirstName
            && this.member.LastName
            && this.member.Password
            && this.member.ConfirmPassword
            && this.memberForm.valid) {
                if (this.member.IsDropship && !this.merchantAgreement) {
                    this.memberService.sendNotification({ type: 'error', title: 'You must accept the Merchant Agreement', content: '' });
                    return false;
                }
                return true;
        } else {
            if (!this.member.FirstName || !this.member.LastName || !this.member.Password) {
                //alert('Please enter all required fields');
                this.memberService.sendNotification({ type: 'error', title: 'Invalid Data', content: 'Please enter all required fields' });
            } else if (!this.memberForm.controls['memberData'].controls['memberPassword'].valid) {
                //alert('Invalid Password');
                this.memberService.sendNotification({
                    type: 'error', title: 'Invalid Password'
                    //, content: 'Must contain the following:<br>-Minimum of 6 characters<br>-Number<br>-Lower case letter<br>-Upper case letter<br>-Special character(non-letter/non-numeric)' });
                    , content: 'Must contain the following:<br>-Minimum of 6 characters<br>-Number<br>-Lower case letter'
                });
            } else if (this.member.Password !== this.member.ConfirmPassword) {
                //alert('Confirm Password must match the Password');
                this.memberService.sendNotification({ type: 'error', title: 'Confirm Password must match the Password', content: '' });
            } else {
                //alert('Invalid entry');
                this.memberService.sendNotification({ type: 'error', title: 'Invalid entry', content: '' });
            }
            return false;
        }


    }

    openDialogMerchantAgreement() {
        // tslint:disable-next-line: no-use-before-declare
        const dialogRef = this.printDialog.open(MerchantAgreementComponentDialog, {
        });

        dialogRef.afterClosed().subscribe(() => {});
    }

}

@Component({
    templateUrl: 'member-registration-merchant-agreement.component-dialog.html',
})
export class MerchantAgreementComponentDialog implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<MerchantAgreementComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}
    ngOnInit() {

    }
    close(): void {
        this.dialogRef.close();
    }


}
