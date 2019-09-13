import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Item, ItemCategoryAssignment, ItemInsert } from '../../../../shared/class/item';
import { Category } from '../../../../shared/class/category';

import { ItemService } from '../../../item.service';

@Component({
  selector: 'o-item-edit-category',
  templateUrl: './item-edit-category.component.html'
})

export class ItemEditCategoryComponent implements OnInit {
    @Input() userInfo: string;
    @Input() errorMessage: string;
    @Input() item: Item;
    @Input() categoryAssignments: ItemCategoryAssignment[];
    @Input() categoriesList: Array<Category[]>;
    @Input() currentResult: Array<Category[]>;
    @Output() getCategories = new EventEmitter<number>();
    @Output() getCategoryBreadCrumbs = new EventEmitter<number>();
    @Output() getItemCategoryAssignments = new EventEmitter<number>();
    


    lastSelectedValue: number = 0;
    displayedColumns = ['SelectedCategory', 'Remove'];
    dataSource: any = null;
    formDirty = false;
    canAdd = false;

    @ViewChild('selectionCategories', { static: false }) selectionCategoriesRef: ElementRef;

    constructor(private route: ActivatedRoute,
                private itemService: ItemService) { }

     ngOnChanges(changes: SimpleChanges) {
        if (changes.categoriesList && changes.categoriesList.currentValue && changes.categoriesList.currentValue.length === 0) {
            this.getCategories.emit(2);
        }
        if (changes.currentResult && changes.currentResult.currentValue) {
            this.refreshDataSource(this.currentResult);
        }
        if (changes.categoryAssignments && changes.categoryAssignments.currentValue.length) {
            this.setPreviousSelectedCategories();
        }
        
    }

    ngOnInit(): void {
        const itemid = this.route.parent.snapshot.params['id'];
        this.getItemCategoryAssignments.emit(itemid);
        // this.itemService.getCurrentItemEdit(itemid).subscribe(
        //     (item: Item) => {
        //         this.itemService.currentItemEdit = item;
        //         this.initialize(itemid);
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );
    }

    initialize(itemid: number) {
        
        // if (this.itemService.currentItemEdit.ItemCategoryAssignments === null) {
        //     this.itemService.getItemCategoryAssignments(itemid).subscribe(
        //         (itemCategoryAssignments: ItemCategoryAssignment[]) => {
        //             this.categoryAssignments = itemCategoryAssignments;
        //             this.setPreviousSelectedCategories();
        //         },
        //         (error: any) => this.errorMessage = <any>error
        //     );
        // } else {
        //     this.categoryAssignments = this.itemService.currentItemEdit.ItemCategoryAssignments;
        //     this.setPreviousSelectedCategories();
        // }

        // this.itemService.getCategories(2).subscribe(
        //     (categories: Category[]) => {
        //         this.categoriesList.push(categories);
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );
    }

    refreshDataSource(resultCategories: Array<Category[]>) {
        this.dataSource = new MatTableDataSource<Category[]>(resultCategories);
    }

    setPreviousSelectedCategories() {
        if (this.categoryAssignments.length > 0) {
            this.categoryAssignments.forEach((value, index) => {
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
                this.categoriesList = this.categoriesList.splice(0, index + 1);
                this.lastSelectedValue = this.categoriesList[this.categoriesList.length - 1][0].ParentItemCategoryID;
            } else {
                this.lastSelectedValue = categoryValue;
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
        this.categoryAssignments.splice(this.categoryAssignments.findIndex(x => x.ItemCategoryID === categoryValue), 1);

        this.refreshDataSource(this.currentResult);
    }

    onAddCategory() {
        if (this.lastSelectedValue !== 0) {
            this.itemService.getCategoryBreadCrumbs(this.lastSelectedValue).subscribe(
                (categories: Category[]) => {
                    this.currentResult.push(categories);
                    this.categoriesList.splice(1);
                    this.categoryAssignments.push(new ItemCategoryAssignment(this.lastSelectedValue));
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
        this.categoriesList = this.categoriesList.splice(0, 1);
        // this.selectionCategoriesRef.nativeElement.value = 0;
    }
}
