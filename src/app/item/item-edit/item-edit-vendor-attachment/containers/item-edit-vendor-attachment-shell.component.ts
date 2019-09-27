import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';

import { Item, ItemAttachment, ItemInsert, ItemAttachmentInsert } from '../../../../shared/class/item';
import { VendorAttachmentList } from '../../../../shared/class/vendor-attachment';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';

@Component({
    templateUrl: './item-edit-vendor-attachment-shell.component.html'
})

export class ItemEditVendorAttachmentShellComponent implements OnInit {
    errorMessage$: Observable<string>;
    item$: Observable<Item | ItemInsert>;
    itemAttachmentsMatTable$: Observable<MatTableDataSource<ItemAttachment | ItemAttachmentInsert>>;
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
    getAttachment(itemattachment: ItemAttachment): void {
        this.store.dispatch(new itemActions.LoadItemAttachment(itemattachment));
    }
}
  