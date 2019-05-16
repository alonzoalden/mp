export class ItemAttachment {
    constructor(
        public VendorAttachmentItemID: number,
        public VendorAttachmentID: number,
        public ItemID: number,

        public Title: string,
        public FileName: string,
        public UploadedFile: string,
        
        public Position: number,
        public UpdatedOn: string,
        public CreatedOn: string
    ) {}
}

export class ItemAttachmentInsert {
    constructor(
        public VendorAttachmentID: number,
        public ItemID: number,
        public Position: number
    ) {}
}

export class ItemAttachmentUpdate {
    constructor(
        public VendorAttachmentID: number,
        public ItemID: number,
        public Position: number
    ) {}
}