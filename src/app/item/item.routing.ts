import { Routes, RouterModule } from '@angular/router';

import { ItemComponent } from './item.component';

import { ItemListShellComponent } from './containers/item-list-shell/item-list-shell.component';
import { ItemPrintLabelShellComponent } from './containers/item-print-label-shell/item-print-label-shell.component';

//import { ItemListComponent } from './components/item-list/item-list.component';
//import { ItemPrintLabelComponent } from './components/item-print-label/item-print-label.component';

// import { ItemAddComponent } from './item-add/item-add/item-add.component';
// import { ItemAddDescriptionComponent } from './item-add/item-add-description/item-add-description.component';
// import { ItemAddDimensionComponent } from './item-add/item-add-dimension/item-add-dimension.component';
// import { ItemAddPriceComponent } from './item-add/item-add-price/item-add-price.component';
// import { ItemAddCategoryComponent } from './item-add/item-add-category/item-add-category.component';
// import { ItemAddBundleComponent } from './item-add/item-add-bundle/item-add-bundle.component';
// import { ItemAddProductRelationComponent } from './item-add/item-add-product-relation/item-add-product-relation.component';
// import { ItemAddVendorAttachmentComponent } from './item-add/item-add-vendor-attachment/item-add-vendor-attachment.component';
// import { ItemAddVideoComponent } from './item-add/item-add-video/item-add-video.component';
// import { ItemAddImageComponent } from './item-add/item-add-image/item-add-image.component';

import { ItemAddShellComponent } from './containers/item-add-shell/item-add-shell/item-add-shell.component';
import { ItemAddDescriptionShellComponent } from './containers/item-add-shell/item-add-description-shell/item-add-description-shell.component';
import { ItemAddDimensionShellComponent } from './containers/item-add-shell/item-add-dimension-shell/item-add-dimension-shell.component';
import { ItemAddPriceShellComponent } from './containers/item-add-shell/item-add-price-shell/item-add-price-shell.component';
import { ItemAddCategoryShellComponent } from './containers/item-add-shell/item-add-category-shell/item-add-category-shell.component';
import { ItemAddBundleShellComponent } from './containers/item-add-shell/item-add-bundle-shell/item-add-bundle-shell.component';
import { ItemAddProductRelationShellComponent } from './containers/item-add-shell/item-add-product-relation-shell/item-add-product-relation-shell.component';
import { ItemAddVendorAttachmentShellComponent } from './containers/item-add-shell/item-add-vendor-attachment-shell/item-add-vendor-attachment-shell.component';
import { ItemAddVideoShellComponent } from './containers/item-add-shell/item-add-video-shell/item-add-video-shell.component';
import { ItemAddImageShellComponent } from './containers/item-add-shell/item-add-image-shell/item-add-image-shell.component';


import { ItemEditShellComponent  } from './containers/item-edit-shell/item-edit-shell/item-edit-shell.component';
import { ItemEditDescriptionShellComponent } from './containers/item-edit-shell/item-edit-description-shell/item-edit-description-shell.component';
import { ItemEditDimensionShellComponent } from './containers/item-edit-shell/item-edit-dimension-shell/item-edit-dimension-shell.component';
import { ItemEditPriceShellComponent } from './containers/item-edit-shell/item-edit-price-shell/item-edit-price-shell.component';
import { ItemEditCategoryShellComponent } from './containers/item-edit-shell/item-edit-category-shell/item-edit-category-shell.component';
import { ItemEditBundleShellComponent } from './containers/item-edit-shell/item-edit-bundle-shell/item-edit-bundle-shell.component';
import { ItemEditProductRelationShellComponent } from './containers/item-edit-shell/item-edit-product-relation-shell/item-edit-product-relation-shell.component';
import { ItemEditVendorAttachmentShellComponent } from './containers/item-edit-shell/item-edit-vendor-attachment-shell/item-edit-vendor-attachment-shell.component';
import { ItemEditVideoShellComponent } from './containers/item-edit-shell/item-edit-video-shell/item-edit-video-shell.component';
import { ItemEditImageShellComponent } from './containers/item-edit-shell/item-edit-image-shell/item-edit-image-shell.component';
import { ItemEditInventoryShellComponent } from './containers/item-edit-shell/item-edit-inventory-shell/item-edit-inventory-shell.component';

import { ItemEditVariationComponent } from './item-edit/item-edit-variation.component';

