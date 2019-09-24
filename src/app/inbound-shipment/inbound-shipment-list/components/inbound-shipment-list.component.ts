import { Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PurchaseOrder } from '../../../shared/class/purchase-order';
import { PurchaseOrderService } from '../../purchase-order.service';
import { AppService } from '../../../app.service';
import { Member } from 'app/shared/class/member';

@Component({
  selector: 'o-inbound-shipment-list',
  templateUrl: './inbound-shipment-list.component.html',
  styleUrls: ['./inbound-shipment-list.component.css']
})

export class InboundShipmentListComponent implements OnInit, OnChanges {
    @Input() purchaseOrdersMatTable: MatTableDataSource<PurchaseOrder>;
    @Input() isLoading: boolean = true;
    @Input() pendingDelete: boolean;
    @Input() errorMessage: string;
    @Input() userInfo: Member;
    @Output() addNewPurchaseOrder = new EventEmitter<void>();
    @Output() deletePurchaseOrder = new EventEmitter<PurchaseOrder>();
    @Output() downloadPurchaseOrderLabel = new EventEmitter<PurchaseOrder>();
    @Output() getPurchaseOrderOverview = new EventEmitter<void>();
    @Output() setSelectedPurchaseOrder = new EventEmitter<PurchaseOrder>();


    displayedColumns = ['Menu', 'PackingSlipNumber', 'TransactionDate', 'ShipmentDate', 'Status', 'CreatedOn'];
    currentIndex: number;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.purchaseOrdersMatTable && changes.purchaseOrdersMatTable.currentValue.data) {
            this.purchaseOrdersMatTable.paginator = this.paginator;
            this.purchaseOrdersMatTable.sort = this.sort;
        }
        if (changes.purchaseOrdersMatTable && !changes.purchaseOrdersMatTable.currentValue.data.length && changes.purchaseOrdersMatTable.firstChange) {
            this.getPurchaseOrderOverview.emit();
        }
        if (changes.userInfo && changes.userInfo.currentValue) {
            if (this.userInfo.DefaultPageSize) {
                this.purchaseOrdersMatTable.paginator.pageSize = this.userInfo.DefaultPageSize;
                this.paginator.pageSize = this.userInfo.DefaultPageSize;
            }
            else {
                this.paginator.pageSize = 100;
            }
        }
    }

    ngOnInit() { }

    refreshDataSource(purchaseorders: PurchaseOrder[]) {
        this.purchaseOrdersMatTable = new MatTableDataSource<PurchaseOrder>(purchaseorders);
        this.purchaseOrdersMatTable.sort = this.sort;
        this.purchaseOrdersMatTable.paginator = this.paginator;
    }
    onRemovePurchaseOrder(purchaseorder: PurchaseOrder) {
        const confirmation = confirm(`Remove ${purchaseorder.PackingSlipNumber}?`);
        if (confirmation) {
            this.deletePurchaseOrder.emit(purchaseorder);
        }
    }
    addPurchaseOrder() {
        this.addNewPurchaseOrder.emit();
    }
    onPrintLabel(purchaseOrder: PurchaseOrder) {
        this.downloadPurchaseOrderLabel.emit(purchaseOrder);
    }
    onRowClick(index: number) {
        this.currentIndex = index;
    }
    applyFilter(filterValue: string) {
        this.purchaseOrdersMatTable.filter = filterValue.trim().toLowerCase();
        if (this.purchaseOrdersMatTable.paginator) {
            this.purchaseOrdersMatTable.paginator.firstPage();
        }
    }
}