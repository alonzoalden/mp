import { Component, OnInit, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Item, ItemList, ItemOption, ItemSelection } from '../../../../../shared/class/item';
import { ItemService } from '../../../item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'o-item-edit-bundle',
  templateUrl: './item-edit-bundle.component.html'
})

export class ItemEditBundleComponent implements OnInit {
    @Input() errorMessage: string;
    @Input() item: Item;
    @Input() itemList: ItemList[];
    @Input() selectedOption: ItemOption;
    @Input() selectionsMatTable: MatTableDataSource<ItemSelection>;
    @Input() itemBundleOptionsMatTable: MatTableDataSource<ItemOption>;
    @Input() itemBundleOptionSelectionsMatTable: MatTableDataSource<ItemSelection>;
    @Output() getItemList = new EventEmitter<void>();
    @Output() setSelectedBundleOption = new EventEmitter<number>();
    selectedOptionLabel: string;

    optionTypes: any = [
        {
            'value': 'radio',
            'label': ' Radio Button'
        },
        {
            'value': 'select',
            'label': ' Drop-down'
        }
    ];

    optionDisplayedColumns = ['Add', 'Down', 'Position', 'Up', 'Title', 'Type', 'Required', 'Remove'];
    optionDataSource: any = null;
    selectionDisplayedColumns = ['Add', 'Down', 'Position', 'Up', 'Item', 'Quantity', 'IsDefault', 'Remove'];
    selectionDataSource: any = null;
    pendingOptionAdd: boolean;
    currentOptionIndex: number = 0;
    formBundleDirty = false;
    pendingSelectionAdd: boolean;
    currentSelectionIndex: number;
    formSelectionDirty = false;

    getOptionTypeLabel(value: string) {
        return this.optionTypes.find(x => x.value === value).label;
    }
    constructor(
            private route: ActivatedRoute,
            private itemService: ItemService) { }


    get hasEmptySelection(): boolean {
        let result = false;
        this.item.ItemOptions.forEach(option => {
            option.ItemSelections.forEach((selection, index) => {
                if (
                    (selection.ItemID === 0 || String(selection.ItemID) === '0')
                    && index !== option.ItemSelections.length - 1) {
                    result = true;
                }
            });
        });
        return result;
    }

    get hasEmptyTitle(): boolean {
        let result = false;
        this.item.ItemOptions.forEach((option, index) => {
            if (!option.Title && index !== this.item.ItemOptions.length - 1) {
                result = true;
            }
        });
        return result;
    }

    ngOnInit(): void {
        this.initialize();
        this.currentOptionIndex = this.item.ItemOptions.length - 1;
    }

    refreshOptionDataSource(options: ItemOption[]) {
        this.optionDataSource = new MatTableDataSource<ItemOption>(options);
    }

    refreshSelectionDataSource(selections: ItemSelection[]) {
        this.itemBundleOptionSelectionsMatTable = new MatTableDataSource<ItemSelection>(selections);
    }

    initialize() {
        if (this.item.ItemOptions === null) {
            this.itemService.getItemOptions(this.item.ItemID).subscribe(
                (itemOption: ItemOption[]) => {
                    this.item.ItemOptions = itemOption;
                    this.item.ItemOptions.forEach(value => {
                        const _temp = new ItemSelection(null, null, 0, null, null, null, this.selectedOption.ItemSelections.length + 1, false, 0, 0, false, null, null, true);
                        if (this.selectedOption.ItemSelections.length === 0) {
                            _temp.IsDefault = true;
                        }
                        value.ItemSelections.push(_temp);
                    });
                    this.addOptionPendingLine();
                    this.refreshOptionDataSource(this.item.ItemOptions);
                },
                (error: any) => this.errorMessage = <any>error
            );
        } else {
            this.removeOptionPendingLine();
            this.addOptionPendingLine();
            this.refreshOptionDataSource(this.item.ItemOptions);
        }
        this.getItemList.emit();

    }

    addOptionPendingLine() {
        const _temp = new ItemOption(null, this.item.ItemID, true, this.item.ItemOptions.length + 1, null, 'select', null, null, [], true);
        this.item.ItemOptions.push(_temp);
    }

