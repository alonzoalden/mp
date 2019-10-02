import { Component, OnInit, ViewChild, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MemberVendor, Member } from '../../../shared/class/member';

@Component({
    selector: 'o-setting-vendor-list',
    templateUrl: './setting-vendor-list.component.html'
})

export class SettingVendorListComponent implements OnInit {
    @Input() userInfo: Member;
    @Input() memberVendorsMatTable: MatTableDataSource<MemberVendor>;
    @Input() pendingSave: boolean;
    @Input() errorMessage: string;
    @Output() getMembersVendors = new EventEmitter<void>();
    @Output() editCurrentMember = new EventEmitter<Member>();
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    displayedColumns = ['VendorID', 'MerchantID', 'VendorName', 'CreatedOn', 'Switch'];

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.memberVendorsMatTable && changes.memberVendorsMatTable.currentValue.data.length) {
            this.memberVendorsMatTable.paginator = this.paginator;
            this.memberVendorsMatTable.sort = this.sort;
        }
        if (changes.userInfo && changes.userInfo.currentValue) {
            if (changes.userInfo.currentValue.DefaultPageSize) {
                this.paginator.pageSize = changes.userInfo.currentValue.DefaultPageSize;
            } else {
                this.paginator.pageSize = 100;
            }
        }
    }
    ngOnInit() {
        this.getMembersVendors.emit();
    }
    switchMemberVendor(memberVendor: MemberVendor): void {
        this.userInfo.VendorID = memberVendor.VendorID.toString();
        this.editCurrentMember.emit(this.userInfo);
    }

    isCurrentVendor(vendorid: string) {
        return (this.userInfo && this.userInfo.VendorID === vendorid);
    }

    applyFilter(filterValue: string) {
        this.memberVendorsMatTable.filter = filterValue.trim().toLowerCase();
        if (this.memberVendorsMatTable.paginator) {
            this.memberVendorsMatTable.paginator.firstPage();
        }
    }
}
