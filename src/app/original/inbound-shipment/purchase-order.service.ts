import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PurchaseOrder, PurchaseOrderLine, PurchaseOrderLineInsert, PurchaseOrderLineList, Carton, CartonInsert, CartonLine, CartonLineInsert, PurchaseOrderLineConfirm } from '../../shared/class/purchase-order';
import { ItemList } from '../../shared/class/item';
import { OAuthService } from 'angular-oauth2-oidc';
import { InboundShippingMethod, InboundShippingMethodInsert } from '../../shared/class/inbound-shipping-method';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import * as fromInboundShipment from './state';
import { NotificationComponent } from '../../shared/tool/notification/notification.component';
import { CustomPrintLabel } from 'app/shared/class/label';


@Injectable()
export class PurchaseOrderService {
    private apiURL = environment.webapiURL;

    private purchaseorders: PurchaseOrder[];
    currentPurchaseOrder: PurchaseOrder;
    currentPurchaseOrderEdit: PurchaseOrder;

    private inboundShippingMethods: InboundShippingMethod[];
    currentInboundShippingMethods: InboundShippingMethod[];
    currentInboundShippingMethod: InboundShippingMethod;

    private purchaseorderlines: PurchaseOrderLine[];
    private itemList: ItemList[];
    currentPurchaseOrderLines: PurchaseOrderLine[];
    currentPurchaseOrderLine: PurchaseOrderLine;

    private cartons: Carton[];
    //currentCarton: Carton;
    currentCarton = new Subject<Carton>();
    currentPurchaseOrderID: number;

    private cartonlines: CartonLine[];
    //currentCartonLines: CartonLine[];
    currentCartonLines = new Subject<CartonLine[]>();
    currentCartonLine: CartonLine;
    currentCartonID: number;

    currentCartonIsUpdated: boolean;
    currentPurchaseLineIsUpdated: boolean;
    newCartonLineIsSelected: boolean;
    currentStep: number;

    private purchaseorderlineList: PurchaseOrderLineList[];

    public subject = new Subject<string>();

    constructor(
        private http: HttpClient,
        private oauthService: OAuthService,
        private notificationComponent: NotificationComponent,
        private store: Store<fromInboundShipment.State>) { }

    sendNotification(notification: any) {
        this.notificationComponent.notify(notification);
    }

    resetPurchaseOrders() {
        this.purchaseorders = null;
    }