    removeOptionPendingLine() {
        const foundIndex = this.item.ItemOptions.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.item.ItemOptions.splice(foundIndex, 1);
        }
    }


    addOption(itemOption: ItemOption) {
        if (this.isOptionRequirementValid(itemOption)) {
            this.pendingOptionAdd = true;
            itemOption.Position = this.item.ItemOptions.length;
            itemOption.pendingAdd = false;
            this.addOptionPendingLine();
            this.refreshOptionDataSource(this.item.ItemOptions);
        } else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Title is required' });
        }
    }

    isOptionRequirementValid(itemOption: ItemOption): boolean {
        if (itemOption
            && itemOption.Title) {
            return true;
        } else {
            return false;
        }
    }

    addSelection(itemSelection: ItemSelection) {
        if (this.isSelectionRequirementValid(itemSelection)) {
            this.pendingSelectionAdd = true;
            itemSelection.Position = this.selectedOption.ItemSelections.length;
            itemSelection.pendingAdd = false;
            this.addSelectionPendingLine();
            this.currentSelectionIndex = this.selectedOption.ItemSelections.length - 1;
            this.setSelectedBundleOption.emit(this.currentOptionIndex);
        } else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Item is required' });
        }
    }

    isSelectionRequirementValid(itemSelection: ItemSelection): boolean {
        if (itemSelection
            && (itemSelection.ItemID !== 0 || String(itemSelection.ItemID) !== '0') ) {
            return true;
        } else {
            return false;
        }
    }


    moveDownOption(option: ItemOption) {
        this.move(this.item.ItemOptions, option, 1);
        this.item.ItemOptions.forEach((value, i) => value.Position = i + 1);
        this.refreshOptionDataSource(this.item.ItemOptions);
    }

    moveUpOption(option: ItemOption) {
        this.move(this.item.ItemOptions, option, -1);
        this.item.ItemOptions.forEach((value, i) => value.Position = i + 1);
        this.refreshOptionDataSource(this.item.ItemOptions);
    }

    removeOption(index: number) {
        this.item.ItemOptions.splice(index, 1);
        this.item.ItemOptions.forEach((value, i) => value.Position = i + 1);
        this.selectedOption = null;
        this.refreshOptionDataSource(this.item.ItemOptions);
    }

    onOptionTypeChange() {
        this.selectedOption.ItemSelections.forEach((value) => {
            value.IsDefault = false;
            value.CanChangeQty = false;
        });
        this.refreshSelectionDataSource(this.selectedOption.ItemSelections);
    }

    onSelectOption(option: ItemOption, index: number) {
        this.currentOptionIndex = index;

        this.selectedOption = option;
        this.selectedOption.ItemSelections =  option.ItemSelections;
        this.selectedOptionLabel = this.optionTypes[this.optionTypes.findIndex(type => type.value === option.Type)].label;

        if (this.selectedOption.ItemSelections.length === 0 && this.currentOptionIndex !== this.item.ItemOptions.length - 1) {
            this.addSelectionPendingLine();
        }

        this.removeSelectionPendingLine();
        this.addSelectionPendingLine();

        this.currentSelectionIndex = this.selectedOption.ItemSelections.length - 1;
        //this.refreshSelectionDataSource(this.selectedOption.ItemSelections);
        this.setSelectedBundleOption.emit(this.currentOptionIndex);
    }

    addSelectionPendingLine() {
        const _temp = new ItemSelection(null, this.selectedOption.ItemOptionID, null, this.item.Name, this.item.VendorSKU, this.item.TPIN, this.selectedOption.ItemSelections.length + 1, false, 0, 0, false, null, null, true);
        if (this.selectedOption.ItemSelections.length === 0) {
            _temp.IsDefault = true;
        }
        this.selectedOption.ItemSelections.push(_temp);
        this.setSelectedBundleOption.emit(this.currentOptionIndex);
    }
    removeSelectionPendingLine() {
        const foundIndex = this.selectedOption.ItemSelections.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.selectedOption.ItemSelections.splice(foundIndex, 1);
        }
    }

    onSelectSelection(index: number) {
        this.currentSelectionIndex = index;
    }

    moveDownSelection(selection: ItemSelection) {
        this.move(this.selectedOption.ItemSelections, selection, 1);
        this.selectedOption.ItemSelections.forEach((value, i) => value.Position = i + 1);
        //this.refreshSelectionDataSource(this.selectedOption.ItemSelections);
        this.setSelectedBundleOption.emit(this.currentOptionIndex);
    }

    moveUpSelection(selection: ItemSelection) {
        this.move(this.selectedOption.ItemSelections, selection, -1);
        this.selectedOption.ItemSelections.forEach((value, i) => value.Position = i + 1);
        //this.refreshSelectionDataSource(this.selectedOption.ItemSelections);
        this.setSelectedBundleOption.emit(this.currentOptionIndex);
    }

    removeSelection(index: number) {
        this.selectedOption.ItemSelections.splice(index, 1);
        this.selectedOption.ItemSelections.forEach((value, i) => value.Position = i + 1);
        //this.refreshSelectionDataSource(this.selectedOption.ItemSelections);
        this.setSelectedBundleOption.emit(this.currentOptionIndex);
    }

    isDefaultClick(selection: ItemSelection, index: number) {
        if (this.selectedOption.Type === 'radio' || this.selectedOption.Type === 'select') {
            this.selectedOption.ItemSelections.forEach((value, i) => {
                if (i !== index) {
                    value.IsDefault = false;
                }
            });
            //this.refreshSelectionDataSource(this.selectedOption.ItemSelections);
            this.setSelectedBundleOption.emit(this.currentOptionIndex);
        }
    }

    getItemName(id: number) {
        const item = this.itemList[this.itemList.findIndex(item => item.ItemID === id)];
        if (item) {
            return item.Description;
        } else {
            return '';
        }
    }

    move(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a, b) => a - b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
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
