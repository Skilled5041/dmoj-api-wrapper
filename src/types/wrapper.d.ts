type DmojResult = "AC" | "WA" | "IR" | "RTE" | "OLE" | "MLE" | "TLE" | "IE" | "AB" | "CE";
type DmojLanguages = "ADA" | "AWK" | "BF" | "C" | "C11" |
    "CBL" | "CLANG" | "CLANGX" | "CPP03" | "CPP11" |
    "CPP14" | "CPP17" | "CPP20" | "D" | "DART" |
    "F95" | "FORTH" | "GAS32" | "GAS64" | "GO" |
    "GROOVY" | "HASK" | "ICK" | "JAVA" | "JAVA8" |
    "KOTLIN" | "LEAN4" | "LLC" | "LUA" | "MONOCS" |
    "MONOFS" | "MONOVB" | "NASM" | "NASM64" | "OCAML" |
    "PAS" | "PERL" | "PHP" | "PIKE" | "PRO" |
    "PY2" | "PY3" | "PYPY" | "PYPY3" | "RKT" |
    "RUBY" | "RUST" | "SBCL" | "SCALA" | "SCM" |
    "SED" | "SWIFT" | "TCL" | "TEXT" | "TUR" |
    "V8JS" | "ZIG"


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

export interface FetchProblemListFilters {
    partial?: boolean;
    group?: string[];
    type?: string[];
    organization?: string[];
    search?: string[];
}

export interface FetchUsersListFilters {
    organization?: string[];
}

export interface FetchSubmissionsListFilters {
    user?: string;
    problem?: string;
    language?: DmojLanguages[];
    result?: DmojResult[];
}

export interface FetchOrganizationsListFilters {
    is_open?: boolean;
}

export interface FetchLanguagesListFilters {
    common_name?: string;
}
