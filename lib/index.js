class DmojAPI {
    apiToken;
    constructor(config) {
        // Validate the token with the regex first
        if (config.apiToken.match(/([a-zA-Z0-9_-]{48})/) === null) {
            throw new Error("Invalid API Token");
        }
        this.apiToken = config.apiToken;
        // Test the token to make sure it's valid
        try {
            this.fetchLanguagesList().then();
        }
        catch (e) {
            throw new Error("Invalid API Token");
        }
    }
    async fetchContestList(filters) {
        const filterAsString = filters ? this.filtersToString(filters) : "";
        const response = await this.fetchFromApi("contests", filterAsString);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return (await response.json());
    }
    async fetchContestByKey(key) {
        const response = await this.fetchFromApi(`contest/${key}`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return (await response.json());
    }
    async fetchContestParticipations(filters) {
        const filterAsString = filters ? this.filtersToString(filters) : "";
        const response = await this.fetchFromApi("participations", filterAsString);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return (await response.json());
    }
    async fetchProblemList(filters) {
        const filterAsString = filters ? this.filtersToString(filters) : "";
        const response = await this.fetchFromApi("problems", filterAsString);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return (await response.json());
    }
    async fetchProblemByCode(code) {
        const response = await this.fetchFromApi(`problem/${code}`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return (await response.json());
    }
    async fetchUsersList(filters) {
        const filterAsString = filters ? this.filtersToString(filters) : "";
        const response = await this.fetchFromApi("users", filterAsString);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return (await response.json());
    }
    async fetchUserProfile(username) {
        const response = await this.fetchFromApi(`users/${username}`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return (await response.json());
    }
    async fetchSubmissionsList(filters) {
        const filterAsString = filters ? this.filtersToString(filters) : "";
        const response = await this.fetchFromApi("submissions", filterAsString);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return (await response.json());
    }
    async fetchSubmissionById(id) {
        const response = await this.fetchFromApi(`submission/${id}`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return (await response.json());
    }
    async fetchOrganizationsList(filters) {
        const filterAsString = filters ? this.filtersToString(filters) : "";
        const response = await this.fetchFromApi("organizations", filterAsString);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return (await response.json());
    }
    async fetchLanguagesList(filters) {
        const filterAsString = filters ? this.filtersToString(filters) : "";
        const response = await this.fetchFromApi("languages", filterAsString);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return (await response.json());
    }
    async fetchJudgeList() {
        const response = await this.fetchFromApi("judges");
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return (await response.json());
    }
    async fetchFromApi(endpoint, filters = "") {
        return await fetch(`https://dmoj.ca/api/v2/${endpoint}?${filters}`, {
            method: "GET",
            cache: "default",
            headers: {
                Authorization: `Bearer ${this.apiToken}`
            }
        });
    }
    filtersToString(filters) {
        return Object.entries(filters)
            .filter(([_, value]) => value != null && value !== "")
            .map(([key, value]) => {
            if (Array.isArray(value)) {
                return value.map(val => `${key}=${encodeURIComponent(val === true ? "True" : val === false ? "False" : val)}`).join("&");
            }
            else {
                return `${key}=${encodeURIComponent(value === true ? "True" : value === false ? "False" : value)}`;
            }
        })
            .join("&");
    }
}
export {};
