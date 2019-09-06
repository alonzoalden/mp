import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ItemInsert, ItemList, ItemOptionInsert, ItemSelectionInsert } from '../../../../shared/class/item';
import { Category } from '../../../../shared/class/category';

import { ItemService } from '../../../item.service';
import { Input } from '@angular/core';
import { EventEmitter } from 'events';
import { Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SimpleChanges } from '@angular/core';
declare var $ :any;

@Component({
  selector: 'o-item-add-bundle',
  templateUrl: './item-add-bundle.component.html'
})

export class ItemAddBundleComponent implements OnInit, OnDestroy {
    //@Input() userInfo: string;
    @Input() errorMessage: string;
    @Input() item: ItemInsert;
    @Input() itemList: ItemList[];
    //@Input() selections: ItemSelectionInsert[] = [];
    @Input() selectedOption: ItemOptionInsert;
    //@Input() optionsMatTable: MatTableDataSource<ItemOptionInsert> = [];
    @Input() selectionsMatTable: MatTableDataSource<ItemSelectionInsert>;
    
    @Output() getItemList = new EventEmitter<void>();
    @Output() setSelectedBundleOption = new EventEmitter<void>();
    
    //subscription: Subscription;
    //errorMessage: string;
    //item: ItemInsert;
    //itemList: ItemList[];
    //selections: ItemSelectionInsert[] = [];
    //selectedOption: ItemOptionInsert;

    selectedOptionLabel: string;

    optionTypes: any = [
        {
            'value': 'radio',
            'label': 'Radio Button'
        },
        {
            'value': 'select',
            'label': 'Drop-down'
        }
    ];

    
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
    
    constructor(private itemService: ItemService) { }
    
    getOptionTypeLabel(value: string){
        return this.optionTypes.find(x => x.value == value).label;
    }
    get hasEmptySelection(): boolean {
        let result = false;
        this.item.ItemOptions.forEach(option => {
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
        this.item.ItemOptions.forEach((option, index) => {
            if (!option.Title && index != this.item.ItemOptions.length - 1) {
                result = true;
            }
        });
        return result;
    }
    ngOnChanges(changes: SimpleChanges) {
        console.log(changes)
        
        if(changes.item && changes.item.currentValue.ItemOptions.data.length === 0) {
            const _temp = new ItemOptionInsert(true, null, null, 'select', []);
            this.item.ItemOptions.push(_temp);
            this.currentOptionIndex = this.item.ItemOptions.length - 1;
        }
    }
    ngOnInit(): void {
        //this.item = this.itemService.currentItemInsert;

        this.getItemList.emit();
        // this.subscription = this.itemService.getSimpleItemList().subscribe(
        //     (itemlist: ItemList[]) => {
        //         this.itemList = itemlist;
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );

        // if(this.item.ItemOptions.length === 0) {
        //     const _temp = new ItemOptionInsert(true, null, null, 'select', []);
        //     this.item.ItemOptions.push(_temp);
        // }
        // this.currentOptionIndex = this.item.ItemOptions.length - 1;

        //this.refreshOptionDataSource(this.item.ItemOptions);
    }

    refreshOptionDataSource(options: ItemOptionInsert[]) {
        this.optionDataSource = new MatTableDataSource<ItemOptionInsert>(options);
    }

    refreshSelectionDataSource(selections: ItemSelectionInsert[]) {
        this.selectionDataSource = new MatTableDataSource<ItemSelectionInsert>(selections);
    }
   
    // addOption() {
    //     if (this.hasEmptyTitle) {
    //         alert ('You must have all "Title" entered for all options');
    //     } else {
    //         const _temp = new ItemOptionInsert(true, this.item.ItemOptions.length + 1, null, 'radio', []);
    //         this.item.ItemOptions.push(_temp);
    //         this.refreshOptionDataSource(this.item.ItemOptions);
    //     }
    // }

    addOption(itemOption: ItemOptionInsert) {
        if (this.isOptionRequirementValid(itemOption)) {      
            this.pendingOptionAdd = true;
            itemOption.Position = this.item.ItemOptions.length;
            const _temp = new ItemOptionInsert(true, null, null, 'select', []);
            this.item.ItemOptions.push(_temp);
            this.refreshOptionDataSource(this.item.ItemOptions);
        }
        else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Title is required" });
        }
    }

    isOptionRequirementValid(itemOption: ItemOptionInsert): boolean {
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
    //         const _temp = new ItemSelectionInsert(0, this.selections.length + 1, false, 0, 0, false);
    //         if (this.selections.length === 0) {
    //             _temp.IsDefault = true;
    //         }
    //         this.selections.push(_temp);
    //         this.refreshSelectionDataSource(this.selections);
    //     }
    // }

    addSelection(itemSelection: ItemSelectionInsert) {
        if (this.isSelectionRequirementValid(itemSelection)) {      
            this.pendingSelectionAdd = true;
            itemSelection.Position = this.selectedOption.ItemSelections.length;
            const _temp = new ItemSelectionInsert(null, null, false, 0, 1, false);
            if (this.selectedOption.ItemSelections.length === 0) {
                _temp.IsDefault = true;
            }
            this.selectedOption.ItemSelections.push(_temp);
            this.refreshSelectionDataSource(this.selectedOption.ItemSelections);
        }
        else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Item is required" });
        }

        // if (this.hasEmptySelection) {
        //     alert ('You must have all "Item" selected for all selections');
        // } else {
        //     const _temp = new ItemSelectionInsert(0, this.selections.length + 1, false, 0, 0, false);
        //     if (this.selections.length === 0) {
        //         _temp.IsDefault = true;
        //     }
        //     this.selections.push(_temp);
        //     this.refreshSelectionDataSource(this.selections);
        // }
    }

