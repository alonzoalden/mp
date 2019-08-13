import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatMenu } from '@angular/material/menu';
import { Subscription } from 'rxjs';

import { VendorAttachment } from '../../../shared/class/vendor-attachment';
import { CompanyService } from '../../company.service';
import { AppService } from '../../../app.service';

import { environment } from '../../../../environments/environment';

@Component({
    selector: 'o-company-attachment-list',
    templateUrl: './company-attachment-list.component.html',
    styleUrls: ['./company-attachment-list.component.css']
})

export class CompanyAttachmentListComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    errorMessage: string;
    vendorAttachments: VendorAttachment[];
    private fileURL = environment.fileURL;

    displayedColumns = ['Menu', 'View', 'ID', 'Title', 'CreatedOn', 'Exclude'];
    dataSource: any = null;
    
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private companyService: CompanyService,
        private appService: AppService) { }

    ngOnInit(): void {   
        this.appService.getCurrentMember()
            .subscribe(
                (data) => {
                    if (data.DefaultPageSize) {
                        this.paginator.pageSize = data.DefaultPageSize;
                    }
                    else {
                        this.paginator.pageSize = 100;                        
                    }
                },
                (error: any) => {
                    this.companyService.sendNotification({ type: 'error', title: 'Error', content: error });
                }
            );

        this.subscription = this.companyService.getVendorAttachments().subscribe(
            (vendorAttachments: VendorAttachment[]) => {
                this.vendorAttachments = vendorAttachments;
                this.refreshDataSource(this.vendorAttachments);
            },
            (error: any) => this.errorMessage = <any>error
        );                            
    }

    refreshDataSource(vendorAttachments: VendorAttachment[]) {
        this.dataSource = new MatTableDataSource<VendorAttachment>(vendorAttachments);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    onDeleteAttachment(vendorattachment: VendorAttachment) {
        const confirmation = confirm(`Remove ${vendorattachment.VendorAttachmentID}: ${vendorattachment.Title}?`);
        if (confirmation) {
            this.companyService.deleteVendorAttachment(vendorattachment.VendorAttachmentID).subscribe(
                () => {
                    this.onDeleteComplete(vendorattachment, `${vendorattachment.VendorAttachmentID} was deleted`);

                    const foundIndex = this.vendorAttachments.findIndex(i => i.VendorAttachmentID === vendorattachment.VendorAttachmentID);
                    if (foundIndex > -1) {
                        this.vendorAttachments.splice(foundIndex, 1);
                    }

                    this.refreshDataSource(this.vendorAttachments);
                },
                (error: any) => {
                    this.refreshDataSource(this.vendorAttachments);
                    this.errorMessage = <any>error;
                    this.companyService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    window.location.reload();
                }
            );
        }
    }

    onDeleteComplete(vendorattachment: VendorAttachment, message?: string): void {
        this.refreshDataSource(this.vendorAttachments);
        this.companyService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: message });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
