import { Routes, RouterModule } from '@angular/router';
import { ItemComponent } from './item.component';
import { ItemListShellComponent } from './item-list/containers/item-list-shell/item-list-shell.component';
import { ItemPrintLabelShellComponent } from './item-print-label/containers/item-print-label-shell.component';
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
import { ItemEditShellComponent  } from './item-edit/containers/item-edit-shell.component';
import { ItemEditDescriptionShellComponent } from './item-edit/item-edit-description/containers/item-edit-description-shell.component';
import { ItemEditDimensionShellComponent } from './item-edit/item-edit-dimension/containers/item-edit-dimension-shell.component';
import { ItemEditPriceShellComponent } from './item-edit/item-edit-price/containers/item-edit-price-shell.component';
import { ItemEditCategoryShellComponent } from './item-edit/item-edit-category/containers/item-edit-category-shell.component';
import { ItemEditBundleShellComponent } from './item-edit/item-edit-bundle/containers/item-edit-bundle-shell.component';
import { ItemEditProductRelationShellComponent } from './item-edit/item-edit-product-relation/containers/item-edit-product-relation-shell.component';
import { ItemEditVendorAttachmentShellComponent } from './item-edit/item-edit-vendor-attachment/containers/item-edit-vendor-attachment-shell.component';
import { ItemEditVideoShellComponent } from './item-edit/item-edit-video/containers/item-edit-video-shell.component';
import { ItemEditImageShellComponent } from './item-edit/item-edit-image/containers/item-edit-image-shell.component';
import { ItemEditInventoryShellComponent } from './item-edit/item-edit-inventory/containers/item-edit-inventory-shell.component';
import { ItemAddBundleGuard } from './item-add/item-add-bundle/components/item-add-bundle.guard';
import { ItemEditGuard } from './item-edit/components/item-edit.guard';
import { ItemEditBundleGuard } from './item-edit/item-edit-bundle/item-edit-bundle.guard';
import { ItemPartEditGuard } from './item-part/components/item-part-edit/item-part-edit.guard';
import { ItemBatchApprovalShellComponent } from './item-batch/item-batch-approval/containers/item-batch-approval-shell/item-batch-approval-shell.component';
import { ItemBatchUpdateShellComponent } from './item-batch/item-batch-update/containers/item-batch-update-shell/item-batch-update-shell.component';
import { ItemBatchUpdateSelectShellComponent } from './item-batch/item-batch-update/containers/item-batch-update-shell/item-batch-update-select-shell/item-batch-update-select-shell.component';
import { ItemBatchUpdateUpdateShellComponent } from './item-batch/item-batch-update/containers/item-batch-update-shell/item-batch-update-update-shell/item-batch-update-update-shell.component';
import { ItemAddPartShellComponent } from './item-add/item-add-part/containers/item-add-part-shell.component';
import { ItemEditPartShellComponent } from './item-edit/item-edit-part/containers/item-edit-part-shell.component';
import { ItemPartListComponentItemPrintDialog } from './item-part/components/item-part-list/item-part-list.component';
import { ItemPartListShellComponent } from './item-part/containers/item-part-list-shell/item-part-list-shell.component';
import { ItemPartAddShellComponent } from './item-part/containers/item-part-add-shell/item-part-add-shell/item-part-add-shell.component';
import { ItemPartAddDescriptionShellComponent } from './item-part/containers/item-part-add-shell/item-part-add-description-shell/item-part-add-description-shell.component';
import { ItemPartAddDimensionShellComponent } from './item-part/containers/item-part-add-shell/item-part-add-dimension-shell/item-part-add-dimension-shell.component';
import { ItemPartAddPriceShellComponent } from './item-part/containers/item-part-add-shell/item-part-add-price-shell/item-part-add-price-shell.component';
import { ItemPartAddImageShellComponent } from './item-part/containers/item-part-add-shell/item-part-add-image-shell/item-part-add-image-shell.component';
import { ItemPartEditShellComponent } from './item-part/containers/item-part-edit-shell/item-part-edit-shell/item-part-edit-shell.component';
import { ItemPartEditDescriptionShellComponent } from './item-part/containers/item-part-edit-shell/item-part-edit-description-shell/item-part-edit-description-shell.component';
import { ItemPartEditDimensionShellComponent } from './item-part/containers/item-part-edit-shell/item-part-edit-dimension-shell/item-part-edit-dimension-shell.component';
import { ItemPartEditPriceShellComponent } from './item-part/containers/item-part-edit-shell/item-part-edit-price-shell/item-part-edit-price-shell.component';
import { ItemPartEditImageShellComponent } from './item-part/containers/item-part-edit-shell/item-part-edit-image-shell/item-part-edit-image-shell.component';
import { ItemPartEditInventoryShellComponent } from './item-part/containers/item-part-edit-shell/item-part-edit-inventory-shell/item-part-edit-inventory-shell.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ItemVariationSelectItemComponentDialog } from './item-variation/item-variation-select-item.component-dialog';
import { ItemVariationComponentDialog } from './item-variation/item-variation.component-dialog';
import { ItemVariationListComponent } from './item-variation/item-variation-list.component';
import { ItemVariationDetailComponent } from './item-variation/item-variation-detail.component';
import { ItemEditVariationComponent } from './item-edit/item-edit-variation.component';

const ITEM_ROUTES: Routes = [
    {
        path: '',
        component: ItemComponent,
        children: [ {
                path: '',
                component: ItemListShellComponent
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
            {
                path: 'variation-listing',
                component: ItemVariationListComponent,
            },
            {
                path: 'variation-listing/detail',
                component: ItemVariationDetailComponent
            },
            {
                path: 'variation-listing/detail/:id',
                component: ItemVariationDetailComponent
            },

        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];
export const itemRouting = RouterModule.forChild(ITEM_ROUTES);
