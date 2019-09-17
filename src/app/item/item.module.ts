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

import { ItemListComponent, ItemListComponentItemPrintDialog, ItemListComponentImportDialog } from './item-list/components/item-list.component';
import { ItemPrintLabelComponent, ItemPrintLabelComponentPrintDialog} from './item-print-label/components/item-print-label.component';
import { ItemPartListComponent, ItemPartListComponentItemPrintDialog } from './item-part/components/item-part-list/item-part-list.component';

import { ItemListShellComponent } from './item-list/containers/item-list-shell/item-list-shell.component';
import { ItemPrintLabelShellComponent } from './item-print-label/containers/item-print-label-shell.component';
import { ItemPartListShellComponent } from './item-part/containers/item-part-list-shell/item-part-list-shell.component';

import { ItemAddComponent } from './item-add/components/item-add/item-add.component';
import { ItemAddDescriptionComponent } from './item-add/components/item-add-description/item-add-description.component';
import { ItemAddDimensionComponent } from './item-add/components/item-add-dimension/item-add-dimension.component';
import { ItemAddPriceComponent } from './item-add/components/item-add-price/item-add-price.component';
import { ItemAddCategoryComponent } from './item-add/components/item-add-category/item-add-category.component';
import { ItemAddBundleComponent } from './item-add/components/item-add-bundle/item-add-bundle.component';
//import { ItemAddProductRelationComponent } from './components/item-add/item-add-product-relation/item-add-product-relation.component';
import { ItemAddProductRelationRelatedProductComponent } from './item-add/components/item-add-product-relation-related-product/item-add-product-relation-related-product.component';
import { ItemAddProductRelationUpSellComponent } from './item-add/components/item-add-product-relation-up-sell/item-add-product-relation-up-sell.component';
import { ItemAddProductRelationCrossSellComponent } from './item-add/components/item-add-product-relation-cross-sell/item-add-product-relation-cross-sell.component';
import { ItemAddVendorAttachmentComponent } from './item-add/components/item-add-vendor-attachment/item-add-vendor-attachment.component';
import { ItemAddVideoComponent } from './item-add/components/item-add-video/item-add-video.component';
import { ItemAddImageComponent, ItemAddImageComponentUploadDialog } from './item-add/components/item-add-image/item-add-image.component';
//import { ItemAddPartComponent } from './item-add/components/item-add-part/item-add-part.component';

import { ItemAddShellComponent } from './item-add/containers/item-add-shell/item-add-shell.component';
import { ItemAddDescriptionShellComponent } from './item-add/containers/item-add-description-shell/item-add-description-shell.component';
import { ItemAddDimensionShellComponent } from './item-add/containers/item-add-dimension-shell/item-add-dimension-shell.component';
import { ItemAddPriceShellComponent } from './item-add/containers/item-add-price-shell/item-add-price-shell.component';
import { ItemAddCategoryShellComponent } from './item-add/containers/item-add-category-shell/item-add-category-shell.component';
import { ItemAddBundleShellComponent } from './item-add/containers/item-add-bundle-shell/item-add-bundle-shell.component';
import { ItemAddProductRelationShellComponent } from './item-add/containers/item-add-product-relation-shell/item-add-product-relation-shell.component';
import { ItemAddVendorAttachmentShellComponent } from './item-add/containers/item-add-vendor-attachment-shell/item-add-vendor-attachment-shell.component';
import { ItemAddVideoShellComponent } from './item-add/containers/item-add-video-shell/item-add-video-shell.component';
import { ItemAddImageShellComponent } from './item-add/containers/item-add-image-shell/item-add-image-shell.component';
import { ItemAddPartShellComponent } from './item-add/containers/item-add-part-shell/item-add-part-shell.component';
//import { ItemAddComponent } from './item-add/item-add.component';
//import { ItemAddDescriptionComponent } from './item-add/item-add-description.component';
//import { ItemAddDimensionComponent } from './item-add/item-add-dimension.component';
//import { ItemAddPriceComponent } from './item-add/item-add-price.component';
//import { ItemAddCategoryComponent } from './item-add/item-add-category.component';
//import { ItemAddBundleComponent } from './item-add/item-add-bundle.component';
//import { ItemAddProductRelationComponent } from './item-add/item-add-product-relation.component';
//import { ItemAddProductRelationRelatedProductComponent } from './item-add/item-add-product-relation-related-product.component';
//import { ItemAddProductRelationUpSellComponent } from './item-add/item-add-product-relation-up-sell.component';
//import { ItemAddProductRelationCrossSellComponent } from './item-add/item-add-product-relation-cross-sell.component';
//import { ItemAddVendorAttachmentComponent } from './item-add/item-add-vendor-attachment.component';
//import { ItemAddVideoComponent } from './item-add/item-add-video.component';
//import { ItemAddImageComponent, ItemAddImageComponentUploadDialog } from './item-add/item-add-image.component';
//import { ItemAddPartComponent } from './item-add/item-add-part.component';
import { ItemAddPartSectionPartComponent } from './item-add/components/item-add-part/item-add-part-section-part/item-add-part-section-part.component';
import { ItemAddPartSectionComponent } from './item-add/components/item-add-part/item-add-part-section/item-add-part-section.component';



