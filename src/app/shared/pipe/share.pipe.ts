import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';

@Pipe({
    name: 'localizedDate',
    pure: false
})
export class LocalizedDatePipe implements PipeTransform {
    constructor(private translateService: TranslateService) {
    }

    transform(value: any, pattern: string = 'mediumDate'): any {
        const currentLang = currentLangToLocaleID(this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang);
        const datePipe: DatePipe = new DatePipe(currentLang);
        return datePipe.transform(value, pattern);
    }
}

export function currentLangToLocaleID(currentLang: string): string {
    switch (currentLang) {
        case 'en':
            return 'en-US';
        case 'cn':
            return 'zh-cn';
        default:
            return 'en-US';
    }
}

@NgModule({
    exports: [
        LocalizedDatePipe
    ],
    declarations: [
        LocalizedDatePipe
    ]
})
export class SharePipeModule {

}
