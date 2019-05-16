import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuModule, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

import { SalesOrder } from '../../shared/class/sales-order';

import { SalesOrderService } from '../sales-order.service';
import { AppService } from '../../app.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'o-sales-order-list',
  templateUrl: './sales-order-list.component.html',
  styleUrls: ['./sales-order-list.component.css']
})

export class SalesOrderListComponent implements OnInit {
    salesorders: SalesOrder[];

    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;

    fulfilledby: string;
    status: string;
    errorMessage: string;
    
    // displayedColumns = ['Menu', 'IncrementID', 'TransactionDate', 'ShipByDate', 'ItemImage', 'ItemName', 'ShippingMethod', 'Status', 'VendorTotal'];
    displayedColumns = ['Menu', 'ProductInfo', 'ItemImage', 'ItemName', 'ShippingMethod', 'Status', 'VendorTotal'];
    dataSource: any = null;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @ViewChild('FilterBy') FilterBy: ElementRef;
    
    loading: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private salesorderService: SalesOrderService,
        private appService: AppService) { }

    ngOnInit() {
        this.appService.getCurrentMember()
            .subscribe(
                (data) => {
                    if(data.DefaultPageSize){
                        this.paginator.pageSize = data.DefaultPageSize;
                    }
                    else {
                        this.paginator.pageSize = 100;
                    }
                },
                (error: any) => {
                    this.salesorderService.sendNotification({ type: 'error', title: 'Error', content: error });
                }
            );
        
        this.route.params.subscribe(
            params => {
                const paramFulfilledby = this.route.snapshot.params['fulfilledby'];
                const paramStatus = this.route.snapshot.params['status'];
                this.fulfilledby = paramFulfilledby;
                this.status = paramStatus;

                this.getSalesOrderByVendor(this.fulfilledby, this.status);                
            }
        );        
    }
    
    getSalesOrderByVendor(fulfilledby: string, status: string) {
        this.loading = true; 
        this.salesorderService.getSalesOrderByVendor(fulfilledby, status).subscribe(
            (salesorders: SalesOrder[]) => {
                this.loading = false; 
                this.salesorders = salesorders;
                this.refreshDataSource(this.salesorders);
            },
            (error: any) => {
                this.loading = false;
                this.errorMessage = <any>error;
            }
        );
    }

    refreshDataSource(salesorders: SalesOrder[]) {
        this.dataSource = new MatTableDataSource<SalesOrder>(salesorders);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
                
        if(this.FilterBy.nativeElement.value) {
            this.applyFilter(this.FilterBy.nativeElement.value);
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onFilterChange(fulfilledby: string, status: string) {
        this.router.navigate(['/sales-order/' + fulfilledby + '/status/' + status]);

        this.fulfilledby = fulfilledby;
        this.status = status;

        this.getSalesOrderByVendor(this.fulfilledby, this.status);
    }

    onPrintPackingSlip(salesorder: SalesOrder) {
        this.salesorderService.downloadSalesOrderPackingSlip(salesorder.OrderID).subscribe(
            (data) => {
                const blob = new Blob([data], {type: 'application/pdf'});
                const blobUrl = URL.createObjectURL(blob);
                if (window.navigator.msSaveOrOpenBlob) {
                    const fileName = salesorder.IncrementID;
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
                    a.download = String(salesorder.IncrementID);
                    document.body.appendChild(a);
                    a.target = '_blank';
                    a.click();

                    document.body.removeChild(a);
                    URL.revokeObjectURL(fileURL);
                }
            }
        );
    }
    isShipmentLate(shipByDate: Date): boolean {
        return new Date(shipByDate) < new Date();
    }
    disabledWhileLoading(status) {
        return this.loading && (status !== this.status);
    }

}
