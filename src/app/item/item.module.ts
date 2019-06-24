import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatTreeModule, MatSortModule, MatDialogModule, MatSelectModule, MatMenuModule, MatToolbar, MatToolbarModule, MatIconModule, MatListModule, MatCheckboxModule, MatTooltipModule, MatTabsModule } from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

import { NgSelectModule } from '@ng-select/ng-select';

import { CdkTableModule } from '@angular/cdk/table';

import { ToolModule } from '../shared/tool/tool.module';

import { ItemComponent } from './item.component';
import { ItemListComponent, ItemListComponentItemPrintDialog, ItemListComponentImportDialog } from './item-list/item-list.component';
import { ItemPrintLabelComponent, ItemPrintLabelComponentPrintDialog} from './item-print-label/item-print-label.component';
import { ItemPartListComponent, ItemPartListComponentItemPrintDialog } from './item-part-list/item-part-list.component';

import { ItemVariationComponentDialog } from './item-variation/item-variation.component';

import { ItemAddComponent } from './item-add/item-add.component';
import { ItemAddDescriptionComponent } from './item-add/item-add-description.component';
import { ItemAddDimensionComponent } from './item-add/item-add-dimension.component';
import { ItemAddPriceComponent } from './item-add/item-add-price.component';
import { ItemAddCategoryComponent } from './item-add/item-add-category.component';
import { ItemAddBundleComponent } from './item-add/item-add-bundle.component';
import { ItemAddProductRelationComponent } from './item-add/item-add-product-relation.component';
import { ItemAddProductRelationRelatedProductComponent } from './item-add/item-add-product-relation-related-product.component';
import { ItemAddProductRelationUpSellComponent } from './item-add/item-add-product-relation-up-sell.component';
import { ItemAddProductRelationCrossSellComponent } from './item-add/item-add-product-relation-cross-sell.component';
import { ItemAddVendorAttachmentComponent } from './item-add/item-add-vendor-attachment.component';
import { ItemAddVideoComponent } from './item-add/item-add-video.component';
import { ItemAddImageComponent, ItemAddImageComponentUploadDialog } from './item-add/item-add-image.component';
import { ItemAddPartComponent } from './item-add/item-add-part.component';

import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemEditDescriptionComponent } from './item-edit/item-edit-description.component';
import { ItemEditInventoryComponent } from './item-edit/item-edit-inventory.component';
import { ItemEditDimensionComponent } from './item-edit/item-edit-dimension.component';
import { ItemEditPriceComponent } from './item-edit/item-edit-price.component';
import { ItemEditCategoryComponent } from './item-edit/item-edit-category.component';
import { ItemEditBundleComponent } from './item-edit/item-edit-bundle.component';
import { ItemEditProductRelationComponent } from './item-edit/item-edit-product-relation.component';
import { ItemEditProductRelationRelatedProductComponent } from './item-edit/item-edit-product-relation-related-product.component';
import { ItemEditProductRelationUpSellComponent } from './item-edit/item-edit-product-relation-up-sell.component';
import { ItemEditProductRelationCrossSellComponent } from './item-edit/item-edit-product-relation-cross-sell.component';
import { ItemEditVendorAttachmentComponent } from './item-edit/item-edit-vendor-attachment.component';
import { ItemEditVideoComponent } from './item-edit/item-edit-video.component';
import { ItemEditImageComponent, ItemEditImageComponentUploadDialog } from './item-edit/item-edit-image.component';
import { ItemEditPartComponent } from './item-edit/item-edit-part.component';

import { ItemDetailComponent } from './item-detail/item-detail.component';

import { ItemImageComponent } from './item-image/item-image.component';
import { ItemVideoComponent } from './item-video/item-video.component';
import { ItemAttachmentComponent } from './item-attachment/item-attachment.component';

import { ItemRelatedProductComponent } from './item-related-product/item-related-product.component';
import { ItemUpSellComponent } from './item-up-sell/item-up-sell.component';
import { ItemCrossSellComponent } from './item-cross-sell/item-cross-sell.component';

import { itemRouting } from './item.routing';

import { ItemService } from '../item/item.service';
import { ItemEditGuard } from './item-edit/item-edit.guard';
import { ItemEditBundleGuard } from './item-edit/item-edit-bundle.guard';
import { ItemAddBundleGuard } from './item-add/item-add-bundle.guard';

import { PageNotFoundComponent } from './page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemBatchApprovalComponent } from './item-batch-approval/item-batch-approval.component';
import { ItemBatchUpdateComponent } from './item-batch-update/item-batch-update.component';
import { ItemBatchUpdateSelectComponent } from './item-batch-update/item-batch-update-select.component';
import { ItemBatchUpdateUpdateComponent } from './item-batch-update/item-batch-update-update.component';