//  UNUSED and DELETED
// import { ItemImageComponent } from './item-image/item-image.component';
// import { ItemVideoComponent } from './item-video/item-video.component';
// import { ItemAttachmentComponent } from './item-attachment/item-attachment.component';
// import { ItemRelatedProductComponent } from './item-related-product/item-related-product.component';
// import { ItemUpSellComponent } from './item-up-sell/item-up-sell.component';
// import { ItemCrossSellComponent } from './item-cross-sell/item-cross-sell.component';
// import { ItemDetailComponent } from './item-detail/item-detail.component';

import { ItemAddBundleGuard } from './components/item-add/item-add-bundle/item-add-bundle.guard';
import { ItemEditGuard } from './components/item-edit/item-edit/item-edit.guard';
import { ItemEditBundleGuard } from './components/item-edit/item-edit-bundle/item-edit-bundle.guard';
import { ItemPartEditGuard } from './components/item-part-edit/item-part-edit/item-part-edit.guard';


import { ItemBatchApprovalShellComponent } from './containers/item-batch-approval-shell/item-batch-approval-shell.component';
import { ItemBatchUpdateShellComponent } from './containers/item-batch-update-shell/item-batch-update-shell.component';
import { ItemBatchUpdateSelectShellComponent } from './containers/item-batch-update-shell/item-batch-update-select-shell.component';
import { ItemBatchUpdateUpdateShellComponent } from './containers/item-batch-update-shell/item-batch-update-update-shell.component';
import { ItemAddPartShellComponent } from './containers/item-add-shell/item-add-part-shell/item-add-part-shell.component';
import { ItemEditPartShellComponent } from './containers/item-edit-shell/item-edit-part-shell/item-edit-part-shell.component';

import { ItemPartListComponentItemPrintDialog } from './components/item-part-list/item-part-list.component';
import { ItemPartListShellComponent } from './containers/item-part-list-shell/item-part-list-shell.component';
import { ItemPartAddShellComponent } from './containers/item-part-add-shell/item-part-add-shell/item-part-add-shell.component';
import { ItemPartAddDescriptionShellComponent } from './containers/item-part-add-shell/item-part-add-description-shell/item-part-add-description-shell.component';
import { ItemPartAddDimensionShellComponent } from './containers/item-part-add-shell/item-part-add-dimension-shell/item-part-add-dimension-shell.component';
import { ItemPartAddPriceShellComponent } from './containers/item-part-add-shell/item-part-add-price-shell/item-part-add-price-shell.component';
import { ItemPartAddImageShellComponent } from './containers/item-part-add-shell/item-part-add-image-shell/item-part-add-image-shell.component';
import { ItemPartEditShellComponent } from './containers/item-part-edit-shell/item-part-edit-shell/item-part-edit-shell.component';
import { ItemPartEditDescriptionShellComponent } from './containers/item-part-edit-shell/item-part-edit-description-shell/item-part-edit-description-shell.component';
import { ItemPartEditDimensionShellComponent } from './containers/item-part-edit-shell/item-part-edit-dimension-shell/item-part-edit-dimension-shell.component';
import { ItemPartEditPriceShellComponent } from './containers/item-part-edit-shell/item-part-edit-price-shell/item-part-edit-price-shell.component';
import { ItemPartEditImageShellComponent } from './containers/item-part-edit-shell/item-part-edit-image-shell/item-part-edit-image-shell.component';
import { ItemPartEditInventoryShellComponent } from './containers/item-part-edit-shell/item-part-edit-inventory-shell/item-part-edit-inventory-shell.component';

import { PageNotFoundComponent } from './page-not-found.component';

import { ItemVariationListComponent } from './item-variation/item-variation-list.component';

import { ItemVariationDetailComponent } from './item-variation/item-variation-detail.component';

