import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MemberVendor } from '../../shared/class/member';
import { SettingService } from '../setting.service';
import { AppService } from '../../app.service';

@Component({
    selector: 'o-setting-vendor-list',
    templateUrl: './setting-vendor-list.component.html',
    styleUrls: ['./setting-vendor-list.component.css']
})

export class SettingVendorListComponent implements OnInit {
    errorMessage: string;
    memberVendors: MemberVendor[];

    displayedColumns = ['VendorID', 'MerchantID', 'VendorName', 'CreatedOn', 'Switch'];
    dataSource: any = null;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private settingService: SettingService,
        private appService: AppService) { }

    ngOnInit() {
        this.appService.getCurrentMember()
            .subscribe(
                (data) => {
                    // if (!data.IsAdmin) {
                    //     this.router.navigate(['/home']);
                    // }
                    if(data.DefaultPageSize){
                        this.paginator.pageSize = data.DefaultPageSize;
                    }
                    else {
                        this.paginator.pageSize = 100;
                    }
                },
                (error: any) => {
                    this.settingService.sendNotification({ type: 'error', title: 'Error', content: error });
                }
            );

        // if (!this.appService.isMemberAdmin()) {
        //     this.router.navigate(['/home']);
        // }

        this.settingService.getMemberVendors().subscribe(
            (memberVendors: MemberVendor[]) => {
                this.memberVendors = memberVendors;
                this.refreshDataSource(memberVendors);
            },
            (error: any) => {
                this.settingService.sendNotification({ type: 'error', title: 'Error', content: error });
                this.errorMessage = <any>error;
            }
        );
    }

    refreshDataSource(memberVendors: MemberVendor[]) {
        this.dataSource = new MatTableDataSource<MemberVendor>(memberVendors);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    switchMemberVendor(memberVendor: MemberVendor): void {
        this.appService.currentMember.VendorID = memberVendor.VendorID.toString();

        this.settingService.editCurrentMember(this.appService.currentMember).subscribe(
            () => this.onSaveComplete(`Switched to ${memberVendor.VendorName}`),
            (error: any) => this.errorMessage = <any>error
        );
    }

    isCurrentVendor(vendorid: string) {
        return (this.appService.currentMember.VendorID === vendorid);
    }

    onSaveComplete(message?: string): void {
        this.settingService.sendNotification({ type: 'success', title: 'Successfully Switched', content: message });
        // reload
        window.location.reload();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
