import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Member} from '../../../../shared/class/member';
import {UsermanagementMemberVendorDialogComponent} from './usermanagement-membervendor-dialog.component';
import {Store} from '@ngrx/store';
import {UsermanagementState} from '../../state/usermanagement.reducer';

@Component({
    selector: 'app-usermanagement-membervendor',
    templateUrl: './usermanagement-membervendor.component.html',
    styleUrls: ['./usermanagement-membervendor.component.css']
})
export class UsermanagementMemberVendorComponent implements OnInit, OnChanges {
    @Input() isMemberListLoading: boolean;
    @Input() memberListMatTable: MatTableDataSource<Member>;
    @Output() getMemberList = new EventEmitter();
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    displayedColumns = ['Position', 'MemberID', 'FirstName', 'LastName', 'Email', 'CreatedOn', 'Edit'];

    constructor(
        public dialog: MatDialog,
        private store: Store<UsermanagementState>
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.memberListMatTable && changes.memberListMatTable.currentValue.data) {
            this.memberListMatTable.paginator = this.paginator;
            this.memberListMatTable.sort = this.sort;
        }
    }

    ngOnInit() {
        this.getMemberList.emit();
    }

    onButtonClick(member: Member, type: 'view' | 'edit') {
        this.dialog.open(UsermanagementMemberVendorDialogComponent, {
            // height: '800px',
            // width: '1400px',
            data: {member, type: type}
        });
    }

    applyFilter(filterValue: string) {
        this.memberListMatTable.filter = filterValue.trim().toLowerCase();
        if (this.memberListMatTable.paginator) {
            this.memberListMatTable.paginator.firstPage();
        }
    }
}
