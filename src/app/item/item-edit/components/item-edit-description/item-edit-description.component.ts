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
        //const itemid = this.route.parent.snapshot.params['id'];

        // this.itemService.getVendorBrands().subscribe(
        //     (vendorBrands: VendorBrand[]) => {
        //         this.vendorBrandList = vendorBrands;
        //     },
        //     (error: any) => {
        //         this.errorMessage = <any>error;
        //     }
        // );

        // this.itemService.getCurrentItemEdit(itemid).subscribe(
        //     (item: Item) => {
        //         this.itemService.currentItemEdit = item;
        //         this.item = this.itemService.currentItemEdit;
        //     },
        //     (error: any) => this.errorMessage = <any>error
        // );

        // this.appService.getCurrentMember().subscribe(
        //     (data) => {
        //         this.appService.currentMember = data;
        //         this.isPM = data.IsPM;
        //     },
        //     (error: any) => {
        //         this.errorMessage = <any>error;
        //     }
        // );
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
                    },
                    onPaste: function (e) {
                      var bufferText = ((e.originalEvent || e).clipboardData ).getData('text/html');
                      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                      const commentStripper = /.*?<!--[\s\S]*?-->.*?/g;
                      bufferText = bufferText.replace(commentStripper, '');
                      const b = /<o:p>/gi;
                      bufferText = bufferText.replace(b, '');
                      const c= /<\/o:p>/gi;
                      bufferText = bufferText.replace(c, '');
                      var div = $('<div />');
                      div.append(bufferText);
                      div.find('*').removeAttr('style border class cellspacing cellpadding width height align nowrap valign lang');
                      div.find('table').addClass('table table-bordered');
                      div.find('style').remove();
                      div.find('meta').remove();
                      div.find('link').remove();
                      div.find('xml').remove();
                      setTimeout(function(){
                        document.execCommand('insertHtml',false,div.html());
                      },10);
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
