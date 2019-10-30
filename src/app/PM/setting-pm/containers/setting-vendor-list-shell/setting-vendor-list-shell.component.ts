import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { Member, MemberVendor } from 'app/shared/class/member';
import { Store, select } from '@ngrx/store';
import * as fromUser from '../../../../shared/state/user-state.reducer';
import * as fromSetting from '../../state';
import * as settingActions from '../../state/setting.actions';
import {LoadAllSubMemberVendors} from '../../state/setting.actions';

@Component({
    selector: 'o-setting',
    templateUrl: './setting-vendor-list-shell.component.html',
})

export class SettingVendorListShellComponent implements OnInit {
    memberVendorsMatTable$: Observable<MatTableDataSource<MemberVendor>>;
    userInfo$: Observable<Member>;
    errorMessage$: Observable<string>;
    pendingSave$: Observable<boolean>;

    constructor(private store: Store<fromSetting.State>) { }

    ngOnInit() {
        this.memberVendorsMatTable$ = this.store.pipe(select(fromSetting.getMemberVendorListMatTable));
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.errorMessage$ = this.store.pipe(select(fromSetting.getError));
        this.pendingSave$ = this.store.pipe(select(fromSetting.getPendingSave));
    }

    getMembersVendors() {
        this.store.dispatch(new settingActions.LoadAllSubMemberVendors());
    }
    editCurrentMember(member: Member) {
        this.store.dispatch(new settingActions.EditCurrentMember(member));
    }
}
