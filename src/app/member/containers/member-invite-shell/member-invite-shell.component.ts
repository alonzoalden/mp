import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { MemberInsert } from '../../../shared/class/member';

import { MemberService } from '../../member.service';
import { AppService } from '../../../app.service';

@Component({
  templateUrl: './member-invite-shell.component.html'
})

export class MemberInviteShellComponent implements OnInit {
    memberForm: any;

    errorMessage: string;
    member: MemberInsert;
    pendingInvite: boolean;

    private dataIsValid: boolean;

    constructor(private router: Router,
        private formBuilder: FormBuilder,
        private memberService: MemberService,       
        private appService: AppService) {   
            
        this.memberForm = this.formBuilder.group({
            'memberData': this.formBuilder.group({
                'memberEmail': [Validators.required, Validators.pattern("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$")],
                'memberIsAdmin' : []
            })            
        });
    }

    ngOnInit(): void {
        //Current User must be Admin - redirect to home/dashboard
        if(!this.appService.currentMember || !this.appService.currentMember.IsAdmin)
            this.router.navigate(['/home']);

        this.member = new MemberInsert('','','','',false,false,'','');
        
    }

    // onInviteMember() {
    //     if (this.isValid()) {
    //         this.pendingInvite = true;
    //         this.memberService.addMember(this.member)
    //             .subscribe(
    //                 () => {
    //                     this.pendingInvite = false;                        
    //                     this.onAddComplete(`${this.member.Email} was saved`)
    //                 },
    //                 (error: any) => {
    //                     this.pendingInvite = false;
    //                     this.errorMessage = <any>error;
    //                     this.memberService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
    //                     this.router.navigate(['/member']);
    //                 }
    //             );
    //     }
    // }

    // isValid(): boolean {
    //     if(this.member 
    //         && this.member.Email 
    //         && this.memberForm.valid)
    //         return true;
    //     else {
    //         if(!this.member.Email) {
    //             //alert('Email is required');
    //             this.memberService.sendNotification({ type: 'error', title: 'Invalid Data', content: 'Email is required' });
    //         }
    //         else if(!this.memberForm.controls['memberData'].controls['memberEmail'].valid) {
    //             //alert('Invalid email');
    //             this.memberService.sendNotification({ type: 'error', title: 'Invalid Email', content: '' });
    //         }
    //         else {
    //             //alert('Invalid data');
    //             this.memberService.sendNotification({ type: 'error', title: 'Invalid entry', content: '' });
    //         }
    //         return false;
    //     }
    // }

    // onAddComplete(message?: string) {
    //     this.memberService.sendNotification({ type: 'success', title: 'Successfully Created', content: message });
    //     this.router.navigate(['/member']);
    // }
}
