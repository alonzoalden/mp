import { Routes, RouterModule } from '@angular/router';

import { ItemComponent } from './item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemPrintLabelComponent } from './item-print-label/item-print-label.component';

import { ItemAddComponent } from './item-add/item-add.component';
import { ItemAddDescriptionComponent } from './item-add/item-add-description.component';
import { ItemAddDimensionComponent } from './item-add/item-add-dimension.component';
import { ItemAddPriceComponent } from './item-add/item-add-price.component';
import { ItemAddCategoryComponent } from './item-add/item-add-category.component';
import { ItemAddBundleComponent } from './item-add/item-add-bundle.component';
import { ItemAddProductRelationComponent } from './item-add/item-add-product-relation.component';
import { ItemAddVendorAttachmentComponent } from './item-add/item-add-vendor-attachment.component';
import { ItemAddVideoComponent } from './item-add/item-add-video.component';
import { ItemAddImageComponent } from './item-add/item-add-image.component';

import { ItemEditComponent  } from './item-edit/item-edit.component';
import { ItemEditDescriptionComponent } from './item-edit/item-edit-description.component';
import { ItemEditDimensionComponent } from './item-edit/item-edit-dimension.component';
import { ItemEditPriceComponent } from './item-edit/item-edit-price.component';
import { ItemEditCategoryComponent } from './item-edit/item-edit-category.component';
import { ItemEditBundleComponent } from './item-edit/item-edit-bundle.component';
import { ItemEditProductRelationComponent } from './item-edit/item-edit-product-relation.component';
import { ItemEditVendorAttachmentComponent } from './item-edit/item-edit-vendor-attachment.component';
import { ItemEditVideoComponent } from './item-edit/item-edit-video.component';
import { ItemEditImageComponent } from './item-edit/item-edit-image.component';
import { ItemEditInventoryComponent } from './item-edit/item-edit-inventory.component';

import { ItemEditVariationComponent } from './item-edit/item-edit-variation.component';

import { ItemImageComponent } from './item-image/item-image.component';
import { ItemVideoComponent } from './item-video/item-video.component';
import { ItemAttachmentComponent } from './item-attachment/item-attachment.component';
import { ItemRelatedProductComponent } from './item-related-product/item-related-product.component';
import { ItemUpSellComponent } from './item-up-sell/item-up-sell.component';
import { ItemCrossSellComponent } from './item-cross-sell/item-cross-sell.component';

import { ItemDetailComponent } from './item-detail/item-detail.component';

import { ItemAddBundleGuard } from './item-add/item-add-bundle.guard';
import { ItemEditGuard } from './item-edit/item-edit.guard';
import { ItemEditBundleGuard } from './item-edit/item-edit-bundle.guard';
import { componentFactoryName } from '@angular/compiler';

import { PageNotFoundComponent } from './page-not-found.component';
import { ItemBatchApprovalComponent } from './item-batch-approval/item-batch-approval.component';
import { ItemBatchUpdateComponent } from './item-batch-update/item-batch-update.component';
import { ItemBatchUpdateSelectComponent } from './item-batch-update/item-batch-update-select.component';
import { ItemBatchUpdateUpdateComponent } from './item-batch-update/item-batch-update-update.component';
import { ItemAddPartComponent } from './item-add/item-add-part.component';
import { ItemEditPartComponent } from './item-edit/item-edit-part.component';

import { ItemPartListComponent, ItemPartListComponentItemPrintDialog } from './item-part-list/item-part-list.component';
import { ItemPartAddComponent } from './item-part-add/item-part-add.component';
import { ItemPartAddDescriptionComponent } from './item-part-add/item-part-add-description.component';
import { ItemPartAddDimensionComponent } from './item-part-add/item-part-add-dimension.component';
import { ItemPartAddPriceComponent } from './item-part-add/item-part-add-price.component';
import { ItemPartAddImageComponent } from './item-part-add/item-part-add-image.component';
import { ItemPartEditComponent } from './item-part-edit/item-part-edit.component';
import { ItemPartEditDescriptionComponent } from './item-part-edit/item-part-edit-description.component';
import { ItemPartEditDimensionComponent } from './item-part-edit/item-part-edit-dimension.component';
import { ItemPartEditPriceComponent } from './item-part-edit/item-part-edit-price.component';
import { ItemPartEditImageComponent } from './item-part-edit/item-part-edit-image.component';
import { ItemPartEditGuard } from './item-part-edit/item-part-edit.guard';
import { ItemPartEditInventoryComponent } from './item-part-edit/item-part-edit-inventory.component';

import { ItemVariationListComponent } from './item-variation/item-variation-list.component';
import { ItemVariationAddComponent } from './item-variation/item-variation-add.component';
import { ItemVariationEditComponent } from './item-variation/item-variation-edit.component';

