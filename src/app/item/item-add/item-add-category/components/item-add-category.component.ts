import { Component, ViewChild, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ItemInsert, ItemCategoryAssignment } from '../../../../shared/class/item';
import { Category } from '../../../../shared/class/category';
import { ItemService } from '../../../item.service';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'o-item-add-category',
  templateUrl: './item-add-category.component.html'
})

export class ItemAddCategoryComponent implements OnChanges {
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

    @ViewChild('selectionCategories', { static: false }) selectionCategoriesRef: NgSelectComponent;

    constructor(private itemService: ItemService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.categoriesList && changes.categoriesList.currentValue && changes.categoriesList.currentValue.length === 0) {
            this.getCategories.emit(2);
        }
        if (changes.currentResult && changes.currentResult.currentValue) {
            this.refreshDataSource(this.currentResult);
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
    }

    onAddCategory() {
        if (this.lastSelectedValue !== 0) {
            this.itemService.getCategoryBreadCrumbs(this.lastSelectedValue).subscribe(
                (categories: Category[]) => {
                    this.currentResult.push(categories);
                    this.item.ItemCategoryAssignments.push(new ItemCategoryAssignment(this.lastSelectedValue));
                    this.lastSelectedValue = 0;
                    this.categoriesList.splice(1);
                    this.selectionCategoriesRef.clearModel();
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
        this.selectionCategoriesRef.clearModel();
    }
}
