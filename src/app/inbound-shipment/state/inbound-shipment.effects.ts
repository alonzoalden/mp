import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, map, catchError, take } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PurchaseOrderService } from '../purchase-order.service';
import { Router } from '@angular/router';
import { Member, MemberVendor } from '../../shared/class/member';
import { VendorBrand } from '../../shared/class/vendor-brand';
import { ItemList, Item, ItemCrossSellInsert, ItemUpSell, ItemUpSellInsert, ItemRelatedProduct, ItemRelatedProductInsert, ItemAttachmentInsert, ItemVideoInsert, ItemCategoryAssignment, ItemTierPrice, ItemBatch } from '../../shared/class/item';
import { Category } from '../../shared/class/category';
import { VendorAttachment, VendorAttachmentList } from '../../shared/class/vendor-attachment';
import { URLVideo } from '../../shared/class/item-video';
import { environment } from '../../../environments/environment';
import * as inboundShipmentActions from './inbound-shipment.actions';
import * as fromInboundShipment from '.';
import { BatchUpdate, BatchUpdateValue } from '../../shared/class/batch-update';
import { PurchaseOrder, PurchaseOrderLine, InboundShippingMethod, PurchaseOrderLineList, Carton } from '../../shared/class/purchase-order';
import { ItemService } from '../../item/item.service';

@Injectable()
export class InboundShipmentEffects {
    constructor(
        private router: Router,
        private store: Store<fromInboundShipment.State>,
        private inboundShipmentService: PurchaseOrderService,
        private itemService: ItemService,
        private actions$: Actions) { }


