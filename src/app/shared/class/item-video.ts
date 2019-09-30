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
        public URL: string
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



export class URLVideo {
    constructor(
        public kind: string,
        public etag: string,
        public items: URLVideoItems[]
    ) {}
}

export class URLVideoItems {
    constructor(
        public kind: string,
        public etag: string,
        public id: string,
        public snippet: URLVideoItemsSnippet
    ) {}
}

export class URLVideoItemsSnippet {
    constructor(
        public publishedAt: string,
        public channelId: string,
        public title: string,
        public description: string,
        public thumbnails: URLVideoItemsSnippetThumbnails,
        public channelTitle: string,
        public categoryId: string
    ) {}
}


export class URLVideoItemsSnippetThumbnails {
    constructor(
        public standard: URLVideoItemsSnippetThumbnailsStandard,
        public medium: URLVideoItemsSnippetThumbnailsMedium
    ) {}
}

export class URLVideoItemsSnippetThumbnailsStandard {
    constructor(
        public url: string,
        public width: number,
        public height: number
    ) {}
}

export class URLVideoItemsSnippetThumbnailsMedium {
    constructor(
        public url: string,
        public width: number,
        public height: number
    ) {}
}
