export class ItemUpSell {
    constructor(
        public ItemUpSellID: number,
        public ItemID: number,
        public UpSellItemID: number,

        public UpSellItemName: string,
        public UpSellItemVendorSKU: string,
        public UpSellTPIN: string,

        public Position: number,
        public UpdatedOn: string,
        public CreatedOn: string
    ) {}
}

export class ItemUpSellInsert {
    constructor(
        public ItemID: number,
        public UpSellItemID: number,
        public Position: number
    ) {}
}
