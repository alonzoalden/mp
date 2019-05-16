export class Category {
    constructor(
        public ItemCategoryID: number,
        public ParentItemCategoryID: number,
        public Name: string,
        public UpdatedOn: number,
        public CreatedOn: string
    ) {}
}
