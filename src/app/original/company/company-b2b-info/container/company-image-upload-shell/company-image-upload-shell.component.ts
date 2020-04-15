import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromCompany from '../../state';
import {Observable} from 'rxjs';
import * as companyActions from '../../state/company-b2b.actions';

@Component({
    selector: 'app-company-image-upload-shell',
    templateUrl: './company-image-upload-shell.component.html',
})
export class CompanyImageUploadShellComponent implements OnInit {
    filesToUpload$: Observable<Array<File>>;
    selectedFileNames$: Observable<string[]>;
    pendingUpload$: Observable<boolean>;
    @Input() titleRequired: boolean = true;

    constructor(
        private store: Store<fromCompany.State>
    ) {
    }

    ngOnInit() {
        this.pendingUpload$ = this.store.pipe(select(fromCompany.getPendingUploading));
        this.filesToUpload$ = this.store.pipe(select(fromCompany.getFileToUpload));
        this.selectedFileNames$ = this.store.pipe(select(fromCompany.getSelectedFileNames));
    }

    uploadImage(data: { form: FormData, title: string }) {
        this.store.dispatch(new companyActions.UploadVendorImage(data));
    }

    clearUploadList() {
        this.store.dispatch(new companyActions.ClearUploadList());
    }
}
