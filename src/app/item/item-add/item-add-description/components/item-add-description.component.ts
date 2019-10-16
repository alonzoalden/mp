import { Component, AfterViewInit, Input } from '@angular/core';
import { ItemInsert } from '../../../../shared/class/item';
import { VendorBrand } from '../../../../shared/class/vendor-brand';
import { Member } from 'app/shared/class/member';
declare var $: any;

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
        const self = this;

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
                },
                onPaste: function (e) {
                    let bufferText = ((e.originalEvent || e).clipboardData ).getData('text/html');
                    if(!bufferText){
                        return;
                    }
                    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                    const commentStripper = /<!--\[if\s+gte\s+mso\s+9\]>(?:(?!<!\[endif\]-->)[\s\S])*<!\[endif\]-->/gi;
                    bufferText = bufferText.replace(commentStripper, '');
                    const commentStripper2 = /<!\[if\s+!supportLists\]>/gi;
                    bufferText = bufferText.replace(commentStripper2, '');
                    const commentStripper3 = /<!--StartFragment-->/gi;
                    bufferText = bufferText.replace(commentStripper3, '');
                    const commentStripper4 = /<!\[endif\]>/gi;
                    bufferText = bufferText.replace(commentStripper4, '');
                    // const commentStripper5 = /<font\s+face="宋体"\s+>/gi;
                    // bufferText = bufferText.replace(commentStripper5,'');
                    // const commentStripper6 = /<\/font>/gi;
                    // bufferText = bufferText.replace(commentStripper6,'');
                    const commentStripper7 = /<o:p>/gi;
                    bufferText = bufferText.replace(commentStripper7, '');
                    const commentStripper8 = /<\/o:p>/gi;
                    bufferText = bufferText.replace(commentStripper8, '');
                    const commentStripper9 = /<!--EndFragment-->/gi;
                    bufferText = bufferText.replace(commentStripper9, '');
                    const commentStripper11 = /<!--\[if\s+gte\s+mso\s+10\]>(?:(?!<!\[endif\]-->)[\s\S])*<!\[endif\]-->/gi;
                    bufferText = bufferText.replace(commentStripper11, '');
                    const div = $('<div />');
                    div.append(bufferText);
                    div.find('*').removeAttr('style border class cellspacing cellpadding width height align nowrap valign lang x:str');
                    div.find('table').addClass('table table-bordered');
                    div.find('style').remove();
                    div.find('meta').remove();
                    div.find('link').remove();
                    div.find('xml').remove();
                    div.find('title').remove();
                    div.find('w').remove();
                    div.html( div.html().replace(/\n/g, ''));
                    setTimeout(function() {
                        document.execCommand('insertHtml', false, div.html());
                    }, 10);
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
