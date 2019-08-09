import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { URLVideo, URLVideoItems, URLVideoItemsSnippet, URLVideoItemsSnippetThumbnails, URLVideoItemsSnippetThumbnailsStandard } from '../../shared/class/item-video';
import { Item, ItemVideo, ItemVideoInsert } from '../../shared/class/item';
import { ItemService } from '../item.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'o-item-video',
  templateUrl: './item-video.component.html',
  styleUrls: ['./item-video.component.css']
})

export class ItemVideoComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    itemVideo: ItemVideoInsert;

    private imageURL = environment.imageURL;

    itemVideos: ItemVideo[];
    errorMessage: string;
    itemid: number;
    itemLabel: string;

    pendingAdd: boolean;
    pendingSave: boolean;

    displayedColumns = ['Position', 'Down', 'Up', 'Thumbnail', 'Label', 'Description', 'Exclude', 'Remove'];
    dataSource: any = null;

    @ViewChild(MatSort, { static: false }) sort: MatSort;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private itemService: ItemService) { }

    ngOnInit(): void {
        this.itemid = this.route.snapshot.params['id'];

        this.itemVideo = new ItemVideoInsert(this.itemid, null, null, null, null, null, null, null);

        this.itemService.getItem(this.itemid).subscribe(
            (item: Item) => {
                this.itemLabel = item.Name + ' - ' + item.VendorSKU;
            },
            (error: any) => {
                this.errorMessage = <any>error;
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                this.router.navigate(['/item']);
            }
        );

        this.subscription = this.itemService.getItemVideos(this.itemid).subscribe(
            (itemVidoes: ItemVideo[]) => {
                this.itemVideos = itemVidoes;
                //console.log(this.itemVideos);
                this.refreshDataSource(this.itemVideos);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    refreshDataSource(itemVideos: ItemVideo[]) {
        this.dataSource = new MatTableDataSource<ItemVideo>(itemVideos);
        this.dataSource.sort = this.sort;
    }

    onAddVideo() {
        const videoID = this.getQueryString('v', this.itemVideo.URL);

        this.pendingAdd = true;

        this.itemService.getVideoURLDetail(videoID).subscribe(
            (URLVideo: URLVideo) => {
                this.itemVideo.Thumbnail = URLVideo.items[0].snippet.thumbnails.standard.url;
                this.itemVideo.Value = videoID;
                this.itemVideo.Provider = 'youtube';
                if(!this.itemVideo.Label || this.itemVideo.Label == '')
                    this.itemVideo.Label = URLVideo.items[0].snippet.title;
                this.itemVideo.Description = URLVideo.items[0].snippet.description;
                this.itemVideo.Position = this.itemVideos.length + 1;

                this.itemService.addItemVideo(this.itemVideo).subscribe(
                    (itemVideo: ItemVideo) => {
                        this.pendingAdd = false;
                        this.itemVideos.push(itemVideo);

                        this.refreshDataSource(this.itemVideos);
                        this.itemVideo = new ItemVideoInsert(this.itemid, null, null, null, null, null, null, null);
                    },
                    (error: any) => {
                        this.pendingAdd = false;
                        this.errorMessage = <any>error;
                        this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    }
                );
            },
            (error: any) => {
                this.pendingAdd = false;
                this.errorMessage = <any>error;
                this.itemService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
            }
        )
    }

    moveDownPosition(itemVideo: ItemVideo) {
        this.move(this.itemVideos, itemVideo, 1);
        this.itemVideos.forEach((value, index) => value.Position = index + 1);
        this.refreshDataSource(this.itemVideos);
    }

    moveUpPosition(itemVideo: ItemVideo) {
        this.move(this.itemVideos, itemVideo, -1);
        this.itemVideos.forEach((value, index) => value.Position = index + 1);
        this.refreshDataSource(this.itemVideos);
    }

    move(array, element, delta) {
        const index = array.indexOf(element);
        const newIndex = index + delta;
        if (newIndex < 0  || newIndex === array.length) { return; } // Already at the top or bottom.
        const indexes = [index, newIndex].sort((a,b)=>a-b); // Sort the indixes
        array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
    }

    getQueryString(field: string, url: string) {
        const reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
        const value = reg.exec(url);
        return value[1];
    }

    saveItemVideo(): void {        
        if(this.itemVideos && this.itemVideos.length > 0) {
            this.pendingSave = true;
            this.itemService.editItemVideo(this.itemVideos).subscribe(
                () => {
                    this.pendingSave = false;
                    this.onSaveComplete(`Saved`);
                },
                (error: any) => {
                    this.pendingSave = false;
                    this.errorMessage = <any>error;
                }
            );
        }
        else {
            this.router.navigate(['/item']);
        }
    }
    onSaveComplete(message?: string): void {
        this.itemService.sendNotification({ type: 'success', title: 'Successfully Updated', content: message });
        this.router.navigate(['/item']);
        // alert(message);
    }
    ngOnDestroy() {
        //this.subscription.unsubscribe();
    }
}