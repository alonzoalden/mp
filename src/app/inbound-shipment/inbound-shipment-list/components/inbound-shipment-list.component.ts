import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseOrder } from '../../../shared/class/purchase-order';
import { PurchaseOrderService } from '../../purchase-order.service';
import { MatMenu } from '@angular/material/menu';
import { AppService } from '../../../app.service';

@Component({
  selector: 'o-inbound-shipment-list',
  templateUrl: './inbound-shipment-list.component.html',
  styleUrls: ['./inbound-shipment-list.component.css']
})

export class InboundShipmentListComponent implements OnInit {
    purchaseorders: PurchaseOrder[];
    errorMessage: string;

    displayedColumns = ['Menu', 'PackingSlipNumber', 'TransactionDate', 'ShipmentDate', 'Status', 'CreatedOn'];
    dataSource: any = null;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    loading: boolean;

    constructor(private router: Router, 
        private purchaseOrderService: PurchaseOrderService,
        private appService: AppService) { }

    ngOnInit() {
        this.appService.getCurrentMember()
            .subscribe(
                (data) => {
                    if (data.DefaultPageSize) {
                        this.paginator.pageSize = data.DefaultPageSize;
                    }
                    else {
                        this.paginator.pageSize = 100;
                    }
                },
                (error: any) => {
                    this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: error });
                }
            );

        this.purchaseOrderService.getPurchaseOrderOverview().subscribe(
            (purchaseorders: PurchaseOrder[]) => {
                this.purchaseorders = purchaseorders;
                // this.dataSource = new MatTableDataSource<PurchaseOrder>(purchaseorders);
                // this.dataSource.paginator = this.paginator;
                // this.dataSource.sort = this.sort;
                this.refreshDataSource(this.purchaseorders);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    refreshDataSource(purchaseorders: PurchaseOrder[]) {
        this.dataSource = new MatTableDataSource<PurchaseOrder>(purchaseorders);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    onRemovePurchaseOrder(purchaseorder: PurchaseOrder) {
        const confirmation = confirm(`Remove ${purchaseorder.PackingSlipNumber}?`);
        if (confirmation) {

            this.loading = true;

            this.purchaseOrderService.deletePurchaseOrder(purchaseorder.PurchaseOrderID).subscribe(
                () => {
                    this.loading = false;
                    this.onDeleteComplete(purchaseorder, `${purchaseorder.PackingSlipNumber} was deleted`);
                },
                (error: any) => {
                    //this.errorMessage = <any>error;
                    this.loading = false;
                    this.purchaseOrderService.sendNotification({ type: 'error', title: 'Error', content: this.errorMessage });
                    //window.location.reload();
                }
            );
        }
    }

    onDeleteComplete(purchaseorder: PurchaseOrder, message?: string): void {
        this.refreshDataSource(this.purchaseorders);
        this.purchaseOrderService.sendNotification({ type: 'success', title: 'Successfully Deleted', content: message });
    }

    addPurchaseOrder() {
        this.purchaseOrderService.addPurchaseOrder().subscribe(
            (data: PurchaseOrder) => this.onAddPurchaseOrderComplete(data, `${data.PurchaseOrderID} was added`),
            (error: any) => this.errorMessage = <any>error
        );
    }

    onAddPurchaseOrderComplete(purchaseorder: PurchaseOrder, message?: string) {
        this.purchaseOrderService.sendNotification({ type: 'success', title: 'Successfully Added', content: message });
        this.router.navigate(['/inbound-shipment', purchaseorder.PurchaseOrderID, 'edit']);
    }

    onPrintLabel(purchaseOrder: PurchaseOrder) {
        this.purchaseOrderService.downloadPurchaseOrderLabel(purchaseOrder.PurchaseOrderID).subscribe(
            (data) => {
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
            }
        );
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
