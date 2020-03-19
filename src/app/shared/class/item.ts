export class Item {
    constructor(
        public ItemID: number,
        public VendorID: string,
        public TPIN: string,
        public Name: string,
        public SKU: string,
        public VendorSKU: string,
        public FulfilledBy: string,
        public ItemType: string,
        public Quantity: number,
        public MerchantQuantity: number,

        public ShipWithinDays: number,
        public PriceType: string,

        public Price: number,
        public FOBPrice: number,
        public DropshipPrice: number,
        public EbayPrice: number,

        public SpecialPrice: number,
        public SpecialFrom: Date,
        public SpecialTo: Date,
        public Width: number,
        public Height: number,
        public Length: number,
        public ProductDimensionUOM: string,
        public Weight: number,
        public ProductWeightUOM: string,
        public PackageWidth: number,
        public PackageHeight: number,
        public PackageLength: number,
        public PackageDimensionUOM: string,
        public PackageWeight: number,
        public PackageWeightUOM: string,
        public PackagingType: string,
        public IsFreeShipping: boolean,
        public ShippingFee: number,
        public MetaTitle: string,
        public MetaKeywords: string,
        public MetaDescription: string,

        public Origin: string,
        public Warranty: string,
        public MerchantWarranty: string,
        public AddProtectionPlan: boolean,
        public URLKey: string,
        public Visibility: string,

        public Description: string,
        public ShortDescription: string,
        public TechnicalDetail: string,
        public AdditionalInformation: string,

        public VendorBrandID: string,

        public RequestApproval: boolean,
        public RejectionReason: boolean,
        public Status: boolean,

        public Approval: string,

        public ImagePath: string,

        public IsPartItem: boolean,
        public PartImageRaw: string,
        public PartImageFilePath: string,
        public PartIsNewImage: boolean,

        public ExcludeGoogleShopping: boolean,

        public UpdatedOn: string,
        public CreatedOn: string,

        public ItemCategoryAssignments: Array<ItemCategoryAssignment>,
        public ItemOptions: Array<ItemOption>,
        public ItemTierPrices: Array<ItemTierPrice>,
        public ItemRelatedProducts: Array<ItemRelatedProduct>,
        public ItemUpSells: Array<ItemUpSell>,
        public ItemCrossSells: Array<ItemCrossSell>,
        public ItemAttachments: Array<ItemAttachment>,
        public ItemVideos: Array<ItemVideo>,
        public ItemImages: Array<ItemImage>,
        public ItemSections: Array<ItemSection>,
        public ItemVariations: Array<ItemVariation>,
        public InventoryDetailsSerialized: Array<InventoryDetailSerialized>,
        public QtyOnHand: number,
        public QtyAvailable: number,
        public QtyOnOrder: number,
        public QtyBackOrdered: number,
        public QtyReturned: number,
        public QtyUnavailable: number,
        public MerchantQtyOnHand: number,
        public MerchantQtyAvailable: number,
        public MerchantQtyOnOrder: number,

        public isSelected: boolean
    ) {}
}

