import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatTreeModule, MatSortModule, MatDialogModule, MatSelectModule, MatMenuModule, MatToolbar, MatToolbarModule, MatIconModule, MatListModule, MatCheckboxModule, MatTooltipModule, MatTabsModule, MatRadioModule } from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { NgSelectModule } from '@ng-select/ng-select';
import { CdkTableModule } from '@angular/cdk/table';
import { ToolModule } from '../../shared/tool/tool.module';
import { ItemComponent } from './item.component';
import { ItemListComponent } from './item-list/components/item-list.component';
import { ItemListComponentImportDialog } from './item-list/components/item-list.component-import-dialog';
import { ItemListComponentItemPrintDialog } from './item-list/components/item-list.component-item-print-dialog';
import { ItemPrintLabelComponent } from './item-print-label/components/item-print-label.component';
import { ItemPrintLabelComponentPrintDialog } from './item-print-label/components/item-print-label.component-print-dialog';
import { ItemPartListComponent } from './item-part/components/item-part-list/item-part-list.component';
import { ItemPartListComponentItemPrintDialog } from './item-part/components/item-part-list/item-part-list.component-item-print-dialog';
import { ItemListShellComponent } from './item-list/containers/item-list-shell/item-list-shell.component';
import { ItemPrintLabelShellComponent } from './item-print-label/containers/item-print-label-shell.component';
import { ItemPartListShellComponent } from './item-part/containers/item-part-list-shell/item-part-list-shell.component';
import { ItemAddComponent } from './item-add/components/item-add.component';
import { ItemAddDescriptionComponent } from './item-add/item-add-description/components/item-add-description.component';
import { ItemAddDimensionComponent } from './item-add/item-add-dimension/components/item-add-dimension.component';
import { ItemAddPriceComponent } from './item-add/item-add-price/components/item-add-price.component';
import { ItemAddCategoryComponent } from './item-add/item-add-category/components/item-add-category.component';
import { ItemAddBundleComponent } from './item-add/item-add-bundle/components/item-add-bundle.component';
import { ItemAddProductRelationRelatedProductComponent } from './item-add/item-add-product-relation/item-add-product-relation-related-product/components/item-add-product-relation-related-product.component';
import { ItemAddProductRelationUpSellComponent } from './item-add/item-add-product-relation/item-add-product-relation-up-sell/components/item-add-product-relation-up-sell.component';
import { ItemAddProductRelationCrossSellComponent } from './item-add/item-add-product-relation/item-add-product-relation-cross-sell/components/item-add-product-relation-cross-sell.component';
import { ItemAddVendorAttachmentComponent } from './item-add/item-add-vendor-attachment/components/item-add-vendor-attachment.component';
import { ItemAddVideoComponent } from './item-add/item-add-video/components/item-add-video.component';
import { ItemAddImageComponent, ItemAddImageComponentUploadDialog } from './item-add/item-add-image/components/item-add-image.component';
import { ItemAddShellComponent } from './item-add/containers/item-add-shell.component';
import { ItemAddDescriptionShellComponent } from './item-add/item-add-description/containers/item-add-description-shell.component';
import { ItemAddDimensionShellComponent } from './item-add/item-add-dimension/containers/item-add-dimension-shell.component';
import { ItemAddPriceShellComponent } from './item-add/item-add-price/containers/item-add-price-shell.component';
import { ItemAddCategoryShellComponent } from './item-add/item-add-category/containers/item-add-category-shell.component';
import { ItemAddBundleShellComponent } from './item-add/item-add-bundle/containers/item-add-bundle-shell.component';
import { ItemAddProductRelationShellComponent } from './item-add/item-add-product-relation/containers/item-add-product-relation-shell.component';
import { ItemAddVendorAttachmentShellComponent } from './item-add/item-add-vendor-attachment/containers/item-add-vendor-attachment-shell.component';
import { ItemAddVideoShellComponent } from './item-add/item-add-video/containers/item-add-video-shell.component';
import { ItemAddImageShellComponent } from './item-add/item-add-image/containers/item-add-image-shell.component';
import { ItemAddPartShellComponent } from './item-add/item-add-part/containers/item-add-part-shell.component';
import { ItemAddPartSectionPartComponent } from './item-add/item-add-part/components/item-add-part-section-part/item-add-part-section-part.component';
import { ItemAddPartSectionComponent } from './item-add/item-add-part/components/item-add-part-section/item-add-part-section.component';
import { ItemEditPartSectionPartComponent } from './item-edit/item-edit-part/components/item-edit-part-section-part/item-edit-part-section-part.component';
import { ItemEditPartSectionComponent } from './item-edit/item-edit-part/components/item-edit-part-section/item-edit-part-section.component';
import { ItemEditComponent } from './item-edit/components/item-edit.component';
import { ItemEditDescriptionComponent } from './item-edit/item-edit-description/components/item-edit-description.component';
import { ItemEditInventoryComponent } from './item-edit/item-edit-inventory/components/item-edit-inventory.component';
import { ItemEditDimensionComponent } from './item-edit/item-edit-dimension/components/item-edit-dimension.component';
import { ItemEditPriceComponent } from './item-edit/item-edit-price/components/item-edit-price.component';
import { ItemEditCategoryComponent } from './item-edit/item-edit-category/components/item-edit-category.component';
import { ItemEditBundleComponent } from './item-edit/item-edit-bundle/components/item-edit-bundle.component';
import { ItemEditProductRelationRelatedProductComponent } from './item-edit/item-edit-product-relation/item-edit-product-relation-related-product/components/item-edit-product-relation-related-product.component';
import { ItemEditProductRelationUpSellComponent } from './item-edit/item-edit-product-relation/item-edit-product-relation-up-sell/components/item-edit-product-relation-up-sell.component';
import { ItemEditProductRelationCrossSellComponent } from './item-edit/item-edit-product-relation/item-edit-product-relation-cross-sell/components/item-edit-product-relation-cross-sell.component';
import { ItemEditVendorAttachmentComponent } from './item-edit/item-edit-vendor-attachment/components/item-edit-vendor-attachment.component';
import { ItemEditVideoComponent } from './item-edit/item-edit-video/components/item-edit-video.component';
import { ItemEditImageComponent } from './item-edit/item-edit-image/components/item-edit-image.component';
import { ItemEditImageComponentUploadDialog } from './item-edit/item-edit-image/components/item-edit-image.component-upload-dialog';
import { ItemEditShellComponent } from './item-edit/containers/item-edit-shell.component';
import { ItemEditDescriptionShellComponent } from './item-edit/item-edit-description/containers/item-edit-description-shell.component';
import { ItemEditInventoryShellComponent } from './item-edit/item-edit-inventory/containers/item-edit-inventory-shell.component';
import { ItemEditDimensionShellComponent } from './item-edit/item-edit-dimension/containers/item-edit-dimension-shell.component';
import { ItemEditPriceShellComponent } from './item-edit/item-edit-price/containers/item-edit-price-shell.component';
import { ItemEditCategoryShellComponent } from './item-edit/item-edit-category/containers/item-edit-category-shell.component';
import { ItemEditBundleShellComponent } from './item-edit/item-edit-bundle/containers/item-edit-bundle-shell.component';
import { ItemEditProductRelationShellComponent } from './item-edit/item-edit-product-relation/containers/item-edit-product-relation-shell.component';
import { ItemEditVendorAttachmentShellComponent } from './item-edit/item-edit-vendor-attachment/containers/item-edit-vendor-attachment-shell.component';
import { ItemEditVideoShellComponent } from './item-edit/item-edit-video/containers/item-edit-video-shell.component';
import { ItemEditImageShellComponent } from './item-edit/item-edit-image/containers/item-edit-image-shell.component';
import { ItemEditPartShellComponent } from './item-edit/item-edit-part/containers/item-edit-part-shell.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ItemEditGuard } from './item-edit/components/item-edit.guard';
import { ItemEditBundleGuard } from './item-edit/item-edit-bundle/item-edit-bundle.guard';
import { ItemAddBundleGuard } from './item-add/item-add-bundle/components/item-add-bundle.guard';
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
import { itemRouting } from './item.routing';
import { ItemService } from './item.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { itemReducer } from './state/item.reducer';
import { ItemEffects } from './state/item.effects';
import { SharePipeModule } from '../../shared/pipe/share.pipe';
// import { ItemAddRefurbishShellComponent } from './item-add/item-add-refurbish/containers/item-add-refurbish-shell.component';
// import { ItemAddRefurbishComponent } from './item-add/item-add-refurbish/components/item-add-refurbish.component';
// import { ItemAddRefurbishImageComponentUploadDialog } from './item-add/item-add-refurbish/components/item-add-refurbish.component-upload-dialog';
import { ItemEditRefurbishShellComponent } from './item-edit/item-edit-refurbish/containers/item-edit-refurbish-shell.component';
import { ItemEditRefurbishComponent } from './item-edit/item-edit-refurbish/components/item-edit-refurbish.component';
import { ItemEditRefurbishImageComponentUploadDialog } from './item-edit/item-edit-refurbish/components/item-edit-refurbish.component-upload-dialog';
// import { ItemVariationEffects } from './item-variation/state/item-variation.effects';
// import { itemreducer } from './item-variation/state/item-variation.reducer';