const ITEM_ROUTES: Routes = [
    {
        path: '',
        component: ItemComponent,
        children: [ {
                path: '',
                component: ItemListComponent
            },
            {
                path: 'variation-listing',
                component: ItemVariationListComponent
            },
            {
                path: 'variation-listing/add',
                component: ItemVariationAddComponent
            },
            {
                path: 'variation-listing/add/:id',
                component: ItemVariationAddComponent
            },
            {
                path: 'variation-listing/:id',
                component: ItemVariationEditComponent
            },
            {
                path: 'printlabel',
                component: ItemPrintLabelComponent
            },
            {
                path: 'printlabel',
                component: ItemPartListComponentItemPrintDialog
            },
            {
                path: 'add',
                component: ItemAddComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'description',
                        pathMatch: 'full'
                    },
                    {
                        path: 'description',
                        component: ItemAddDescriptionComponent
                    },
                    {
                        path: 'dimension',
                        component: ItemAddDimensionComponent
                    },
                    {
                        path: 'price',
                        component: ItemAddPriceComponent
                    },
                    {
                        path: 'category',
                        component: ItemAddCategoryComponent
                    },
                    {
                        path: 'bundle',
                        component: ItemAddBundleComponent,
                        canDeactivate: [ItemAddBundleGuard]
                    },
                    {
                        path: 'productrelation',
                        component: ItemAddProductRelationComponent
                    },
                    {
                        path: 'attachment',
                        component: ItemAddVendorAttachmentComponent
                    },
                    {
                        path: 'video',
                        component: ItemAddVideoComponent
                    },
                    {
                        path: 'image',
                        component: ItemAddImageComponent
                    },
                    {
                        path: 'part',
                        component: ItemAddPartComponent
                    }
                ]
            },
            {
                path: ':id/detail',
                component: ItemDetailComponent,
                children: [
                ]
            },
            {
                path: ':id/image',
                component: ItemImageComponent,
                children: [
                ]
            },
            {
                path: ':id/video',
                component: ItemVideoComponent,
                children: [
                ]
            },
            {
                path: ':id/attachment',
                component: ItemAttachmentComponent
            },
            {
                path: ':id/relatedproduct',
                component: ItemRelatedProductComponent
            },
            {
                path: ':id/upsell',
                component: ItemUpSellComponent
            },
            {
                path: ':id/crosssell',
                component: ItemCrossSellComponent
            },
            {
                path: ':id/edit',
                component: ItemEditComponent,
                canDeactivate: [ItemEditGuard],
                children: [
                    {
                        path: '',
                        redirectTo: 'description',
                        pathMatch: 'full'
                    },
                    {
                        path: 'description',
                        component: ItemEditDescriptionComponent
                    },
                    {
                        path: 'dimension',
                        component: ItemEditDimensionComponent
                    },
                    {
                        path: 'price',
                        component: ItemEditPriceComponent
                    },
                    {
                        path: 'productrelation',
                        component: ItemEditProductRelationComponent
                    },
                    {
                        path: 'category',
                        component: ItemEditCategoryComponent
                    },
                    {
                        path: 'attachment',
                        component: ItemEditVendorAttachmentComponent
                    },
                    {
                        path: 'video',
                        component: ItemEditVideoComponent
                    },                    
                    {
                        path: 'image',
                        component: ItemEditImageComponent
                    },
                    {
                        path: 'bundle',
                        component: ItemEditBundleComponent,
                        canDeactivate: [ItemEditBundleGuard]
                    },
                    {
                        path: 'inventory',
                        component: ItemEditInventoryComponent
                    },                    
                    {
                        path: 'part',
                        component: ItemEditPartComponent
                    },
                    {
                        path: 'variation',
                        component: ItemEditVariationComponent
                    }
                    
                ]
            },
            {
                path: 'batch',
                component: ItemBatchApprovalComponent
            },
            {
                path: 'batchupdate',
                component: ItemBatchUpdateComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'select',
                        pathMatch: 'full'
                    },
                    {
                        path: 'select',
                        component: ItemBatchUpdateSelectComponent
                    },
                    {
                        path: 'update',
                        component: ItemBatchUpdateUpdateComponent
                    },
                ]
            },
            {
                path: 'part',
                component: ItemPartListComponent,
            },
            {
                path: 'partadd',
                component: ItemPartAddComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'partdescription',
                        pathMatch: 'full'
                    },
                    {
                        path: 'partdescription',
                        component: ItemPartAddDescriptionComponent
                    },
                    {
                        path: 'partdimension',
                        component: ItemPartAddDimensionComponent
                    },
                    {
                        path: 'partprice',
                        component: ItemPartAddPriceComponent
                    },
                    {
                        path: 'partimage',
                        component: ItemPartAddImageComponent
                    },
                ]
            },
            {
                path: 'part/:id/partedit',
                component: ItemPartEditComponent,
                canDeactivate: [ItemPartEditGuard],
                children: [
                    {
                        path: '',
                        redirectTo: 'partdescription',
                        pathMatch: 'full'
                    },
                    {
                        path: 'partdescription',
                        component: ItemPartEditDescriptionComponent
                    },
                    {
                        path: 'partinventory',
                        component: ItemPartEditInventoryComponent
                    },
                    {
                        path: 'partdimension',
                        component: ItemPartEditDimensionComponent
                    },
                    {
                        path: 'partprice',
                        component: ItemPartEditPriceComponent
                    },
                    {
                        path: 'partimage',
                        component: ItemPartEditImageComponent
                    },
                ]
            },
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

export const itemRouting = RouterModule.forChild(ITEM_ROUTES);