export class ItemInsert {
    constructor(
        public Name: string,
        public VendorSKU: string,
        public FulfilledBy: string,
        public ItemType: string,
        public MerchantQuantity: number,

        public ShipWithinDays: number,
        public PriceType: string,

        public Price: number,
        public FOBPrice: number,
        public DropshipPrice: number,
        public SpecialPrice: number,
        public SpecialFrom: Date,
        public SpecialTo: Date,
        public Width: number,
        public Height: number,
        public Length: number,
        public ProductDimensionUOM: string,
        public Weight: number,
        public ProductWeightUOM: string,
        public PackageWidth: number,
        public PackageHeight: number,
        public PackageLength: number,
        public PackageDimensionUOM: string,
        public PackageWeight: number,
        public PackageWeightUOM: string,
        public PackagingType: string,
        public IsFreeShipping: boolean,
        public ShippingFee: number,
        public MetaTitle: string,
        public MetaKeywords: string,
        public MetaDescription: string,

        public Origin: string,
        public Warranty: string,
        public MerchantWarranty: string,
        public AddProtectionPlan: boolean,
        public URLKey: string,
        public Visibility: string,

        public Description: string,
        public ShortDescription: string,
        public TechnicalDetail: string,
        public AdditionalInformation: string,

        public VendorBrandID: string,

        public Approval: string,

        public IsPartItem: boolean,
        public PartImageRaw: string,
        public PartImageFilePath: string,
        public PartIsNewImage: boolean,

        public ExcludeGoogleShopping: boolean,

        public ItemCategoryAssignments: Array<ItemCategoryAssignment>,
        public ItemOptions: Array<ItemOptionInsert>,
        public ItemTierPrices: Array<ItemTierPriceInsert>,
        public ItemRelatedProducts: Array<ItemRelatedProductInsert>,
        public ItemUpSells: Array<ItemUpSellInsert>,
        public ItemCrossSells: Array<ItemCrossSellInsert>,
        public ItemAttachments: Array<ItemAttachmentInsert>,
        public ItemVideos: Array<ItemVideoInsert>,
        public ItemImages: Array<ItemImageInsert>,
        public ItemSections: Array<ItemSectionInsert>,
        public InventoryDetailsSerialized: Array<InventoryDetailSerialized>,
    ) {}
}

export class ItemUpdate {
    constructor(
        public Name: string,
        public VendorSKU: string,
        public FulfilledBy: string,
        public ItemType: string,
        public MerchantQuantity: number,

        public ShipWithinDays: number,
        public PriceType: string,

        public Price: number,
        public FOBPrice: number,
        public DropshipPrice: number,
        public SpecialPrice: number,
        public SpecialFrom: Date,
        public SpecialTo: Date,

        public Width: number,
        public Height: number,
        public Length: number,
        public ProductDimensionUOM: string,
        public Weight: number,
        public ProductWeightUOM: string,
        public PackageWidth: number,
        public PackageHeight: number,
        public PackageLength: number,
        public PackageDimensionUOM: string,
        public PackageWeight: number,
        public PackageWeightUOM: string,
        public PackagingType: string,
        public IsFreeShipping: boolean,
        public ShippingFee: number,
        public MetaTitle: string,
        public MetaKeywords: string,
        public MetaDescription: string,

        public Origin: string,
        public Warranty: string,
        public MerchantWarranty: string,
        public AddProtectionPlan: boolean,
        public URLKey: string,
        public Visibility: string,

        public Description: string,
        public ShortDescription: string,
        public TechnicalDetail: string,
        public AdditionalInformation: string,

        public VendorBrandID: string,
        public RequestApproval: string,

        public Approval: string,

        public IsPartItem: boolean,
        public PartImageRaw: string,
        public PartImageFilePath: string,
        public PartIsNewImage: boolean,

        public ExcludeGoogleShopping: boolean,

        public ItemCategoryAssignments: Array<ItemCategoryAssignment>,
        public ItemOptions: Array<ItemOption>,
        public ItemTierPrices: Array<ItemTierPrice>,
        public ItemRelatedProducts: Array<ItemRelatedProduct>,
        public ItemUpSells: Array<ItemUpSell>,
        public ItemCrossSells: Array<ItemCrossSell>,
        public ItemAttachments: Array<ItemAttachment>,
        public ItemVideos: Array<ItemVideo>,
        public ItemImages: Array<ItemImage>,
        public ItemSections: Array<ItemSection>,
    ) {}
}

export class ItemList {
    constructor(
        public ItemID: number,
        public Description: string,
        public FOBPrice: number,
        public ItemName: string,
        public TPIN: string,
        public VendorSKU: string,
        public ImagePath: string
    ) {}
}

// Item Category Assignments
export class ItemCategoryAssignment {
    constructor(
        public ItemCategoryID: number
    ) {}
}

// Item Tier Price
export class ItemTierPrice {
    constructor(
        public ItemTierPriceID: number,
        public ItemID: number,
        public Quantity: number,
        public Price: number,
        public UpdatedOn: string,
        public CreatedOn: string,

        public pendingAdd: boolean
    ) {}
}

