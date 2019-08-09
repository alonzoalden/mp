import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatMenu } from '@angular/material/menu';

import { Member } from '../../shared/class/member';
import { MemberService } from '../member.service';
import { AppService } from '../../app.service';

@Component({
    selector: 'o-member-list',
    templateUrl: './member-list.component.html',
    styleUrls: ['./member-list.component.css']
})

export class MemberListComponent implements OnInit {
    errorMessage: string;

    members: Member[];
    currentMember: Member;

    displayedColumns = ['Menu', 'Email', 'IsPM', 'IsAdmin', 'IsConfirmed', 'IsActive', 'CreatedOn'];
    dataSource: any = null;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private route: ActivatedRoute,
        private router: Router,    
        private memberService: MemberService,
        private appService: AppService
     ) { }

    ngOnInit() {
        this.appService.getCurrentMember()
            .subscribe(                    
                (data) => {
                    this.appService.currentMember = data;                     
                    this.currentMember = data;
                    if(this.currentMember && !this.currentMember.IsAdmin) {
                        this.router.navigate(['/home']);
                    }
                    if (data.DefaultPageSize) {
                        this.paginator.pageSize = data.DefaultPageSize;
                    }
                    else {
                        this.paginator.pageSize = 100;
                    }
                },
                (error: any) => {
                    this.appService.sendNotification({ type: 'error', title: 'Error', content: error });
                    this.errorMessage = <any>error;
                }
            );   

        this.memberService.getMembers().subscribe(
            (members: Member[]) => {
                this.members = members;
                this.refreshDataSource(members);
            },
            (error: any) => {
                this.memberService.sendNotification({ type: 'error', title: 'Error', content: error });
                this.errorMessage = <any>error;
            }
        );
    }

    refreshDataSource(members: Member[]) {
        this.dataSource = new MatTableDataSource<Member>(members);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    sendConfirmationMember(member: Member): void {
        this.memberService.sendConfirmation(member).subscribe(
            () => {
                this.memberService.sendNotification({ type: 'success', title: 'Confirmation Sent', content: "" });
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

    deleteMember(member: Member): void {
        const confirmation = confirm(`Delete ${member.Email}?`);        
        if (confirmation) {
            this.memberService.deleteMember(member).subscribe(
                () => {
                    const foundIndex = this.members.findIndex(i => i.MemberID === member.MemberID);
                    if (foundIndex > -1) {
                        this.members.splice(foundIndex, 1);
                    }
                    this.refreshDataSource(this.members);
                    this.memberService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: "" });
                },
                (error: any) => {
                    this.refreshDataSource(this.members);
                    this.errorMessage = <any>error;
                    this.memberService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                }
            );
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
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