import { ItemPartAddComponent } from './item-part-add/item-part-add.component';
import { ItemPartAddDescriptionComponent } from './item-part-add/item-part-add-description.component';
import { ItemPartAddDimensionComponent } from './item-part-add/item-part-add-dimension.component';
import { ItemPartAddPriceComponent } from './item-part-add/item-part-add-price.component';
import { ItemPartAddImageComponent } from './item-part-add/item-part-add-image.component';
import { ItemPartEditComponent } from './item-part-edit/item-part-edit.component';
import { ItemPartEditDescriptionComponent } from './item-part-edit/item-part-edit-description.component';
import { ItemPartEditInventoryComponent } from './item-part-edit/item-part-edit-inventory.component';
import { ItemPartEditDimensionComponent } from './item-part-edit/item-part-edit-dimension.component';
import { ItemPartEditPriceComponent } from './item-part-edit/item-part-edit-price.component';
import { ItemPartEditImageComponent } from './item-part-edit/item-part-edit-image.component';
import { ItemPartEditGuard } from './item-part-edit/item-part-edit.guard';


@NgModule({
    declarations: [
        ItemComponent,
        ItemListComponent,
        ItemAddComponent,
        ItemVariationComponentDialog,
        ItemAddDescriptionComponent,
        ItemAddDimensionComponent,
        ItemAddPriceComponent,
        ItemAddCategoryComponent,
        ItemAddBundleComponent,
        ItemAddProductRelationComponent,
        ItemAddProductRelationRelatedProductComponent,
        ItemAddProductRelationUpSellComponent,
        ItemAddProductRelationCrossSellComponent,
        ItemAddVendorAttachmentComponent,
        ItemAddVideoComponent,
        ItemAddImageComponent,
        ItemAddPartComponent,
        ItemEditComponent,
        ItemEditDescriptionComponent,
        ItemEditDimensionComponent,
        ItemEditPriceComponent,
        ItemEditCategoryComponent,
        ItemEditBundleComponent,
        ItemEditProductRelationComponent,
        ItemEditProductRelationRelatedProductComponent,
        ItemEditProductRelationUpSellComponent,
        ItemEditProductRelationCrossSellComponent,
        ItemEditVendorAttachmentComponent,
        ItemEditVideoComponent,
        ItemEditImageComponent,
        ItemEditInventoryComponent,
        ItemEditPartComponent,
        ItemDetailComponent,
        ItemImageComponent,
        ItemVideoComponent,
        ItemAttachmentComponent,
        ItemRelatedProductComponent,
        ItemUpSellComponent,
        ItemCrossSellComponent,
        ItemPrintLabelComponent,
        ItemBatchApprovalComponent,
        ItemBatchUpdateComponent,
        ItemBatchUpdateSelectComponent,
        ItemBatchUpdateUpdateComponent,

        ItemPartListComponent,
        ItemPartAddComponent,
        ItemPartAddDescriptionComponent,
        ItemPartAddDimensionComponent,
        ItemPartAddPriceComponent,
        ItemPartAddImageComponent,
        ItemPartEditComponent,
        ItemPartEditDescriptionComponent,
        ItemPartEditInventoryComponent,
        ItemPartEditDimensionComponent,
        ItemPartEditPriceComponent,
        ItemPartEditImageComponent,

        PageNotFoundComponent,
        ItemListComponentItemPrintDialog,
        ItemPartListComponentItemPrintDialog,
        ItemPrintLabelComponentPrintDialog,
        ItemListComponentImportDialog,
        ItemAddImageComponentUploadDialog,
        ItemEditImageComponentUploadDialog
    ],
    entryComponents: [ItemListComponent, ItemListComponentItemPrintDialog, ItemPrintLabelComponentPrintDialog, ItemAddImageComponentUploadDialog, ItemEditImageComponentUploadDialog, ItemListComponentImportDialog, ItemVariationComponentDialog],
    imports: [
        TranslateModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        CdkTableModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        MatTabsModule,
        MatTreeModule,
        MatIconModule,
        MatListModule,
        MatTooltipModule,
        ToolModule,
        itemRouting,
        NgSelectModule
    ],
    providers: [
        ItemService,
        ItemEditGuard,
        ItemEditBundleGuard,
        ItemAddBundleGuard,
        ItemPartEditGuard,
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
    ]
})

export class ItemModule { }
