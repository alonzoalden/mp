import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { AppService } from '../../app.service';

@Component({
    selector: 'o-item-batch-update',
    templateUrl: './item-batch-update.component.html'
})


export class ItemBatchUpdateComponent {
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