export interface MarvelApiResponse<T> {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    etag: string;
    data: {
        offset: number;
        limit: number;
        total: number;
        count: number;
        results: T;
    };
}

export interface Comic {
    id: number;
    digitalId: number;
    title: string;
    issueNumber: number;
    variantDescription?: string;
    description?: string | null;
    modified: Date;
    isbn?: string;
    upc?: string;
    diamondCode?: string;
    ean?: string;
    issn?: string;
    format: string;
    pageCount: number;
    textObjects: TextObject;
    resourceURI: string;
    urls: Url;
    series: SeriesSummary;
    variants: ComicSummary;
    collections: ComicSummary;
    collectedIssues: ComicSummary;
    dates: ComicDate;
    prices: ComicPrice;
    thumbnail: Image;
    images: Image;
    creators: ResourceList<CreatorSummary>;
    characters: ResourceList<CharacterSummary>;
    stories: ResourceList<StorySummary>;
    events: ResourceList<EventSummary>;
}

export interface Url {
    type: string;
    url: string;
}

export interface TextObject {
    type: string;
    language: string;
    text: string;
}

export interface Image {
    path: string;
    extension: string;
}

export interface ComicDate {
    type: string;
    date: Date;
}

export interface ComicPrice {
    type: string;
    price: number;
}

export interface ResourceSummary {
    resourceURI: string;
    name: string;
}

export interface ComicSummary extends ResourceSummary {}

export interface SeriesSummary extends ResourceSummary {}

export interface CreatorSummary extends ResourceSummary {
    role: string;
}

export interface CharacterSummary extends ResourceSummary {}

export interface StorySummary extends ResourceSummary {
    type: string;
}

export interface EventSummary extends ResourceSummary {}

export interface ResourceList<T extends ResourceSummary> {
    available: number;
    returned: number;
    collectionURI: string;
    items: T;
}