// import { ItemEditComponent } from './item-edit/item-edit.component';
// import { ItemEditDescriptionComponent } from './item-edit/item-edit-description.component';
// import { ItemEditInventoryComponent } from './item-edit/item-edit-inventory.component';
// import { ItemEditDimensionComponent } from './item-edit/item-edit-dimension.component';
// import { ItemEditPriceComponent } from './item-edit/item-edit-price.component';
// import { ItemEditCategoryComponent } from './item-edit/item-edit-category.component';
// import { ItemEditBundleComponent } from './item-edit/item-edit-bundle.component';
// import { ItemEditProductRelationComponent } from './item-edit/item-edit-product-relation.component';
// import { ItemEditProductRelationRelatedProductComponent } from './item-edit/item-edit-product-relation-related-product.component';
// import { ItemEditProductRelationUpSellComponent } from './item-edit/item-edit-product-relation-up-sell.component';
// import { ItemEditProductRelationCrossSellComponent } from './item-edit/item-edit-product-relation-cross-sell.component';
// import { ItemEditVendorAttachmentComponent } from './item-edit/item-edit-vendor-attachment.component';
// import { ItemEditVideoComponent } from './item-edit/item-edit-video.component';
// import { ItemEditImageComponent, ItemEditImageComponentUploadDialog } from './item-edit/item-edit-image.component';
// import { ItemEditPartComponent } from './item-edit/item-edit-part.component';
import { ItemEditPartSectionPartComponent } from './item-edit/components/item-edit-part/item-edit-part-section-part/item-edit-part-section-part.component';
import { ItemEditPartSectionComponent } from './item-edit/components/item-edit-part/item-edit-part-section/item-edit-part-section.component';

import { ItemEditComponent } from './item-edit/components/item-edit/item-edit.component';
import { ItemEditDescriptionComponent } from './item-edit/components/item-edit-description/item-edit-description.component';
import { ItemEditInventoryComponent } from './item-edit/components/item-edit-inventory/item-edit-inventory.component';
import { ItemEditDimensionComponent } from './item-edit/components/item-edit-dimension/item-edit-dimension.component';
import { ItemEditPriceComponent } from './item-edit/components/item-edit-price/item-edit-price.component';
import { ItemEditCategoryComponent } from './item-edit/components/item-edit-category/item-edit-category.component';
import { ItemEditBundleComponent } from './item-edit/components/item-edit-bundle/item-edit-bundle.component';
//import { ItemEditProductRelationComponent } from './components/item-edit/item-edit-product-relation/item-edit-product-relation.component';
import { ItemEditProductRelationRelatedProductComponent } from './item-edit/components/item-edit-product-relation-related-product/item-edit-product-relation-related-product.component';
import { ItemEditProductRelationUpSellComponent } from './item-edit/components/item-edit-product-relation-up-sell/item-edit-product-relation-up-sell.component';
import { ItemEditProductRelationCrossSellComponent } from './item-edit/components/item-edit-product-relation-cross-sell/item-edit-product-relation-cross-sell.component';
import { ItemEditVendorAttachmentComponent } from './item-edit/components/item-edit-vendor-attachment/item-edit-vendor-attachment.component';
import { ItemEditVideoComponent } from './item-edit/components/item-edit-video/item-edit-video.component';
import { ItemEditImageComponent, ItemEditImageComponentUploadDialog } from './item-edit/components/item-edit-image/item-edit-image.component';
//import { ItemEditPartComponent } from './item-edit/components/item-edit-part/item-edit-part.component';

