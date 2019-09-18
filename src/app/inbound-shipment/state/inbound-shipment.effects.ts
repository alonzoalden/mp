import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PurchaseOrderService } from '../purchase-order.service';
import { Router } from '@angular/router';
import { Member, MemberVendor } from 'app/shared/class/member';
import { VendorBrand } from 'app/shared/class/vendor-brand';
import { ItemList, Item, ItemCrossSellInsert, ItemUpSell, ItemUpSellInsert, ItemRelatedProduct, ItemRelatedProductInsert, ItemAttachmentInsert, ItemVideoInsert, ItemCategoryAssignment, ItemTierPrice, ItemBatch } from 'app/shared/class/item';
import { Category } from 'app/shared/class/category';
import { VendorAttachment, VendorAttachmentList } from 'app/shared/class/vendor-attachment';
import { URLVideo } from 'app/shared/class/item-video';
import { environment } from 'environments/environment';
import * as inboundShipmentActions from './inbound-shipment.actions';
import * as fromInboundShipment from '.';
import { BatchUpdate, BatchUpdateValue } from 'app/shared/class/batch-update';
import { PurchaseOrder } from 'app/shared/class/purchase-order';

@Injectable()
export class InboundShipmentEffects {
    constructor(
        private router: Router,
        private store: Store<fromInboundShipment.State>,
        private inboundShipmentService: PurchaseOrderService,
        private actions$: Actions) { }
    
    
    @Effect()
    loadPurchaseOrderOverview$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.LoadPurchaseOrderOverview),
        mergeMap(() =>
            this.inboundShipmentService.getPurchaseOrderOverview().pipe(
                map((purchaseOrders: PurchaseOrder[]) => (new inboundShipmentActions.LoadPurchaseOrderOverviewSuccess(purchaseOrders))),
                catchError(err => {
                    of(new inboundShipmentActions.LoadPurchaseOrderOverviewFail(err))
                    return EMPTY;
                })
            )
        )
    );
    
    @Effect()
    addNewPurchaseOrder$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.AddNewPurchaseOrder),
        mergeMap(() =>
            this.inboundShipmentService.addPurchaseOrder().pipe(
                map((purchaseOrder: PurchaseOrder) => {
                    this.inboundShipmentService.sendNotification({ type: 'success', title: 'Successfully Added', content: `${purchaseOrder.PurchaseOrderID} was added` });
                    this.router.navigate(['/inbound-shipment', purchaseOrder.PurchaseOrderID, 'edit']);
                    return (new inboundShipmentActions.AddNewPurchaseOrderSuccess(purchaseOrder));
                }),
                catchError(err => {
                    of(new inboundShipmentActions.AddNewPurchaseOrderFail(err))
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    deletePurchaseOrder$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.DeletePurchaseOrder),
        map((action: inboundShipmentActions.DeletePurchaseOrder) => action.payload),
        mergeMap((purchaseOrder: PurchaseOrder) =>
            this.inboundShipmentService.deletePurchaseOrder(purchaseOrder.PurchaseOrderID).pipe(
                map(() => {
                    this.inboundShipmentService.sendNotification({ type: 'success', title: 'Successfully Added', content: `${purchaseOrder.PurchaseOrderID} was deleted` });
                    return (new inboundShipmentActions.DeletePurchaseOrderSuccess(purchaseOrder.PurchaseOrderID));
                }),
                catchError(err => {
                    of(new inboundShipmentActions.DeletePurchaseOrderFail(err))
                    return EMPTY;
                })
            )
        )
    );
    

    @Effect()
    downloadPurchaseOrderLabel$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.DownloadPurchaseOrderLabel),
        map((action: inboundShipmentActions.DownloadPurchaseOrderLabel) => action.payload),
        mergeMap((purchaseOrder: PurchaseOrder) =>
            this.inboundShipmentService.downloadPurchaseOrderLabel(purchaseOrder.PurchaseOrderID).pipe(
                map((data: Blob) => {
                    const blob = new Blob([data], {type: 'application/pdf'});
                    const blobUrl = URL.createObjectURL(blob);
                    if (window.navigator.msSaveOrOpenBlob) {
                        const fileName = purchaseOrder.PackingSlipNumber;
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
                        a.download = purchaseOrder.PackingSlipNumber;
                        document.body.appendChild(a);
                        a.target = '_blank';
                        a.click();

                        document.body.removeChild(a);
                        URL.revokeObjectURL(fileURL);
                    }
                    return (new inboundShipmentActions.DownloadPurchaseOrderLabelSuccess(data));
                }),
                catchError(err => {
                    of(new inboundShipmentActions.DownloadPurchaseOrderLabelFail(err))
                    return EMPTY;
                })
            )
        )
    );
}