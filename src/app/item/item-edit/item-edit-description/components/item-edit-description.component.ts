import { Component, OnInit, AfterViewInit, SimpleChanges, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Item } from '../../../../shared/class/item';
import { VendorBrand } from '../../../../shared/class/vendor-brand';

import { ItemService } from '../../../item.service';
import { AppService } from '../../../../app.service';
import { Member } from 'app/shared/class/member';
declare var $ :any;

@Component({
  selector: 'o-item-edit-description',
  templateUrl: './item-edit-description.component.html'
})

export class ItemEditDescriptionComponent implements OnInit, AfterViewInit {
    isPM: boolean;

    @Input() vendorBrandList: VendorBrand[];
    @Input() isLoading: boolean = true;
    @Input() item: Item;
    @Input() userInfo: Member;
    @Input() errorMessage: string;
    @Input() pendingSave: boolean;

    constructor(private route: ActivatedRoute) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.userInfo && changes.userInfo.currentValue) {
            this.isPM = this.userInfo.IsPM;
        }
    }

    ngOnInit(): void {
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