    @Effect()
    loadPurchaseOrderOverview$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.LoadPurchaseOrderOverview),
        mergeMap(() =>
            this.inboundShipmentService.getPurchaseOrderOverview().pipe(
                map((purchaseOrders: PurchaseOrder[]) => (new inboundShipmentActions.LoadPurchaseOrderOverviewSuccess(purchaseOrders))),
                catchError(err => {
                    of(new inboundShipmentActions.LoadPurchaseOrderOverviewFail(err));
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    loadPurchaseOrder$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.LoadPurchaseOrder),
        map((action: inboundShipmentActions.LoadPurchaseOrder) => action.payload),
        mergeMap((id: number) =>
            this.inboundShipmentService.getPurchaseOrder(id).pipe(
                map((purchaseOrder: PurchaseOrder) => (new inboundShipmentActions.LoadPurchaseOrderSuccess(purchaseOrder))),
                catchError(err => {
                    //this.router.navigate(['/inbound-shipment']);
                    of(new inboundShipmentActions.LoadPurchaseOrderFail(err));
                    return EMPTY;
                })
            )
        )
    );
    @Effect()
    loadCurrentPurchaseOrderEdit$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.LoadCurrentPurchaseOrderEdit),
        map((action: inboundShipmentActions.LoadCurrentPurchaseOrderEdit) => action.payload),
        mergeMap((id: number) =>
            this.inboundShipmentService.getCurrentPurchaseOrderEdit(id).pipe(
                map((purchaseOrder: PurchaseOrder) => (new inboundShipmentActions.LoadCurrentPurchaseOrderEditSuccess(purchaseOrder))),
                catchError(err => {
                    //this.router.navigate(['/inbound-shipment']);
                    of(new inboundShipmentActions.LoadCurrentPurchaseOrderEditFail(err));
                    return EMPTY;
                })
            )
        )
    );



    @Effect()
    loadPurchaseOrderLines$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.LoadPurchaseOrderLines),
        map((action: inboundShipmentActions.LoadPurchaseOrderLines) => action.payload),
        mergeMap((id: number) =>
            this.inboundShipmentService.getPurchaseOrderLines(id).pipe(
                map((purchaseorderlines: PurchaseOrderLine[]) => {
                    purchaseorderlines.forEach((value) => {
                        value.PrevItemID = value.ItemID;
                    });
                    //this.inboundShipmentService.updatePurchaseLineCartonQuantity(this.purchaseOrder);
                    this.inboundShipmentService.currentPurchaseOrderLines = purchaseorderlines;
                    return (new inboundShipmentActions.LoadPurchaseOrderLinesSuccess(purchaseorderlines));
            }),

                catchError(err => {
                    of(new inboundShipmentActions.LoadPurchaseOrderLinesFail(err));
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    loadPurchaseOrderLineList$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.LoadPurchaseOrderLineList),
        map((action: inboundShipmentActions.LoadPurchaseOrderLineList) => action.payload),
        mergeMap((id: number) =>
            this.inboundShipmentService.getPurchaseOrderLineList(id).pipe(
                map((purchaseOrder: PurchaseOrderLineList[]) => (new inboundShipmentActions.LoadPurchaseOrderLineListSuccess(purchaseOrder))),
                catchError(err => {
                    of(new inboundShipmentActions.LoadPurchaseOrderLineListFail(err));
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    loadInboundShippingMethods$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.LoadInboundShippingMethods),
        map((action: inboundShipmentActions.LoadInboundShippingMethods) => action.payload),
        mergeMap((id: number) =>
            this.inboundShipmentService.getInboundShippingMethods(id).pipe(
                map((inboundshippingmethods: InboundShippingMethod[]) => {
                    this.inboundShipmentService.currentInboundShippingMethods = inboundshippingmethods;
                    if (inboundshippingmethods && inboundshippingmethods[0]) {
                        this.inboundShipmentService.currentInboundShippingMethod = inboundshippingmethods[0];
                    } else {
                        const _inboundShippingMethod = new InboundShippingMethod(null, id, '', '', '', null, null);
                        this.inboundShipmentService.currentInboundShippingMethod = _inboundShippingMethod;
                        this.inboundShipmentService.currentInboundShippingMethods.push(_inboundShippingMethod);
                    }
                    return (new inboundShipmentActions.LoadInboundShippingMethodsSuccess(inboundshippingmethods));
                }),
                catchError(err => {
                    of(new inboundShipmentActions.LoadInboundShippingMethodsFail(err));
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    loadCartons$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.LoadCartons),
        map((action: inboundShipmentActions.LoadCartons) => action.payload),
        mergeMap((id: number) =>
            this.inboundShipmentService.getCartons(id).pipe(
                map((cartons: Carton[]) => (new inboundShipmentActions.LoadCartonsSuccess(cartons))),
                catchError(err => {
                    of(new inboundShipmentActions.LoadCartonsFail(err));
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
                    of(new inboundShipmentActions.AddNewPurchaseOrderFail(err));
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    editPurchaseOrder$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.EditPurchaseOrder),
        map((action: inboundShipmentActions.EditPurchaseOrder) => action.payload),
        mergeMap((payload) =>
            this.inboundShipmentService.editPurchaseOrder(payload.purchaseOrder).pipe(
                map((purchaseOrder: PurchaseOrder) => {
                    this.inboundShipmentService.replacePurchaseOrder(payload.purchaseOrder.PurchaseOrderID, payload.purchaseOrder);
                    this.inboundShipmentService.currentPurchaseOrderEdit = payload.purchaseOrder;
                    this.inboundShipmentService.currentPurchaseLineIsUpdated = false;
                    this.inboundShipmentService.sendNotification({ type: 'success', title: 'Successfully Updated', content: `${purchaseOrder.PurchaseOrderID} was saved` });
                    if (payload.printLabel) {
                        this.store.dispatch(new inboundShipmentActions.DownloadPurchaseOrderLabel(payload.purchaseOrder));
                    }
                    return (new inboundShipmentActions.EditPurchaseOrderSuccess(purchaseOrder));
                }),
                catchError(err => {
                    this.inboundShipmentService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new inboundShipmentActions.EditPurchaseOrderFail(err));
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    editPurchaseOrderThenPrintItemLabels$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.EditPurchaseOrderThenPrintItemLabels),
        map((action: inboundShipmentActions.EditPurchaseOrderThenPrintItemLabels) => action.payload),
        mergeMap((payload) =>
            this.inboundShipmentService.editPurchaseOrder(payload.purchaseOrder).pipe(
                map((purchaseOrder: PurchaseOrder) => {
                    this.inboundShipmentService.replacePurchaseOrder(payload.purchaseOrder.PurchaseOrderID, payload.purchaseOrder);
                    this.inboundShipmentService.currentPurchaseOrderEdit = payload.purchaseOrder;
                    this.inboundShipmentService.currentPurchaseLineIsUpdated = false;
                    this.inboundShipmentService.sendNotification({ type: 'success', title: 'Successfully Updated', content: `${purchaseOrder.PurchaseOrderID} was saved` });
                    if (payload.size == 'small') {
                        this.store.dispatch(new inboundShipmentActions.DownloadAllItemLabel({purchaseOrder: purchaseOrder, border: payload.border}));
                    } else {
                        this.store.dispatch(new inboundShipmentActions.DownloadAllItemLargeLabel({purchaseOrder: purchaseOrder, border: payload.border}));
                    }
                    return (new inboundShipmentActions.EditPurchaseOrderThenPrintItemLabelsSuccess(purchaseOrder));
                }),
                catchError(err => {
                    this.inboundShipmentService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new inboundShipmentActions.EditPurchaseOrderThenPrintItemLabelsFail(err));
                    return EMPTY;
                })
            )
        )
    );


    @Effect()
    addInboundShippingMethod$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.AddInboundShippingMethod),
        map((action: inboundShipmentActions.AddInboundShippingMethod) => action.payload),
        mergeMap((inboundshippingmethod: InboundShippingMethod) =>
            this.inboundShipmentService.editInboundShippingMethod(inboundshippingmethod).pipe(
                map((inboundshippingmethod: InboundShippingMethod) => {
                    this.inboundShipmentService.sendNotification({ type: 'success', title: 'Successfully Added', content: `${inboundshippingmethod.PurchaseOrderID} was saved` });
                    return (new inboundShipmentActions.AddInboundShippingMethodSuccess(inboundshippingmethod));
                }),
                catchError(err => {
                    this.inboundShipmentService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new inboundShipmentActions.AddInboundShippingMethodFail(err));
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    editInboundShippingMethod$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.EditInboundShippingMethod),
        map((action: inboundShipmentActions.EditInboundShippingMethod) => action.payload),
        mergeMap((inboundshippingmethod: InboundShippingMethod) =>
            this.inboundShipmentService.editInboundShippingMethod(inboundshippingmethod).pipe(
                map((inboundshippingmethod: InboundShippingMethod) => {
                    this.inboundShipmentService.sendNotification({ type: 'success', title: 'Successfully Updated', content: `${inboundshippingmethod.PurchaseOrderID} was saved` });
                    return (new inboundShipmentActions.EditInboundShippingMethodSuccess(inboundshippingmethod));
                }),
                catchError(err => {
                    this.inboundShipmentService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new inboundShipmentActions.EditInboundShippingMethodFail(err));
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
                    this.inboundShipmentService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: `${purchaseOrder.PackingSlipNumber} was deleted` });
                    return (new inboundShipmentActions.DeletePurchaseOrderSuccess(purchaseOrder.PurchaseOrderID));
                }),
                catchError(err => {
                    this.inboundShipmentService.sendNotification({ type: 'error', title: 'Error', content: err });
                    of(new inboundShipmentActions.DeletePurchaseOrderFail(err));
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
                    of(new inboundShipmentActions.DownloadPurchaseOrderLabelFail(err));
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    downloadAllCartonLabel$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.DownloadAllCartonLabel),
        map((action: inboundShipmentActions.DownloadAllCartonLabel) => action.payload),
        mergeMap((purchaseOrder: PurchaseOrder) =>
            this.inboundShipmentService.downloadAllCartonLabel(purchaseOrder.PurchaseOrderID, 'yes').pipe(
                map((data: Blob) => {
                    const blob = new Blob([data], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = 'Carton_' +  purchaseOrder.PurchaseOrderID;
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
                    a.download = 'Carton_' +  purchaseOrder.PurchaseOrderID;
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
                    return (new inboundShipmentActions.DownloadPurchaseOrderLabelSuccess(data));
                }),
                catchError(err => {
                    of(new inboundShipmentActions.DownloadPurchaseOrderLabelFail(err));
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    downloadAllItemLabel$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.DownloadAllItemLabel),
        map((action: inboundShipmentActions.DownloadAllItemLabel) => action.payload),
        mergeMap((payload: { purchaseOrder: PurchaseOrder, border: string }) =>
            this.inboundShipmentService.downloadAllItemLabel(payload.purchaseOrder.PurchaseOrderID, payload.border).pipe(
                map((data: Blob) => {
                    const blob = new Blob([data], {type: 'application/pdf'});
                    const blobUrl = URL.createObjectURL(blob);
                    if (window.navigator.msSaveOrOpenBlob) {
                        const fileName = 'Item_' +  payload.purchaseOrder.PackingSlipNumber;
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
                        a.download = 'Item_' + payload.purchaseOrder.PackingSlipNumber;
                        document.body.appendChild(a);
                        a.target = '_blank';
                        a.click();

                        document.body.removeChild(a);
                        URL.revokeObjectURL(fileURL);
                    }
                    return (new inboundShipmentActions.DownloadAllItemLabelSuccess(data));
                }),
                catchError(err => {
                    of(new inboundShipmentActions.DownloadAllItemLabelFail(err));
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    downloadAllItemLargeLabel$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.DownloadAllItemLargeLabel),
        map((action: inboundShipmentActions.DownloadAllItemLargeLabel) => action.payload),
        mergeMap((payload: { purchaseOrder: PurchaseOrder, border: string}) =>
            this.inboundShipmentService.downloadAllItemLargeLabel(payload.purchaseOrder.PurchaseOrderID, payload.border).pipe(
                map((data: Blob) => {

                    const blob = new Blob([data], {type: 'application/pdf'});
                    const blobUrl = URL.createObjectURL(blob);
                    if (window.navigator.msSaveOrOpenBlob) {
                        const fileName = 'Item_' + payload.purchaseOrder.PackingSlipNumber + '_Large';
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
                        a.download = 'Item_' + payload.purchaseOrder.PackingSlipNumber + '_Large';
                        document.body.appendChild(a);
                        a.target = '_blank';
                        a.click();

                        document.body.removeChild(a);
                        URL.revokeObjectURL(fileURL);
                    }
                    return (new inboundShipmentActions.DownloadAllItemLargeLabelSuccess(data));
                }),
                catchError(err => {
                    of(new inboundShipmentActions.DownloadAllItemLargeLabelFail(err));
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    downloadCartonLabelCount$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.DownloadCartonLabelCount),
        map((action: inboundShipmentActions.DownloadCartonLabelCount) => action.payload),
        mergeMap((payload: { carton: Carton, count: number, border: string}) =>
            this.inboundShipmentService.downloadCartonLabelCount(payload.carton.CartonID, payload.count, payload.border).pipe(
                map((data: Blob) => {
                    const blob = new Blob([data], {type: 'application/pdf'});
                    const blobUrl = URL.createObjectURL(blob);
                    if (window.navigator.msSaveOrOpenBlob) {
                        const fileName = payload.carton.CartonNumber;
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
                        a.download = payload.carton.CartonNumber;
                        document.body.appendChild(a);
                        a.target = '_blank';
                        a.click();

                        document.body.removeChild(a);
                        URL.revokeObjectURL(fileURL);
                    }
                    return (new inboundShipmentActions.DownloadAllItemLargeLabelSuccess(data));
                }),
                catchError(err => {
                    of(new inboundShipmentActions.DownloadAllItemLargeLabelFail(err));
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    downloadItemLabelCount$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.DownloadItemLabelCount),
        map((action: inboundShipmentActions.DownloadItemLabelCount) => action.payload),
        mergeMap((payload: { purchaseorderline: PurchaseOrderLine, count: number, border: string}) =>
            this.inboundShipmentService.downloadItemLabelCount(payload.purchaseorderline.ItemID, payload.count, payload.border).pipe(
                map((data: Blob) => {
                    const blob = new Blob([data], {type: 'application/pdf'});
                    const blobUrl = URL.createObjectURL(blob);
                    if (window.navigator.msSaveOrOpenBlob) {
                        const fileName = payload.purchaseorderline.TPIN;
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
                        a.download = payload.purchaseorderline.TPIN;
                        document.body.appendChild(a);
                        a.target = '_blank';
                        a.click();

                        document.body.removeChild(a);
                        URL.revokeObjectURL(fileURL);
                    }
                    return (new inboundShipmentActions.DownloadItemLabelCountSuccess(data));
                }),
                catchError(err => {
                    of(new inboundShipmentActions.DownloadItemLabelCountFail(err));
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    downloadItemLargeLabelCount$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.DownloadItemLargeLabelCount),
        map((action: inboundShipmentActions.DownloadItemLargeLabelCount) => action.payload),
        mergeMap((payload: { purchaseorderline: PurchaseOrderLine, count: number, border: string}) =>
            this.inboundShipmentService.downloadItemLabelCount(payload.purchaseorderline.ItemID, payload.count, payload.border).pipe(
                map((data: Blob) => {
                    const blob = new Blob([data], {type: 'application/pdf'});
                    const blobUrl = URL.createObjectURL(blob);
                    if (window.navigator.msSaveOrOpenBlob) {
                        const fileName = payload.purchaseorderline.TPIN;
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
                        a.download = payload.purchaseorderline.TPIN;
                        document.body.appendChild(a);
                        a.target = '_blank';
                        a.click();

                        document.body.removeChild(a);
                        URL.revokeObjectURL(fileURL);
                    }
                    return (new inboundShipmentActions.DownloadItemLargeLabelCountSuccess(data));
                }),
                catchError(err => {
                    of(new inboundShipmentActions.DownloadItemLargeLabelCountFail(err));
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    loadSimpleItemList$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.LoadSimpleItemList),
        mergeMap(() =>
            this.itemService.getSimpleItemList().pipe(
                map((itemlists: ItemList[]) => (new inboundShipmentActions.LoadSimpleItemListSuccess(itemlists))),
                catchError(err => {
                    of(new inboundShipmentActions.LoadSimpleItemListFail(err));
                    return EMPTY;
                })
            )
        )
    );

    @Effect()
    updatePurchaseLineCartonQuantity$: Observable<Action> = this.actions$.pipe(
        ofType(inboundShipmentActions.InboundShipmentActionTypes.UpdatePurchaseLineCartonQuantity),
        map((action: inboundShipmentActions.UpdatePurchaseLineCartonQuantity) => {
            console.log(action.payload);
            // state.currentPurchaseOrder.PurchaseOrderLines.forEach((purchaseorderline) => {
            //     purchaseorderline.CartonQuantity = 0;
            // });

            // state.currentPurchaseOrder.Cartons.forEach((carton, ci) => {
            //     carton.CartonLines.forEach((cartonline, cli) => {
            //         if (!cartonline.pendingAdd) {
            //             const purchaseorderline = state.currentPurchaseOrder.PurchaseOrderLines.find(x => x.PurchaseOrderLineID === cartonline.PurchaseOrderLineID);
            //             if (purchaseorderline) {
            //                 purchaseorderline.CartonQuantity += cartonline.Quantity;
            //                 this.replacePurchaseOrderLine(cartonline.PurchaseOrderLineID, purchaseorderline);

            //                 state.currentPurchaseOrder.PurchaseOrderLines[state.currentPurchaseOrder.PurchaseOrderLines.findIndex(i => i.PurchaseOrderLineID === cartonline.PurchaseOrderLineID)] = purchaseorderline;
            //             }
            //         }
            //     });
            // })
            return (new inboundShipmentActions.UpdatePurchaseLineCartonQuantity(action.payload));
        }),
        // mergeMap((purchaseorder) =>

        //     (new inboundShipmentActions.UpdatePurchaseLineCartonQuantity(purchaseorder))


        //     // this.itemService.getSimpleItemList().pipe(
        //     //     map((itemlists: ItemList[]) => (new inboundShipmentActions.UpdatePurchaseLineCartonQuantitySuccess(itemlists))),
        //     //     catchError(err => {
        //     //         of(new inboundShipmentActions.LoadSimpleItemListFail(err))
        //     //         return EMPTY;
        //     //     })
        //     // )
        // )
    );






}
