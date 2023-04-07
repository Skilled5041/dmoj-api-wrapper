export interface SubmissionIdApiResponse {
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
    problem: string;
    user: string;
    date: Date;
    time: number;
    memory: number;
    points: number;
    language: string;
    status: string;
    result: Result;
    case_points: number;
    case_total: number;
    cases: Case[];
}

export interface Case {
    type: Type;
    case_id?: number;
    status?: Result;
    time?: number;
    memory?: number;
    points: number;
    total: number;
    batch_id?: number;
    cases?: Case[];
}

export type Result = "AC";

export type Type = "case" | "batch";
