import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Item } from '../../../../../shared/class/item';
import { VendorBrand } from '../../../../../shared/class/vendor-brand';

import { ItemService } from '../../../../item.service';
import { AppService } from '../../../../../app.service';
declare var $ :any;

@Component({
  selector: 'o-item-part-edit-description',
  templateUrl: './item-part-edit-description.component.html'
})

export class ItemPartEditDescriptionComponent implements OnInit, AfterViewInit {
    errorMessage: string;
    isPM: boolean;
    item: Item;
    vendorBrandList: VendorBrand[]; 

    constructor(private route: ActivatedRoute,
                private itemService: ItemService,
                private appService: AppService) { }

    ngOnInit(): void {
        const itemid = this.route.parent.snapshot.params['id'];
        
        this.itemService.getVendorBrands().subscribe(
            (vendorBrands: VendorBrand[]) => {
                this.vendorBrandList = vendorBrands;
            },
            (error: any) => {
                this.errorMessage = <any>error;                
            }
        ); 

        this.itemService.getCurrentItemEdit(itemid).subscribe(
            (item: Item) => {
                this.itemService.currentItemEdit = item;
                this.item = this.itemService.currentItemEdit;
            },
            (error: any) => this.errorMessage = <any>error
        );

        this.appService.getCurrentMember().subscribe(
            (data) => {
                this.appService.currentMember = data;
                this.isPM = data.IsPM;
            },
            (error: any) => {
                this.errorMessage = <any>error;
            }
        );
    }

    ngAfterViewInit() {
        var self = this;

        $('.summernote').summernote( {
            height: 300,
            tabsize: 2,
            toolbar: [
                ["style",["style"]],
                ["font",["bold","underline","clear"]],
                ["fontname",["fontname"]],
                ["color",["color"]],
                ["para",["ul","ol","paragraph"]],
                ["table",["table"]],
                ["insert",["link","picture","video"]],
                ["view",["help"]]
            ],
            callbacks: {
                onBlur: function() {
                    self.updateTextEditorFields();
                }
              }
        });

        $('#itemDescriptionId').summernote('code', this.item.Description);
        $('#itemShortDescriptionId').summernote('code', this.item.ShortDescription);
        $('#itemTechnicalDetailId').summernote('code', this.item.TechnicalDetail);
        $('#itemAdditionalInformationId').summernote('code', this.item.AdditionalInformation);
    }

    updateTextEditorFields() {
        this.item.Description = $('#itemDescriptionId').summernote('code');
        this.item.ShortDescription = $('#itemShortDescriptionId').summernote('code');
        this.item.TechnicalDetail = $('#itemTechnicalDetailId').summernote('code');
        this.item.AdditionalInformation = $('#itemAdditionalInformationId').summernote('code');
    }
}
