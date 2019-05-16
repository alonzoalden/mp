export class FulfillmentLine {
    constructor(
        public FulfillmentLineID: number,
        public FulfillmentID: string,     
        public ItemID: string,
        public Quantity: number,
        public UpdatedOn: string,
        public CreatedOn: string  
    ) {}
}
