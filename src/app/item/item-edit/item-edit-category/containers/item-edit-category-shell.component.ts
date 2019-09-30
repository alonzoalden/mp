import { Component, OnInit } from '@angular/core';
import { ItemInsert, ItemCategoryAssignment } from '../../../../shared/class/item';
import { Category } from '../../../../shared/class/category';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../../state/item.actions';
import * as fromItem from '../../../state';

@Component({
  templateUrl: './item-edit-category-shell.component.html'
})

export class ItemEditCategoryShellComponent implements OnInit {
    item$: Observable<ItemInsert>;
    categoriesList$: Observable<Array<Category[]>>;
    categoryAssignments$: Observable<ItemCategoryAssignment[]>;
    currentResult$: Observable<Array<Category[]>>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromItem.State>) { }

    ngOnInit(): void {
        this.item$ = this.store.pipe(select(fromItem.getItem));
        this.categoriesList$ = this.store.pipe(select(fromItem.getItemCategories));
        this.categoryAssignments$ = this.store.pipe(select(fromItem.getCategoryAssignments));
        this.currentResult$ = this.store.pipe(select(fromItem.getCategoryBreadCrumbs));
        this.errorMessage$ = this.store.pipe(select(fromItem.getError));
    }
    getCategories(value: number) {
        this.store.dispatch(new itemActions.LoadItemCategories(value));
    }
    getCategoryBreadCrumbs(id: number) {
        this.store.dispatch(new itemActions.LoadCategoryBreadCrumbs(id));
    }
    getItemCategoryAssignments(id: number) {
        this.store.dispatch(new itemActions.LoadItemCategoryAssignments(id));
    }

}
