import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { Item } from '../../shared/class/item';
import { ItemService } from '../item.service';
import { environment } from '../../../environments/environment';
declare var $: any;

@Component({
    selector: 'o-item-edit-variation',
    templateUrl: './item-edit-variation.component.html'
})

export class ItemEditVariationComponent implements OnInit {
    private subscription: Subscription;
    private imageURL = environment.imageURL;

    errorMessage: string;
    item: Item;
    itemid: number;
    isLoading: boolean = false;

    constructor(private route: ActivatedRoute,
        private itemService: ItemService, public itemUploadDialog: MatDialog) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.itemid = this.route.parent.snapshot.params['id'];
        this.subscription = this.itemService.getCurrentItemEdit(this.itemid).subscribe(
            (item: Item) => {
                this.itemService.currentItemEdit = item;
                this.item = this.itemService.currentItemEdit;
                this.isLoading = false;
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    // test(param: number) {
    //     this.subscription = this.itemService.getItem(param).subscribe(
    //         (item: Item) => {
    //             this.itemService.currentItemEdit = item;
    //             this.router.navigate(['/item', param, 'edit']);
    //         },
    //         error => {
    //             this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
    //             this.router.navigate(['/item']);
    //         }
    //     );
    // }
}
