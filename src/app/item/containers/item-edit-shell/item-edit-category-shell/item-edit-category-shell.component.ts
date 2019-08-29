import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Item, ItemCategoryAssignment } from '../../../../shared/class/item';
import { Category } from '../../../../shared/class/category';

import { ItemService } from '../../../item.service';

@Component({
  templateUrl: './item-edit-category-shell.component.html'
})

export class ItemEditCategoryShellComponent implements OnInit {
    errorMessage: string;
    item: Item;
    _categoryAssignment: ItemCategoryAssignment[];
    categoryiesList: Array<Category[]> = [];
    currentResult: Array<Category[]> = [];
    lastSelectedValue: number = 0;

    displayedColumns = ['SelectedCategory', 'Remove'];
    dataSource: any = null;
    formDirty = false;
    canAdd = false;

    @ViewChild('selectionCategories', { static: false }) selectionCategoriesRef: ElementRef;

    constructor(private route: ActivatedRoute,
                private itemService: ItemService) { }

    get categoryAssignment(): ItemCategoryAssignment[] {
        return this._categoryAssignment;
    }
    set categoryAssignment(value: ItemCategoryAssignment[]) {
        this._categoryAssignment = value;
        this.itemService.currentItemEdit.ItemCategoryAssignments = value;
    }

    ngOnInit(): void {
        const itemid = this.route.parent.snapshot.params['id'];
        this.itemService.getCurrentItemEdit(itemid).subscribe(
            (item: Item) => {
                this.itemService.currentItemEdit = item;
                this.initialize(itemid);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    initialize(itemid: number) {
        if (this.itemService.currentItemEdit.ItemCategoryAssignments === null) {
            this.itemService.getItemCategoryAssignments(itemid).subscribe(
                (itemCategoryAssignments: ItemCategoryAssignment[]) => {
                    this.categoryAssignment = itemCategoryAssignments;
                    this.setPreviousSelectedCategories();
                },
                (error: any) => this.errorMessage = <any>error
            );
        } else {
            this.categoryAssignment = this.itemService.currentItemEdit.ItemCategoryAssignments;
            this.setPreviousSelectedCategories();
        }

        this.itemService.getCategories(2).subscribe(
            (categories: Category[]) => {
                this.categoryiesList.push(categories);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    refreshDataSource(resultCategories: Array<Category[]>) {
        this.dataSource = new MatTableDataSource<Category[]>(resultCategories);
    }

    setPreviousSelectedCategories() {
        if (this.categoryAssignment.length > 0) {
            this.categoryAssignment.forEach((value, index) => {
                this.itemService.getCategoryBreadCrumbs(value.ItemCategoryID).subscribe(
                    (categories: Category[]) => {
                        this.currentResult.push(categories);
                        this.refreshDataSource(this.currentResult);
                    }
                );
            });
        }
    }

    onChange(categoryValue, index) {
        if (categoryValue) {
            if (categoryValue === 0) {
                this.categoryiesList = this.categoryiesList.splice(0, index + 1);
                this.lastSelectedValue = this.categoryiesList[this.categoryiesList.length - 1][0].ParentItemCategoryID;
            } else {
                this.lastSelectedValue = categoryValue;
                this.itemService.getCategories(categoryValue).subscribe(
                    (categories: Category[]) => {
                        this.categoryiesList = this.categoryiesList.slice(0, index + 1);
                        if (categories.length > 0) {
                            this.categoryiesList.push(categories);
                        }
                    },
                    (error: any) => this.errorMessage = <any>error
                );
            }
        }
    }

    removeCategories(index: number) {
        const categoryValue = this.currentResult[index][this.currentResult[index].length - 1].ItemCategoryID;
        this.currentResult.splice(index, 1);
        this.categoryAssignment.splice(this.categoryAssignment.findIndex(x => x.ItemCategoryID === categoryValue), 1);

        this.refreshDataSource(this.currentResult);
    }

    onAddCategory() {
        if (this.lastSelectedValue !== 0) {
            this.itemService.getCategoryBreadCrumbs(this.lastSelectedValue).subscribe(
                (categories: Category[]) => {
                    this.currentResult.push(categories);
                    this.categoryiesList.splice(1);
                    this.categoryAssignment.push(new ItemCategoryAssignment(this.lastSelectedValue));
                    this.lastSelectedValue = 0;
                    // this.selectionCategoriesRef.nativeElement.value = 0;

                    this.refreshDataSource(this.currentResult);
                },
                (error: any) => this.errorMessage = <any>error
            );
        } else {
            console.log('nothing selected');
        }
    }

    clearFields() {
        this.formDirty = false;
        this.categoryiesList = this.categoryiesList.splice(0, 1);
        // this.selectionCategoriesRef.nativeElement.value = 0;
    }
}