const ITEM_ROUTES: Routes = [
    {
        path: '',
        component: ItemComponent,
        children: [ {
                path: '',
                component: ItemListShellComponent
            },
            {
                path: 'variation-listing',
                component: ItemVariationListComponent
            },
            {
                path: 'variation-listing/detail',
                component: ItemVariationDetailComponent
            },
            {
                path: 'variation-listing/detail/:id',
                component: ItemVariationDetailComponent
            },
            {
                path: 'printlabel',
                component: ItemPrintLabelShellComponent
            },            
            {
                path: 'printlabel',
                component: ItemPartListComponentItemPrintDialog
            },
            {
                path: 'add',
                component: ItemAddShellComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'description',
                        pathMatch: 'full'
                    },
                    {
                        path: 'description',
                        component: ItemAddDescriptionShellComponent
                    },
                    {
                        path: 'dimension',
                        component: ItemAddDimensionShellComponent
                    },
                    {
                        path: 'price',
                        component: ItemAddPriceShellComponent
                    },
                    {
                        path: 'category',
                        component: ItemAddCategoryShellComponent
                    },
                    {
                        path: 'bundle',
                        component: ItemAddBundleShellComponent,
                        canDeactivate: [ItemAddBundleGuard]
                    },
                    {
                        path: 'productrelation',
                        component: ItemAddProductRelationShellComponent
                    },
                    {
                        path: 'attachment',
                        component: ItemAddVendorAttachmentShellComponent
                    },
                    {
                        path: 'video',
                        component: ItemAddVideoShellComponent
                    },
                    {
                        path: 'image',
                        component: ItemAddImageShellComponent
                    },
                    {
                        path: 'part',
                        component: ItemAddPartShellComponent
                    }
                ]
            },
            //UNSED AND DELETED
            // {
            //     path: ':id/detail',
            //     component: ItemDetailComponent,
            //     children: [
            //     ]
            // },
            // {
            //     path: ':id/image',
            //     component: ItemImageComponent,
            //     children: [
            //     ]
            // },
            // {
            //     path: ':id/video',
            //     component: ItemVideoComponent,
            //     children: [
            //     ]
            // },
            // {
            //     path: ':id/attachment',
            //     component: ItemAttachmentComponent
            // },
            // {
            //     path: ':id/relatedproduct',
            //     component: ItemRelatedProductComponent
            // },
            // {
            //     path: ':id/upsell',
            //     component: ItemUpSellComponent
            // },
            // {
            //     path: ':id/crosssell',
            //     component: ItemCrossSellComponent
            // },
            {
                path: ':id/edit',
                component: ItemEditShellComponent,
                canDeactivate: [ItemEditGuard],
                children: [
                    {
                        path: '',
                        redirectTo: 'description',
                        pathMatch: 'full'
                    },
                    {
                        path: 'description',
                        component: ItemEditDescriptionShellComponent
                    },
                    {
                        path: 'dimension',
                        component: ItemEditDimensionShellComponent
                    },
                    {
                        path: 'price',
                        component: ItemEditPriceShellComponent
                    },
                    {
                        path: 'productrelation',
                        component: ItemEditProductRelationShellComponent
                    },
                    {
                        path: 'category',
                        component: ItemEditCategoryShellComponent
                    },
                    {
                        path: 'attachment',
                        component: ItemEditVendorAttachmentShellComponent
                    },
                    {
                        path: 'video',
                        component: ItemEditVideoShellComponent
                    },                    
                    {
                        path: 'image',
                        component: ItemEditImageShellComponent
                    },
                    {
                        path: 'bundle',
                        component: ItemEditBundleShellComponent,
                        canDeactivate: [ItemEditBundleGuard]
                    },
                    {
                        path: 'inventory',
                        component: ItemEditInventoryShellComponent
                    },                    
                    {
                        path: 'part',
                        component: ItemEditPartShellComponent
                    },
                    {
                        path: 'variation',
                        component: ItemEditVariationComponent
                    }
                    
                ]
            },
            {
                path: 'batch',
                component: ItemBatchApprovalShellComponent
            },
            {
                path: 'batchupdate',
                component: ItemBatchUpdateShellComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'select',
                        pathMatch: 'full'
                    },
                    {
                        path: 'select',
                        component: ItemBatchUpdateSelectShellComponent
                    },
                    {
                        path: 'update',
                        component: ItemBatchUpdateUpdateShellComponent
                    },
                ]
            },
            {
                path: 'part',
                component: ItemPartListShellComponent,
            },
            {
                path: 'partadd',
                component: ItemPartAddShellComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'partdescription',
                        pathMatch: 'full'
                    },
                    {
                        path: 'partdescription',
                        component: ItemPartAddDescriptionShellComponent
                    },
                    {
                        path: 'partdimension',
                        component: ItemPartAddDimensionShellComponent
                    },
                    {
                        path: 'partprice',
                        component: ItemPartAddPriceShellComponent
                    },
                    {
                        path: 'partimage',
                        component: ItemPartAddImageShellComponent
                    },
                ]
            },
            {
                path: 'part/:id/partedit',
                component: ItemPartEditShellComponent,
                canDeactivate: [ItemPartEditGuard],
                children: [
                    {
                        path: '',
                        redirectTo: 'partdescription',
                        pathMatch: 'full'
                    },
                    {
                        path: 'partdescription',
                        component: ItemPartEditDescriptionShellComponent
                    },
                    {
                        path: 'partinventory',
                        component: ItemPartEditInventoryShellComponent
                    },
                    {
                        path: 'partdimension',
                        component: ItemPartEditDimensionShellComponent
                    },
                    {
                        path: 'partprice',
                        component: ItemPartEditPriceShellComponent
                    },
                    {
                        path: 'partimage',
                        component: ItemPartEditImageShellComponent
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