export class ItemTierPriceInsert {
    constructor(
        public ItemID: number,
        public Quantity: number,
        public Price: number
    ) {}
}

//Item Related Product
export class ItemRelatedProduct {
    constructor(
        public ItemRelatedProductID: number,
        public ItemID: number,
        public RelatedProductItemID: number,

        public PrevRelatedProductItemID: number,
        public RelatedItemName: string,
        public RelatedItemVendorSKU: string,
        public RelatedTPIN: string,

        public Position: number,
        public UpdatedOn: string,
        public CreatedOn: string,
        public ImagePath: string,
        public pendingAdd: boolean
    ) {}
}

export class ItemRelatedProductInsert {
    constructor(
        public ItemID: number,
        public RelatedProductItemID: number,

        public PrevRelatedProductItemID: number,
        public RelatedItemName: string,
        public RelatedItemVendorSKU: string,
        public RelatedTPIN: string,
        public ImagePath: string,

        public Position: number
    ) {}
}

//Item Up-sell
export class ItemUpSell {
    constructor(
        public ItemUpSellID: number,
        public ItemID: number,
        public UpSellItemID: number,

        public PrevUpSellItemID: number,
        public UpSellItemName: string,
        public UpSellItemVendorSKU: string,
        public UpSellTPIN: string,

        public Position: number,
        public UpdatedOn: string,
        public CreatedOn: string,
        public ImagePath: string,

        public pendingAdd: boolean
    ) {}
}

export class ItemUpSellInsert {
    constructor(
        public ItemID: number,
        public UpSellItemID: number,

        public PrevUpSellItemID: number,
        public UpSellItemName: string,
        public UpSellItemVendorSKU: string,
        public UpSellTPIN: string,
        public ImagePath: string,

        public Position: number
    ) {}
}

//Item Cross-sell
export class ItemCrossSell {
    constructor(
        public ItemCrossSellID: number,
        public ItemID: number,
        public CrossSellItemID: number,

        public PrevCrossSellItemID: number,
        public CrossSellItemName: string,
        public CrossSellItemVendorSKU: string,
        public CrossSellTPIN: string,

        public Position: number,
        public UpdatedOn: string,
        public CreatedOn: string,
        public ImagePath: string,
        public pendingAdd: boolean
    ) {}
}

export class ItemCrossSellInsert {
    constructor(
        public ItemID: number,
        public CrossSellItemID: number,

        public PrevCrossSellItemID: number,
        public CrossSellItemName: string,
        public CrossSellItemVendorSKU: string,
        public CrossSellTPIN: string,
        public ImagePath: string,
        public Position: number
    ) {}
}


//Item Attachment
export class ItemAttachment {
    constructor(
        public VendorAttachmentItemID: number,
        public VendorAttachmentID: number,

        public Title: string,
        public FileName: string,
        public UploadedFile: string,

        public ItemID: number,
        public Position: number,
        public UpdatedOn: string,
        public CreatedOn: string,

        public pendingAdd: boolean
    ) {}
}

export class ItemAttachmentInsert {
    constructor(
        public VendorAttachmentID: number,

        public Title: string,
        public FileName: string,
        public UploadedFile: string,

        public ItemID: number,
        public Position: number
    ) {}
}


//Item Video
export class ItemVideo {
    constructor(
        public ItemVideoID: number,
        public ItemID: number,
        public Thumbnail: string,
        public Value: string,
        public Provider: string,
        public Label: string,
        public Description: string,
        public Position: number,
        public Exclude: boolean,
        public Remove: boolean,
        public UpdatedOn: string,
        public CreatedOn: string,

        public URL: string,
        public pendingImage: boolean,
        public pendingAdd: boolean
    ) {}
}

export class ItemVideoInsert {
    constructor(
        public ItemID: number,
        public Thumbnail: string,
        public Value: string,
        public Provider: string,
        public Label: string,
        public Description: string,
        public Position: number,
        public URL: string
    ) {}
}


