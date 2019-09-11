import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Subscription, Observable } from 'rxjs';

import { Item, ItemInsert, ItemList, ItemAttachmentInsert } from '../../../../shared/class/item';
import { ItemService } from '../../../item.service';
import { VendorAttachmentList, VendorAttachment } from '../../../../shared/class/vendor-attachment';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';

import { environment } from '../../../../../environments/environment';

@Component({
    templateUrl: './item-add-vendor-attachment-shell.component.html'
  })

export class ItemAddVendorAttachmentShellComponent implements OnInit {
    errorMessage$: Observable<string>;
    item$: Observable<ItemInsert>;
    itemAttachmentsMatTable$: Observable<MatTableDataSource<ItemAttachmentInsert>>;
    vendorAttachmentsList$: Observable<VendorAttachmentList[]>;
    
    constructor(private store: Store<fromItem.State>) { }

    ngOnInit(): void {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        this.itemAttachmentsMatTable$ = this.store.pipe(select(fromItem.getItemAttachmentsMatTable));
        this.vendorAttachmentsList$ = this.store.pipe(select(fromItem.getVendorAttachmentList));
    }
    getVendorAttachmentList(): void {
        this.store.dispatch(new itemActions.LoadVendorAttachmentList());
    }
    getAttachment(itemattachment: ItemAttachmentInsert): void {
        this.store.dispatch(new itemActions.LoadItemAttachment(itemattachment));
    }
}
