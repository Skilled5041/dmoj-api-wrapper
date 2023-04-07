export interface SubmissionsListApiResponse {
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
    problem: string;
    user: string;
    date: Date;
    language: string;
    time: number | null;
    memory: number | null;
    points: number | null;
    result: string;
}
