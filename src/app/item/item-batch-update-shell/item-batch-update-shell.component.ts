import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { AppService } from '../../app.service';

@Component({
    templateUrl: './item-batch-update-shell.component.html'
})


export class ItemBatchUpdateShellComponent {
    errorMessage: string;
    loading: boolean;

    constructor(private router: Router
        , private appService: AppService) { 
            
    }

    ngOnInit() {
        this.loading = false;

        this.appService.getCurrentMember()
            .subscribe(
                (data) => {
                    if(!data.IsPM) {
                        this.router.navigate(['dashboard']);
                    }                    
                },
                (error: any) => {
                    this.appService.sendNotification({ type: 'error', title: 'Error', content: error });
                }
            );
    }

}