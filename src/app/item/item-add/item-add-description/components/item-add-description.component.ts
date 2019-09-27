import { Component, AfterViewInit, OnChanges, Input } from '@angular/core';
import { ItemInsert } from '../../../../shared/class/item';
import { VendorBrand } from '../../../../shared/class/vendor-brand';
import { Member } from 'app/shared/class/member';

declare var $ :any;

@Component({
  selector: 'o-item-add-description',
  templateUrl: './item-add-description.component.html'
})

export class ItemAddDescriptionComponent implements AfterViewInit {
    @Input() userInfo: Member;
    @Input() errorMessage: string;
    @Input() item: ItemInsert;
    @Input() vendorBrandList: VendorBrand[];

    constructor() { }

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

    onTextEditorBlur(id: string) {
        switch(id) { 
            case "Description": { 
                this.item.Description = $('#itemDescriptionId').summernote('code');
                break; 
            } 
            case "ShortDescription": { 
                this.item.ShortDescription = $('#itemShortDescriptionId').summernote('code');
                break; 
            } 
            case "TechnicalDetail": {
                this.item.TechnicalDetail = $('#itemTechnicalDetailId').summernote('code');
                break;    
            } 
            case "AdditionalInformation": { 
                this.item.AdditionalInformation = $('#itemAdditionalInformationId').summernote('code');
                break; 
            }  
            default: { 
               console.log("Invalid choice"); 
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
