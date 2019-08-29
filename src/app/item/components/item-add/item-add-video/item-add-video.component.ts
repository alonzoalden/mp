import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { Item, ItemInsert, ItemList, ItemVideoInsert } from '../../../../shared/class/item';
import { ItemService } from '../../../item.service';

import { URLVideo, URLVideoItems, URLVideoItemsSnippet, URLVideoItemsSnippetThumbnails, URLVideoItemsSnippetThumbnailsStandard } from '../../../../shared/class/item-video';
declare var $ :any;

@Component({
    selector: 'o-item-add-video',
    templateUrl: './item-add-video.component.html'
})

export class ItemAddVideoComponent implements OnInit {
    errorMessage: string;
    item: ItemInsert;

    displayedColumns = ['Add', 'Down', 'Position', 'Up', 'Thumbnail', 'Label', 'Description', 'Exclude', 'Remove'];
    dataSource: any = null;
    pendingAdd: boolean;
    currentIndex: number;
    formDirty = false;
    canAdd = false;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.item = this.itemService.currentItemInsert;

        if(this.item.ItemVideos.length === 0) {
            const _temp = new ItemVideoInsert(null, null, null, null, null, null, null, null);
            this.item.ItemVideos.push(_temp);
        }

        this.currentIndex = this.item.ItemVideos.length - 1;

        this.refreshDataSource(this.item.ItemVideos);
    }

    refreshDataSource(itemVideos: ItemVideoInsert[]) {
        this.dataSource = new MatTableDataSource<ItemVideoInsert>(itemVideos);
    }

    onAddItemVideo(itemVideo: ItemVideoInsert) {
        if (this.isRequirementValid(itemVideo)) {      

            const videoID = this.getQueryString('v', itemVideo.URL);

            const existVideo = this.item.ItemVideos.find(x => x.Value === videoID);
            if (existVideo) {
                itemVideo.URL = '';
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Video already exists" });            
            }
            else {
                this.pendingAdd = true;

                this.itemService.getVideoURLDetail(videoID).subscribe(
                    (URLVideo: URLVideo) => {
                        if(URLVideo.items[0].snippet.thumbnails.standard) {
                            itemVideo.Thumbnail = URLVideo.items[0].snippet.thumbnails.standard.url;
                        }
                        else if(URLVideo.items[0].snippet.thumbnails.medium) {
                            itemVideo.Thumbnail = URLVideo.items[0].snippet.thumbnails.medium.url;
                        }

                        itemVideo.Value = videoID;
                        itemVideo.Provider = 'youtube';
                        if(!itemVideo.Label || itemVideo.Label == '')
                            itemVideo.Label = URLVideo.items[0].snippet.title;
                        itemVideo.Description = URLVideo.items[0].snippet.description;
                        itemVideo.Position = this.item.ItemVideos.length + 1;
                    },
                    (error: any) => {
                        this.pendingAdd = false;
                        this.errorMessage = <any>error;
                        this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    }
                );
                const _temp = new ItemVideoInsert(null, null, null, null, null, null, this.item.ItemVideos.length, null);
                this.item.ItemVideos.push(_temp);
                this.refreshDataSource(this.item.ItemVideos);
            }            
        }
        else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: "Please select an Video" });
        }
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

    getQueryString(field: string, url: string) {
        const reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
        const value = reg.exec(url);
        return value[1];
    }

    isRequirementValid(itemVideo: ItemVideoInsert): boolean {
        if (itemVideo
            && itemVideo.URL) {
            return true;
        } 
        else {
            return false;
        }
    }

    moveDownPosition(itemVideo: ItemVideoInsert) {
        this.positionMove(this.item.ItemVideos, itemVideo, 1);
        this.item.ItemVideos.forEach((value, index) => {
            value.Position = index + 1;
        });

        this.refreshDataSource(this.item.ItemVideos);
    }

    moveUpPosition(itemVideo: ItemVideoInsert) {
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
    
    onRemoveVideo(itemVideo: ItemVideoInsert) {
        const confirmation = confirm(`Remove ${itemVideo.Label}?`);
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