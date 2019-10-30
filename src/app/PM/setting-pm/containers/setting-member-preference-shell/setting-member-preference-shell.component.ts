import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromUser from '../../../../shared/state/user-state.reducer';
import * as fromSetting from '../../state';
import * as settingActions from '../../state/setting.actions';
import { select, Store } from '@ngrx/store';
import { Member } from 'app/shared/class/member';

@Component({
    templateUrl: './setting-member-preference-shell.component.html',
})

export class SettingMemberPreferenceShellComponent implements OnInit {
    userInfo$: Observable<Member>;
    pendingSave$: Observable<boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromSetting.State>) {}

    ngOnInit() {
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.pendingSave$ = this.store.pipe(select(fromSetting.getPendingSave));
        this.errorMessage$ = this.store.pipe(select(fromSetting.getError));
    }

    editCurrentMember(member: Member) {
        this.store.dispatch(new settingActions.EditCurrentMember(member));
    }
}
