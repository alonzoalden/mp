import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Member } from '../../../shared/class/member';
import { MemberService } from '../../member.service';
import { AppService } from '../../../app.service';

@Component({
    selector: 'o-member-list',
    templateUrl: './member-list.component.html',
    styleUrls: ['./member-list.component.css']
})

export class MemberListComponent implements OnInit, OnChanges {
    @Input() userInfo: Member;
    @Input() membersMatTable: MatTableDataSource<Member>;
    @Input() pendingDelete: boolean;
    @Input() isLoading: boolean;
    @Input() errorMessage: string;
    @Output() getMembers = new EventEmitter<Member>();
    @Output() editMemberRegistration = new EventEmitter<Member>();
    @Output() deleteMember = new EventEmitter<Member>();
    displayedColumns = ['Menu', 'Email', 'IsPM', 'IsAdmin', 'IsConfirmed', 'IsActive', 'CreatedOn'];
    dataSource: any = null;
    currentIndex: number;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    members: any[];

    constructor(
        private router: Router,
        private memberService: MemberService,
     ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.membersMatTable && !changes.membersMatTable.currentValue.data.length && changes.membersMatTable.firstChange) {
            //this.getMembers.emit();
        }
        if (changes.membersMatTable && changes.membersMatTable.currentValue.data.length) {
            this.membersMatTable.paginator = this.paginator;
            this.membersMatTable.sort = this.sort;
        }
        if (changes.userInfo && changes.userInfo.currentValue) {
            if (!changes.userInfo.currentValue.IsAdmin) {
                this.router.navigate(['/home']);
            }
            if (changes.userInfo.currentValue.DefaultPageSize) {
                this.paginator.pageSize = changes.userInfo.currentValue.DefaultPageSize;
            } else {
                this.paginator.pageSize = 100;
            }
        }
    }
    ngOnInit() {
        this.getMembers.emit();
        this.applyFilter('');
    }

    refreshDataSource(members: Member[]) {
        this.dataSource = new MatTableDataSource<Member>(members);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    sendConfirmationMember(member: Member): void {
        this.memberService.sendConfirmation(member).subscribe(
            () => {
                this.memberService.sendNotification({ type: 'success', title: 'Confirmation Sent', content: '' });
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    inactivateMember(member: Member): void {
        member.IsActive = false;
        this.saveMember(member);
    }

    activateMember(member: Member): void {
        member.IsActive = true;
        this.saveMember(member);
    }

    onDeleteMember(member: Member): void {
        const confirmation = confirm(`Delete ${member.Email}?`);

        if (confirmation) {
            this.deleteMember.emit(member);
        }
    }

    saveMember(member: Member): void {
        this.memberService.editMember(member).subscribe(
            () => this.onSaveComplete(`${member.Email} was saved`),
            (error: any) => this.errorMessage = <any>error
        );

    }

    onSaveComplete(message?: string): void {
        this.memberService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
        // Navigate back to dashboard
        //this.router.navigate(['/dashboard']);
    }

    applyFilter(filterValue: string) {
        this.membersMatTable.filter = filterValue.trim().toLowerCase();
        if (this.membersMatTable.paginator) {
            this.membersMatTable.paginator.firstPage();
        }
    }
}
