import { Component,  Output, Input, EventEmitter } from '@angular/core';
import { Member } from '../../../shared/class/member';

@Component({
    selector: 'o-setting-member-preference',
    templateUrl: './setting-member-preference.component.html'
})

export class SettingMemberPreferenceComponent {
    @Input() userInfo: Member;
    @Input() errorMessage: string;
    @Input() pendingSave: boolean;
    @Output() editCurrentMember = new EventEmitter<Member>();

    constructor() { }

    onUpdate() {
        this.editCurrentMember.emit(this.userInfo);
    }
}

