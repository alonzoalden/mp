import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Member } from '../../../../shared/class/member';
import { MemberService } from '../../member.service';
import { AppService } from '../../../../app.service';

@Component({
    selector: 'o-member-confirm',
    templateUrl: './member-confirm.component.html'
})

export class MemberConfirmComponent implements OnInit {
    memberForm: any;
    errorMessage: string;
    member: Member;
    email: string;
    emailSent: boolean;

    private dataIsValid: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private memberService: MemberService
    ) {

        this.memberForm = this.formBuilder.group({
            'memberData': this.formBuilder.group({
                'memberEmail': [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$')],
                'memberIsAdmin' : []
            })
        });
    }

    ngOnInit(): void { }

    onSendConfirmation(): void {
        if (this.isValid()) {
            this.memberService.sendConfirmationMemberByEmail(this.email).subscribe(
                (member: Member) => {
                    this.member = member;
                    this.memberService.sendNotification({ type: 'success', title: 'Confirmation Sent', content: '' });
                    //this.router.navigate(['/home']);
                    this.emailSent = true;
                },
                error => {
                    this.errorMessage = <any>error;
                    this.memberService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                }
            );
        }
    }

    isValid(): boolean {
        if (this.email
            && this.memberForm.valid) {
            return true;
        } else {
            if (!this.email) {
                this.memberService.sendNotification({ type: 'error', title: 'Invalid Data', content: 'Email is required' });
            } else if (!this.memberForm.controls['memberData'].controls['memberEmail'].valid) {
                this.memberService.sendNotification({ type: 'error', title: 'Invalid Email', content: '' });
            } else {
                this.memberService.sendNotification({ type: 'error', title: 'Invalid entry', content: '' });
            }
            return false;
        }
    }
}
