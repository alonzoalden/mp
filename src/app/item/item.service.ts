import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Item, ItemInsert, ItemOption, ItemOptionInsert, ItemSelection, ItemSelectionInsert, ItemTierPrice, ItemTierPriceInsert
    , ItemCategoryAssignment, ItemRelatedProduct, ItemRelatedProductInsert, ItemUpSell, ItemUpSellInsert, ItemCrossSell, ItemCrossSellInsert
    , ItemAttachment, ItemAttachmentInsert, ItemVideo, ItemVideoInsert, ItemImage, ItemImageInsert, ItemPrintLabel, ItemBatch, ItemPart, ItemPartInsert, ItemPartSelectionInsert, ItemPartSelection } from '../shared/class/item';
//import { ItemImage } from '../shared/class/item-image';
import { URLVideo, URLVideoItems, URLVideoItemsSnippet, URLVideoItemsSnippetThumbnails, URLVideoItemsSnippetThumbnailsStandard } from '../shared/class/item-video';

import { ItemList } from '../shared/class/item';
import { Category } from '../shared/class/category';
import { Member } from '../shared/class/member';
import { VendorAttachmentList, VendorAttachment} from '../shared/class/vendor-attachment';
import { VendorBrand } from '../shared/class/vendor-brand';

import { BatchUpdate, BatchUpdateValue } from '../shared/class/batch-update';

import { OAuthService } from 'angular-oauth2-oidc';
import { AppService } from '../app.service';

import { environment } from '../../environments/environment';
import { ResponseContentType } from '@angular/http';

@Injectable()
export class ItemService {
    private apiURL = environment.webapiURL;
    private items: Item[];
    private itemList: ItemList[];
    private simpleItemList: ItemList[];
    private allItemList: ItemList[];
    private allSimpleItemList: ItemList[];
    private partItemList: ItemList[];
    
    currentMember: Member;

    currentItem: Item;
    currentItemInsert: ItemInsert;
    currentItemEdit: Item;

    currentItemPartSelection: Subject<ItemPartSelectionInsert>;

    duplicateItemInsert: ItemInsert;

    private vendorattachmentlist: VendorAttachmentList[];

    public subject = new Subject<string>();

    batchUpdateItems: Item[];

    constructor(private http: HttpClient,
                private oauthService: OAuthService,
                private appService: AppService) { }

    sendNotification(notification: any) {
        this.subject.next(notification);
    }

    getVendorID() {
        if (!this.appService.currentMember) {
            this.appService.getCurrentMember().subscribe(
                (data) => {
                    //console.log('in');
                    //console.log(data);
                    this.appService.currentMember = data;
                    this.currentMember = data;
                    return this.currentMember.VendorID;
                }
            );
        } else {
            return this.appService.currentMember.VendorID;
        }
    }

    resetItems() {
        this.items = null;
    }
    
    defaultCurrentItemInsert() {
        if(this.duplicateItemInsert) {  
            const ItemInsert = this.duplicateItemInsert;          
            this.duplicateItemInsert = null;
            return ItemInsert;            
        }
        else {            
            return new ItemInsert(null, null, 'Toolots', 'simple', null, null, null, null, null, null, null, null, null, null, null, null, 'IN', null, 'LB', null, null, null, 'IN', null, 'LB', false, null, null, null, null, "CN", "", null, false, null, "CatalogAndSearch", null, null, null, null, null, "NotSubmitted", false, null, null, true, false, [], [], [], [], [], [], [], [], [], []);
        }
    }

    getCurrentItemEdit(id: number): Observable<Item> {
        if (this.currentItemEdit) {
            return of(this.currentItemEdit);
        }
        else {
            return this.getItem(id);
        }
    }

