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
                    // onPaste: function (e) {
                    //   var bufferText = ((e.originalEvent || e).clipboardData ).getData('text/html');
                    //   e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                    //   var stringStripper = /(\n|\r|Mso[a-zA-Z]+(")?)/g;
                    //   var div = $('<div />');
                    //   div.append(bufferText);
                    //   div.find('*').removeAttr('style');
                    //   div.find('*').removeAttr('class');
                    //   console.log(div.html())
                    //   setTimeout(function(){
                    //     document.execCommand('insertHtml',false,div.html());
                    //   },10);
                    // }
                  // onPaste:function (e) {
                  //   var bufferText = ((e.originalEvent || e).clipboardData ).getData('text/html');
                  //   console.log(bufferText);
                  //   e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                  //     // 1. remove line breaks / Mso classes
                  //     var stringStripper = /(\n|\r| class=(")?Mso[a-zA-Z]+(")?)/g;
                  //     var output = bufferText.replace(stringStripper, ' ');
                  //     // 2. strip Word generated HTML comments
                  //     var commentSripper = new RegExp('<!--(.*?)-->','g');
                  //     var output = output.replace(commentSripper, '');
                  //     var tagStripper = new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>','gi');
                  //     // 3. remove tags leave content if any
                  //     output = output.replace(tagStripper, '');
                  //     // 4. Remove everything in between and including tags '<style(.)style(.)>'
                  //     var badTags = ['style', 'script','applet','embed','noframes','noscript'];
                  //
                  //     for (var i=0; i< badTags.length; i++) {
                  //       tagStripper = new RegExp('<'+badTags[i]+'.*?'+badTags[i]+'(.*?)>', 'gi');
                  //       output = output.replace(tagStripper, '');
                  //     }
                  //     // 5. remove attributes ' style="..."'
                  //     var badAttributes = ['style', 'start'];
                  //     for (var i=0; i< badAttributes.length; i++) {
                  //       var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"','gi');
                  //       output = output.replace(attributeStripper, '');
                  //     }
                  //     console.log(output)
                  //   setTimeout(function () {
                  //     //this kinda sucks, but if you don't do a setTimeout,
                  //     //the function is called before the text is really pasted.
                  //     document.execCommand('insertHtml',false,output.html());
                  //   }, 10);}
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
