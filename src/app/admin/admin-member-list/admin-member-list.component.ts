import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Member } from '../../shared/class/member';
import { AdminService } from '../admin.service';
import { AppService } from '../../app.service';



@Component({
    selector: 'o-admin-member-list',
    templateUrl: './admin-member-list.component.html',
    styleUrls: ['./admin-member-list.component.css']
})

export class AdminMemberListComponent implements OnInit {
    errorMessage: string;
    members: Member[];

    displayedColumns = ['FirstName', 'LastName', 'Email', 'Vendor', 'Detail'];
    dataSource: any = null;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private adminService: AdminService,
        private appService: AppService) { }

    ngOnInit() {    
        this.appService.getCurrentMember()
            .subscribe(
                (data) => {
                    if(!data.IsSuperAdmin) {
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
                    this.adminService.sendNotification({ type: 'error', title: 'Error', content: error });
                }
            );

        // if (!this.appService.isMemberSuperAdmin()) {
        //     this.router.navigate(['/home']);
        // }


        this.adminService.getMembers().subscribe(
            (members: Member[]) => {
                this.members = members;
                this.refreshDataSource(members);
            },
            (error: any) => {
                this.adminService.sendNotification({ type: 'error', title: 'Error', content: error });
                this.errorMessage = <any>error;
            }
        );        
    }

    refreshDataSource(members: Member[]) {
        this.dataSource = new MatTableDataSource<Member>(members);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    inactivateMember(member: Member): void {
        member.IsActive = false;
        this.saveMember(member);
    }

    activateMember(member: Member): void {
        member.IsActive = true;
        this.saveMember(member);
    }

    saveMember(member: Member): void {
        this.adminService.editMember(member).subscribe(
            () => this.onSaveComplete(`${member.Email} was saved`),
            (error: any) => this.errorMessage = <any>error
        );

    }

    onSaveComplete(message?: string): void {
        this.adminService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
        // Navigate back to dashboard
        // this.router.navigate(['/dashboard']);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
