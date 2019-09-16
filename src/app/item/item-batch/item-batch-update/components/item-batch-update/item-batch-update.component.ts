import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Member } from 'app/shared/class/member';
import { Router } from '@angular/router';

@Component({
    selector: 'o-item-batch-update',
    templateUrl: './item-batch-update.component.html'
})

export class ItemBatchUpdateComponent implements OnChanges {
    @Input() errorMessage: string;
    @Input() userInfo: Member;

    constructor(private router: Router) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.userInfo && changes.userInfo.currentValue) {
            if (!this.userInfo.IsPM) {
                this.router.navigate(['dashboard']);
            }
        }
    }

}