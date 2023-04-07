export interface ContestsAPIResponse {
    api_version: string;
    method: string;
    fetched: Date;
    data: Data;
}

export interface Data {
    current_object_count: number;
    objects_per_page: number;
    page_index: number;
    has_more: boolean;
    objects: Object[];
    total_objects: number;
    total_pages: number;
}

export interface Object {
    key: string;
    name: string;
    start_time: Date;
    end_time: Date;
    time_limit: number | null;
    is_rated: boolean;
    rate_all: boolean;
    tags: string[];
}