import { ItemEditShellComponent } from './item-edit/containers/item-edit-shell/item-edit-shell.component';
import { ItemEditDescriptionShellComponent } from './item-edit/containers/item-edit-description-shell/item-edit-description-shell.component';
import { ItemEditInventoryShellComponent } from './item-edit/containers/item-edit-inventory-shell/item-edit-inventory-shell.component';
import { ItemEditDimensionShellComponent } from './item-edit/containers/item-edit-dimension-shell/item-edit-dimension-shell.component';
import { ItemEditPriceShellComponent } from './item-edit/containers/item-edit-price-shell/item-edit-price-shell.component';
import { ItemEditCategoryShellComponent } from './item-edit/containers/item-edit-category-shell/item-edit-category-shell.component';
import { ItemEditBundleShellComponent } from './item-edit/containers/item-edit-bundle-shell/item-edit-bundle-shell.component';
import { ItemEditProductRelationShellComponent } from './item-edit/containers/item-edit-product-relation-shell/item-edit-product-relation-shell.component';
//import { ItemEditProductRelationRelatedProductShellComponent } from './containers/item-edit-shell/item-edit-product-relation-shell/item-edit-product-relation-related-product-shell/item-edit-product-relation-related-product-shell.component';
//import { ItemEditProductRelationUpSellShellComponent } from './containers/item-edit-shell/item-edit-product-relation-shell/item-edit-product-relation-up-sell-shell/item-edit-product-relation-up-sell-shell.component';
//import { ItemEditProductRelationCrossSellShellComponent } from './containers/item-edit-shell/item-edit-product-relation-shell/item-edit-product-relation-cross-sell-shell/item-edit-product-relation-cross-sell-shell.component';
import { ItemEditVendorAttachmentShellComponent } from './item-edit/containers/item-edit-vendor-attachment-shell/item-edit-vendor-attachment-shell.component';
import { ItemEditVideoShellComponent } from './item-edit/containers/item-edit-video-shell/item-edit-video-shell.component';
import { ItemEditImageShellComponent } from './item-edit/containers/item-edit-image-shell/item-edit-image-shell.component';
import { ItemEditPartShellComponent } from './item-edit/containers/item-edit-part-shell/item-edit-part-shell.component';

import { PageNotFoundComponent } from './page-not-found.component';
// UNSED and DELETED
// import { ItemDetailComponent } from './item-detail/item-detail.component';
// import { ItemImageComponent } from './item-image/item-image.component';
// import { ItemVideoComponent } from './item-video/item-video.component';
// import { ItemAttachmentComponent } from './item-attachment/item-attachment.component';
// import { ItemRelatedProductComponent } from './item-related-product/item-related-product.component';
// import { ItemUpSellComponent } from './item-up-sell/item-up-sell.component';
// import { ItemCrossSellComponent } from './item-cross-sell/item-cross-sell.component';

import { itemRouting } from './item.routing';

import { ItemService } from '../item/item.service';
import { ItemEditGuard } from './item-edit/components/item-edit/item-edit.guard';
import { ItemEditBundleGuard } from './item-edit/components/item-edit-bundle/item-edit-bundle.guard';
import { ItemAddBundleGuard } from './item-add/components/item-add-bundle/item-add-bundle.guard';

import { ItemBatchApprovalComponent } from './item-batch/item-batch-approval/components/item-batch-approval/item-batch-approval.component';
import { ItemBatchUpdateComponent } from './item-batch/item-batch-update/components/item-batch-update/item-batch-update.component';
import { ItemBatchUpdateSelectComponent } from './item-batch/item-batch-update/components/item-batch-update/item-batch-update-select/item-batch-update-select.component';
import { ItemBatchUpdateUpdateComponent } from './item-batch/item-batch-update/components/item-batch-update/item-batch-update-update/item-batch-update-update.component';

import { ItemBatchApprovalShellComponent } from './item-batch/item-batch-approval/containers/item-batch-approval-shell/item-batch-approval-shell.component';
import { ItemBatchUpdateShellComponent } from './item-batch/item-batch-update/containers/item-batch-update-shell/item-batch-update-shell.component';
import { ItemBatchUpdateSelectShellComponent } from './item-batch/item-batch-update/containers/item-batch-update-shell/item-batch-update-select-shell/item-batch-update-select-shell.component';
import { ItemBatchUpdateUpdateShellComponent } from './item-batch/item-batch-update/containers/item-batch-update-shell/item-batch-update-update-shell/item-batch-update-update-shell.component';

