export type NpmsErrorResponse = {
    code: string;
    message: string;
};

export type SearchSuggestion = {
    flags: {
        deprecated: string
    };
    highlight?: string;
    package: {
        name: string;
        version: string;
    };
    score: {
        detail: {
            popularity: number;
            quality: number;
        };
        final: number;
    }
    searchScore: number;
};
