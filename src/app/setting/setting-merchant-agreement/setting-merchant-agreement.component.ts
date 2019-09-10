import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from '../../shared/class/member';
import { SettingService } from '../setting.service';
import { AppService } from '../../app.service';

@Component({
    selector: 'o-setting-merchant-agreement',
    templateUrl: './setting-merchant-agreement.component.html'
})

export class SettingMerchantAgreementComponent implements OnInit {
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
}