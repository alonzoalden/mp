import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { ItemPartEditShellComponent } from './item-part-edit-shell.component';

@Injectable()
export class ItemPartEditGuard implements CanDeactivate<ItemPartEditShellComponent> {

    canDeactivate(component: ItemPartEditShellComponent): boolean {
        if (component.hasChange) {
            // const res = confirm(`Navigate away and lose all changes to ${component.item.ItemID}?`);
            const res = confirm(`All unsaved data will be lost. Are you sure you want to leave this page?`);
            if (res) {
                component.confirmLoseChange();
            }
            return res;
        }
        return true;
    }
}
