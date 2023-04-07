export interface ProblemsListAPIResponse {
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
    code: string;
    name: string;
    types: string[];
    group: string;
    points: number;
    partial: boolean;
    is_organization_private: boolean;
    is_public: boolean;
}
