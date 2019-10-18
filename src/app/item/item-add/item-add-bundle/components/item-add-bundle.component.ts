import { Component, OnInit, EventEmitter, OnChanges, Input, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ItemInsert, ItemList, ItemOptionInsert, ItemSelectionInsert } from '../../../../shared/class/item';
import { ItemService } from '../../../item.service';

@Component({
  selector: 'o-item-add-bundle',
  templateUrl: './item-add-bundle.component.html'
})

export class ItemAddBundleComponent implements OnInit, OnChanges {
    @Input() errorMessage: string;
    @Input() item: ItemInsert;
    @Input() itemList: ItemList[];
    @Input() selectedOption: ItemOptionInsert;
    @Input() selectionsMatTable: MatTableDataSource<ItemSelectionInsert>;
    @Input() itemBundleOptionsMatTable: MatTableDataSource<ItemOptionInsert>;
    @Input() itemBundleOptionSelectionsMatTable: MatTableDataSource<ItemSelectionInsert>;
    @Output() getItemList = new EventEmitter<void>();
    @Output() setSelectedBundleOption = new EventEmitter<number>();

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
    selectionDisplayedColumns = ['Add', 'Down', 'Position', 'Up', 'Item', 'Quantity', 'IsDefault', 'Remove'];
    pendingOptionAdd: boolean;
    currentOptionIndex: number;
    formBundleDirty = false;
    pendingSelectionAdd: boolean;
    currentSelectionIndex: number;
    formSelectionDirty = false;

    constructor(private itemService: ItemService) { }

    getOptionTypeLabel(value: string) {
        return this.optionTypes.find(x => x.value === value).label;

    }
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
    ngOnChanges(changes: SimpleChanges) {
        if (changes.item && changes.item.currentValue && changes.item.currentValue.ItemOptions.length === 0) {
            const _temp = new ItemOptionInsert(true, null, null, 'select', []);
            this.item.ItemOptions.push(_temp);

        }
        if (changes.selectedOption && changes.selectedOption.currentValue && changes.selectedOption.currentValue.ItemSelections.length === 0) {
            const _temp = new ItemSelectionInsert(null, null, false, 0, 1, false);
            if (this.selectedOption.ItemSelections.length === 0) {
                _temp.IsDefault = true;
            }
            this.selectedOption.ItemSelections.push(_temp);
        }
    }
    ngOnInit(): void {
        this.getItemList.emit();
        this.currentOptionIndex = this.item.ItemOptions.length - 1;
    }

    addOption(itemOption: ItemOptionInsert) {
        if (this.isOptionRequirementValid(itemOption)) {
            this.pendingOptionAdd = true;
            itemOption.Position = this.item.ItemOptions.length;
            const _temp = new ItemOptionInsert(true, null, null, 'select', []);
            this.item.ItemOptions.push(_temp);
        } else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Title is required' });
        }
    }

    isOptionRequirementValid(itemOption: ItemOptionInsert): boolean {
        if (itemOption
            && itemOption.Title) {
            return true;
        } else {
            return false;
        }
    }

    addSelection(itemSelection: ItemSelectionInsert) {
        if (this.isSelectionRequirementValid(itemSelection)) {
            this.pendingSelectionAdd = true;
            itemSelection.Position = this.selectedOption.ItemSelections.length;
            const _temp = new ItemSelectionInsert(null, null, false, 0, 1, false);
            if (this.selectedOption.ItemSelections.length === 0) {
                _temp.IsDefault = true;
            }
            this.selectedOption.ItemSelections.push(_temp);
            this.setSelectedBundleOption.emit(this.currentOptionIndex);
        } else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Item is required' });
        }
    }

    isSelectionRequirementValid(itemSelection: ItemSelectionInsert): boolean {
        if (itemSelection
            && (itemSelection.ItemID !== 0 || String(itemSelection.ItemID) !== '0') ) {
            return true;
        } else {
            return false;
        }
    }

    moveDownOption(option: ItemOptionInsert) {
        this.move(this.item.ItemOptions, option, 1);
        this.item.ItemOptions.forEach((value, index) => value.Position = index + 1);
    }

    moveUpOption(option: ItemOptionInsert) {
        this.move(this.item.ItemOptions, option, -1);
        this.item.ItemOptions.forEach((value, index) => value.Position = index + 1);
    }

    removeOption(index: number) {
        this.item.ItemOptions.splice(index, 1);
        this.item.ItemOptions.forEach((value, i) => value.Position = i + 1);
        this.selectedOption = null;
    }

    onOptionTypeChange(index: number) {
        this.selectedOption.ItemSelections.forEach((value) => {
            value.IsDefault = false;
            value.CanChangeQty = false;
        });
    }

    onSelectOption(option: ItemOptionInsert, index: number) {
        this.currentOptionIndex = index;

        this.setSelectedBundleOption.emit(index);
        this.selectedOptionLabel = this.optionTypes[this.optionTypes.findIndex(type => type.value === option.Type)].label;

        if (option.ItemSelections.length === 0 && this.currentOptionIndex !== this.item.ItemOptions.length - 1) {
            const _temp = new ItemSelectionInsert(null, null, false, 0, 1, false);
            if (this.selectedOption.ItemSelections.length === 0) {
                _temp.IsDefault = true;
            }
            option.ItemSelections.push(_temp);
        }
        this.currentSelectionIndex = option.ItemSelections.length - 1;
    }

    onSelectSelection(index: number) {
        this.currentSelectionIndex = index;
    }

    moveDownSelection(selection: ItemSelectionInsert) {
        this.move(this.selectedOption.ItemSelections, selection, 1);
        this.selectedOption.ItemSelections.forEach((value, index) => value.Position = index + 1);
        this.setSelectedBundleOption.emit(this.currentOptionIndex);
    }

    moveUpSelection(selection: ItemSelectionInsert) {
        this.move(this.selectedOption.ItemSelections, selection, -1);
        this.selectedOption.ItemSelections.forEach((value, index) => value.Position = index + 1);
        this.setSelectedBundleOption.emit(this.currentOptionIndex);
    }

    removeSelection(index: number) {
        this.selectedOption.ItemSelections.splice(index, 1);
        this.selectedOption.ItemSelections.forEach((value, i) => value.Position = i + 1);
        this.setSelectedBundleOption.emit(this.currentOptionIndex);
    }

    isDefaultClick(selection: ItemSelectionInsert, index: number) {
        if (this.selectedOption.Type === 'radio' || this.selectedOption.Type === 'select') {
            this.selectedOption.ItemSelections.forEach((value, i) => {
                if (i !== index) {
                    value.IsDefault = false;
                }
            });
            this.setSelectedBundleOption.emit(this.currentOptionIndex);
        }
    }

    getItemName(id: number) {
        return this.itemList[this.itemList.findIndex(item => item.ItemID === id)].Description;
    }

    move(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a, b) => a - b); // Sort the indexes
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
