export interface ContestParticipationsApiResponse {
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
    user: string;
    contest: string;
    start_time: Date;
    end_time: Date;
    score: number;
    cumulative_time: number;
    tiebreaker: number;
    is_disqualified: boolean;
    virtual_participation_number: number;
}
