import { Component, OnChanges, AfterViewInit, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Member } from '../../../shared/class/member';

@Component({
    selector: 'o-admin-member-list',
    templateUrl: './admin-member-list.component.html'
})

export class AdminMemberListComponent implements OnChanges, AfterViewInit {
    displayedColumns = ['FirstName', 'LastName', 'Email', 'Vendor', 'Detail'];
    @Input() userInfo: Member;
    @Input() membersMatTable: MatTableDataSource<Member>;
    @Input() pendingDelete: boolean;
    @Input() errorMessage: string;
    @Output() getMembers = new EventEmitter<void>();
    @Output() setMemberID = new EventEmitter<number>(); 
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private router: Router) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.membersMatTable && changes.membersMatTable.currentValue.data.length) {
            this.membersMatTable.paginator = this.paginator;
            this.membersMatTable.sort = this.sort;
        }
        if (changes.userInfo && changes.userInfo.currentValue) {
            if (!changes.userInfo.currentValue.IsSuperAdmin) {
                this.router.navigate(['/home']);
            }
            if (changes.userInfo.currentValue.DefaultPageSize) {
                this.paginator.pageSize = changes.userInfo.currentValue.DefaultPageSize;
            }
            else {
                this.paginator.pageSize = 100;
            }
        }
    }
    ngAfterViewInit(): void {
        this.getMembers.emit();
    }
    onSetMemberID(id: number) {
        this.setMemberID.emit(id);
    }
    applyFilter(filterValue: string) {
        this.membersMatTable.filter = filterValue.trim().toLowerCase();
        if (this.membersMatTable.paginator) {
            this.membersMatTable.paginator.firstPage();
        }
    }
}
