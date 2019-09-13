import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { Item, ItemList, ItemVideo } from '../../../../shared/class/item';
import { ItemService } from '../../../item.service';

import { URLVideo, URLVideoItems, URLVideoItemsSnippet, URLVideoItemsSnippetThumbnails, URLVideoItemsSnippetThumbnailsStandard } from '../../../../shared/class/item-video';

import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'o-item-edit-video',
    templateUrl: './item-edit-video.component.html'
})

export class ItemEditVideoComponent implements OnInit {
    @Input() errorMessage: string;
    @Input() item: Item;
    @Input() itemVideosMatTable: MatTableDataSource<ItemVideo>;
    @Output() getVideoURLDetail = new EventEmitter<ItemVideo>();

    private imageURL = environment.imageURL;

    displayedColumns = ['Add', 'Down', 'Position', 'Up', 'Thumbnail', 'Label', 'Description', 'Exclude', 'Remove'];
    pendingAdd: boolean;
    currentIndex: number;
    formDirty = false;
    canAdd = false;

    constructor(private itemService: ItemService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.item && changes.item.currentValue) {
            if (this.item.ItemAttachments.length === 0 || this.item.ItemVideos[this.item.ItemVideos.length-1].ItemVideoID) {
                this.addPendingLine();
            }
            this.addPendingLine();
            this.currentIndex = this.item.ItemVideos.length - 1;
        }
    }

    ngOnInit(): void {
        this.currentIndex = this.item.ItemVideos.length - 1;
    }

    // initialize() {
    //     if (this.itemService.currentItemEdit.ItemVideos === null) {
    //         this.itemService.getItemVideos(this.itemid).subscribe(
    //             (itemVideos: ItemVideo[]) => {
    //                 this.item.ItemVideos = itemVideos;                    
    //                 this.addPendingLine();         
    //                 this.currentIndex = this.item.ItemVideos.length - 1;
    //                 this.refreshDataSource(this.item.ItemVideos);
    //             },
    //             (error: any) => this.errorMessage = <any>error
    //         );
    //     } else {
    //         this.removePendingLine();
    //         this.addPendingLine();              
    //         this.currentIndex = this.item.ItemVideos.length - 1; 
    //         this.refreshDataSource(this.item.ItemVideos);
    //     }
    // }

    addPendingLine() {
        const _temp = new ItemVideo(0, this.item.ItemID , null, null, null, null, null, this.item.ItemVideos.length + 1, false, false, null, null, null, true, true);
        this.item.ItemVideos.push(_temp);   
    }

    removePendingLine() {
        const foundIndex = this.item.ItemVideos.findIndex(i => i.pendingAdd === true);
        if (foundIndex > -1) {
            this.item.ItemVideos.splice(foundIndex, 1);
        }
    }

    refreshDataSource(itemVideos: ItemVideo[]) { 
        this.itemVideosMatTable = new MatTableDataSource<ItemVideo>(itemVideos);
    }

    onAddItemVideo(itemVideo: ItemVideo) {
        if (this.isRequirementValid(itemVideo)) {                
            const videoID = this.getQueryString('v', itemVideo.URL);

            const existVideo = this.item.ItemVideos.find(x => x.Value === videoID);
            if (existVideo) {
                itemVideo.URL = '';
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Video already exists" });            
            }
            else {
                this.pendingAdd = true;
                this.getVideoURLDetail.emit(itemVideo);
                // this.itemService.getVideoURLDetail(videoID).subscribe(
                //     (URLVideo: URLVideo) => {
                //         //itemVideo.Thumbnail = URLVideo.items[0].snippet.thumbnails.standard.url;
                //         if(URLVideo.items[0].snippet.thumbnails.standard) {
                //             itemVideo.Thumbnail = URLVideo.items[0].snippet.thumbnails.standard.url;
                //         }
                //         else if(URLVideo.items[0].snippet.thumbnails.medium) {
                //             itemVideo.Thumbnail = URLVideo.items[0].snippet.thumbnails.medium.url;
                //         }

                //         itemVideo.Value = videoID;
                //         itemVideo.Provider = 'youtube';
                //         if(!itemVideo.Label || itemVideo.Label == '')
                //             itemVideo.Label = URLVideo.items[0].snippet.title;
                //         itemVideo.Description = URLVideo.items[0].snippet.description;
                //         itemVideo.Position = this.item.ItemVideos.length + 1;
                //         itemVideo.pendingAdd = false; 
                //     },
                //     (error: any) => {
                //         this.pendingAdd = false;
                //         this.errorMessage = <any>error;
                //         this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                //     }
                // );
    
                this.addPendingLine(); 
                this.refreshDataSource(this.item.ItemVideos);
            }            
        }
        else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Please select an Video" });
        }
    }

    getQueryString(field: string, url: string) {
        const reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
        const value = reg.exec(url);
        return value[1];
    }

    onEditItemVideo(index: number) {
        if(this.pendingAdd) {
            this.currentIndex = this.item.ItemVideos.length - 1;
            this.pendingAdd = false;
        }
        else {
            this.currentIndex = index;
        }
    }

    isRequirementValid(itemVideo: ItemVideo): boolean {
        if (itemVideo
            && itemVideo.URL) {
            return true;
        } 
        else {
            return false;
        }
    }

    moveDownPosition(itemVideo: ItemVideo) {
        this.positionMove(this.item.ItemVideos, itemVideo, 1);
        this.item.ItemVideos.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.refreshDataSource(this.item.ItemVideos);
    }

    moveUpPosition(itemVideo: ItemVideo) {
        this.positionMove(this.item.ItemVideos, itemVideo, -1);
        this.item.ItemVideos.forEach((value, index) => {
            value.Position = index + 1;                        
        });

        this.refreshDataSource(this.item.ItemVideos);
    }

    positionMove(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }
    
    onRemoveVideo(itemVideo: ItemVideo) {
        const confirmation = confirm(`Remove Position ${itemVideo.Position}?`);
        if (confirmation) {
            const foundIndex = this.item.ItemVideos.findIndex(i => i.Position === itemVideo.Position);
            if (foundIndex > -1) {
                this.item.ItemVideos.splice(foundIndex, 1);
            }            
            this.refreshDataSource(this.item.ItemVideos);
        }
    }

    clearFields(form) {
        this.formDirty = false;
        this.canAdd = false;
        form.URL = '';
        form.Label = '';
    }
}


