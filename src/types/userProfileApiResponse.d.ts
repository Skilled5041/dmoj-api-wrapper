export interface UserProfileApiResponse {
    api_version: string;
    method: string;
    fetched: Date;
    data: Data;
}

export interface Data {
    object: Object;
}

export interface Object {
    id: number;
    username: string;
    points: number;
    performance_points: number;
    problem_count: number;
    solved_problems: string[];
    rank: string;
    rating: number;
    organizations: number[];
    contests: Contest[];
}

export interface Contest {
    key: string;
    score: number;
    cumulative_time: number;
    rating: number | null;
    raw_rating: number | null;
    performance: number | null;
}
