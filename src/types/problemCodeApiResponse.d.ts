export interface ProblemCodeApiResponse {
    api_version: string;
    method: string;
    fetched: Date;
    data: Data;
}

export interface Data {
    object: Object;
}

export interface Object {
    code: string;
    name: string;
    authors: any[];
    types: string[];
    group: string;
    time_limit: number;
    memory_limit: number;
    language_resource_limits: any[];
    points: number;
    partial: boolean;
    short_circuit: boolean;
    languages: string[];
    is_organization_private: boolean;
    organizations: any[];
    is_public: boolean;
}
