import { Component, OnInit, OnChanges, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { SalesOrder } from '../../../shared/class/sales-order';
import { environment } from '../../../../environments/environment';
import { Member } from 'app/shared/class/member';
import { SetSalesOrderID } from 'app/sales-order/state/sales-order.actions';

@Component({
  selector: 'o-sales-order-list',
  templateUrl: './sales-order-list.component.html'
})

export class SalesOrderListComponent implements OnInit, OnChanges {
    private imageURL = environment.imageURL;
    private linkURL = environment.linkURL;
    @Input() salesOrdersMatTable: MatTableDataSource<SalesOrder>;
    @Input() userInfo: Member;
    @Input() isLoading: boolean = true;
    @Input() errorMessage: string;
    @Output() getSalesOrderByVendor = new EventEmitter<{fulfilledby: string, status: string}>();
    @Output() downloadSalesOrderPackingSlip = new EventEmitter<SalesOrder>();
    @Output() setSalesOrder = new EventEmitter<SalesOrder>();
    
    displayedColumns = ['Menu', 'ProductInfo', 'ItemImage', 'ItemName', 'ShippingMethod', 'Status', 'VendorTotal'];
    fulfilledby: string;
    status: string;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('FilterBy', { static: true }) FilterBy: ElementRef;
    
    constructor(private route: ActivatedRoute,
        private router: Router) { }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.salesOrdersMatTable && changes.salesOrdersMatTable.currentValue.data.length) {
            this.salesOrdersMatTable.paginator = this.paginator;
            this.salesOrdersMatTable.sort = this.sort;
        }
    }
    ngOnInit() {
        
        this.route.params.subscribe((route) => {
            if (route.fulfilledby !== this.fulfilledby) {
                this.getSalesOrdersByVendor(route.fulfilledby, route.status);
            }
            this.fulfilledby = route.fulfilledby;
            this.status = route.status;
        }
        );
        if(this.FilterBy.nativeElement.value) {
            this.applyFilter(this.FilterBy.nativeElement.value);
        }
    }
    getSalesOrdersByVendor(fulfilledby: string, status: string) {
        this.getSalesOrderByVendor.emit({fulfilledby, status});
    }
    applyFilter(filterValue: string) {
        this.salesOrdersMatTable.filter = filterValue.trim().toLowerCase();
        // if (this.salesOrdersMatTable.paginator) {
        //     this.salesOrdersMatTable.paginator.firstPage();
        // }
    }
    onFilterChange(fulfilledby: string, status: string) {
        this.router.navigate(['/sales-order/' + fulfilledby + '/status/' + status]);
        this.fulfilledby = fulfilledby;
        this.status = status;
        this.getSalesOrderByVendor.emit({fulfilledby: this.fulfilledby, status: this.status});
    }

    onPrintPackingSlip(salesorder: SalesOrder) {
        this.downloadSalesOrderPackingSlip.emit(salesorder);
    }
    isShipmentLate(shipByDate: Date): boolean {
        return new Date(shipByDate) < new Date();
    }
    disabledWhileLoading(status) {
        return this.isLoading && (status !== this.status);
    }
}
