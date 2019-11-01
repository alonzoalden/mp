import { Component, OnInit, ViewChild, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Item, ItemCategoryAssignment, ItemInsert } from '../../../../../shared/class/item';
import { Category } from '../../../../../shared/class/category';
import { ItemService } from '../../../item.service';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'o-item-edit-category',
  templateUrl: './item-edit-category.component.html'
})

export class ItemEditCategoryComponent implements OnInit, OnChanges {
    @Input() userInfo: string;
    @Input() errorMessage: string;
    @Input() item: Item;
    @Input() categoryAssignments: ItemCategoryAssignment[];
    @Input() categoriesList: Array<Category[]>;
    @Input() currentCategoryBreadCrumbs: Array<Category[]>;
    @Output() getCategories = new EventEmitter<number>();
    @Output() getCategoryBreadCrumbs = new EventEmitter<number>();
    @Output() getItemCategoryAssignments = new EventEmitter<number>();
    lastSelectedValue: number = 0;
    displayedColumns = ['SelectedCategory', 'Remove'];
    dataSource: any = null;
    formDirty = false;
    canAdd = false;

    @ViewChild('selectionCategories', { static: false }) selectionCategoriesRef: NgSelectComponent;

    constructor(private route: ActivatedRoute,
                private itemService: ItemService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.categoriesList && changes.categoriesList.currentValue && changes.categoriesList.currentValue.length === 0) {
            this.getCategories.emit(2);
        }
        if (changes.currentCategoryBreadCrumbs && changes.currentCategoryBreadCrumbs.currentValue) {
            this.refreshDataSource(this.currentCategoryBreadCrumbs);
        }
        if (changes.categoryAssignments && changes.categoryAssignments.currentValue.length) {
            if (!this.currentCategoryBreadCrumbs.length) {
                this.setPreviousSelectedCategories();
            }
        }
    }

    ngOnInit(): void {
        const itemid = this.route.parent.snapshot.params['id'];
        this.getItemCategoryAssignments.emit(itemid);
    }

    refreshDataSource(resultCategories: Array<Category[]>) {
        this.dataSource = new MatTableDataSource<Category[]>(resultCategories);
    }

    setPreviousSelectedCategories() {
        if (this.categoryAssignments.length > 0) {
            this.categoryAssignments.forEach((value, index) => {
                this.itemService.getCategoryBreadCrumbs(value.ItemCategoryID).subscribe(
                    (categories: Category[]) => {
                        this.currentCategoryBreadCrumbs.push(categories);
                        this.refreshDataSource(this.currentCategoryBreadCrumbs);
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
        const categoryValue = this.currentCategoryBreadCrumbs[index][this.currentCategoryBreadCrumbs[index].length - 1].ItemCategoryID;
        this.currentCategoryBreadCrumbs.splice(index, 1);
        this.categoryAssignments.splice(this.categoryAssignments.findIndex(x => x.ItemCategoryID === categoryValue), 1);

        this.refreshDataSource(this.currentCategoryBreadCrumbs);
    }

    onAddCategory() {
        if (this.lastSelectedValue !== 0) {
            this.itemService.getCategoryBreadCrumbs(this.lastSelectedValue).subscribe(
                (categories: Category[]) => {
                    this.currentCategoryBreadCrumbs.push(categories);
                    this.categoriesList.splice(1);
                    this.item.ItemCategoryAssignments.push(new ItemCategoryAssignment(this.lastSelectedValue));
                    this.lastSelectedValue = 0;
                    this.selectionCategoriesRef.clearModel();
                    this.refreshDataSource(this.currentCategoryBreadCrumbs);
                },
                (error: any) => this.errorMessage = <any>error
            );
        } else {
            console.log('nothing selected');
        }
    }

    clearFields() {
        this.formDirty = false;
        this.lastSelectedValue = 0;
        this.categoriesList = this.categoriesList.splice(0, 1);
        this.selectionCategoriesRef.clearModel();
    }
}
