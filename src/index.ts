import {
    DmojApiConfig,
    FetchContestListFilters,
    FetchContestParticipationFilters, FetchLanguagesListFilters, FetchOrganizationsListFilters,
    FetchProblemListFilters, FetchSubmissionsListFilters,
    FetchUsersListFilters,
} from "./types/wrapper.js";
import { ContestsAPIResponse } from "./types/contestsApiResponse.js";
import { contestKeysApiResponse } from "./types/contestKeysApiResponse.js";
import { ContestParticipationsApiResponse } from "./types/contestParticipationsApiResponse.js";
import { ProblemsListAPIResponse } from "./types/problemsListApiResponse.js";
import { ProblemCodeApiResponse } from "./types/problemCodeApiResponse.js";
import { UsersListApiResponse } from "./types/usersListApiResponse.js";
import { UserProfileApiResponse } from "./types/userProfileApiResponse.js";
import { SubmissionsListApiResponse } from "./types/submissionsListApiResponse.js";
import { SubmissionIdApiResponse } from "./types/submissionIdApiResponse.js";
import { OrganizationsListApiResponse } from "./types/organizationsListApiResponse.js";
import { LanguagesListApiResponse } from "./types/languagesListApiResponse.js";
import { JudgesListApiResponse } from "./types/judgesListApiResponse.js";

export class DmojAPI {

    private readonly apiToken: string;

    constructor(config: DmojApiConfig) {
        // Validate the token with the regex first
        if (config.apiToken.match(/([a-zA-Z0-9_-]{48})/) === null) {
            throw new Error("Invalid API Token");
        }

        this.apiToken = config.apiToken;

        // Test the token to make sure it's valid

        try {
            this.fetchLanguagesList().then();
        } catch (e) {
            throw new Error("Invalid API Token");
        }
    }

    async fetchContestList(filters?: FetchContestListFilters): Promise<ContestsAPIResponse> {
        const filterAsString = filters ? this.filtersToString(filters) : "";

        const response = await this.fetchFromApi("contests", filterAsString);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return (await response.json());
    }

    async fetchContestByKey(key: string): Promise<contestKeysApiResponse> {
        const response = await this.fetchFromApi(`contest/${key}`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return (await response.json());
    }

    async fetchContestParticipations(filters?: FetchContestParticipationFilters): Promise<ContestParticipationsApiResponse> {
        const filterAsString = filters ? this.filtersToString(filters) : "";

        const response = await this.fetchFromApi("participations", filterAsString);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return (await response.json());
    }

    async fetchProblemList(filters?: FetchProblemListFilters): Promise<ProblemsListAPIResponse> {
        const filterAsString = filters ? this.filtersToString(filters) : "";

        const response = await this.fetchFromApi("problems", filterAsString);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return (await response.json());
    }

    async fetchProblemByCode(code: string): Promise<ProblemCodeApiResponse> {
        const response = await this.fetchFromApi(`problem/${code}`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return (await response.json());
    }

    async fetchUsersList(filters?: FetchUsersListFilters): Promise<UsersListApiResponse> {
        const filterAsString = filters ? this.filtersToString(filters) : "";

        const response = await this.fetchFromApi("users", filterAsString);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return (await response.json());
    }

    async fetchUserProfile(username: string): Promise<UserProfileApiResponse> {
        const response = await this.fetchFromApi(`users/${username}`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return (await response.json());

    }

    async fetchSubmissionsList(filters?: FetchSubmissionsListFilters): Promise<SubmissionsListApiResponse> {
        const filterAsString = filters ? this.filtersToString(filters) : "";

        const response = await this.fetchFromApi("submissions", filterAsString);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return (await response.json());
    }

    async fetchSubmissionById(id: string): Promise<SubmissionIdApiResponse> {
        const response = await this.fetchFromApi(`submission/${id}`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return (await response.json());
    }

    async fetchOrganizationsList(filters?: FetchOrganizationsListFilters): Promise<OrganizationsListApiResponse> {
        const filterAsString = filters ? this.filtersToString(filters) : "";

        const response = await this.fetchFromApi("organizations", filterAsString);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return (await response.json());
    }

    async fetchLanguagesList(filters?: FetchLanguagesListFilters): Promise<LanguagesListApiResponse> {
        const filterAsString = filters ? this.filtersToString(filters) : "";

        const response = await this.fetchFromApi("languages", filterAsString);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return (await response.json());
    }

    async fetchJudgeList(): Promise<JudgesListApiResponse> {
        const response = await this.fetchFromApi("judges");

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return (await response.json());
    }

    private async fetchFromApi(endpoint: string, filters: string = ""): Promise<Response> {
        return await fetch(`https://dmoj.ca/api/v2/${endpoint}?${filters}`, {
            method: "GET",
            cache: "default",
            headers: {
                Authorization: `Bearer ${this.apiToken}`
            }
        });
    }

    private filtersToString(filters: object): string {
        return Object.entries(filters)
            .filter(([_, value]) => value != null && value !== "")
            .map(([key, value]) => {
                if (Array.isArray(value)) {
                    return value.map(val => `${key}=${encodeURIComponent(val === true ? "True" : val === false ? "False" : val)}`).join("&");
                } else {
                    return `${key}=${encodeURIComponent(value === true ? "True" : value === false ? "False" : value)}`;
                }
            })
            .join("&");
    }
}