//Item Image
export class ItemImage {
    constructor(
        public ItemImageID: number,
        public ItemID: number,
        public Label: string,
        public Raw: string,
        public FilePath: string,
        public Position: number,
        public IsBaseImage: boolean,
        public IsSmallImage: boolean,
        public IsThumbnail: boolean,
        public IsRotatorImage: boolean,
        public Exclude: boolean,
        public Remove: boolean,
        public UpdatedOn: string,
        public CreatedOn: string,
        public IsNewImage: boolean,

        public pendingAdd: boolean
    ) {}
}

export class ItemImageInsert {
    constructor(
        public ItemID: number,
        public Label: string,
        public Raw: string,
        public FilePath: string,
        public Position: number,
        public IsBaseImage: boolean,
        public IsSmallImage: boolean,
        public IsThumbnail: boolean,
        public IsRotatorImage: boolean,
        public Exclude: boolean,
        public Remove: boolean,
        public IsNewImage: boolean
    ) {}
}


// Item Bundles Option/Selection
export class ItemOption {
    constructor(
        public ItemOptionID: number,
        public ItemID: number,
        public IsRequired: boolean,
        public Position: number,
        public Title: string,
        public Type: string,
        public UpdatedOn: string,
        public CreatedOn: string,
        public ItemSelections: Array<ItemSelection>,
        public pendingAdd: boolean
    ) {}
}

export class ItemOptionInsert {
    constructor(
        public IsRequired: boolean,
        public Position: number,
        public Title: string,
        public Type: string,

        public ItemSelections: Array<ItemSelectionInsert>
    ) {}
}

export class ItemSelection {
    constructor(
        public ItemSelectionID: number,
        public ItemOptionID: number,
        public ItemID: number,
        public ItemName: string,
        public ItemVendorSKU: string,
        public TPIN: string,
        public Position: number,
        public IsDefault: boolean,
        public PriceValue: number,
        public Qty: number,
        public CanChangeQty: boolean,
        public UpdatedOn: string,
        public CreatedOn: string,
        public pendingAdd: boolean
    ) {}
}

export class ItemSelectionInsert {
    constructor(
        public ItemID: number,
        public Position: number,
        public IsDefault: boolean,
        public PriceValue: number,
        public Qty: number,
        public CanChangeQty: boolean
    ) {}
}


export class ItemPrintLabel {
    constructor(
        public ItemID: number,

        public ItemName: string,
        public TPIN: string,
        public ItemVendorSKU: string,
        public URLKey: string,
        public ItemImage: string,

        public Qty: number,
        public pendingAdd: boolean
    ) {}
}

export class ItemBatch {
    constructor(
        public ItemID: number,
        public VendorID: string,
        public TPIN: string,
        public Name: string,
        public VendorSKU: string,
        public FulfilledBy: string,
        public Quantity: number,
        public MerchantQuantity: number,
        public Price: number,
        public ImagePath: string,
        public Approval: string,
        public Approve: boolean,
        public Select: boolean
    ) {}
}

//ItemSection
export class ItemSection {
    constructor(
        public ItemSectionID: number,
        public ItemID: number,
        public Name: string,
        public ImageRaw: string,
        public ImageFilePath: string,
        public IsNewImage: boolean,
        public Position: number,
        public UpdatedOn: string,
        public CreatedOn: string,

        public ItemParts: Array<ItemPart>,

        public pendingAdd: boolean,
        public isNew: boolean
    ) {}
}

export class ItemSectionInsert {
    constructor(
        public ItemID: number,
        public Name: string,
        public ImageRaw: string,
        public ImageFilePath: string,
        public Position: number,

        public ItemParts: Array<ItemPartInsert>
    ) {}
}


//Item Part
export class ItemPart {
    constructor(
        public ItemPartID: number,
        public ItemSectionID: number,
        public PartLabel: string,
        public PartItemID: number,

        public PrevPartItemID: number,
        public PartItemName: string,
        public PartItemVendorSKU: string,
        public PartTPIN: string,
        public PartFOBPrice: number,
        public PartPrice: number,

        public ImageRaw: string,
        public ImageFilePath: string,
        public IsNewImage: boolean,

        public Position: number,
        public UpdatedOn: string,
        public CreatedOn: string,

        public pendingAdd: boolean,
        public isNew: boolean
    ) {}
}

