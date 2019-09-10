import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { ItemVariationListing } from '../../shared/class/item';

import { AppService } from '../../app.service';
import { ItemService } from '../item.service'
import { environment } from '../../../environments/environment';

@Component({
    selector: 'o-item-variation-list',
    templateUrl: './item-variation-list.component.html'
})

export class ItemVariationListComponent implements OnInit {
    subscription: Subscription;
    errorMessage: string;
    variationListings: ItemVariationListing[]; 
    displayedColumns = ['Menu', 'Title', 'ItemSelection', 'CreatedOn'];
    dataSource: any = null;
    attributesVariationsList: any[] = [];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    private fileURL = environment.fileURL;
    private imageURL = environment.imageURL;
    constructor(public selectDialog: MatDialog,
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

        this.subscription = this.itemService.getItemVariationListings().subscribe(
            (variationListings: ItemVariationListing[]) => {
                this.variationListings = variationListings;
                this.refreshDataSource(this.variationListings);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    refreshDataSource(variationListings: ItemVariationListing[]) {
        this.dataSource = new MatTableDataSource<ItemVariationListing>(variationListings);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    onDeleteListing(listing: ItemVariationListing) {
        const confirmation = confirm(`Remove ${listing.ItemVariationListingID}: ${listing.Name}?`);
        if (confirmation) {
            this.itemService.deleteItemVariationListing(listing.ItemVariationListingID).subscribe(
                () => {
                    this.onDeleteComplete(listing, `${listing.ItemVariationListingID} was deleted`);
                    const foundIndex = this.variationListings.findIndex(i => i.ItemVariationListingID === listing.ItemVariationListingID);
                    if (foundIndex > -1) {
                        this.variationListings.splice(foundIndex, 1);
                    }
                    this.refreshDataSource(this.variationListings);
                },
                (error: any) => {
                    this.refreshDataSource(this.variationListings);
                    this.errorMessage = <any>error;
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    window.location.reload();
                }
            );
        }
    }

    onDeleteComplete(vendorattachment: ItemVariationListing, message?: string): void {
        this.refreshDataSource(this.variationListings);
        this.itemService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: message });
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
