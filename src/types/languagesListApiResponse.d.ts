export interface LanguagesListApiResponse {
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
    id: number;
    key: string;
    short_name: string;
    common_name: string;
    ace_mode_name: string;
    pygments_name: string;
    code_template: string;
}
