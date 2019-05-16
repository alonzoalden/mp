export class ItemImage {
    constructor(
        public ItemImageID: number,
        public ItemID: number,
        public Label: string,
        public Raw: string,
        public Position: number,
        public IsBaseImage: boolean,
        public IsSmallImage: boolean,
        public IsThumbnail: boolean,
        public IsRotatorImage: boolean,
        public Exclude: boolean,
        public Remove: boolean,
        public UpdatedOn: string,
        public CreatedOn: string,

        public IsNewImage: boolean
    ) {}
}
