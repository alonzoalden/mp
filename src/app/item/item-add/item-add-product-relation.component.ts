import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from '../../app.service';

@Component({
  selector: 'o-item-add-product-relation',
  templateUrl: './item-add-product-relation.component.html'
})

export class ItemAddProductRelationComponent {
  errorMessage: string;
  isPM: boolean;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    this.appService.getCurrentMember()
                .subscribe(
                    (data) => {
                        this.appService.currentMember = data;
                        this.isPM = data.IsPM;
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                    }
                );
  }
}
