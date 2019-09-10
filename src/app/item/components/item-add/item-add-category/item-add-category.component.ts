import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { ItemInsert, ItemCategoryAssignment } from '../../../../shared/class/item';
import { Category } from '../../../../shared/class/category';

import { ItemService } from '../../../item.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'o-item-add-category',
  templateUrl: './item-add-category.component.html'
})

export class ItemAddCategoryComponent implements OnInit {
    @Input() userInfo: string;
    @Input() errorMessage: string;
    @Input() item: ItemInsert;
    @Input() categoriesList: Array<Category[]>;
    @Input() currentResult: Array<Category[]>;
    @Output() getCategories = new EventEmitter<number>();
    @Output() getCategoryBreadCrumbs = new EventEmitter<number>();
    


    lastSelectedValue: number = 0;

    displayedColumns = ['SelectedCategory', 'Remove'];
    dataSource: any = null;
    formDirty = false;

    @ViewChild('selectionCategories', { static: false }) selectionCategoriesRef: ElementRef;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.getCategories.emit(2);
        if (this.item && this.item.ItemCategoryAssignments.length > 0) {
            this.item.ItemCategoryAssignments.forEach((value, index) => {
                this.getCategoryBreadCrumbs.emit(value.ItemCategoryID);
                // this.itemService.getCategoryBreadCrumbs(value.ItemCategoryID).subscribe(
                //     (categories: Category[]) => {
                //         this.currentResult.push(categories);
                //         this.refreshDataSource(this.currentResult);
                //     }
                // );
            });
        }
    }

    refreshDataSource(resultCategories: Array<Category[]>) {
        this.dataSource = new MatTableDataSource<Category[]>(resultCategories);
    }

    onChange(categoryValue, index) {
        if (categoryValue) {
            if (categoryValue === 0) {
                this.categoriesList = this.categoriesList.splice(0, index + 1);
                this.lastSelectedValue = this.categoriesList[this.categoriesList.length - 1][0].ParentItemCategoryID;
            } else {
                this.lastSelectedValue = categoryValue;
                
                
                // this.getCategories.emit(categoryValue);
                // this.categoriesList = this.categoriesList.slice(0, index + 1);
                
                this.itemService.getCategories(categoryValue).subscribe(
                    (categories: Category[]) => {
                        this.categoriesList = this.categoriesList.slice(0, index + 1);
                        if (categories.length > 0) {
                            this.categoriesList.push(categories);
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

        //this.refreshDataSource(this.currentResult);
    }

    onAddCategory() {
        // if (this.lastSelectedValue !== 0) {
        //     this.getCategoryBreadCrumbs.emit(this.lastSelectedValue);
        //     this.categoriesList.splice(1);
        //     this.item.ItemCategoryAssignments.push(new ItemCategoryAssignment(this.lastSelectedValue));
        //     this.lastSelectedValue = 0;
        // }
        if (this.lastSelectedValue !== 0) {
            this.itemService.getCategoryBreadCrumbs(this.lastSelectedValue).subscribe(
                (categories: Category[]) => {
                    this.currentResult.push(categories);
                    this.categoriesList.splice(1);
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
        this.categoriesList = this.categoriesList.splice(0, 1);
        //this.selectionCategoriesRef.nativeElement.value = 0;
    }
}