export class ItemPartInsert {
    constructor(
        public ItemSectionID: number,
        public PartLabel: string,
        public PartItemID: number,

        public PrevPartItemID: number,
        public PartItemName: string,
        public PartItemVendorSKU: string,
        public PartTPIN: string,
        public PartFOBPrice: number,
        public PartPrice: number,

        public ImageRaw: string,
        public ImageFilePath: string,
        public IsNewImage: boolean,

        public Position: number,

        public isNew: boolean
    ) {}
}




export class ItemGlobalAttribute {
    constructor(
        public ItemGlobalAttributeID: number,
        public Name: string,
        public UpdatedOn: string,
        public CreatedOn: string,
        public ItemGlobalAttributeVariations: Array<ItemGlobalAttributeVariation>
    ) {}
}

export class ItemGlobalAttributeVariation {
    constructor(
        public ItemGlobalAttributeVariationID: number,
        public ItemGlobalAttributeID: number,
        public Name: string,
        public UpdatedOn: string,
        public CreatedOn: string,
    ) {}
}


export class ItemAttribute {
    constructor(
        public ItemAttributeID: number,
        public Name: string,
        public UpdatedOn: string,
        public CreatedOn: string,
        public ItemAttributeVariations: Array<ItemAttributeVariation>,
        public SelectedItemAttributeVariations: Array<ItemAttributeVariation>,
        public OldDefault: ItemAttributeVariation,
    ) {}
}

export class ItemAttributeVariation {
    constructor(
        public ItemAttributeVariationID: number,
        public ItemAttributeID: number,
        public Name: string,
        public UpdatedOn: string,
        public CreatedOn: string,
    ) {}
}

export class ItemVariationListing {
    constructor(
        public ItemVariationListingID: number,
        public Name: string,
        public PrimaryItemID: number,

        public ItemName: string,
        public ItemVendorSKU: string,
        public ItemTPIN: string,
        public ItemURLKey: string,
        public ItemImagePath: string,

        public UpdatedOn: string,
        public CreatedOn: string,

        public ItemVariations: Array<ItemVariation>
    ) {}
}

export class ItemVariation {
    constructor(
        public ItemVariationID: number,
        public ItemVariationListingID: number,
        public ItemVariationListingName: string,
        public ItemID: number,

        public ItemName: string,
        public ItemVendorSKU: string,
        public ItemTPIN: string,
        public ItemURLKey: string,
        public ItemImagePath: string,

        public UpdatedOn: string,
        public CreatedOn: string,
        public ItemVariationLines: Array<ItemVariationLine>,

        public IsPrimary: boolean,
    ) {}
}

export class ItemVariationLine {
    constructor(
        public ItemVariationLineID: number,
        public ItemVariationID: number,
        public ItemAttributeVariationID: number,
        public ItemAttributeID: number,
        public ItemAttributeName: string,
        public ItemAttributeVariationName: string,
        public UpdatedOn: string,
        public CreatedOn: string,
    ) {}
}

export class InventoryDetailSerialized {
    constructor(
        public InventoryDetailSerializedID: number,
        public ItemID: number,
        public UnitPrice: number,
        public Condition: number,
        public SerialNumber: number,
        public Comment: string,
        public UpdatedOn: string,
        public CreatedOn: string,
        public ItemImagesSerialized: Array<ItemImageSerialized>,
    ) {}
}

export class ItemImageSerialized {
    constructor(
        public ItemImageSerializedID: number,
        public InventoryDetailSerializedID: number,
        public Raw: string,
        public FilePath: string,
        public Label: string,
        public Position: number,
        public IsBaseImage: boolean,
        public IsSmallImage: boolean,
        public IsThumbnail: boolean,
        public IsRotatorImage: boolean,
        public Exclude: boolean,
        public Remove: boolean,
        public UpdatedOn: boolean,
        public CreatedOn: boolean,
        public IsNewImage: boolean,
    ) {}
}