    getItems(): Observable<Item[]> {
        if (this.items) {
            return of(this.items);
        }
        return this.http.get<Item[]>(this.apiURL + '/item/overview')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.items = data),
                            catchError(this.handleError)
                        );
    }

    getPendingItems(): Observable<ItemBatch[]> {
        return this.http.get<ItemBatch[]>(this.apiURL + '/item/pending')
                        .pipe(
                            //tap(data => console.log(data)),
                            catchError(this.handleError)
                        );
    }

    getPartItems(): Observable<Item[]> {
        return this.http.get<Item[]>(this.apiURL + '/item/partoverview')
                        .pipe(
                            //tap(data => this.items = data),
                            catchError(this.handleError)
                        );
    }

    getCurrentItems() {
        return this.items;
    }

    refreshItems(): Observable<Item[]> {
        return this.http.get<Item[]>(this.apiURL + '/item/overview')
                        .pipe(
                            
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => {
                                this.items = data;
                                //console.log(this.items);
                            } ),
                            catchError(this.handleError)
                        );
    }

    getItemDuplicate(id: number): Observable<Item> {
        return this.http.get<Item>(this.apiURL + '/item/' + id)
        .pipe(
            //tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getItem(id: number): Observable<Item> {
        // if (this.items) {
        //     const foundItem = this.items.find(i => i.ItemID === id);
        //     return of(foundItem);
        // }
        return this.http.get<Item>(this.apiURL + '/item/' + id)
        .pipe(
            //tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getAllItem(id: number): Observable<Item> {
        return this.http.get<Item>(this.apiURL + '/item/' + id + '/all')
        .pipe(
            //tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    replaceItem(id: number, item: Item) {
        if (this.items) {
            //console.log(item);
            this.items[this.items.findIndex(i => i.ItemID === id)] = item;
            //console.log(this.items[this.items.findIndex(i => i.ItemID === id)] );
        }
    }

    copyItem(item: Item) {        
        const newItem = new Item(item.ItemID, item.VendorID, item.TPIN, item.Name, item.SKU, item.VendorSKU, item.FulfilledBy, item.ItemType
            , item.Quantity, item.MerchantQuantity, item.ShipWithinDays, item.PriceType, item.Price, item.FOBPrice, item.DropshipPrice, item.EbayPrice, item.SpecialPrice, item.SpecialFrom, item.SpecialTo
            , item.Width, item.Height, item.Length, item.ProductDimensionUOM, item.Weight, item.ProductWeightUOM
            , item.PackageWidth, item.PackageHeight, item.PackageLength, item.PackageDimensionUOM, item.PackageWeight, item.PackageWeightUOM
            , item.IsFreeShipping, item.ShippingFee, item.MetaTitle, item.MetaKeywords, item.MetaDescription, item.Origin, item.Warranty
            , item.MerchantWarranty, item.AddProtectionPlan, item.URLKey, item.Visibility, item.Description, item.ShortDescription, item.TechnicalDetail, item.AdditionalInformation
            , item.VendorBrandID, item.RequestApproval, item.RejectionReason, item.Status, item.Approval, item.ImagePath, item.IsPartItem, item.PartImageRaw, item.PartImageFilePath, item.PartIsNewImage, item.ExcludeGoogleShopping, item.UpdatedOn, item.CreatedOn
            , [], [], [], [], [], [], [], [], [], []
            , item.QtyOnHand, item.QtyAvailable, item.QtyOnOrder, item.QtyBackOrdered, item.MerchantQtyOnHand, item.MerchantQtyAvailable, item.MerchantQtyOnOrder, false);

        item.ItemCategoryAssignments.forEach((itemCategoryAssignment) => {
            const newItemCategoryAssignment = new ItemCategoryAssignment(itemCategoryAssignment.ItemCategoryID);
            newItem.ItemCategoryAssignments.push(newItemCategoryAssignment);
        });

        item.ItemOptions.forEach((itemOption) => {
            const newItemOption = new ItemOption(itemOption.ItemOptionID, itemOption.ItemID, itemOption.IsRequired, itemOption.Position
                , itemOption.Title, itemOption.Type, itemOption.UpdatedOn, itemOption.CreatedOn, [], itemOption.pendingAdd);

            itemOption.ItemSelections.forEach((itemSelection) => {
                const newItemSelection = new ItemSelection(itemSelection.ItemSelectionID, itemSelection.ItemOptionID, itemSelection.ItemID
                    , itemSelection.ItemName, itemSelection.ItemVendorSKU, itemSelection.TPIN, itemSelection.Position, itemSelection.IsDefault
                    , itemSelection.PriceValue, itemSelection.Qty, itemSelection.CanChangeQty, itemSelection.UpdatedOn, itemSelection.CreatedOn
                    , itemSelection.pendingAdd);

                newItemOption.ItemSelections.push(newItemSelection);
            });

            newItem.ItemOptions.push(newItemOption);
        });

        item.ItemTierPrices.forEach((itemTierPrice) => {
            const newItemTierPrice = new ItemTierPrice(itemTierPrice.ItemTierPriceID, itemTierPrice.ItemID, itemTierPrice.Quantity, itemTierPrice.Price
                , itemTierPrice.UpdatedOn, itemTierPrice.CreatedOn, itemTierPrice.pendingAdd);

            newItem.ItemTierPrices.push(newItemTierPrice);
        });

        item.ItemRelatedProducts.forEach((itemRelatedProduct) => {
            const newItemRelatedProduct = new ItemRelatedProduct(itemRelatedProduct.ItemRelatedProductID, itemRelatedProduct.ItemID
                , itemRelatedProduct.RelatedProductItemID, itemRelatedProduct.PrevRelatedProductItemID, itemRelatedProduct.RelatedItemName
                , itemRelatedProduct.RelatedItemVendorSKU, itemRelatedProduct.RelatedTPIN, itemRelatedProduct.Position, itemRelatedProduct.UpdatedOn
                , itemRelatedProduct.CreatedOn, itemRelatedProduct.ImagePath, itemRelatedProduct.pendingAdd);
                
            newItem.ItemRelatedProducts.push(newItemRelatedProduct);
        });

        item.ItemUpSells.forEach((itemUpSell) => {
            const newItemUpSell = new ItemUpSell(itemUpSell.ItemUpSellID, itemUpSell.ItemID
                , itemUpSell.UpSellItemID, itemUpSell.PrevUpSellItemID, itemUpSell.UpSellItemName
                , itemUpSell.UpSellItemVendorSKU, itemUpSell.UpSellTPIN, itemUpSell.Position, itemUpSell.UpdatedOn
                , itemUpSell.CreatedOn, itemUpSell.ImagePath, itemUpSell.pendingAdd);
                
            newItem.ItemUpSells.push(newItemUpSell);
        });

        item.ItemCrossSells.forEach((itemCrossSell) => {
            const newItemCrossSell = new ItemCrossSell(itemCrossSell.ItemCrossSellID, itemCrossSell.ItemID
                , itemCrossSell.CrossSellItemID, itemCrossSell.PrevCrossSellItemID, itemCrossSell.CrossSellItemName
                , itemCrossSell.CrossSellItemVendorSKU, itemCrossSell.CrossSellTPIN, itemCrossSell.Position, itemCrossSell.UpdatedOn
                , itemCrossSell.CreatedOn, itemCrossSell.ImagePath, itemCrossSell.pendingAdd);
                
            newItem.ItemCrossSells.push(newItemCrossSell);
        });

        item.ItemAttachments.forEach((itemAttachment) => {
            const newItemAttachment = new ItemAttachment(itemAttachment.VendorAttachmentItemID, itemAttachment.VendorAttachmentID, itemAttachment.Title
                , itemAttachment.FileName, itemAttachment.UploadedFile, itemAttachment.ItemID, itemAttachment.Position, itemAttachment.UpdatedOn
                , itemAttachment.CreatedOn, itemAttachment.pendingAdd);
                
            newItem.ItemAttachments.push(newItemAttachment);
        });

        item.ItemVideos.forEach((itemVideo) => {
            const newItemVideo = new ItemVideo(itemVideo.ItemVideoID, itemVideo.ItemID, itemVideo.Thumbnail, itemVideo.Value, itemVideo.Provider
                , itemVideo.Label, itemVideo.Description, itemVideo.Position, itemVideo.Exclude, itemVideo.Remove, itemVideo.UpdatedOn
                , itemVideo.CreatedOn, itemVideo.URL, itemVideo.pendingImage, itemVideo.pendingAdd);

            newItem.ItemVideos.push(newItemVideo);
        });

        item.ItemImages.forEach((itemImage) => {
            const newItemImage = new ItemImage(itemImage.ItemImageID, itemImage.ItemID, itemImage.Label, itemImage.Raw, itemImage.FilePath, itemImage.Position
                , itemImage.IsBaseImage, itemImage.IsSmallImage, itemImage.IsThumbnail, itemImage.IsRotatorImage, itemImage.Exclude, itemImage.Remove
                , itemImage.UpdatedOn, itemImage.CreatedOn, itemImage.IsNewImage, itemImage.pendingAdd);

            newItem.ItemImages.push(newItemImage);
        });

        

        item.ItemParts.forEach((itemPart) => {

            const newItemPart = new ItemPart(itemPart.ItemPartID, itemPart.ItemID
                , itemPart.PartLabel, itemPart.PartItemID, itemPart.PrevPartItemID, itemPart.PartItemName
                , itemPart.PartItemVendorSKU, itemPart.PartTPIN, itemPart.PartFOBPrice, itemPart.PartPrice, itemPart.ImageRaw, itemPart.ImageFilePath, itemPart.IsNewImage
                ,  itemPart.Position, itemPart.UpdatedOn
                , itemPart.CreatedOn, itemPart.pendingAdd, itemPart.isNew);

            newItem.ItemParts.push(newItemPart);
        });

        return newItem;
    }

    copyItemInsert(item: ItemInsert) {
        const newItemInsert = new ItemInsert(item.Name, item.VendorSKU, item.FulfilledBy, item.ItemType, item.MerchantQuantity, item.ShipWithinDays
            , item.PriceType, item.Price, item.FOBPrice, item.DropshipPrice, item.SpecialPrice, item.SpecialFrom, item.SpecialTo
            , item.Width, item.Height, item.Length, item.ProductDimensionUOM, item.Weight, item.ProductWeightUOM
            , item.PackageWidth, item.PackageHeight, item.PackageLength, item.PackageDimensionUOM, item.PackageWeight, item.PackageWeightUOM
            , item.IsFreeShipping, item.ShippingFee, item.MetaTitle, item.MetaKeywords, item.MetaDescription, item.Origin, item.Warranty, item.MerchantWarranty, item.AddProtectionPlan, item.URLKey
            , item.Visibility, item.Description, item.ShortDescription, item.TechnicalDetail, item.AdditionalInformation, item.VendorBrandID, item.Approval
            , item.IsPartItem, item.PartImageRaw, item.PartImageFilePath, item.PartIsNewImage, item.ExcludeGoogleShopping
            , [], [], [], [], [], [], [], [], [], []);

        item.ItemCategoryAssignments.forEach((itemCategoryAssignment) => {
            const newItemCategoryAssignment = new ItemCategoryAssignment(itemCategoryAssignment.ItemCategoryID);
            newItemInsert.ItemCategoryAssignments.push(newItemCategoryAssignment);
        });

        item.ItemOptions.forEach((itemOption) => {
            const newItemOption = new ItemOptionInsert(itemOption.IsRequired, itemOption.Position, itemOption.Title, itemOption.Type, []);

            itemOption.ItemSelections.forEach((itemSelection) => {
                const newItemSelection = new ItemSelectionInsert(itemSelection.ItemID, itemSelection.Position, itemSelection.IsDefault, itemSelection.PriceValue, itemSelection.Qty, itemSelection.CanChangeQty);                                
                newItemOption.ItemSelections.push(newItemSelection);
            });

            newItemInsert.ItemOptions.push(newItemOption);
        });

        item.ItemTierPrices.forEach((itemTierPrice) => {
            const newItemTierPrice = new ItemTierPriceInsert(itemTierPrice.ItemID, itemTierPrice.Quantity, itemTierPrice.Price);
            newItemInsert.ItemTierPrices.push(newItemTierPrice);
        });

        item.ItemRelatedProducts.forEach((itemRelatedProduct) => {
            const newItemRelatedProduct = new ItemRelatedProductInsert(itemRelatedProduct.ItemID, itemRelatedProduct.RelatedProductItemID, itemRelatedProduct.PrevRelatedProductItemID
                , itemRelatedProduct.RelatedItemName, itemRelatedProduct.RelatedItemVendorSKU, itemRelatedProduct.RelatedTPIN, itemRelatedProduct.ImagePath, itemRelatedProduct.Position);                
            newItemInsert.ItemRelatedProducts.push(newItemRelatedProduct);
        });

        item.ItemUpSells.forEach((itemUpSell) => {
            const newItemUpSell = new ItemUpSellInsert(itemUpSell.ItemID, itemUpSell.UpSellItemID, itemUpSell.PrevUpSellItemID, itemUpSell.UpSellItemName
                , itemUpSell.UpSellItemVendorSKU, itemUpSell.UpSellTPIN, itemUpSell.ImagePath, itemUpSell.Position);                
            newItemInsert.ItemUpSells.push(newItemUpSell);
        });

        item.ItemCrossSells.forEach((itemCrossSell) => {
            const newItemCrossSell = new ItemCrossSellInsert(itemCrossSell.ItemID, itemCrossSell.CrossSellItemID, itemCrossSell.PrevCrossSellItemID, itemCrossSell.CrossSellItemName
                , itemCrossSell.CrossSellItemVendorSKU, itemCrossSell.CrossSellTPIN, itemCrossSell.ImagePath, itemCrossSell.Position);
                
            newItemInsert.ItemCrossSells.push(newItemCrossSell);
        });

        item.ItemAttachments.forEach((itemAttachment) => {
            const newItemAttachment = new ItemAttachmentInsert(itemAttachment.VendorAttachmentID, itemAttachment.Title, itemAttachment.FileName, itemAttachment.UploadedFile
                , itemAttachment.ItemID, itemAttachment.Position);
            newItemInsert.ItemAttachments.push(newItemAttachment);
        });

        item.ItemVideos.forEach((itemVideo) => {
            const newItemVideo = new ItemVideoInsert(itemVideo.ItemID, itemVideo.Thumbnail, itemVideo.Value, itemVideo.Provider, itemVideo.Label
                , itemVideo.Description, itemVideo.Position, itemVideo.URL);
            newItemInsert.ItemVideos.push(newItemVideo);
        });

        item.ItemImages.forEach((itemImage) => {
            const newItemImage = new ItemImageInsert(itemImage.ItemID, itemImage.Label, itemImage.Raw, itemImage.FilePath, itemImage.Position, itemImage.IsBaseImage
                , itemImage.IsSmallImage, itemImage.IsThumbnail, itemImage.IsRotatorImage, itemImage.Exclude, itemImage.Remove, itemImage.IsNewImage);

            newItemInsert.ItemImages.push(newItemImage);
        });

        item.ItemPartSelections.forEach((itemPart) => {
            const newItemPart = new ItemPartSelectionInsert(itemPart.ItemID , itemPart.PartGroupID, itemPart.PrevPartGroupID, itemPart.PartGroupName, itemPart.ImageRaw
                ,  itemPart.ImageFilePath, itemPart.IsNewImage, itemPart.Position, itemPart.pendingAdd, itemPart.isNew, []);

            newItemInsert.ItemPartSelections.push(newItemPart);
        });

        return newItemInsert;
    }

    addItem(item: ItemInsert): Observable<Item> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<Item>(this.apiURL + '/item', item, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Add Item: ' + JSON.stringify(data))),
                                tap(data => {
                                    //this.items.push(data);
                                    if(this.items)
                                    {
                                        this.items.splice(0,0,data);
                                        this.currentItem = data;
                                    }
                                }),
                                catchError(this.handleError)
                            );
    }

    addPartItem(item: ItemInsert): Observable<Item> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<Item>(this.apiURL + '/item', item, { headers: headers } )
                            .pipe(
                                // tap(data => {
                                //     if(this.items)
                                //     {
                                //         this.items.splice(0,0,data);
                                //         this.currentItem = data;
                                //     }
                                // }),
                                catchError(this.handleError)
                            );
    }

    deleteItem(id: number): Observable<Item>  {
        return this.http.delete<Item>(this.apiURL + '/item/' + id )
                            .pipe(
                                //tap(data => console.log('Delete Item: ' + id)),
                                tap(data => {
                                    console.log(this.items);
                                    if(this.items && this.items.length > 0)
                                    {
                                        console.log(this.items);
                                        const foundIndex = this.items.findIndex(i => i.ItemID === id);
                                        console.log(foundIndex);
                                        if (foundIndex > -1) {
                                            this.items.splice(foundIndex, 1);
                                            this.currentItem = null;
                                        }    
                                    }
                                }),
                                catchError(this.handleError)
                            );
    }

    editItem(item: Item): Observable<Item>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<Item>(this.apiURL + '/item/' + item.ItemID, item, { headers: headers} )
                            .pipe(
                                //tap(data => console.log('Update Item: ' + item.ItemID)),
                                catchError(this.handleError)
                            );
    }

    editItemBatch(items: ItemBatch[]): Observable<ItemBatch[]>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<ItemBatch[]>(this.apiURL + '/item/batch', items, { headers: headers} )
                            .pipe(
                                //tap(data => console.log('Update Item: ' + item.ItemID)),
                                catchError(this.handleError)
                            );
    }

    getItemList()  {
        if (this.itemList && this.itemList.length > 0) {
            return of(this.itemList);
        }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.get<ItemList[]>(this.apiURL + '/item/itemlist', { headers: headers} )
                            .pipe(
                                //tap(data => console.log(JSON.stringify(data))),
                                tap(data => this.itemList = data),
                                catchError(this.handleError)
                            );
    }

    getSimpleItemList()  {
        if (this.simpleItemList && this.simpleItemList.length > 0) {
            return of(this.simpleItemList);
        }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.get<ItemList[]>(this.apiURL + '/item/simpleitemlist', { headers: headers} )
                            .pipe(
                                //tap(data => console.log(JSON.stringify(data))),
                                tap(data => this.simpleItemList = data),
                                catchError(this.handleError)
                            );
    }

    getAllItemList()  {
        if (this.allItemList && this.allItemList.length > 0) {
            return of(this.allItemList);
        }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.get<ItemList[]>(this.apiURL + '/item/allitemlist', { headers: headers} )
                            .pipe(
                                //tap(data => console.log(JSON.stringify(data))),
                                tap(data => this.allItemList = data),
                                catchError(this.handleError)
                            );
    }

    getAllSimpleItemList()  {
        if (this.allSimpleItemList && this.allSimpleItemList.length > 0) {
            return of(this.allSimpleItemList);
        }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.get<ItemList[]>(this.apiURL + '/item/allsimpleitemlist', { headers: headers} )
                            .pipe(
                                //tap(data => console.log(JSON.stringify(data))),
                                tap(data => this.allSimpleItemList = data),
                                catchError(this.handleError)
                            );
    }

    getPartItemList()  {
        // if (this.partItemList && this.partItemList.length > 0) {
        //     return of(this.partItemList);
        // }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.get<ItemList[]>(this.apiURL + '/item/partitemlist', { headers: headers} )
                            .pipe(
                                //tap(data => console.log(JSON.stringify(data))),
                                tap(data => this.partItemList = data),
                                catchError(this.handleError)
                            );
    }

    getCategories(id: number) {
        return this.http.get<Category[]>(this.apiURL + '/itemcategory/parentitemcategoryid/' + id)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    getCategoryBreadCrumbs(id: number) {
        return this.http.get<Category[]>(this.apiURL + '/itemcategory/' + id + '/breadcrumb')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    getItemOptions(id: number): Observable<ItemOption[]> {
        return this.http.get<ItemOption[]>(this.apiURL + '/itemoption/item/' + id)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    getItemTierPrices(id: number): Observable<ItemTierPrice[]> {
        return this.http.get<ItemTierPrice[]>(this.apiURL + '/itemtierprice/item/' + id)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    getItemCategoryAssignments(id: number): Observable<ItemCategoryAssignment[]> {
        return this.http.get<ItemCategoryAssignment[]>(this.apiURL + '/itemcategoryassignment/item/' + id)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            // errorMessage = `An error occurred: ${err.error.message}`;
            errorMessage = `Network error: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // errorMessage = `Backend returned code ${err.status}, body was: ${err.error.Message}`;
            errorMessage = `Response error: ${err.error.Message}`;
        }
        return throwError(errorMessage);
    }

    uploadImage(id: number, formData: FormData) {
        return this.http.post<any>(this.apiURL + '/itemimage/' + id + '/upload', formData )
            .pipe(
                //tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    uploadTempImage(id: string, formData: FormData) {        
        return this.http.post<any>(this.apiURL + '/itemimage/uploadtemp/' + id, formData )
            .pipe(
                //tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    uploadTempImages(id: string, formData: FormData) {
        return this.http.post<any>(this.apiURL + '/itemimage/uploadtemps/' + id, formData )
            .pipe(
                //tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getItemImages(id: number): Observable<ItemImage[]> {
        return this.http.get<ItemImage[]>(this.apiURL + '/itemimage/item/' + id)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    editItemImage(itemimages: ItemImage[]): Observable<ItemImage[]>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<ItemImage[]>(this.apiURL + '/itemimage/item/' + itemimages[0].ItemID, itemimages, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Update Item Image: ' + itemimages[0].ItemID)),
                                catchError(this.handleError)
                            );
    }

    getItemVideos(id: number): Observable<ItemVideo[]> {
        return this.http.get<ItemVideo[]>(this.apiURL + '/itemvideo/item/' + id)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    //Video
    getVideoURLDetail(id: string): Observable<URLVideo> {
        return this.http.get<URLVideo>('https://www.googleapis.com/youtube/v3/videos?id=' + id + '&part=snippet&key=AIzaSyDtJ4ncN9PcYj5oAsQTp4oT-djGj2MUItU')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }
    addItemVideo(itemVideo: ItemVideoInsert): Observable<ItemVideoInsert> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<ItemVideo>(this.apiURL + '/itemvideo', itemVideo, { headers: headers } )
                            .pipe(
                                tap(data => console.log('Add Item Video: ' + JSON.stringify(data))),
                                tap(data => {
                                    // this.items.push(data);
                                    // this.currentItem = data;
                                }),
                                catchError(this.handleError)
                            );
    }
    editItemVideo(itemVideos: ItemVideo[]): Observable<ItemVideo[]>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<ItemVideo[]>(this.apiURL + '/itemvideo/item/' + itemVideos[0].ItemID, itemVideos, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Update Item Video: ' + itemVideos[0].ItemID)),
                                catchError(this.handleError)
                            );
    }
    
    //Attachments
    getItemAttachments(id: number): Observable<ItemAttachment[]> {
        return this.http.get<ItemAttachment[]>(this.apiURL + '/vendorattachmentitem/item/' + id)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }    

    addItemAttachment(itemAttachment: ItemAttachmentInsert): Observable<ItemAttachmentInsert> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<ItemAttachment>(this.apiURL + '/vendorattachmentitem', itemAttachment, { headers: headers } )
                            .pipe(
                                tap(data => console.log('Add Item Attachment: ' + JSON.stringify(data))),
                                tap(data => {
                                }),
                                catchError(this.handleError)
                            );
    }
    editItemAttachments(itemAttachments: ItemAttachment[]): Observable<ItemAttachment[]>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<ItemAttachment[]>(this.apiURL + '/vendorattachmentitem/item/' + itemAttachments[0].ItemID, itemAttachments, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Update Item Video: ' + itemVideos[0].ItemID)),
                                catchError(this.handleError)
                            );
    }
    editItemAttachment(itemAttachment: ItemAttachment): Observable<ItemAttachment>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<ItemAttachment>(this.apiURL + '/vendorattachmentitem/' + itemAttachment.VendorAttachmentItemID, itemAttachment, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Update Item Video: ' + itemVideos[0].ItemID)),
                                catchError(this.handleError)
                            );
    }

    getAttachmentList()  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.get<VendorAttachmentList[]>(this.apiURL + '/vendorattachment/vendorattachmentlist', { headers: headers} )
                            .pipe(
                                //tap(data => console.log(JSON.stringify(data))),
                                tap(data => this.vendorattachmentlist = data),
                                catchError(this.handleError)
                            );
    }
    getAttachment(id: number): Observable<VendorAttachment> {
        return this.http.get<VendorAttachment>(this.apiURL + '/vendorattachment/' + id)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    deleteVendorAttachmentItem(id: number): Observable<VendorAttachment>  {
        return this.http.delete<VendorAttachment>(this.apiURL + '/vendorattachmentitem/' + id )
                            .pipe(
                                //tap(data => console.log('Delete Item: ' + id)),
                                catchError(this.handleError)
                            );
    }

    //Related Products
    getItemRelatedProducts(id: number): Observable<ItemRelatedProduct[]> {
        return this.http.get<ItemRelatedProduct[]>(this.apiURL + '/itemrelatedproduct/item/' + id)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    addItemRelatedProduct(itemRelatedProduct: ItemRelatedProductInsert): Observable<ItemRelatedProductInsert> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<ItemRelatedProductInsert>(this.apiURL + '/itemrelatedproduct', itemRelatedProduct, { headers: headers } )
                            .pipe(
                                tap(data => console.log('Add Item Related Product: ' + JSON.stringify(data))),
                                tap(data => {
                                }),
                                catchError(this.handleError)
                            );
    }
    editItemRelatedProduct(itemRelatedProduct: ItemRelatedProduct): Observable<ItemRelatedProduct>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<ItemRelatedProduct>(this.apiURL + '/itemrelatedproduct/' + itemRelatedProduct.ItemRelatedProductID, itemRelatedProduct, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Update Item Video: ' + itemVideos[0].ItemID)),
                                catchError(this.handleError)
                            );
    }
    deleteItemRelatedProduct(id: number): Observable<ItemRelatedProduct>  {
        return this.http.delete<ItemRelatedProduct>(this.apiURL + '/itemrelatedproduct/' + id )
                            .pipe(
                                //tap(data => console.log('Delete Item: ' + id)),
                                catchError(this.handleError)
                            );
    }

    //Up Sells
    getItemUpSells(id: number): Observable<ItemUpSell[]> {
        return this.http.get<ItemUpSell[]>(this.apiURL + '/itemupsell/item/' + id)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    addItemUpSell(itemUpSell: ItemUpSellInsert): Observable<ItemUpSellInsert> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<ItemUpSellInsert>(this.apiURL + '/itemupsell', itemUpSell, { headers: headers } )
                            .pipe(
                                tap(data => console.log('Add Item Up Sell: ' + JSON.stringify(data))),
                                tap(data => {
                                }),
                                catchError(this.handleError)
                            );
    }
    editItemUpSell(itemUpSell: ItemUpSell): Observable<ItemUpSell>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<ItemUpSell>(this.apiURL + '/itemupsell/' + itemUpSell.ItemUpSellID, itemUpSell, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Update Item Video: ' + itemVideos[0].ItemID)),
                                catchError(this.handleError)
                            );
    }
    deleteItemUpSell(id: number): Observable<ItemUpSell>  {
        return this.http.delete<ItemUpSell>(this.apiURL + '/itemupsell/' + id )
                            .pipe(
                                //tap(data => console.log('Delete Item: ' + id)),
                                catchError(this.handleError)
                            );
    }

    //Cross Sells
    getItemCrossSells(id: number): Observable<ItemCrossSell[]> {
        return this.http.get<ItemCrossSell[]>(this.apiURL + '/itemCrossSell/item/' + id)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    addItemCrossSell(itemCrossSell: ItemCrossSellInsert): Observable<ItemCrossSellInsert> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<ItemCrossSellInsert>(this.apiURL + '/itemCrossSell', itemCrossSell, { headers: headers } )
                            .pipe(
                                tap(data => console.log('Add Item Up Sell: ' + JSON.stringify(data))),
                                tap(data => {
                                }),
                                catchError(this.handleError)
                            );
    }
    editItemCrossSell(itemCrossSell: ItemCrossSell): Observable<ItemCrossSell>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<ItemCrossSell>(this.apiURL + '/itemCrossSell/' + itemCrossSell.ItemCrossSellID, itemCrossSell, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Update Item Video: ' + itemVideos[0].ItemID)),
                                catchError(this.handleError)
                            );
    }
    deleteItemCrossSell(id: number): Observable<ItemCrossSell>  {
        return this.http.delete<ItemCrossSell>(this.apiURL + '/itemCrossSell/' + id )
                            .pipe(
                                //tap(data => console.log('Delete Item: ' + id)),
                                catchError(this.handleError)
                            );
    }

    //Vendor Brand
    getVendorBrands(): Observable<VendorBrand[]> {
        return this.http.get<VendorBrand[]>(this.apiURL + '/vendorbrand')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    getVendorBrand(id: number): Observable<VendorBrand> {
        return this.http.get<VendorBrand>(this.apiURL + '/vendorbrand/' + id)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    //Item Parts
    getItemParts(id: number): Observable<ItemPart[]> {
        return this.http.get<ItemPart[]>(this.apiURL + '/itempart/item/' + id)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }

    //item batch update
    getItemBatchUpdate()  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.get<BatchUpdate[]>(this.apiURL + '/batchupdate/item', { headers: headers} )
                            .pipe(
                                //tap(data => console.log(JSON.stringify(data))),
                                catchError(this.handleError)
                            );
    }

    editItemBatchUpdate(batchUpdateValues: BatchUpdateValue[]): Observable<BatchUpdateValue[]>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<BatchUpdateValue[]>(this.apiURL + '/batchupdate', batchUpdateValues, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Update Item Video: ' + itemVideos[0].ItemID)),
                                catchError(this.handleError)
                            );
    }

    downloadItemLabel(id: number) {
        return this.http.get(this.apiURL + '/item/' + id + '/label', { responseType: 'blob' });
    }
    downloadItemLabelCount(id: number, count: number, border: string) {
        return this.http.get(this.apiURL + '/item/' + id + '/label/' + count + '/' + border, { responseType: 'blob' });
    }
    downloadItemLargeLabelCount(id: number, count: number, border: string) {
        return this.http.get(this.apiURL + '/item/' + id + '/largelabel/' + count + '/' + border, { responseType: 'blob' });
    }

    downloadPrintItemLabels(itemPrintLabels: ItemPrintLabel[], border: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
            
        });

        return this.http.post<Blob>(this.apiURL + '/item/printlabel/' + border, itemPrintLabels, {headers: headers, responseType: 'blob' as 'json' } )
                            .pipe(
                                tap(data => {
                                }),
                                catchError(this.handleError)
                            );
    }

    downloadPrintItemLargeLabels(itemPrintLabels: ItemPrintLabel[], border: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
            
        });

        return this.http.post<Blob>(this.apiURL + '/item/printlargelabel/' + border, itemPrintLabels, {headers: headers, responseType: 'blob' as 'json' } )
                            .pipe(
                                tap(data => {
                                }),
                                catchError(this.handleError)
                            );
    }

    importItemFile(formData: FormData) {
        return this.http.post<any>(this.apiURL + '/item/importitemfile', formData)
            .pipe(
                //tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    downloadItemTemplate() {
        return this.http.get(this.apiURL + '/item/downloaditemtemplate', { responseType: 'blob' });
    }

    rowColorConditions(i: number, collection: Array<any>, currentItemIndex: number, formDirty: boolean): string {
        const inputRow = i === collection.length-1 && currentItemIndex === i;
        const selectedInputRow = inputRow && formDirty;
        if (selectedInputRow) return '#F5F5F5';
        else if (inputRow) return '#E8E8E8';
        else if (currentItemIndex === i) return '#F5F5F5';
        else return '#FFFFFF';
    }
}
