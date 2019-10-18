import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ItemInsert, ItemVideoInsert } from '../../../../shared/class/item';
import { ItemService } from '../../../item.service';

@Component({
    selector: 'o-item-add-video',
    templateUrl: './item-add-video.component.html'
})

export class ItemAddVideoComponent implements OnInit, OnChanges {
    @Input() errorMessage: string;
    @Input() item: ItemInsert;
    @Input() itemVideosMatTable: MatTableDataSource<ItemVideoInsert>;
    @Output() getVideoURLDetail = new EventEmitter<ItemVideoInsert>();

    displayedColumns = ['Add', 'Down', 'Position', 'Up', 'Thumbnail', 'Label', 'Description', 'Exclude', 'Remove'];
    pendingAdd: boolean;
    currentIndex: number;
    formDirty = false;
    canAdd = false;

    constructor(private itemService: ItemService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.item && changes.item.currentValue && changes.item.currentValue.ItemVideos.length === 0) {
            const _temp = new ItemVideoInsert(null, null, null, null, null, null, null, null);
            this.item.ItemVideos.push(_temp);
            this.currentIndex = this.item.ItemVideos.length - 1;
        }
        if (changes.itemVideosMatTable && changes.itemVideosMatTable.currentValue.data.length) {
            this.currentIndex = this.item.ItemVideos.length - 1;
        }
    }
    ngOnInit(): void {
        this.currentIndex = this.item.ItemVideos.length - 1;
    }

    refreshDataSource(itemVideos: ItemVideoInsert[]) {
        this.itemVideosMatTable = new MatTableDataSource<ItemVideoInsert>(itemVideos);
    }

    onAddItemVideo(itemVideo: ItemVideoInsert) {
        if (this.isRequirementValid(itemVideo)) {
            const videoID = this.getYoutubeQueryString(itemVideo.URL);
            if (!videoID) { return this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Incorrect Youtube URL' }); }

            const existVideo = this.item.ItemVideos.find(x => x.Value === videoID);
            if (existVideo) {
                itemVideo.URL = '';
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Video already exists' });
            } else {
                this.pendingAdd = true;
                itemVideo.Value = videoID;
                itemVideo.Position = this.item.ItemVideos.length + 1;
                this.getVideoURLDetail.emit(itemVideo);
                const _temp = new ItemVideoInsert(null, null, null, null, null, null, this.item.ItemVideos.length, null);
                this.item.ItemVideos.push(_temp);
                this.refreshDataSource(this.item.ItemVideos);
            }
        } else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Please select a Video' });
        }
    }

    onEditItemVideo(index: number) {
        if (this.pendingAdd) {
            this.currentIndex = this.item.ItemVideos.length - 1;
            this.pendingAdd = false;
        } else {
            this.currentIndex = index;
        }
    }

    getYoutubeQueryString(url: string) {
        if (url.includes('?v=')) {
            const reg = new RegExp( '[?&]' + 'v' + '=([^&#]*)', 'i' );
            const value = reg.exec(url);
            return value[1];
        } else if (url.includes('/embed/')) {
            const value = url.split('/embed/')[1].split('?')[0];
            return value;
        }
    }

    isRequirementValid(itemVideo: ItemVideoInsert): boolean {
        if (itemVideo
            && itemVideo.URL) {
            return true;
        } else {
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
        const indexes = [index, newIndex].sort((a, b) => a - b); // Sort the indixes
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
