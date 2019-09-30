import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { ItemInsert } from '../../../../../shared/class/item';
import { VendorBrand } from '../../../../../shared/class/vendor-brand';

import { ItemService } from '../../../../item.service';
import { AppService } from '../../../../../app.service';

declare var $: any;

@Component({
  selector: 'o-item-part-add-description',
  templateUrl: './item-part-add-description.component.html'
})

export class ItemPartAddDescriptionComponent implements OnInit, AfterViewInit {
    errorMessage: string;
    isPM: boolean;

    item: ItemInsert;
    vendorBrandList: VendorBrand[];

    constructor(private itemService: ItemService, private appService: AppService) { }

    ngOnInit(): void {
        this.item = this.itemService.currentItemInsert;

        this.itemService.getVendorBrands().subscribe(
            (vendorBrands: VendorBrand[]) => {
                this.vendorBrandList = vendorBrands;
            },
            (error: any) => {
                this.errorMessage = <any>error;
            }
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
        let self = this;

        $('.summernote').summernote( {
            height: 300,
            tabsize: 2,
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'underline', 'clear']],
                ['fontname', ['fontname']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video']],
                ['view', ['help']]
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

    onTextEditorBlur(id: string) {
        switch (id) {
            case 'Description': {
                this.item.Description = $('#itemDescriptionId').summernote('code');
                break;
            }
            case 'ShortDescription': {
                this.item.ShortDescription = $('#itemShortDescriptionId').summernote('code');
                break;
            }
            case 'TechnicalDetail': {
                this.item.TechnicalDetail = $('#itemTechnicalDetailId').summernote('code');
                break;
            }
            case 'AdditionalInformation': {
                this.item.AdditionalInformation = $('#itemAdditionalInformationId').summernote('code');
                break;
            }
            default: {
               console.log('Invalid choice');
               break;
            }
         }
    }

    updateTextEditorFields() {
        this.item.Description = $('#itemDescriptionId').summernote('code');
        this.item.ShortDescription = $('#itemShortDescriptionId').summernote('code');
        this.item.TechnicalDetail = $('#itemTechnicalDetailId').summernote('code');
        this.item.AdditionalInformation = $('#itemAdditionalInformationId').summernote('code');
    }

    onItemTypeChange() {
        this.item.Price = null;
    }
}
