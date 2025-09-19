export declare class PageOptionsDto {
    page?: number;
    limit?: number;
    order?: 'asc' | 'desc';
}
export declare class PageMetaDto {
    constructor(init?: Partial<PageMetaDto>);
    readonly page?: number;
    readonly limit?: number;
    readonly totalItems?: number;
    readonly totalPages?: number;
}
export declare class PageDto<T> {
    constructor(data: T[], meta: PageMetaDto);
    readonly data: T[];
    readonly meta: PageMetaDto;
}
