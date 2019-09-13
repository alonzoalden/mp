import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ItemService } from '../item.service';
import * as itemActions from './item.actions';
import { Router } from '@angular/router';
import { Member, MemberVendor } from 'app/shared/class/member';
import { VendorBrand } from 'app/shared/class/vendor-brand';
import { ItemList, Item, ItemCrossSellInsert, ItemUpSell, ItemUpSellInsert, ItemRelatedProduct, ItemRelatedProductInsert, ItemAttachmentInsert, ItemVideoInsert, ItemCategoryAssignment, ItemTierPrice } from 'app/shared/class/item';
import { Category } from 'app/shared/class/category';
import { VendorAttachment, VendorAttachmentList } from 'app/shared/class/vendor-attachment';
import { URLVideo } from 'app/shared/class/item-video';
import { environment } from 'environments/environment';
import * as fromItem from '../state';

@Injectable()
export class ItemEffects {
    constructor(
        private store: Store<fromItem.State>,
        private itemService: ItemService,
        private actions$: Actions) { }

    @Effect()
    loadVendorBrands$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadVendorBrands),
        mergeMap(() =>
            this.itemService.getVendorBrands().pipe(
                map((vendorbrands: VendorBrand[]) => (new itemActions.LoadVendorBrandsSuccess(vendorbrands))),
                catchError(err => {
                    of(new itemActions.LoadVendorBrandsFail(err))
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadSimpleItemList$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadSimpleItemList),
        mergeMap(() =>
            this.itemService.getSimpleItemList().pipe(
                map((itemlists: ItemList[]) => (new itemActions.LoadSimpleItemListSuccess(itemlists))),
                catchError(err => {
                    of(new itemActions.LoadSimpleItemListFail(err))
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadItemCategories$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadItemCategories),
        map((action: itemActions.LoadItemCategories) => action.payload),
        mergeMap((id: number) =>
            this.itemService.getCategories(id).pipe(
                map((categories: Category[]) => (new itemActions.LoadItemCategoriesSuccess(categories))),
                catchError(err => {
                    of(new itemActions.LoadItemCategoriesFail(err))
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadCategoryBreadCrumbs$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadCategoryBreadCrumbs),
        map((action: itemActions.LoadCategoryBreadCrumbs) => action.payload),
        mergeMap((id: number) =>
            this.itemService.getCategoryBreadCrumbs(id).pipe(
                map((categories: Category[]) => (new itemActions.LoadCategoryBreadCrumbsSuccess(categories))),
                catchError(err => {
                    of(new itemActions.LoadCategoryBreadCrumbsFail(err))
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadAllItemList$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadAllItemList),
        mergeMap(() =>
            this.itemService.getAllItemList().pipe(
                map((itemlist: ItemList[]) => (new itemActions.LoadAllItemListSuccess(itemlist))),
                catchError(err => {
                    of(new itemActions.LoadAllItemListFail(err))
                    return EMPTY;
                })
            )
        ),
        take(1)
    );
    @Effect()
    loadAllItemCrossSell$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadAllItemCrossSell),
        map((action: itemActions.LoadAllItemCrossSell) => action.payload),
        mergeMap((itemcrosssell: ItemCrossSellInsert) =>
            this.itemService.getAllItem(itemcrosssell.CrossSellItemID).pipe(
                map((item: Item) => {
                    itemcrosssell.PrevCrossSellItemID = item.ItemID;
                    itemcrosssell.CrossSellItemName = item.Name;
                    itemcrosssell.CrossSellItemVendorSKU = item.VendorSKU;
                    itemcrosssell.CrossSellTPIN = item.TPIN;
                    itemcrosssell.ImagePath = item.ImagePath;
                    return (new itemActions.LoadAllItemCrossSellSuccess(item))
                }),
                catchError(err => {
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new itemActions.LoadAllItemCrossSellFail(err))
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadAllItemUpSell$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadAllItemUpSell),
        map((action: itemActions.LoadAllItemUpSell) => action.payload),
        mergeMap((itemupsell: ItemUpSellInsert) =>
            this.itemService.getAllItem(itemupsell.UpSellItemID).pipe(
                map((item: Item) => {
                    itemupsell.PrevUpSellItemID = item.ItemID;
                    itemupsell.UpSellItemName = item.Name;
                    itemupsell.UpSellItemVendorSKU = item.VendorSKU;
                    itemupsell.UpSellTPIN = item.TPIN;
                    itemupsell.ImagePath = item.ImagePath;
                    return (new itemActions.LoadAllItemUpSellSuccess(item))
                }),
                catchError(err => {
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new itemActions.LoadAllItemUpSellFail(err))
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadItemRelatedProduct$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadItemRelatedProduct),
        map((action: itemActions.LoadItemRelatedProduct) => action.payload),
        mergeMap((itemrelatedproduct: ItemRelatedProductInsert) =>
            this.itemService.getAllItem(itemrelatedproduct.RelatedProductItemID).pipe(
                map((item: Item) => {
                    itemrelatedproduct.PrevRelatedProductItemID = item.ItemID;
                    itemrelatedproduct.RelatedItemName = item.Name;
                    itemrelatedproduct.RelatedItemVendorSKU = item.VendorSKU;
                    itemrelatedproduct.RelatedTPIN = item.TPIN;
                    itemrelatedproduct.ImagePath = item.ImagePath;
                    
                    return (new itemActions.LoadItemRelatedProductSuccess(item))
                }),
                catchError(err => {
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new itemActions.LoadItemRelatedProductFail(err))
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadVendorAttachmentList$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadVendorAttachmentList),
        mergeMap(() =>
            this.itemService.getAttachmentList().pipe(
                map((item: VendorAttachmentList[]) => (new itemActions.LoadVendorAttachmentListSuccess(item))),
                catchError(err => {
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new itemActions.LoadVendorAttachmentListFail(err))
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadItemAttachment$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadItemAttachment),
        map((action: itemActions.LoadItemAttachment) => action.payload),
        mergeMap((itemattachment: ItemAttachmentInsert) =>
            this.itemService.getAttachment(itemattachment.VendorAttachmentID).pipe(
                map((attachment: VendorAttachment) => {
                    itemattachment.Title = attachment.Title;
                    if (attachment.UploadedFile) {
                        itemattachment.FileName = attachment.UploadedFile.substring(5);
                    }
                    itemattachment.UploadedFile = attachment.UploadedFile;
                    return (new itemActions.LoadItemAttachmentSuccess(attachment))
                }),
                catchError(err => {
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new itemActions.LoadItemAttachmentFail(err))
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadVideoURLDetail$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadVideoURLDetail),
        map((action: itemActions.LoadVideoURLDetail) => action.payload),
        mergeMap((itemvideo: ItemVideoInsert) =>
            this.itemService.getVideoURLDetail(itemvideo.Value).pipe(
                map((urlvideo: URLVideo) => {
                    if(urlvideo.items[0].snippet.thumbnails.standard) {
                        itemvideo.Thumbnail = urlvideo.items[0].snippet.thumbnails.standard.url;
                    }
                    else if(urlvideo.items[0].snippet.thumbnails.medium) {
                        itemvideo.Thumbnail = urlvideo.items[0].snippet.thumbnails.medium.url;
                    }
                    itemvideo.Provider = 'youtube';
                    if(!itemvideo.Label || itemvideo.Label == '') {
                        itemvideo.Label = urlvideo.items[0].snippet.title;
                    }
                    itemvideo.Description = urlvideo.items[0].snippet.description;
                    
                    return (new itemActions.LoadVideoURLDetailSuccess(urlvideo))
                }),
                catchError(err => {
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new itemActions.LoadVideoURLDetailFail(err))
                    return EMPTY;
                })
            )
        )
    );
    
    @Effect()
    loadItemCategoryAssignments$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadItemCategoryAssignments),
        map((action: itemActions.LoadItemCategoryAssignments) => action.payload),
        mergeMap((id: number) =>
            this.itemService.getItemCategoryAssignments(id).pipe(
                map((categoryassignments: ItemCategoryAssignment[]) =>  (new itemActions.LoadItemCategoryAssignmentsSuccess(categoryassignments))),
                catchError(err => {
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new itemActions.LoadItemCategoryAssignmentsFail(err))
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    loadItemTierPrices$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadItemTierPrices),
        map((action: itemActions.LoadItemTierPrices) => action.payload),
        mergeMap((id: number) =>
            this.itemService.getItemTierPrices(id).pipe(
                map((tierprices: ItemTierPrice[]) =>  (new itemActions.LoadItemTierPricesSuccess(tierprices))),
                catchError(err => {
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new itemActions.LoadItemTierPricesFail(err))
                    return EMPTY;
                })
            )
        )
    );

    

    @Effect()
    loadItem$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.LoadItem),
        map((action: itemActions.LoadItem) => action.payload),
        mergeMap((id: number) =>
            this.itemService.getItem(id).pipe(
                map((item: Item) =>  (new itemActions.LoadItemSuccess(item))),
                catchError(err => {
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new itemActions.LoadItemFail(err))
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    editItem$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.EditItem),
        map((action: itemActions.EditItem) => action.payload),
        mergeMap((payload: any) =>
            this.itemService.editItem(payload.item.ItemID).pipe(
                map((item: Item) => {
                    this.itemService.sendNotification({ type: 'success', title: 'Successfully Updated', content: `${item.Name} was saved` });
                    if(payload.displayPreview) {
                        window.open(environment.previewURL + item.ItemID + "/options/portal", "_blank");
                    }
                    if(payload.printLabel) {
                        this.store.dispatch(new itemActions.DownloadItemLabel(item));
                    }
                    return (new itemActions.EditItemSuccess(item))
                }),
                catchError(err => {
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new itemActions.EditItemFail(err))
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    downloadItemLabel$: Observable<Action> = this.actions$.pipe(
        ofType(itemActions.ItemActionTypes.DownloadItemLabel),
        map((action: itemActions.DownloadItemLabel) => action.payload),
        mergeMap((item: Item) =>
            this.itemService.downloadItemLabel(item.ItemID).pipe(
                map((data: Blob) => {
                    const blob = new Blob([data], {type: 'application/pdf'});
                    const blobUrl = URL.createObjectURL(blob);
                    if (window.navigator.msSaveOrOpenBlob) {
                        const fileName = item.TPIN;
                        window.navigator.msSaveOrOpenBlob(data, fileName + '.pdf'); // IE is the worst!!!
                    } else {
                        // const iframe = document.createElement('iframe');
                        // iframe.style.display = 'none';
                        // iframe.src = blobUrl;
                        // document.body.appendChild(iframe);

                        // iframe.onload = (function() {
                        //     iframe.contentWindow.focus();
                        //     iframe.contentWindow.print();
                        // });
                        const fileURL = window.URL.createObjectURL(blob);
                        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
                        a.href = fileURL;
                        a.download = item.TPIN;
                        document.body.appendChild(a);
                        a.target = '_blank';
                        a.click();

                        document.body.removeChild(a);
                        URL.revokeObjectURL(fileURL);
                    }

                    return (new itemActions.DownloadItemLabelSuccess(data))
                }),
                catchError(err => {
                    this.itemService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new itemActions.DownloadItemLabelFail(err))
                    return EMPTY;
                })
            )
        )
    );
    
}