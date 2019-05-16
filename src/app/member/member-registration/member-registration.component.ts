import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Member } from '../../shared/class/member';

import { MemberService } from '../member.service';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'o-member-registration',
  templateUrl: './member-registration.component.html'
})

export class MemberRegistrationComponent implements OnInit {
  memberForm: any;

  errorMessage: string;
  member: Member;
  inviteGUID: string;
  pendingRegister: boolean;

  private dataIsValid: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private memberService: MemberService) {

      this.memberForm = this.formBuilder.group({
          'memberData': this.formBuilder.group({
              'memberFirstName': [Validators.required],
              'memberLastName' : [Validators.required],
              // 'memberPassword' : [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/)],
              //'memberPassword' : [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$/)],
              'memberPassword' : [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*\d).{6,}$/)],
              'memberConfirmPassword' : [Validators.required]
          })
      });
    }

  ngOnInit(): void {
    this.route.queryParams
      .filter(params => params.inviteGUID)
      .subscribe(params => {
        this.inviteGUID = params.inviteGUID;
      });
    this.memberService.getMemberByInviteGUID(this.inviteGUID).subscribe(
      (member: Member) => {
          this.member = member;

          if (this.member.IsConfirmed) {
            this.router.navigate(['/home']);
          }
      },
      error => {
          this.errorMessage = <any>error;
          this.memberService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
          this.router.navigate(['/home']);
      }
    );
  }

  onRegisterMember() {
    if (this.isValid()) {
      this.pendingRegister = true;
      this.member.IsConfirmed = true;
      this.memberService.editMemberRegistration(this.member).subscribe(
          () => {
            this.pendingRegister = false;
            this.onSaveComplete(`${this.member.Email} was saved`)
          },
          (error: any) => {
            this.pendingRegister = false;
            this.errorMessage = <any>error;
          }
      );
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
      return true;
    } else {
      if (!this.member.FirstName || !this.member.LastName || !this.member.Password) {
        //alert('Please enter all required fields');
        this.memberService.sendNotification({ type: 'error', title: 'Invalid Data', content: 'Please enter all required fields' });
      } else if (!this.memberForm.controls['memberData'].controls['memberPassword'].valid) {
        //alert('Invalid Password');
        this.memberService.sendNotification({ type: 'error', title: 'Invalid Password'
          //, content: 'Must contain the following:<br>-Minimum of 6 characters<br>-Number<br>-Lower case letter<br>-Upper case letter<br>-Special character(non-letter/non-numeric)' });           
          , content: 'Must contain the following:<br>-Minimum of 6 characters<br>-Number<br>-Lower case letter' });
        } else if (this.member.Password !== this.member.ConfirmPassword) {
        //alert('Confirm Password must match the Password');
        this.memberService.sendNotification({ type: 'error', title: 'Confirm Password must match the Password', content: '' });
      } else  {
        //alert('Invalid entry');
        this.memberService.sendNotification({ type: 'error', title: 'Invalid entry', content: '' });
      }
      return false;
    }
  }
}