import { ItemPartAddComponent } from './item-part/components/item-part-add/item-part-add.component';
import { ItemPartAddDescriptionComponent } from './item-part/components/item-part-add/item-part-add-description/item-part-add-description.component';
import { ItemPartAddDimensionComponent } from './item-part/components/item-part-add/item-part-add-dimension/item-part-add-dimension.component';
import { ItemPartAddPriceComponent } from './item-part/components/item-part-add/item-part-add-price/item-part-add-price.component';
import { ItemPartAddImageComponent } from './item-part/components/item-part-add/item-part-add-image/item-part-add-image.component';
import { ItemPartEditComponent } from './item-part/components/item-part-edit/item-part-edit.component';
import { ItemPartEditDescriptionComponent } from './item-part/components/item-part-edit/item-part-edit-description/item-part-edit-description.component';
import { ItemPartEditInventoryComponent } from './item-part/components/item-part-edit/item-part-edit-inventory/item-part-edit-inventory.component';
import { ItemPartEditDimensionComponent } from './item-part/components/item-part-edit/item-part-edit-dimension/item-part-edit-dimension.component';
import { ItemPartEditPriceComponent } from './item-part/components/item-part-edit/item-part-edit-price/item-part-edit-price.component';
import { ItemPartEditImageComponent } from './item-part/components/item-part-edit/item-part-edit-image/item-part-edit-image.component';

import { ItemPartAddShellComponent } from './item-part/containers/item-part-add-shell/item-part-add-shell/item-part-add-shell.component';
import { ItemPartAddDescriptionShellComponent } from './item-part/containers/item-part-add-shell/item-part-add-description-shell/item-part-add-description-shell.component';
import { ItemPartAddDimensionShellComponent } from './item-part/containers/item-part-add-shell/item-part-add-dimension-shell/item-part-add-dimension-shell.component';
import { ItemPartAddPriceShellComponent } from './item-part/containers/item-part-add-shell/item-part-add-price-shell/item-part-add-price-shell.component';
import { ItemPartAddImageShellComponent } from './item-part/containers/item-part-add-shell/item-part-add-image-shell/item-part-add-image-shell.component';
import { ItemPartEditShellComponent } from './item-part/containers/item-part-edit-shell/item-part-edit-shell/item-part-edit-shell.component';
import { ItemPartEditDescriptionShellComponent } from './item-part/containers/item-part-edit-shell/item-part-edit-description-shell/item-part-edit-description-shell.component';
import { ItemPartEditInventoryShellComponent } from './item-part/containers/item-part-edit-shell/item-part-edit-inventory-shell/item-part-edit-inventory-shell.component';
import { ItemPartEditDimensionShellComponent } from './item-part/containers/item-part-edit-shell/item-part-edit-dimension-shell/item-part-edit-dimension-shell.component';
import { ItemPartEditPriceShellComponent } from './item-part/containers/item-part-edit-shell/item-part-edit-price-shell/item-part-edit-price-shell.component';
import { ItemPartEditImageShellComponent } from './item-part/containers/item-part-edit-shell/item-part-edit-image-shell/item-part-edit-image-shell.component';

import { ItemPartEditGuard } from './item-part/components/item-part-edit/item-part-edit.guard';

import { ItemVariationSelectItemComponentDialog } from './item-variation/item-variation-select-item.component-dialog';
import { ItemVariationComponentDialog } from './item-variation/item-variation.component-dialog';
import { ItemVariationListComponent } from './item-variation/item-variation-list.component';
import { ItemVariationDetailComponent } from './item-variation/item-variation-detail.component';
import { ItemEditVariationComponent } from './item-edit/item-edit-variation.component';

// /* NgRx */
// import { itemreducer } from './item-variation/state/item-variation.reducer';
// import { ItemVariationEffects } from './item-variation/state/item-variation.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { itemReducer } from './state/item.reducer';
import { ItemEffects } from './state/item.effects';

