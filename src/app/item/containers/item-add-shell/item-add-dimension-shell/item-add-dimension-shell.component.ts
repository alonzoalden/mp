import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ItemInsert } from '../../../../shared/class/item';

import { ItemService } from '../../../item.service';

@Component({
  templateUrl: './item-add-dimension-shell.component.html'
})

export class ItemAddDimensionShellComponent implements OnInit {
    errorMessage: string;
    item: ItemInsert;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.item = this.itemService.currentItemInsert;
    }
}
