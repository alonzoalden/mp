import { Component, OnInit, OnDestroy, ViewChild, Inject, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatMenu } from '@angular/material/menu';
import { Subscription } from 'rxjs';

import { VendorAttachment } from '../../../shared/class/vendor-attachment';
import { CompanyService } from '../../company.service';
import { AppService } from '../../../app.service';

import { environment } from '../../../../environments/environment';
import { Member } from 'app/shared/class/member';
import * as companyActions from '../state/company-attachment.actions';
import * as fromCompany from '../state';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
@Component({
    selector: 'o-company-attachment-list',
    templateUrl: './company-attachment-list.component.html',
    styleUrls: ['./company-attachment-list.component.css']
})

export class CompanyAttachmentListComponent implements OnInit, OnDestroy {
    //subscription: Subscription;
    errorMessage: string;
    vendorAttachments1: VendorAttachment[];
    //vendorAttachments1: MatTableDataSource<VendorAttachment>;
    
    private fileURL = environment.fileURL;

    displayedColumns = ['Menu', 'View', 'ID', 'Title', 'CreatedOn', 'Exclude'];
    dataSource: any = null;
    
    @Input() userInfo: Member;
    @Input() vendorAttachments: MatTableDataSource<VendorAttachment>;
    @Output() getVendorAttachmentList = new EventEmitter<void>();
    @Output() deleteVendorAttachment = new EventEmitter<number>();
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    //private paginator: MatPaginator;

    // @ViewChild(MatPaginator, { static: true }) set matPaginator(mp: MatPaginator) {
    //     this.paginator = mp;
    //     this.vendorAttachments.paginator = this.paginator;
    // }
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    componentActive: boolean = true;
    constructor(private route: ActivatedRoute,
        private router: Router,
        private companyService: CompanyService,
        private appService: AppService,
        private store: Store<fromCompany.State>) { }

    ngOnInit(): void {
        this.getVendorAttachmentList.emit();
        this.store.pipe(select(fromCompany.getVendorAttachments), 
            takeWhile(()=> this.componentActive))
            .subscribe(
                (vendorattachments: MatTableDataSource<VendorAttachment>) => {
                    console.log(vendorattachments);
                    if (vendorattachments) this.vendorAttachments.paginator = this.paginator;
                },
                (error: any) => this.errorMessage = error
            );
        //this.vendorAttachments.sort = this.sort;
        //this.vendorAttachments.paginator = this.paginator;
        // if (this.userInfo.DefaultPageSize) {
        //     this.paginator.pageSize = this.userInfo.DefaultPageSize;
        // }
        // else {
        //     this.paginator.pageSize = 100;                        
        // }
        //this.store.dispatch(new companyActions.LoadVendorAttachments());

        // this.appService.getCurrentMember()
        //     .subscribe(
        //         (data) => {
        //             if (data.DefaultPageSize) {
        //                 this.paginator.pageSize = data.DefaultPageSize;
        //             }
        //             else {
        //                 this.paginator.pageSize = 100;                        
        //             }
        //         },
        //         (error: any) => {
        //             this.companyService.sendNotification({ type: 'error', title: 'Error', content: error });
        //         }
        //     );

        // this.subscription = this.companyService.getVendorAttachments().subscribe(
        //     (vendorAttachments: VendorAttachment[]) => {
        //         this.vendorAttachments = vendorAttachments;
        //         this.refreshDataSource(this.vendorAttachments);
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );                            
    }

    refreshDataSource(vendorAttachments: VendorAttachment[]) {
        this.dataSource = new MatTableDataSource<VendorAttachment>(vendorAttachments);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    onDeleteAttachment(vendorattachment: VendorAttachment) {
        const confirmation = confirm(`Remove ${vendorattachment.VendorAttachmentID}: ${vendorattachment.Title}?`);
        if (confirmation) {
            this.deleteVendorAttachment.emit(vendorattachment.VendorAttachmentID);
            // this.companyService.deleteVendorAttachment(vendorattachment.VendorAttachmentID).subscribe(
            //     () => {
            //         this.onDeleteComplete(vendorattachment, `${vendorattachment.VendorAttachmentID} was deleted`);

            //         const foundIndex = this.vendorAttachments1.findIndex(i => i.VendorAttachmentID === vendorattachment.VendorAttachmentID);
            //         if (foundIndex > -1) {
            //             this.vendorAttachments1.splice(foundIndex, 1);
            //         }

            //         this.refreshDataSource(this.vendorAttachments1);
            //     },
            //     (error: any) => {
            //         this.refreshDataSource(this.vendorAttachments1);
            //         this.errorMessage = <any>error;
            //         this.companyService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
            //         window.location.reload();
            //     }
            // );
        }
    }

    onDeleteComplete(vendorattachment: VendorAttachment, message?: string): void {
        this.refreshDataSource(this.vendorAttachments1);
        this.companyService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: message });
    }

    ngOnDestroy() {
        //this.subscription.unsubscribe();
        this.componentActive = false;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
