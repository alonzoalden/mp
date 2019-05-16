import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from '../../shared/class/member';
import { SettingService } from '../setting.service';
import { AppService } from '../../app.service';

@Component({
    selector: 'o-setting-member-preference',
    templateUrl: './setting-member-preference.component.html'
})

export class SettingMemberPreferenceComponent implements OnInit {
    errorMessage: string;
    member: Member;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private settingService: SettingService,
        private appService: AppService) { }

    ngOnInit() {
        this.appService.getCurrentMember()
                .subscribe(
                    (data) => {
                        this.member = data;
                    },
                    (error: any) => {
                        this.settingService.sendNotification({ type: 'error', title: 'Error', content: error });
                    }
                );
    }

    onUpdate() {
        this.settingService.editCurrentMember(this.member).subscribe(
            () => {
                this.settingService.sendNotification({ type: 'success', title: 'Successfully Updated', content: '' });
                window.location.reload();
            },
            (error: any) => {
                this.settingService.sendNotification({ type: 'error', title: 'Error', content: error });
            }
        );
    }
}