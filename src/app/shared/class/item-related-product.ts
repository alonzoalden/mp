export class ItemRelatedProduct {
    constructor(
        public ItemRelatedProductID: number,
        public ItemID: number,
        public RelatedProductItemID: number,

        public RelatedItemName: string,
        public RelatedItemVendorSKU: string,
        public RelatedTPIN: string,

        public Position: number,
        public UpdatedOn: string,
        public CreatedOn: string
    ) {}
}

export class ItemRelatedProductInsert {
    constructor(
        public ItemID: number,
        public RelatedProductItemID: number,
        public Position: number
    ) {}
}
