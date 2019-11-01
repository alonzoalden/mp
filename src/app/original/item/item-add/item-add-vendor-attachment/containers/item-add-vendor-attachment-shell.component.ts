import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { ItemInsert, ItemAttachmentInsert } from '../../../../../shared/class/item';
import { VendorAttachmentList } from '../../../../../shared/class/vendor-attachment';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';

@Component({
    templateUrl: './item-add-vendor-attachment-shell.component.html'
  })

export class ItemAddVendorAttachmentShellComponent implements OnInit {
    errorMessage$: Observable<string>;
    isVendorAttachmentsListLoading$: Observable<boolean>;
    item$: Observable<ItemInsert>;
    itemAttachmentsMatTable$: Observable<MatTableDataSource<ItemAttachmentInsert>>;
    vendorAttachmentsList$: Observable<VendorAttachmentList[]>;

    constructor(private store: Store<fromItem.State>) { }

    ngOnInit(): void {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
        this.itemAttachmentsMatTable$ = this.store.pipe(select(fromItem.getItemAttachmentsMatTable));
        this.vendorAttachmentsList$ = this.store.pipe(select(fromItem.getVendorAttachmentList));
        setTimeout(() => {
            this.isVendorAttachmentsListLoading$ = this.store.pipe(select(fromItem.getIsVendorAttachmentsListLoading));
        });
    }
    getVendorAttachmentList(): void {
        this.store.dispatch(new itemActions.LoadVendorAttachmentList());
    }
    getAttachment(itemattachment: ItemAttachmentInsert): void {
        this.store.dispatch(new itemActions.LoadItemAttachment(itemattachment));
    }
}
