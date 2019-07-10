import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

import { Item, ItemList, ItemImage } from '../../shared/class/item';
import { ItemService } from '../item.service';

import { environment } from '../../../environments/environment';

declare var $ :any;

@Component({
    selector: 'o-item-edit-variation',
    templateUrl: './item-edit-variation.component.html'
})

export class ItemEditVariationComponent implements OnInit {
    private imageURL = environment.imageURL;

    errorMessage: string;
    item: Item;
    itemid: number;

    displayedColumns = [];
    dataSource: any = null;
    pendingAdd: boolean;
    currentIndex: number;

    formDirty = false;

    
    constructor(private route: ActivatedRoute,
        private itemService: ItemService, public itemUploadDialog: MatDialog) { }

    ngOnInit(): void {
    
        this.itemid = this.route.parent.snapshot.params['id'];
        this.itemService.getCurrentItemEdit(this.itemid).subscribe(
            (item: Item) => {
                console.log(item);
                this.itemService.currentItemEdit = item;
                this.item = this.itemService.currentItemEdit;
                this.initialize();
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    initialize() {
        
    }
    
}