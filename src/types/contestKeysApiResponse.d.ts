export interface contestKeysApiResponse {
    api_version: string;
    method: string;
    fetched: Date;
    data: Data;
}

export interface Data {
    object: Object;
}

export interface Object {
    key: string;
    name: string;
    start_time: Date;
    end_time: Date;
    time_limit: null;
    is_rated: boolean;
    rate_all: boolean;
    has_rating: boolean;
    rating_floor: null;
    rating_ceiling: null;
    hidden_scoreboard: boolean;
    scoreboard_visibility: string;
    is_organization_private: boolean;
    organizations: any[];
    is_private: boolean;
    tags: string[];
    format: Format;
    problems: Problem[];
    rankings: Ranking[];
}

export interface Format {
    name: string;
    config: Config;
}

export interface Config {
    penalty: number;
}

export interface Problem {
    points: number;
    partial: boolean;
    is_pretested: boolean;
    max_submissions: null;
    label: string;
    name: string;
    code: string;
}

export interface Ranking {
    user: string;
    start_time: Date;
    end_time: Date;
    score: number;
    cumulative_time: number;
    tiebreaker: number;
    old_rating: number | null;
    new_rating: null;
    is_disqualified: boolean;
    solutions: Array<Solution | null>;
}

export interface Solution {
    time: number;
    points: number;
    penalty: number;
}
