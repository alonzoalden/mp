import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Item, ItemVideo } from '../../../../shared/class/item';
import { ItemService } from '../../../item.service';
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
            if (this.item.ItemVideos.length === 0 || this.item.ItemVideos[this.item.ItemVideos.length - 1].ItemVideoID) {
                this.addPendingLine();
                this.currentIndex = this.item.ItemVideos.length - 1;

            }
        }
    }

    ngOnInit(): void {
        this.currentIndex = this.item.ItemVideos.length - 1;
    }

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
            //const videoID = this.getQueryString('v', itemVideo.URL);
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
                this.addPendingLine();
                this.refreshDataSource(this.item.ItemVideos);
            }
        } else {
            this.itemService.sendNotification({ type: 'error', title: 'Error', content: 'Please select an Video' });
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

    onEditItemVideo(index: number) {
        if (this.pendingAdd) {
            this.currentIndex = this.item.ItemVideos.length - 1;
            this.pendingAdd = false;
        } else {
            this.currentIndex = index;
        }
    }

    isRequirementValid(itemVideo: ItemVideo): boolean {
        if (itemVideo
            && itemVideo.URL) {
            return true;
        } else {
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
        const indexes = [index, newIndex].sort((a, b) => a - b); // Sort the indixes
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