    // Purchase Orders
    getPurchaseOrders(): Observable<PurchaseOrder[]> {
        if (this.purchaseorders) {
            return of(this.purchaseorders);
        }
        return this.http.get<PurchaseOrder[]>(this.apiURL + '/purchaseorder')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.purchaseorders = data),
                            catchError(this.handleError)
                        );
    }
    getPurchaseOrderOverview(): Observable<PurchaseOrder[]> {
        // if (this.purchaseorders) {
        //     return of(this.purchaseorders);
        // }
        return this.http.get<PurchaseOrder[]>(this.apiURL + '/purchaseorder/overview')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.purchaseorders = data),
                            catchError(this.handleError)
                        );
    }
    refreshPurchaseOrders(): Observable<PurchaseOrder[]> {
        return this.http.get<PurchaseOrder[]>(this.apiURL + '/purchaseorder')
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.purchaseorders = data),
                            catchError(this.handleError)
                        );
    }
    getPurchaseOrder(id: number): Observable<PurchaseOrder> {
        // if (this.purchaseorders) {
        //     const foundItem = this.purchaseorders.find(item => item.PurchaseOrderID === id);
        //     return of(foundItem);
        // }
        return this.http.get<PurchaseOrder>(this.apiURL + '/purchaseorder/' + id)
                    .pipe(
                        //tap(data => console.log(JSON.stringify(data))),
                        catchError(this.handleError)
                    );
    }

    copyPurchaseOrder(purchaseorder: PurchaseOrder) {
        const newPurchaseOrder = new PurchaseOrder(purchaseorder.PurchaseOrderID, purchaseorder.TransactionDate, purchaseorder.ShipmentDate,
            purchaseorder.PackingSlipNumber, purchaseorder.Status, purchaseorder.UpdatedOn, purchaseorder.CreatedOn, [], [], []);

        purchaseorder.PurchaseOrderLines.forEach((purchaseorderline) => {
            const newPurchaseorderline = new PurchaseOrderLine(purchaseorderline.PurchaseOrderLineID, purchaseorderline.PurchaseOrderID, purchaseorderline.ItemID,
                purchaseorderline.ItemName, purchaseorderline.ItemVendorSKU, purchaseorderline.TPIN, purchaseorderline.URLKey, purchaseorderline.FOBPrice, purchaseorderline.Quantity,
                purchaseorderline.CartonQuantity, purchaseorderline.ReceivedQty, purchaseorderline.UpdatedOn, purchaseorderline.CreatedOn, purchaseorderline.PrevItemID, purchaseorderline.pendingAdd, []);

            if (purchaseorderline.PurchaseOrderLineConfirms) {
                purchaseorderline.PurchaseOrderLineConfirms.forEach((confirm) => {
                    const newPurchaseOrderLineConfirm = new PurchaseOrderLineConfirm(
                        confirm.PurchaseOrderLineID, confirm.CartonNumber, confirm.ShippedQuantity, confirm.ConfirmedQuantity
                    );
                    newPurchaseorderline.PurchaseOrderLineConfirms.push(newPurchaseOrderLineConfirm);
                });
            }
            newPurchaseOrder.PurchaseOrderLines.push(newPurchaseorderline);
        });

        purchaseorder.Cartons.forEach((carton) => {
            const newCarton = new Carton(carton.CartonID, carton.PurchaseOrderID, carton.PackingSlipNumber, carton.CartonNumber, carton.Position,
                carton.Length, carton.Width, carton.Height, carton.Weight, carton.LabelQty, carton.UpdatedOn, carton.CreatedOn, [], carton.pendingAdd);
            if (carton.CartonLines) {
                carton.CartonLines.forEach((cartonline) => {
                    const newCartonLine = new CartonLine(cartonline.CartonLineID, cartonline.CartonID, cartonline.PurchaseOrderID, cartonline.PurchaseOrderLineID, cartonline.ItemName,
                        cartonline.ItemVendorSKU, cartonline.TPIN, cartonline.URLKey, cartonline.Quantity, cartonline.RemainingQuantity, cartonline.UpdatedOn, cartonline.CreatedOn, cartonline.PrevPurchaseOrderLineID, cartonline.pendingAdd);

                    newCarton.CartonLines.push(newCartonLine);
                });
            }

            newPurchaseOrder.Cartons.push(newCarton);
        });

        purchaseorder.InboundShippingMethods.forEach((inboundshippingmethod) => {
            const newInboundShippingMethod = new InboundShippingMethod(inboundshippingmethod.InboundShippingMethodID, inboundshippingmethod.PurchaseOrderID, inboundshippingmethod.Title,
                inboundshippingmethod.BillingOfLading, inboundshippingmethod.ContainerNumber, inboundshippingmethod.UpdatedOn, inboundshippingmethod.CreatedOn);

            newPurchaseOrder.InboundShippingMethods.push(newInboundShippingMethod);
        });

        return newPurchaseOrder;
    }

    getCurrentPurchaseOrderEdit(id: number): Observable<PurchaseOrder> {
        if (this.currentPurchaseOrderEdit) {
            return of(this.currentPurchaseOrderEdit);
        }
        return this.getPurchaseOrder(id);
    }

    replacePurchaseOrder(id: number, purchaseorder: PurchaseOrder) {
        if (this.purchaseorders) {
            this.purchaseorders[this.purchaseorders.findIndex(i => i.PurchaseOrderID === id)] = purchaseorder;
        }
    }

    addPurchaseOrder(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<PurchaseOrder>(this.apiURL + '/purchaseorder', null, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Add Purchase Order: ' + JSON.stringify(data))),
                                tap(data => {
                                    //this.purchaseorders.push(data);
                                    //this.purchaseorders.splice(0,0,data);
                                    this.currentPurchaseOrder = data;
                                }),
                                catchError(this.handleError)
                            );
    }
    deletePurchaseOrder(id: number): Observable<PurchaseOrder>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.delete<PurchaseOrder>(this.apiURL + '/purchaseorder/' + id, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Delete Purchase Order: ' + id)),
                                tap(data => {
                                    const foundIndex = this.purchaseorders.findIndex(po => po.PurchaseOrderID === id);
                                    if (foundIndex > -1) {
                                        this.purchaseorders.splice(foundIndex, 1);
                                        this.currentPurchaseOrder = null;
                                    }
                                }),
                                catchError(this.handleError)
                            );
    }
    editPurchaseOrder(purchaseorder: PurchaseOrder): Observable<PurchaseOrder>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
         });
        return this.http.put<PurchaseOrder>(this.apiURL + '/purchaseorder/' + purchaseorder.PurchaseOrderID, purchaseorder, { headers: headers} )
                            .pipe(
                                //tap(data => console.log('Update Purchase Order: ' + purchaseorder.PurchaseOrderID)),
                                catchError(this.handleError)
                            );
    }
    getPurchaseOrderStatus(id: number) {
        const orderStatus = this.purchaseorders.find(purchseorder => purchseorder.PurchaseOrderID === id).Status;
        return orderStatus;
    }
    downloadPurchaseOrderLabel(id: number) {
        return this.http.get(this.apiURL + '/purchaseorder/' + id + '/packingslip', { responseType: 'blob' });
    }

    // Inbound Shipping Method
    defaultCurrentInboundShipment(purchaseorderid: number) {
        return new InboundShippingMethod(null, purchaseorderid, '', '', '', null, null);
    }
    getInboundShippingMethods(purchaseorderid: number): Observable<InboundShippingMethod[]> {
        if (this.inboundShippingMethods && this.inboundShippingMethods.length > 0 && this.inboundShippingMethods[0].PurchaseOrderID === purchaseorderid) {
            return of(this.inboundShippingMethods);
        }
        return this.http.get<InboundShippingMethod[]>(this.apiURL + '/inboundshippingmethod/purchaseorder/' + purchaseorderid)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.inboundShippingMethods = data),
                            catchError(this.handleError)
                        );
    }
    refreshInboundShippingMethods(purchaseorderid: number): Observable<InboundShippingMethod[]> {
        return this.http.get<InboundShippingMethod[]>(this.apiURL + '/inboundshippingmethod/purchaseorder/' + purchaseorderid)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.inboundShippingMethods = data),
                            catchError(this.handleError)
                        );
    }
    clearInboundShippingMethods() {
        this.inboundShippingMethods = null;
    }
    getCurrentInboundShippingMethods() {
        return this.inboundShippingMethods;
    }
    getInboundShippingMethod(id: number): Observable<InboundShippingMethod> {
        if (this.inboundShippingMethods) {
            const foundItem = this.inboundShippingMethods.find(sm => sm.InboundShippingMethodID === id);
            return of(foundItem);
        }
        return this.http.get<InboundShippingMethod>(this.apiURL + '/inboundshippingmethod/' + id)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    }
    addInboundShippingMethod(inboundShippingMethod: InboundShippingMethodInsert): Observable<InboundShippingMethodInsert> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<InboundShippingMethod>(this.apiURL + '/inboundshippingmethod', inboundShippingMethod, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Add Inbound Shipping Method: ' + JSON.stringify(data))),
                                tap(data => {
                                    this.inboundShippingMethods.push(data);
                                    this.currentInboundShippingMethod = data;
                                }),
                                catchError(this.handleError)
                            );
    }
    deletedInboundShippingMethod(id: number): Observable<InboundShippingMethod>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.delete<InboundShippingMethod>(this.apiURL + '/inboundshippingmethod/' + id, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Delete Inbound Shipping Method: ' + id)),
                                tap(data => {
                                    const foundIndex = this.inboundShippingMethods.findIndex(sm => sm.InboundShippingMethodID === id);
                                    if (foundIndex > -1) {
                                        this.inboundShippingMethods.splice(foundIndex, 1);
                                        this.currentInboundShippingMethod = null;
                                    }
                                }),
                                catchError(this.handleError)
                            );
    }
    editInboundShippingMethod(inboundShippingMethod: InboundShippingMethod): Observable<InboundShippingMethod>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<InboundShippingMethod>(this.apiURL + '/inboundshippingmethod/' + inboundShippingMethod.InboundShippingMethodID, inboundShippingMethod, { headers: headers} )
                            .pipe(
                                tap(data => {
                                    //console.log('Update Inbound Shipping Method: ' + inboundShippingMethod.InboundShippingMethodID);
                                    this.currentInboundShippingMethod = data;
                                    if (this.inboundShippingMethods) {
                                        this.inboundShippingMethods[this.inboundShippingMethods.findIndex(sm => sm.InboundShippingMethodID === data.InboundShippingMethodID)] = data;
                                    }
                                }),
                                catchError(this.handleError)
                            );
    }

    // Purchase Order Lines
    getPurchaseOrderLines(purchaseorderid: number): Observable<PurchaseOrderLine[]> {
        // if (this.purchaseorderlines && this.purchaseorderlines.length > 0 && this.purchaseorderlines[0].PurchaseOrderID === purchaseorderid) {
        //     return of(this.purchaseorderlines);
        // }
        return this.http.get<PurchaseOrderLine[]>(this.apiURL + '/purchaseorderline/purchaseorder/' + purchaseorderid)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.purchaseorderlines = data),
                            catchError(this.handleError)
                        );
    }
    refreshPurchaseOrderLines(purchaseorderid: number): Observable<PurchaseOrderLine[]> {
        return this.http.get<PurchaseOrderLine[]>(this.apiURL + '/purchaseorderline/purchaseorder/' + purchaseorderid)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => {
                                this.purchaseorderlines = data;
                            }),
                            catchError(this.handleError)
                        );
    }
    clearPurchaseOrderLines() {
        this.purchaseorderlines = null;
    }
    getCurrentPurchaseOrderLines() {
        return this.purchaseorderlines;
    }
    getPurchaseOrderLine(id: number): Observable<PurchaseOrderLine> {
        if (this.purchaseorderlines) {
            const foundItem = this.purchaseorderlines.find(item => item.PurchaseOrderLineID === id);
            return of(foundItem);
        }
        return this.http.get<PurchaseOrderLine>(this.apiURL + '/purchaseorderline/' + id)
        .pipe(
            //tap(data => console.log(JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    replacePurchaseOrderLine(id: number, purchaseorderline: PurchaseOrderLine) {
        if (this.purchaseorderlines) {
            this.purchaseorderlines[this.purchaseorderlines.findIndex(i => i.PurchaseOrderLineID === id)] = purchaseorderline;
        }
    }
    addPurchaseOrderLine(purchaseorderline: PurchaseOrderLineInsert): Observable<PurchaseOrderLineInsert> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<PurchaseOrderLine>(this.apiURL + '/purchaseorderline', purchaseorderline, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Add Purchase Order Line: ' + JSON.stringify(data))),
                                tap(data => {
                                    this.purchaseorderlines.push(data);
                                    //this.currentPurchaseOrderLines.push(data);
                                    this.currentPurchaseOrderLine = data;
                                }),
                                catchError(this.handleError)
                            );
    }
    deletePurchaseOrderLine(id: number): Observable<PurchaseOrderLine>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.delete<PurchaseOrderLine>(this.apiURL + '/purchaseorderline/' + id, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Delete Purchase Order Line: ' + id)),
                                tap(data => {
                                    const foundIndex = this.purchaseorderlines.findIndex(po => po.PurchaseOrderLineID === id);
                                    if (foundIndex > -1) {
                                        this.purchaseorderlines.splice(foundIndex, 1);
                                        this.currentPurchaseOrderLines.splice(foundIndex, 1);
                                        this.currentPurchaseOrderLine = null;
                                    }
                                }),
                                catchError(this.handleError)
                            );
    }
    editPurchaseOrderLine(purchaseorderline: PurchaseOrderLine): Observable<PurchaseOrderLine>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<PurchaseOrderLine>(this.apiURL + '/purchaseorderline/' + purchaseorderline.PurchaseOrderLineID, purchaseorderline, { headers: headers} )
                            .pipe(
                                tap(data => {
                                    //console.log('Update Purchase Order Line: ' + purchaseorderline.PurchaseOrderLineID);
                                    this.currentPurchaseOrderLine = data;
                                    if (this.purchaseorderlines) {
                                        this.purchaseorderlines[this.purchaseorderlines.findIndex(pl => pl.PurchaseOrderLineID === data.PurchaseOrderLineID)] = data;
                                        this.currentPurchaseOrderLines[this.currentPurchaseOrderLines.findIndex(pl => pl.PurchaseOrderLineID === data.PurchaseOrderLineID)] = data;
                                    }
                                }),
                                catchError(this.handleError)
                            );
    }
    updatePurchaseLineCartonQuantity(purchaseorder: PurchaseOrder) {
        //if (!this.currentPurchaseOrderEdit) return;
        purchaseorder.PurchaseOrderLines.forEach((purchaseorderline) => {
            purchaseorderline.CartonQuantity = 0;
        });

        purchaseorder.Cartons.forEach((carton, ci) => {
            carton.CartonLines.forEach((cartonline, cli) => {
                if (!cartonline.pendingAdd) {
                    const purchaseorderline = purchaseorder.PurchaseOrderLines.find(x => x.PurchaseOrderLineID === cartonline.PurchaseOrderLineID);
                    if (purchaseorderline) {
                        purchaseorderline.CartonQuantity += cartonline.Quantity;
                        this.replacePurchaseOrderLine(cartonline.PurchaseOrderLineID, purchaseorderline);
                        this.updateCartonLineRemainingQuantity(cartonline, purchaseorder);
                        purchaseorder.PurchaseOrderLines[purchaseorder.PurchaseOrderLines.findIndex(i => i.PurchaseOrderLineID === cartonline.PurchaseOrderLineID)] = purchaseorderline;
                    }
                }
            });
        });
    }

    updateCartonLineRemainingQuantity(cartonline: CartonLine, purchaseorder: PurchaseOrder) {
        //if (!this.currentPurchaseOrderEdit) return;
        const foundPurchaseOrderLine = purchaseorder.PurchaseOrderLines.find(x => x.PurchaseOrderLineID === cartonline.PurchaseOrderLineID);

        if (foundPurchaseOrderLine) {
            cartonline.RemainingQuantity = foundPurchaseOrderLine.Quantity;

            purchaseorder.Cartons.forEach((carton, ci) => {
                carton.CartonLines.forEach((cartonline2, cli) => {
                    if (!cartonline2.pendingAdd) {
                        if (cartonline2.PurchaseOrderLineID === cartonline.PurchaseOrderLineID) {
                            cartonline.RemainingQuantity = cartonline.RemainingQuantity - cartonline2.Quantity;
                        }
                    }
                });
            });
        }
    }

    getSimpleItemList(): Observable<ItemList[]>  {
        if (this.itemList && this.itemList.length > 0) {
            return of(this.itemList);
        }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.get<ItemList[]>(this.apiURL + '/item/simpleitemlist', { headers: headers} )
                            .pipe(
                                //tap(data => console.log(JSON.stringify(data))),
                                tap(data => this.itemList = data),
                                catchError(this.handleError)
                            );
    }

    downloadItemLabel(itemID: number) {
        return this.http.get(this.apiURL + '/item/' + itemID + '/label', { responseType: 'blob' });
    }
    downloadItemLabelCount(itemID: number, count: number, border: string) {
        return this.http.get(this.apiURL + '/item/' + itemID + '/label/' + count + '/' + border, { responseType: 'blob' });
    }
    downloadItemLargeLabelCount(itemID: number, count: number, border: string) {
        return this.http.get(this.apiURL + '/item/' + itemID + '/largelabel/' + count + '/' + border, { responseType: 'blob' });
    }

    // Custom
    downloadItemLabelCountCustom(id: number, options: CustomPrintLabel) {
        return this.http.post(this.apiURL + '/item/' + id + '/label/custom', options, { responseType: 'blob' });
    }
    downloadItemLargeLabelCountCustom(id: number, options: CustomPrintLabel) {
        return this.http.post(this.apiURL + '/item/' + id + '/largelabel/custom', options, { responseType: 'blob' });
    }

    // Carton
    getCartons(purchaseorderid: number): Observable<Carton[]> {
        if (this.currentPurchaseOrderID === purchaseorderid) {
            return of(this.cartons);
        }
        this.currentPurchaseOrderID = purchaseorderid;
        return this.http.get<Carton[]>(this.apiURL + '/carton/purchaseorder/' + purchaseorderid)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.cartons = data),
                            catchError(this.handleError)
                        );
    }
    refreshCartons(purchaseorderid: number): Observable<Carton[]> {
        this.currentPurchaseOrderID = purchaseorderid;
        return this.http.get<Carton[]>(this.apiURL + '/carton/purchaseorder/' + purchaseorderid)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.cartons = data),
                            catchError(this.handleError)
                        );
    }
    getCarton(id: number): Observable<Carton> {
        if (this.cartons) {
            const foundItem = this.cartons.find(c => c.CartonID === id);
            return of(foundItem);
        }
        return this.http.get<Carton>(this.apiURL + '/carton/' + id)
                    .pipe(
                        //tap(data => console.log(JSON.stringify(data))),
                        catchError(this.handleError)
                    );
    }
    addCarton(carton: CartonInsert): Observable<CartonInsert> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<Carton>(this.apiURL + '/carton' , carton, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Add Carton: ' + JSON.stringify(data))),
                                tap(data => {
                                    this.cartons.push(data);
                                    //this.currentCarton.next(data);
                                }),
                                catchError(this.handleError)
                            );
    }
    deleteCarton(id: number): Observable<Carton>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.delete<Carton>(this.apiURL + '/carton/' + id, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Delete Carton: ' + id)),
                                tap(data => {
                                    const foundIndex = this.cartons.findIndex(c => c.CartonID === id);
                                    if (foundIndex > -1) {
                                        this.cartons.splice(foundIndex, 1);
                                        this.currentCarton = null;
                                    }
                                }),
                                catchError(this.handleError)
                            );
    }
    editCarton(carton: Carton): Observable<Carton>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<Carton>(this.apiURL + '/carton/' + carton.CartonID, carton, { headers: headers} )
                            .pipe(
                                //tap(data => console.log('Update Carton: ' + carton.CartonID)),
                                catchError(this.handleError)
                            );
    }
    downloadCartonLabel(id: number) {
        //return this.http.get(this.apiURL + '/carton/' + id + '/cartonlist', { responseType: 'blob' });
        return this.http.get(this.apiURL + '/carton/' + id + '/label', { responseType: 'blob' });
    }
    // Custom
    downloadCartonLabelCustom(id: number, options: CustomPrintLabel) {
        //return this.http.get(this.apiURL + '/carton/' + id + '/cartonlist', { responseType: 'blob' });
        return this.http.post(this.apiURL + '/carton/' + id + '/label/custom', options, { responseType: 'blob' });
    }

    downloadCartonLabelCount(id: number, count: number, border: string) {
        //return this.http.get(this.apiURL + '/carton/' + id + '/cartonlist', { responseType: 'blob' });
        return this.http.get(this.apiURL + '/carton/' + id + '/label/' + count + '/' + border, { responseType: 'blob' });
    }
    downloadAllCartonLabel(purchaseorderid: number, border: string) {
        //return this.http.get(this.apiURL + '/carton/' + id + '/cartonlist', { responseType: 'blob' });
        return this.http.get(this.apiURL + '/carton/purchaseorder/' + purchaseorderid + '/label/' + border, { responseType: 'blob' });
    }
    downloadAllItemLabel(purchaseorderid: number, border: string) {
        //return this.http.get(this.apiURL + '/carton/' + id + '/cartonlist', { responseType: 'blob' });
        return this.http.get(this.apiURL + '/purchaseorderline/purchaseorder/' + purchaseorderid + '/label/' + border, { responseType: 'blob' });
    }
    downloadAllItemLargeLabel(purchaseorderid: number, border: string) {
        //return this.http.get(this.apiURL + '/carton/' + id + '/cartonlist', { responseType: 'blob' });
        return this.http.get(this.apiURL + '/purchaseorderline/purchaseorder/' + purchaseorderid + '/largelabel/' + border, { responseType: 'blob' });
    }

    // Custom Print Label
    downloadAllCartonLabelCustom(purchaseorderid: number, options: CustomPrintLabel) {
        return this.http.post(this.apiURL + '/carton/purchaseorder/' + purchaseorderid + '/label/custom', options, { responseType: 'blob' });
    }
    downloadAllItemLabelCustom(purchaseorderid: number, options: CustomPrintLabel) {
        return this.http.post(this.apiURL + '/purchaseorderline/purchaseorder/' + purchaseorderid + '/label/custom', options, { responseType: 'blob' });
    }
    downloadAllItemLargeLabelCustom(purchaseorderid: number, options: CustomPrintLabel) {
        return this.http.post(this.apiURL + '/purchaseorderline/purchaseorder/' + purchaseorderid + '/largelabel/custom', options, { responseType: 'blob' });
    }

    // Carton Lines
    getCartonLines(cartonid: number): Observable<CartonLine[]> {
        if (this.currentCartonID === cartonid) {
            return of(this.cartonlines);
        }
        this.currentCartonID = cartonid;
        return this.http.get<CartonLine[]>(this.apiURL + '/cartonline/carton/' + cartonid)
                        .pipe(
                            //tap(data => console.log(JSON.stringify(data))),
                            tap(data => this.cartonlines = data),
                            catchError(this.handleError)
                        );
    }
    getCartonLine(id: number): Observable<CartonLine> {
        if (this.cartonlines) {
            const foundItem = this.cartonlines.find(c => c.CartonLineID === id);
            return of(foundItem);
        }
        return this.http.get<CartonLine>(this.apiURL + '/cartonline/' + id)
                    .pipe(
                        //tap(data => console.log(JSON.stringify(data))),
                        catchError(this.handleError)
                    );
    }
    getCurrentCartonLine(id: number): Observable<CartonLine> {
        if (this.currentCartonLine) {
            return of(this.currentCartonLine);
        }
        return this.getCartonLine(id);
    }
    addCartonLine(cartonline: CartonLineInsert): Observable<CartonLineInsert> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        cartonline.CartonID = this.currentCartonID;
        return this.http.post<CartonLine>(this.apiURL + '/cartonline', cartonline, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Add Carton Line: ' + JSON.stringify(data))),
                                tap(data => {
                                    this.cartonlines.push(data);
                                    this.currentCartonLine = data;

                                    const purchaseorderline = this.currentPurchaseOrderLines.find(x => x.PurchaseOrderLineID === data.PurchaseOrderLineID);
                                    purchaseorderline.CartonQuantity += data.Quantity;
                                    this.replacePurchaseOrderLine(data.PurchaseOrderLineID, purchaseorderline);
                                }),
                                catchError(this.handleError)
                            );
    }
    deleteCartonLine(id: number): Observable<CartonLine>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.delete<CartonLine>(this.apiURL + '/cartonline/' + id, { headers: headers } )
                            .pipe(
                                //tap(data => console.log('Delete Carton Line: ' + id)),
                                tap(data => {
                                    const foundIndex = this.cartonlines.findIndex(c => c.CartonLineID === id);
                                    if (foundIndex > -1) {
                                        this.cartonlines.splice(foundIndex, 1);
                                        this.currentCartonLine = null;
                                    }
                                }),
                                catchError(this.handleError)
                            );
    }

    editCartonLine(cartonline: CartonLine): Observable<CartonLine>  {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<CartonLine>(this.apiURL + '/cartonline/' + cartonline.CartonLineID, cartonline, { headers: headers} )
                            .pipe(
                                //tap(data => console.log('Update Carton Line: ' + cartonline.CartonLineID)),
                                catchError(this.handleError)
                            );
    }

    getPurchaseOrderLineList(id: number)  {
        // if (this.purchaseorderlineList && this.purchaseorderlineList.length > 0) {
        //     return of(this.purchaseorderlineList);
        // }
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.get<PurchaseOrderLineList[]>(this.apiURL + '/purchaseorderline/purchaseorder/' + id + '/purchaseorderlinelist', { headers: headers} )
                            .pipe(
                                //tap(data => console.log(JSON.stringify(data))),
                                tap(data => this.purchaseorderlineList = data),
                                catchError(this.handleError)
                            );
    }
    getCurrentCartonLines() {
        return this.cartonlines;
    }

    validatePurchaseOrderLines() {
        // return (this.currentPurchaseOrderLines
        //     && this.currentPurchaseOrderLines.length > 0);
        return (this.currentPurchaseOrderEdit && this.currentPurchaseOrderEdit.PurchaseOrderLines
            && this.currentPurchaseOrderEdit.PurchaseOrderLines.length > 0);
    }

    validateCarton() {
        // return (this.currentPurchaseOrderLines && !this.currentPurchaseOrderLines.find(x => x.CartonQuantity !== x.Quantity));
        return (this.currentPurchaseOrderEdit && this.currentPurchaseOrderEdit.PurchaseOrderLines
            && !this.currentPurchaseOrderEdit.PurchaseOrderLines.find(x => x.CartonQuantity !== x.Quantity && !x.pendingAdd));
    }

    validateShipping() {
        // return (this.currentPurchaseOrderEdit.ShipmentDate &&
        //     this.currentInboundShippingMethod &&
        //     this.currentInboundShippingMethod.BillingOfLading &&
        //     this.currentInboundShippingMethod.ContainerNumber);
        return (this.currentPurchaseOrderEdit.ShipmentDate &&
            this.currentPurchaseOrderEdit.InboundShippingMethods[0] &&
            this.currentPurchaseOrderEdit.InboundShippingMethods[0].BillingOfLading &&
            this.currentPurchaseOrderEdit.InboundShippingMethods[0].ContainerNumber);
    }

    // Errors
    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            // errorMessage = `An error occurred: ${err.error.message}`;
            errorMessage = `Network error: ${err.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // errorMessage = `Backend returned code ${err.status}, body was: ${err.error.Message}`;
            errorMessage = `Response error: ${err.message}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }

    rowColorConditions(i: number, collection: Array<any>, currentItemIndex: number, formDirty: boolean): string {
        const inputRow = i === collection.length - 1 && currentItemIndex === i;
        const selectedInputRow = inputRow && formDirty;
        if (selectedInputRow) { return '#F5F5F5'; } else if (inputRow) { return '#E8E8E8'; } else if (currentItemIndex === i) { return '#F5F5F5'; } else { return '#FFFFFF'; }
    }
}
