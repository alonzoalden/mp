import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Item, ItemList, ItemOption, ItemSelection } from '../../shared/class/item';

import { Category } from '../../shared/class/category';

import { ItemService } from '../item.service';

@Component({
  selector: 'o-item-edit-bundle',
  templateUrl: './item-edit-bundle.component.html'
})

export class ItemEditBundleComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    errorMessage: string;
    itemid: number;
    itemList: ItemList[];
    _options: ItemOption[] = [];
    selections: ItemSelection[] = [];
    selectedOption: ItemOption;
    selectedOptionLabel: string;

    optionTypes: any = [
        // {
        //     'value': 'multi',
        //     'label': ' Multiple Select'
        // },
        {
            'value': 'radio',
            'label': ' Radio Button'
        },
        {
            'value': 'select',
            'label': ' Drop-down'
        }
    ];

    getOptionTypeLabel(value: string){
        return this.optionTypes.find(x => x.value == value).label;
    }

    optionDisplayedColumns = ['Add', 'Down', 'Position', 'Up', 'Title', 'Type', 'Required', 'Remove'];
    optionDataSource: any = null;
    selectionDisplayedColumns = ['Add', 'Down', 'Position', 'Up', 'Item', 'Quantity', 'IsDefault', 'Remove'];
    selectionDataSource: any = null;

    pendingOptionAdd: boolean;
    currentOptionIndex: number;

    formBundleDirty = false;

    pendingSelectionAdd: boolean;
    currentSelectionIndex: number;

    formSelectionDirty = false;

    constructor(
            private route: ActivatedRoute,
            private itemService: ItemService) { }

    get options(): ItemOption[] {
        return this._options;
    }
    set options(value: ItemOption[]) {
        this._options = value;
        this.itemService.currentItemEdit.ItemOptions = value;
    }

    get hasEmptySelection(): boolean {
        let result = false;
        this.options.forEach(option => {
            option.ItemSelections.forEach((selection, index) => {
                if (
                    (selection.ItemID === 0 || String(selection.ItemID) === '0') 
                    && index != option.ItemSelections.length - 1) {
                    result = true;
                }
            });
        });
        return result;
    }

    get hasEmptyTitle(): boolean {
        let result = false;
        this.options.forEach((option, index) => {
            if (!option.Title && index != this.options.length - 1) {
                result = true;
            }
        });
        return result;
    }

    ngOnInit(): void {
        this.itemid = this.route.parent.snapshot.params['id'];
        this.itemService.getCurrentItemEdit(this.itemid).subscribe(
            (item: Item) => {
                this.itemService.currentItemEdit = item;
                this.initialize();
            },
            (error: any) => this.errorMessage = <any>error
        );
    }
    
    refreshOptionDataSource(options: ItemOption[]) {
        this.optionDataSource = new MatTableDataSource<ItemOption>(options);
    }

    refreshSelectionDataSource(selections: ItemSelection[]) {
        this.selectionDataSource = new MatTableDataSource<ItemSelection>(selections);
    }

    initialize() {
        if (this.itemService.currentItemEdit.ItemOptions === null) {
            this.itemService.getItemOptions(this.itemid).subscribe(
                (itemOption: ItemOption[]) => {
                    this.options = itemOption;
                    this.options.forEach(value => {
                        const _temp = new ItemSelection(null, null, 0, null, null, null, this.selections.length + 1, false, 0, 0, false, null, null, true);
                        if (this.selections.length === 0) {
                            _temp.IsDefault = true;
                        }
                        value.ItemSelections.push(_temp);  
                    });                    
                    this.addOptionPendingLine();
                    this.refreshOptionDataSource(this.options);
                },
                (error: any) => this.errorMessage = <any>error
            );
        } else {
            this.options = this.itemService.currentItemEdit.ItemOptions;
            
            // this.options.forEach(value => {
            //     const _temp = new ItemSelection(null, null, 0, null, null, null, this.selections.length + 1, false, 0, 0, false, null, null, true);
            //     if (this.selections.length === 0) {
            //         _temp.IsDefault = true;
            //     }
            //     value.ItemSelections.push(_temp);  
            // });                    
            //this.addOptionPendingLine();

            this.removeOptionPendingLine();
            this.addOptionPendingLine();
            this.refreshOptionDataSource(this.options);
        }
        this.subscription = this.itemService.getSimpleItemList().subscribe(
            (itemlist: ItemList[]) => {
                this.itemList = itemlist;
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    addOptionPendingLine() {
        const _temp = new ItemOption(null, this.itemid, true, this.options.length + 1, null, 'select', null, null, [], true);
        this.options.push(_temp);   
    }

    removeOptionPendingLine() {
        const foundIndex = this.options.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.options.splice(foundIndex, 1);
        }
    }


    addOption(itemOption: ItemOption) {
        if (this.isOptionRequirementValid(itemOption)) {      
            this.pendingOptionAdd = true;
            itemOption.Position = this.options.length;
            itemOption.pendingAdd = false;
            this.addOptionPendingLine(); 
            this.refreshOptionDataSource(this.options);
        }
        else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Title is required" });
        }
    }

    isOptionRequirementValid(itemOption: ItemOption): boolean {
        if (itemOption
            && itemOption.Title) {
            return true;
        } 
        else {
            return false;
        }
    }

    // addSelection() {
    //     if (this.hasEmptySelection) {
    //         alert ('You must have all "Item" selected for all selections');
    //     } else {
    //         const _temp = new ItemSelection(null, null, 0, null, null, null, this.selections.length + 1, false, 0, 0, false, null, null, true);
    //         if (this.selections.length === 0) {
    //             _temp.IsDefault = true;
    //         }
    //         this.selections.push(_temp);
    //         this.refreshSelectionDataSource(this.selections);
    //     }
    // }

    addSelection(itemSelection: ItemSelection) {
        if (this.isSelectionRequirementValid(itemSelection)) {      
            this.pendingSelectionAdd = true;
            itemSelection.Position = this.selections.length;
            itemSelection.pendingAdd = false;
            this.addSelectionPendingLine();
            this.refreshSelectionDataSource(this.selections);
        }
        else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Item is required" });
        }
    }

    isSelectionRequirementValid(itemSelection: ItemSelection): boolean {
        if (itemSelection
            && (itemSelection.ItemID !== 0 || String(itemSelection.ItemID) !== '0') ) {
            return true;
        } 
        else {
            return false;
        }
    }


    moveDownOption(option: ItemOption) {
        this.move(this.options, option, 1);
        this.options.forEach((value, i) => value.Position = i + 1);
        this.refreshOptionDataSource(this.options);
    }

    moveUpOption(option: ItemOption) {
        this.move(this.options, option, -1);
        this.options.forEach((value, i) => value.Position = i + 1);
        this.refreshOptionDataSource(this.options);
    }

    removeOption(index: number) {
        this.options.splice(index, 1);
        this.options.forEach((value, i) => value.Position = i + 1);
        this.selectedOption = null;
        this.refreshOptionDataSource(this.options);
    }

    onOptionTypeChange() {
        this.selections.forEach((value) => {
            value.IsDefault = false;          
            value.CanChangeQty = false;  
        });
        this.refreshSelectionDataSource(this.selections);
    }

    onSelectOption(option: ItemOption, index: number) {
        this.currentOptionIndex = index;

        this.selectedOption = option;
        this.selections =  option.ItemSelections;
        this.selectedOptionLabel = this.optionTypes[this.optionTypes.findIndex(type => type.value === option.Type)].label;

        if(this.selections.length === 0 && this.currentOptionIndex !== this.options.length - 1) {
            this.addSelectionPendingLine();
        }        

        this.removeSelectionPendingLine();
        this.addSelectionPendingLine();

        this.currentSelectionIndex = this.selections.length -1;

        this.refreshSelectionDataSource(this.selections);
    }

    addSelectionPendingLine() {
        const _temp = new ItemSelection(null, null, 0, null, null, null, this.selections.length + 1, false, 0, 0, false, null, null, true);
        if (this.selections.length === 0) {
            _temp.IsDefault = true;
        }
        this.selections.push(_temp);   
    }
    removeSelectionPendingLine() {
        const foundIndex = this.selections.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.selections.splice(foundIndex, 1);
        }
    }

    onSelectSelection(index: number) {
        this.currentSelectionIndex = index;
    }

    moveDownSelection(selection: ItemSelection) {
        this.move(this.selections, selection, 1);
        this.selections.forEach((value, i) => value.Position = i + 1);
        this.refreshSelectionDataSource(this.selections);
    }

    moveUpSelection(selection: ItemSelection) {
        this.move(this.selections, selection, -1);
        this.selections.forEach((value, i) => value.Position = i + 1);
        this.refreshSelectionDataSource(this.selections);
    }

    removeSelection(index: number) {
        this.selections.splice(index, 1);
        this.selections.forEach((value, i) => value.Position = i + 1);
        this.refreshSelectionDataSource(this.selections);
    }

    isDefaultClick(selection: ItemSelection, index: number) {
        if(this.selectedOption.Type == "radio" || this.selectedOption.Type == "select")
        {
            this.selections.forEach((value, i) => {
                if(i != index) {
                    value.IsDefault = false;
                }
            });
            this.refreshSelectionDataSource(this.selections);
        }        
    }

    getItemName(id: number) {
        const item = this.itemList[this.itemList.findIndex(item => item.ItemID === id)];
        if(item) {
            return item.Description;
        }
        else {
            return "";
        }

        //return this.itemList[this.itemList.findIndex(item => item.ItemID === id)].Description;
    }

    move(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    clearBundleFields(form) {
        this.formBundleDirty = false;
        form.isRequired = false;
        form.Title = '';
        form.Type = 'select';
    }

    clearSelectionFields(form) {        
        this.formSelectionDirty = false;
        form.CanChangeQty = false;
        form.ItemID = null;
        form.PriceValue = null;
        form.Qty = null;
    }
}