@NgModule({
    declarations: [
        ItemComponent,
        ItemListComponent,
        ItemAddComponent,

        ItemListShellComponent,
        ItemPrintLabelShellComponent,
        ItemPartListShellComponent,

        ItemAddShellComponent,
        ItemAddDescriptionShellComponent,
        ItemAddDimensionShellComponent,
        ItemAddPriceShellComponent, 
        ItemAddCategoryShellComponent, 
        ItemAddBundleShellComponent, 
        ItemAddProductRelationShellComponent,
        ItemAddVendorAttachmentShellComponent,
        ItemAddVideoShellComponent,
        ItemAddImageShellComponent,
        ItemAddPartShellComponent,
        ItemAddDescriptionComponent,
        ItemAddDimensionComponent,
        ItemAddPriceComponent,
        ItemAddCategoryComponent,
        ItemAddBundleComponent,
        //ItemAddProductRelationComponent,
        ItemAddProductRelationRelatedProductComponent,
        ItemAddProductRelationUpSellComponent,
        ItemAddProductRelationCrossSellComponent,
        ItemAddVendorAttachmentComponent,
        ItemAddVideoComponent,
        ItemAddImageComponent,
        //ItemAddPartComponent,
        ItemAddPartSectionPartComponent,
        ItemAddPartSectionComponent,
        ItemEditPartSectionComponent,
        ItemEditPartSectionPartComponent,
        ItemEditComponent,
        ItemEditDescriptionComponent,
        ItemEditDimensionComponent,
        ItemEditPriceComponent,
        ItemEditCategoryComponent,
        ItemEditBundleComponent,
        //ItemEditProductRelationComponent,
        ItemEditProductRelationRelatedProductComponent,
        ItemEditProductRelationUpSellComponent,
        ItemEditProductRelationCrossSellComponent,
        ItemEditVendorAttachmentComponent,
        ItemEditVideoComponent,
        ItemEditImageComponent,
        ItemEditInventoryComponent,
        //ItemEditPartComponent,

        ItemEditShellComponent,
        ItemEditDescriptionShellComponent,
        ItemEditInventoryShellComponent,
        ItemEditDimensionShellComponent,
        ItemEditPriceShellComponent,
        ItemEditCategoryShellComponent,
        ItemEditBundleShellComponent,
        ItemEditProductRelationShellComponent,
        // ItemEditProductRelationRelatedProductShellComponent,
        // ItemEditProductRelationUpSellShellComponent,
        // ItemEditProductRelationCrossSellShellComponent,
        ItemEditVendorAttachmentShellComponent,
        ItemEditVideoShellComponent,
        ItemEditImageShellComponent,
        ItemEditPartShellComponent,
        // ItemDetailComponent,
        // ItemImageComponent,
        // ItemVideoComponent,
        // ItemAttachmentComponent,
        // ItemRelatedProductComponent,
        // ItemUpSellComponent,
        // ItemCrossSellComponent,
        ItemPrintLabelComponent,
        ItemBatchApprovalComponent,
        ItemBatchUpdateComponent,
        ItemBatchUpdateSelectComponent,
        ItemBatchUpdateUpdateComponent,
        
        ItemBatchApprovalShellComponent,
        ItemBatchUpdateShellComponent,
        ItemBatchUpdateSelectShellComponent,
        ItemBatchUpdateUpdateShellComponent,

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

        ItemPartAddShellComponent,
        ItemPartAddDescriptionShellComponent,
        ItemPartAddDimensionShellComponent,
        ItemPartAddPriceShellComponent,
        ItemPartAddImageShellComponent,
        ItemPartEditShellComponent,
        ItemPartEditDescriptionShellComponent,
        ItemPartEditInventoryShellComponent,
        ItemPartEditDimensionShellComponent,
        ItemPartEditPriceShellComponent,
        ItemPartEditImageShellComponent,

        PageNotFoundComponent,
        ItemListComponentItemPrintDialog,
        ItemPartListComponentItemPrintDialog,
        ItemPrintLabelComponentPrintDialog,
        ItemListComponentImportDialog,
        ItemAddImageComponentUploadDialog,
        ItemEditImageComponentUploadDialog,
        ItemVariationListComponent,
        ItemVariationDetailComponent,
        ItemEditVariationComponent,
        ItemVariationComponentDialog,
        ItemVariationSelectItemComponentDialog
        
    ],
    //entryComponents: [ItemPartListComponentItemPrintDialog, ItemListComponent, ItemListComponentItemPrintDialog, ItemPrintLabelComponentPrintDialog, ItemAddImageComponentUploadDialog, ItemEditImageComponentUploadDialog, ItemListComponentImportDialog],
    entryComponents: [ItemListComponent, ItemListComponentItemPrintDialog, ItemPrintLabelComponentPrintDialog, ItemAddImageComponentUploadDialog, ItemEditImageComponentUploadDialog, ItemListComponentImportDialog, ItemVariationComponentDialog, ItemVariationSelectItemComponentDialog],
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
        MatTreeModule,
        MatIconModule,
        MatListModule,
        MatTooltipModule,
        MatTabsModule,
        ToolModule,
        itemRouting,
        NgSelectModule,
        // StoreModule.forFeature('ItemVariations', itemreducer),
        // EffectsModule.forFeature([ItemVariationEffects])
        StoreModule.forFeature('Item', itemReducer),
        EffectsModule.forFeature([ItemEffects])
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
