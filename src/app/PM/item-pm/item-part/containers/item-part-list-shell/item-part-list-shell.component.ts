import { Component } from '@angular/core';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';
import { Store } from '@ngrx/store';
import { Item } from 'app/shared/class/item';
import { CustomPrintLabel } from 'app/shared/class/label';

@Component({
    templateUrl: './item-part-list-shell.component.html'
})

export class ItemPartListShellComponent {
    constructor(private store: Store<fromItem.State>) { }

    downloadItemLabelCount(payload: {item: Item, count: number, border: string}): void {
        this.store.dispatch(new itemActions.DownloadItemLabelCount(payload));
    }
    downloadItemLargeLabelCount(payload: {item: Item, count: number, border: string}): void {
        this.store.dispatch(new itemActions.DownloadItemLargeLabelCount(payload));
    }
    downloadItemLabelCountCustom(payload: {item: Item, options: CustomPrintLabel }): void {
        this.store.dispatch(new itemActions.DownloadItemLabelCountCustom(payload));
    }
    downloadItemLargeLabelCountCustom(payload: {item: Item, options: CustomPrintLabel }): void {
        this.store.dispatch(new itemActions.DownloadItemLargeLabelCountCustom(payload));
    }
}
