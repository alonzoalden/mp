import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'o-company-info',
    templateUrl: './company-info.component.html',
})

export class CompanyInfoComponent implements OnInit {
    errorMessage: string;

    constructor(private router: Router,
        private companyService: CompanyService,
        private translate: TranslateService) {
    }

    ngOnInit() {

    }   
}
