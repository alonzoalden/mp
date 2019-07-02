import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatMenu } from '@angular/material/menu';
import { Subscription } from 'rxjs';

import { VendorAttachment } from '../../shared/class/vendor-attachment';

import { AppService } from '../../app.service';
import { ItemService } from '../item.service'
import { ItemVariationComponentDialog } from '../item-variation/item-variation.component-dialog';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'o-item-variation-list',
    templateUrl: './item-variation-list.component.html'
})

export class ItemVariationListComponent implements OnInit {
    subscription: Subscription;
    errorMessage: string;
    //vendorAttachments: VendorAttachment[];
    variationGroups: any[]; 
    private fileURL = environment.fileURL;

    displayedColumns = ['Menu', 'Title', 'CreatedOn'];
    dataSource: any = null;
    attributesVariationsList: any[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private route: ActivatedRoute,
        private router: Router,
        public printDialog: MatDialog,
        private itemService: ItemService,
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
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: error });
                }
            );

        // this.subscription = this.itemService.getVariationGroups().subscribe(
        //     (variationGroups: VendorAttachment[]) => {
        //         this.variationGroups = vendorAttachments;
        //         this.refreshDataSource(this.variationGroups);
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
        // if (confirmation) {
        //     this.companyService.deleteVendorAttachment(vendorattachment.VendorAttachmentID).subscribe(
        //         () => {
        //             this.onDeleteComplete(vendorattachment, `${vendorattachment.VendorAttachmentID} was deleted`);

        //             const foundIndex = this.vendorAttachments.findIndex(i => i.VendorAttachmentID === vendorattachment.VendorAttachmentID);
        //             if (foundIndex > -1) {
        //                 this.vendorAttachments.splice(foundIndex, 1);
        //             }

        //             this.refreshDataSource(this.vendorAttachments);
        //         },
        //         (error: any) => {
        //             this.refreshDataSource(this.vendorAttachments);
        //             this.errorMessage = <any>error;
        //             this.companyService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
        //             window.location.reload();
        //         }
        //     );
        // }
    }

    onDeleteComplete(vendorattachment: VendorAttachment, message?: string): void {
        this.refreshDataSource(this.variationGroups);
        // this.companyService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: message });
    }

    ngOnDestroy() {
        //this.subscription.unsubscribe();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    openDialogItemVariation() {
        const dialogRef = this.printDialog.open(ItemVariationComponentDialog, {
            data: this.attributesVariationsList
        });
    
        dialogRef.afterClosed().subscribe(result => {});
    }
}
