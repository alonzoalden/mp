import { Component, ViewChild, Input, Output, EventEmitter, SimpleChanges, OnChanges, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { VendorAttachment } from '../../../../shared/class/vendor-attachment';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'o-company-attachment-list',
    templateUrl: './company-attachment-list.component.html'
})

export class CompanyAttachmentListComponent implements OnChanges, AfterViewInit {
    private fileURL = environment.fileURL;
    displayedColumns = ['Menu', 'View', 'ID', 'Title', 'CreatedOn', 'Exclude'];
    currentIndex = null;
    @Input() userInfoDefaultPageSize: number;
    @Input() vendorAttachmentsMatTable: MatTableDataSource<VendorAttachment>;
    @Input() pendingDelete: boolean;
    @Input() errorMessage: string;
    @Output() getVendorAttachments = new EventEmitter<void>();
    @Output() setVendorAttachmentID = new EventEmitter<number>();
    @Output() deleteVendorAttachment = new EventEmitter<number>();
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.vendorAttachmentsMatTable && changes.vendorAttachmentsMatTable.currentValue.data.length) {
            this.vendorAttachmentsMatTable.paginator = this.paginator;
            this.vendorAttachmentsMatTable.sort = this.sort;
        }
        if (changes.userInfoDefaultPageSize && !changes.userInfoDefaultPageSize.currentValue) {
            this.userInfoDefaultPageSize = 100;
        }
        
    }
    onSetVendorAttachmentID(id: number) {
        this.setVendorAttachmentID.emit(id);
    }
    ngAfterViewInit(): void {
        this.getVendorAttachments.emit();
    }
    onDeleteAttachment(vendorattachment: VendorAttachment, index: number) {
        this.currentIndex = index;
        const _confirmation = confirm(`Remove ${vendorattachment.VendorAttachmentID}: ${vendorattachment.Title}?`);
        if (_confirmation) {
            this.deleteVendorAttachment.emit(vendorattachment.VendorAttachmentID);
        }
    }
    applyFilter(filtervalue: string) {
        this.vendorAttachmentsMatTable.filter = filtervalue.trim().toLowerCase();
        if (this.vendorAttachmentsMatTable.paginator) {
            this.vendorAttachmentsMatTable.paginator.firstPage();
        }
    }
}