@NgModule({
    declarations: [
        ItemVariationSelectItemComponentDialog,
        ItemVariationComponentDialog,
        ItemVariationListComponent,
        ItemVariationDetailComponent,
        ItemEditVariationComponent,
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
        ItemAddProductRelationRelatedProductComponent,
        ItemAddProductRelationUpSellComponent,
        ItemAddProductRelationCrossSellComponent,
        ItemAddVendorAttachmentComponent,
        ItemAddVideoComponent,
        ItemAddImageComponent,
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
        ItemEditProductRelationRelatedProductComponent,
        ItemEditProductRelationUpSellComponent,
        ItemEditProductRelationCrossSellComponent,
        ItemEditVendorAttachmentComponent,
        ItemEditVideoComponent,
        ItemEditImageComponent,
        ItemEditInventoryComponent,
        ItemEditShellComponent,
        ItemEditDescriptionShellComponent,
        ItemEditInventoryShellComponent,
        ItemEditDimensionShellComponent,
        ItemEditPriceShellComponent,
        ItemEditCategoryShellComponent,
        ItemEditBundleShellComponent,
        ItemEditProductRelationShellComponent,
        ItemEditVendorAttachmentShellComponent,
        ItemEditVideoShellComponent,
        ItemEditImageShellComponent,
        ItemEditPartShellComponent,
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
        ItemVariationSelectItemComponentDialog,
        // ItemAddRefurbishComponent,
        // ItemAddRefurbishShellComponent,
        // ItemAddRefurbishImageComponentUploadDialog,
        ItemEditRefurbishComponent,
        ItemEditRefurbishImageComponentUploadDialog,
        ItemEditRefurbishShellComponent
    ],
    entryComponents: [
        ItemListComponent,
        ItemListComponentItemPrintDialog,
        ItemPrintLabelComponentPrintDialog,
        ItemAddImageComponentUploadDialog,
        ItemEditImageComponentUploadDialog,
        ItemListComponentImportDialog,
        ItemVariationComponentDialog,
        ItemVariationSelectItemComponentDialog,
        ItemPartListComponentItemPrintDialog,
        // ItemAddRefurbishImageComponentUploadDialog,
        ItemEditRefurbishImageComponentUploadDialog,
        //InboundShipmentPreviewDialogComponent
    ],
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
        MatTabsModule,
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
        MatRadioModule,
        ToolModule,
        itemRouting,
        NgSelectModule,
        // StoreModule.forFeature('ItemVariations', itemreducer),
        // EffectsModule.forFeature([ItemVariationEffects])
        StoreModule.forFeature('Item', itemReducer),
        EffectsModule.forFeature([ItemEffects]),
        SharePipeModule
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
