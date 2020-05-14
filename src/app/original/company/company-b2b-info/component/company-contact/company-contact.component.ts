import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Contact} from '../../../../../shared/class/contact';

@Component({
    selector: 'app-company-b2b-info-contact',
    templateUrl: './company-contact.component.html'
})
export class CompanyContactComponent implements OnInit, OnChanges {
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    @Input() contactDataSource: MatTableDataSource<Contact>;
    @Input() isContactLoading: boolean;
    @Output() getContact = new EventEmitter();

    displayedColumns = ['VendorContactID', 'SKU', 'ItemName', 'Message', 'ExpectedOrderQuantity', 'Name', 'Email', 'CreatedOn'];

    constructor() {
    }

    ngOnInit() {
        this.getContact.emit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.contactDataSource && changes.contactDataSource.currentValue && changes.contactDataSource.currentValue.data) {
            this.contactDataSource.paginator = this.paginator;
        }
    }
}
