import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Member} from '../../../../shared/class/member';
import {Store} from '@ngrx/store';
import {UsermanagementState} from '../../state/usermanagement.reducer';
import {VendorRegistrationB2B} from '../../../../shared/class/vendor-registration';

@Component({
    selector: 'app-usermanagement-check-vendor-list',
    templateUrl: './usermanagement-check-vendor-list.component.html',
    styleUrls: ['./usermanagement-check-vendor-list.component.css']
})
export class UsermanagementCheckVendorListComponent implements OnInit, OnChanges {
    @Input() isCheckVendorListLoading: boolean;
    @Input() vendorList: MatTableDataSource<Member>;
    @Output() getVendorCheckList = new EventEmitter();
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @Output() editVendor = new EventEmitter<VendorRegistrationB2B>();


    displayedColumns = ['Menu', 'CompanyName', 'MerchantID', 'Address', 'FirstName', 'LastName', 'Email', 'State', 'City', 'PostalCode', 'Region', 'PhoneNumber', 'CreatedOn'];

    constructor(
        private store: Store<UsermanagementState>,
        public dialog: MatDialog,
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.vendorList && changes.vendorList.currentValue.data) {
            this.vendorList.paginator = this.paginator;
            this.vendorList.sort = this.sort;
        }
    }

    ngOnInit() {
        this.getVendorCheckList.emit();
    }

    applyFilter(filterValue: string) {
        this.vendorList.filter = filterValue.trim().toLowerCase();
        if (this.vendorList.paginator) {
            this.vendorList.paginator.firstPage();
        }
    }

    edit(vendorRegistration: VendorRegistrationB2B) {
        this.editVendor.emit(vendorRegistration);
    }
}
