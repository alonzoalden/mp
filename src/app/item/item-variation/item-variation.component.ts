
import { Component, OnInit, ViewContainerRef, ViewChild, Inject, ElementRef, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ItemInsert, ItemTierPriceInsert, ItemRelatedProductInsert, ItemUpSellInsert, ItemCrossSellInsert, ItemAttachmentInsert, ItemVideoInsert } from '../../shared/class/item';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../item.service';
import { Observable, Subscription } from 'rxjs';
import { ItemVariationComponentDialog } from '../item-variation/item-variation.component-dialog';


@Component({
  selector: 'item-variation',
  templateUrl: './item-variation.component.html',
})

export class ItemVariationComponent implements OnInit {
    
    product: ItemInsert[];
    //attributesVariationsList: any[] = [];
    variationCount: number;
    
    @Input() attributesVariationsList: any[] = [];

    constructor(private router: Router,
                private itemService: ItemService,
                public printDialog: MatDialog) {}
    
    ngOnInit(): void {
        this.itemService.product.subscribe((product) => this.product = product);
    }

    onUpdateItemData(list) {
        if (list && this.product) {
            const selectedVariations = list.map((i) => {
                if (i.selectedVariation) return i.selectedVariation;
            });
            this.product.forEach((item) => {
                if (item.ItemVariationItems) {
                    let variation = item.ItemVariationItems.every((variation) => selectedVariations.indexOf(variation) !== -1);
                    if (variation) return this.viewVariationItem(item);
                }
            });
        }
    }
    viewVariationItem(item) {
        this.itemService.currentProductItemInsert.next(item);
    }
}
