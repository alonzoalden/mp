import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatMenu } from '@angular/material/menu';

import { Member } from '../../../shared/class/member';
import { MemberService } from '../../member.service';
import { AppService } from '../../../app.service';
import { Observable } from 'rxjs';
import * as fromMember from '../../state';
import * as fromUser from '../../../shared/state/user-state.reducer';
import * as memberActions from '../../state/member.actions';
import { Store, select } from '@ngrx/store';

@Component({
    templateUrl: './member-list-shell.component.html',
})

export class MemberListShellComponent implements OnInit {
    userInfo$: Observable<Member>;
    membersMatTable$: Observable<MatTableDataSource<Member>>;
    errorMessage$: Observable<string>;
    pendingDelete$: Observable<boolean>;

    constructor(private store: Store<fromMember.State>) { }

    ngOnChange(changes: SimpleChanges) {
        
    }
    ngOnInit() {
        this.userInfo$ = this.store.pipe(select(fromUser.getCurrentUser));
        this.membersMatTable$ = this.store.pipe(select(fromMember.getMembersMatTable));
        this.pendingDelete$ = this.store.pipe(select(fromMember.getPendingDelete));
        this.errorMessage$ = this.store.pipe(select(fromMember.getError));
    }
    getMembers() {
        this.store.dispatch(new memberActions.LoadMembers());
    }
    sendConfirmationMember(member: Member) {
        this.store.dispatch(new memberActions.SendConfirmationMember(member));
    }
    deleteMember(member: Member) {
        this.store.dispatch(new memberActions.DeleteMember(member));
    }
    editMember(member: Member) {
        this.store.dispatch(new memberActions.EditMember(member));
    }
    // refreshDataSource(members: Member[]) {
    //     this.dataSource = new MatTableDataSource<Member>(members);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    // }

    // sendConfirmationMember(member: Member): void {
    //     this.memberService.sendConfirmation(member).subscribe(
    //         () => {
    //             this.memberService.sendNotification({ type: 'success', title: 'Confirmation Sent', content: "" });
    //         },
    //         (error: any) => this.errorMessage = <any>error
    //     );
    // }

    // inactivateMember(member: Member): void {
    //     member.IsActive = false;
    //     this.saveMember(member);
    // }

    // activateMember(member: Member): void {
    //     member.IsActive = true;
    //     this.saveMember(member);
    // }

    // deleteMember(member: Member): void {
    //     const confirmation = confirm(`Delete ${member.Email}?`);        
    //     if (confirmation) {
    //         this.memberService.deleteMember(member).subscribe(
    //             () => {
    //                 const foundIndex = this.members.findIndex(i => i.MemberID === member.MemberID);
    //                 if (foundIndex > -1) {
    //                     this.members.splice(foundIndex, 1);
    //                 }
    //                 this.refreshDataSource(this.members);
    //                 this.memberService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: "" });
    //             },
    //             (error: any) => {
    //                 this.refreshDataSource(this.members);
    //                 this.errorMessage = <any>error;
    //                 this.memberService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
    //             }
    //         );
    //     }
    // }

    // saveMember(member: Member): void {        
    //     this.memberService.editMember(member).subscribe(
    //         () => this.onSaveComplete(`${member.Email} was saved`),
    //         (error: any) => this.errorMessage = <any>error
    //     );

    // }

    // onSaveComplete(message?: string): void {
    //     this.memberService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
    // }

    // applyFilter(filterValue: string) {
    //     this.dataSource.filter = filterValue.trim().toLowerCase();
    //     if (this.dataSource.paginator) {
    //         this.dataSource.paginator.firstPage();
    //     }
    // }
}