    isSelectionRequirementValid(itemSelection: ItemSelectionInsert): boolean {
        if (itemSelection
            && (itemSelection.ItemID !== 0 || String(itemSelection.ItemID) !== '0') ) {
            return true;
        } 
        else {
            return false;
        }
    }

    moveDownOption(option: ItemOptionInsert) {
        this.move(this.item.ItemOptions, option, 1);
        this.item.ItemOptions.forEach((value, index) => value.Position = index + 1);
        this.refreshOptionDataSource(this.item.ItemOptions);
    }

    moveUpOption(option: ItemOptionInsert) {
        this.move(this.item.ItemOptions, option, -1);
        this.item.ItemOptions.forEach((value, index) => value.Position = index + 1);
        this.refreshOptionDataSource(this.item.ItemOptions);
    }

    removeOption(index: number) {
        this.item.ItemOptions.splice(index, 1);
        this.item.ItemOptions.forEach((value, i) => value.Position = i + 1);
        this.selectedOption = null;
        this.refreshOptionDataSource(this.item.ItemOptions);
    }

    onOptionTypeChange(index: number) {
        this.selectedOption.ItemSelections.forEach((value) => {
            value.IsDefault = false;
            value.CanChangeQty = false;     
        });
        this.refreshSelectionDataSource(this.selectedOption.ItemSelections);
    }

    onSelectOption(option: ItemOptionInsert, index: number) {
        this.currentOptionIndex = index;

        this.selectedOption = option;
        //this.selections =  option.ItemSelections;
        this.selectedOptionLabel = this.optionTypes[this.optionTypes.findIndex(type => type.value === option.Type)].label;                
          
        if(this.selectedOption.ItemSelections.length === 0 && this.currentOptionIndex !== this.item.ItemOptions.length - 1) {
            const _temp = new ItemSelectionInsert(null, null, false, 0, 1, false);
            if (this.selectedOption.ItemSelections.length === 0) {
                _temp.IsDefault = false;
            }
            this.selectedOption.ItemSelections.push(_temp);
        }

        this.currentSelectionIndex = this.selectedOption.ItemSelections.length -1;
        //this.resetList();

        this.refreshSelectionDataSource(this.selectedOption.ItemSelections);        
    }

    onSelectSelection(index: number) {
        this.currentSelectionIndex = index;
        //this.resetList();
    }
    
    // resetList()
    // {
    //     const foundIndex = this.itemList.findIndex(i => (i.ItemID === 0 || String(i.ItemID) === '0') );
        
    //     console.log(foundIndex);

    //     if(this.selections.length - 1 == this.currentSelectionIndex) {
    //         if (foundIndex > -1) {
    //             this.itemList.splice(foundIndex, 1);
    //         }
    //     }
    //     else {
    //         if (foundIndex > -1) {
    //             const _tempList = new ItemList(0, '', 0, '', '', '');
    //             this.itemList.splice(0,0,_tempList);
    //         }
    //     }
    // }

    moveDownSelection(selection: ItemSelectionInsert) {
        this.move(this.selectedOption.ItemSelections, selection, 1);
        this.selectedOption.ItemSelections.forEach((value, index) => value.Position = index + 1);
        this.refreshSelectionDataSource(this.selectedOption.ItemSelections);
    }

    moveUpSelection(selection: ItemSelectionInsert) {
        this.move(this.selectedOption.ItemSelections, selection, -1);
        this.selectedOption.ItemSelections.forEach((value, index) => value.Position = index + 1);
        this.refreshSelectionDataSource(this.selectedOption.ItemSelections);
    }

    removeSelection(index: number) {
        this.selectedOption.ItemSelections.splice(index, 1);
        this.selectedOption.ItemSelections.forEach((value, i) => value.Position = i + 1);
        this.refreshSelectionDataSource(this.selectedOption.ItemSelections);
    }

    isDefaultClick(selection: ItemSelectionInsert, index: number) {
        if(this.selectedOption.Type == "radio" || this.selectedOption.Type == "select")
        {
            this.selectedOption.ItemSelections.forEach((value, i) => {
                if(i != index) {
                    value.IsDefault = false;
                }
            });
            this.refreshSelectionDataSource(this.selectedOption.ItemSelections);
        }        
    }

    getItemName(id: number) {
        return this.itemList[this.itemList.findIndex(item => item.ItemID === id)].Description;
    }

    move(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indexes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    ngOnDestroy() {
        //this.subscription.unsubscribe();
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
