import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ItemAddBundleComponent } from './item-add-bundle.component';

@Injectable()
export class ItemAddBundleGuard implements CanDeactivate<ItemAddBundleComponent> {

    canDeactivate(component: ItemAddBundleComponent,
        route: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): boolean {

        if (!nextState.url.includes(currentState.url.substring(0, currentState.url.length - 6))) {
            return true;
        } else {
            if (component.hasEmptyTitle) {
                alert('You must have all "Title" entered for all options');
                return false;
            }
            if (component.hasEmptySelection) {
                alert('You must have all "Item" selected for all selections');
                return false;
            }
            return true;
        }
    }
}
