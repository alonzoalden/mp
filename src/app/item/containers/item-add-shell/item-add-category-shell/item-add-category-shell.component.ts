import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { ItemInsert, ItemCategoryAssignment } from '../../../../shared/class/item';
import { Category } from '../../../../shared/class/category';

import { ItemService } from '../../../item.service';

@Component({
  templateUrl: './item-add-category-shell.component.html'
})

export class ItemAddCategoryShellComponent implements OnInit {
    errorMessage: string;
    item: ItemInsert;
    categoryiesList: Array<Category[]> = [];
    currentResult: Array<Category[]> = [];
    lastSelectedValue: number = 0;

    displayedColumns = ['SelectedCategory', 'Remove'];
    dataSource: any = null;
    formDirty = false;

    @ViewChild('selectionCategories', { static: false }) selectionCategoriesRef: ElementRef;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.item = this.itemService.currentItemInsert;
        this.itemService.getCategories(2).subscribe(
            (categories: Category[]) => {
                this.categoryiesList.push(categories);
            },
            (error: any) => this.errorMessage = <any>error
        );
        if (this.item.ItemCategoryAssignments.length > 0) {
            this.item.ItemCategoryAssignments.forEach((value, index) => {
                this.itemService.getCategoryBreadCrumbs(value.ItemCategoryID).subscribe(
                    (categories: Category[]) => {
                        this.currentResult.push(categories);
                        this.refreshDataSource(this.currentResult);
                    }
                );
            });
        }
    }

    refreshDataSource(resultCategories: Array<Category[]>) {
        this.dataSource = new MatTableDataSource<Category[]>(resultCategories);
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
        this.item.ItemCategoryAssignments.splice(this.item.ItemCategoryAssignments.findIndex(x => x.ItemCategoryID === categoryValue), 1);

        this.refreshDataSource(this.currentResult);
    }

    onAddCategory() {
        if (this.lastSelectedValue !== 0) {
            this.itemService.getCategoryBreadCrumbs(this.lastSelectedValue).subscribe(
                (categories: Category[]) => {
                    this.currentResult.push(categories);
                    this.categoryiesList.splice(1);
                    this.item.ItemCategoryAssignments.push(new ItemCategoryAssignment(this.lastSelectedValue));
                    this.lastSelectedValue = 0;
                    //this.selectionCategoriesRef.nativeElement.value = 0;
                    this.refreshDataSource(this.currentResult);
                },
                (error: any) => this.errorMessage = <any>error
            );
        } else {
            console.log('nothing selected');
        }
    }
    clearFields() {
        this.lastSelectedValue = 0;
        this.formDirty = false;
        this.categoryiesList = this.categoryiesList.splice(0, 1);
        //this.selectionCategoriesRef.nativeElement.value = 0;
    }
}
