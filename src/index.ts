import * as dotenv from "dotenv";
import { DmojApiConfig, FetchContestListFilters, FetchContestParticipationFilters } from "./interfaces.js";

dotenv.config({ path: "C:\\Webstorm\\dmoj-api-wrapper\\.env" });

class DmojAPI {

    private readonly apiToken: string;

    constructor(config: DmojApiConfig) {
        // Validate the token with the regex first
        if (config.apiToken.match(/([a-zA-Z0-9_-]{48})/) === null) {
            throw new Error("Invalid API Token");
        }

        // Test the token to make sure it's valid
        (async () => {
            const response = await fetch(`https://dmoj.ca/api/v2/judges`, {
                method: "GET",
                cache: "default",
                headers: {
                    Authorization: `Bearer ${config.apiToken}`
                }
            });
            if (!response.ok) {
                throw new Error("Invalid API Token");
            }
        })();

        this.apiToken = config.apiToken;
    }

    async fetchUserProfile(username: string) {
        const response = await this.fetchFromApi(`users/${username}`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return (await response.json()).data;

    }

    async fetchContestList(filters?: FetchContestListFilters) {
        const filterAsString = filters ? this.filtersToString(filters) : "";

        const response = await this.fetchFromApi("contests", filterAsString);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return (await response.json()).data;
    }

    async fetchContestByKey(key: string) {
        const response = await this.fetchFromApi(`contest/${key}`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return (await response.json()).data;
    }

    async fetchContestParticipations(filters?: FetchContestParticipationFilters) {
        const filterAsString = filters ? this.filtersToString(filters) : "";

        const response = await this.fetchFromApi("participations", filterAsString);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return (await response.json()).data;
    }

    private async fetchFromApi(endpoint: string, filters: string = "") {
        return await fetch(`https://dmoj.ca/api/v2/${endpoint}?${filters}`, {
            method: "GET",
            cache: "default",
            headers: {
                Authorization: `Bearer ${this.apiToken}`
            }
        });
    }

    private filtersToString(filters: object) {
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

const token = process.env.DMOJ_API_TOKEN;
const badToken = process.env.BAD_TOKEN_TEST;


if (!token || !badToken) {
    throw new Error("API Token Not Found");
}

const api = new DmojAPI({
    apiToken: token
});

// tslint:disable-next-line:no-console
console.log(await api.fetchContestParticipations({
    contest: "dmopc22c3",
    user: "skilled5041",
    is_disqualified: false
}));
