import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { Member, MemberInsert } from '../../../shared/class/member';

import { AdminService } from '../../admin.service';
import { AppService } from '../../../app.service';

import { Subscription, Observable } from 'rxjs';

import { NotificationComponent } from '../../../shared/tool/notification/notification.component';
import * as adminActions from '../../state/admin.actions';
import * as fromAdmin from '../../state';
import * as fromUser from '../../../shared/state/user-state.reducer';
import { MatTableDataSource } from '@angular/material';
import { Store, select } from '@ngrx/store';


@Component({
    selector: 'o-admin',
    templateUrl: './admin-shell.component.html',
})

export class AdminShellComponent implements OnInit  {
    membersMatTable$: Observable<MatTableDataSource<Member>>;
    member$: Observable<Member>;
    userInfo$: Observable<Member>;
    pendingDelete$: Observable<boolean>;
    pendingSave$: Observable<boolean>;
    errorMessage$: Observable<string>;

    route: String[];

    constructor(
        private router: Router,
        private store: Store<fromAdmin.State>) {
    }
    
    ngOnInit() {
        this.membersMatTable$ = this.store.pipe(select(fromAdmin.getMembersMatTable));
        this.member$ = this.store.pipe(select(fromAdmin.getMember));
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.pendingSave$ = this.store.pipe(select(fromAdmin.getPendingSave));
        this.pendingDelete$ = this.store.pipe(select(fromAdmin.getPendingDelete));
        this.errorMessage$ = this.store.pipe(select(fromAdmin.getError));

        this.router.events.subscribe((event: NavigationEnd): void => {
            if (event instanceof NavigationEnd) {
                this.route = event.url.split('?')[0].split('/');
            }
        });
        if (!this.route) this.route = this.router.url.split('?')[0].split('/');
    }

    getMembers() {
        this.store.dispatch(new adminActions.LoadMembers());
    }
    getMember(id: number) {
        this.store.dispatch(new adminActions.LoadMember(id));
    }
    setMemberID(vendorattachmentid: number) {
        this.store.dispatch(new adminActions.SetMemberID(vendorattachmentid));
    }
    editMember(member: Member) {
        this.store.dispatch(new adminActions.EditMember(member));
    }
    addMember(member: MemberInsert) {
        this.store.dispatch(new adminActions.AddMember(member));
    }
    // deleteMember(vendorattachmentid: number) {
    //     this.store.dispatch(new adminActions.DeleteMember(vendorattachmentid));
    // }
}