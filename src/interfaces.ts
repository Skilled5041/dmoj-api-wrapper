export interface DmojApiConfig {
    apiToken: string;
}

export interface FetchContestListFilters {
    is_rated?: boolean;
    rate_all?: boolean;
    tag?: string[];
    organization?: string[];
    page?: number;
}

export interface FetchContestParticipationFilters {
    contest?: string;
    user?: string;
    is_disqualified?: boolean;
    virtual_participation_number?: number;
}