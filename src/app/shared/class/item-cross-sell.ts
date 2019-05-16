export class ItemCrossSell {
    constructor(
        public ItemCrossSellID: number,
        public ItemID: number,
        public CrossSellItemID: number,

        public CrossSellItemName: string,
        public CrossSellItemVendorSKU: string,
        public CrossSellTPIN: string,

        public Position: number,
        public UpdatedOn: string,
        public CreatedOn: string
    ) {}
}

export class ItemCrossSellInsert {
    constructor(
        public ItemID: number,
        public CrossSellItemID: number,
        public Position: number
    ) {}
}
