import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {VendorTradeShow} from '../../../../../shared/class/vendor-b2b';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {CompanyTradeShowAddDialogComponent} from './company-trade-show-add-dialog.component';
import {AppService} from '../../../../../app.service';
import {NgForm} from '@angular/forms';
import {CompanyService} from '../../../company.service';

@Component({
    selector: 'app-company-b2b-info-trade-show',
    templateUrl: './company-trade-show.component.html'
})
export class CompanyTradeShowComponent implements OnInit, OnChanges {
    @Input() isTradeShowLoading: boolean;
    @Input() tradeShowList: MatTableDataSource<VendorTradeShow>;
    @Output() updateVendorTradeShow = new EventEmitter<VendorTradeShow>();
    @Output() loadVendorInfo = new EventEmitter();
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @Output() deleteTradeShow = new EventEmitter<VendorTradeShow>();
    displayedColumns = ['Menu', 'Name', 'Location', 'ShowDate', 'Booth', 'ShowSamples', 'Contact', 'ImagePath', 'Approval'];

    constructor(
        public dialog: MatDialog,
        private appService: AppService,
        private companyService: CompanyService,
    ) {
    }

    get isPM() {
        return (this.appService.currentMember && this.appService.currentMember.IsPM);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.tradeShowList && changes.tradeShowList.currentValue && changes.tradeShowList.currentValue.data) {
            this.tradeShowList.paginator = this.paginator;
        }
    }

    ngOnInit() {
        this.loadVendorInfo.emit();
    }

    add() {
        const dialog = this.dialog.open(CompanyTradeShowAddDialogComponent, {
            width: '1000px',
        });
        dialog.afterClosed().subscribe(data => {
            if (data) {
                this.updateVendorTradeShow.emit(data);
            }
        });
    }

    edit(vendorTradeShow: VendorTradeShow) {
        const dialog = this.dialog.open(CompanyTradeShowAddDialogComponent, {
            width: '1000px',
            data: vendorTradeShow
        });
        dialog.afterClosed().subscribe(data => {
            if (data) {
                this.updateVendorTradeShow.emit(data);
            }
        });
    }

    submitApproval(vendorTradeShow: VendorTradeShow) {
        if (!vendorTradeShow.VendorTradeShowID || !vendorTradeShow.Name || !vendorTradeShow.Location || !vendorTradeShow.ShowDate || !vendorTradeShow.Booth || !vendorTradeShow.ShowSamples || !vendorTradeShow.Contact) {
            this.companyService.sendNotification({
                type: 'error',
                title: 'Error',
                content: 'Please enter all required fields'
            });
            return;
        }
        vendorTradeShow.Approval = 'Pending';
        this.updateVendorTradeShow.emit(vendorTradeShow);
    }

    approve(vendorTradeShow: VendorTradeShow) {
        if (!vendorTradeShow.VendorTradeShowID) {
            return;
        }
        vendorTradeShow.Approval = 'Approved';
        this.updateVendorTradeShow.emit(vendorTradeShow);
    }

    notApprove(vendorTradeShow: VendorTradeShow) {
        if (!vendorTradeShow.VendorTradeShowID) {
            return;
        }
        vendorTradeShow.Approval = 'NotApproved';
        this.updateVendorTradeShow.emit(vendorTradeShow);
    }

    delete(vendorTradeShow: VendorTradeShow) {
        if (!vendorTradeShow.VendorTradeShowID) {
            return;
        }
        const confirmation = confirm(`Remove ${vendorTradeShow.Name}?`);
        if (confirmation) {
            this.deleteTradeShow.emit(vendorTradeShow);
        }
    }
}
