"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicGPTApi = void 0;
class MusicGPTApi {
    constructor() {
        this.name = 'musicGptApi';
        this.displayName = 'MusicGPT API';
        this.documentationUrl = 'https://docs.musicgpt.com/api-documentation/index/introduction';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                description: 'Your MusicGPT API key',
            },
        ];
    }
    async test(credential) {
        try {
            // Basic validation - we could make a test API call here if needed
            if (!credential.data.apiKey) {
                return {
                    status: 'Error',
                    message: 'API Key is required',
                };
            }
            return {
                status: 'OK',
            };
        }
        catch (error) {
            return {
                status: 'Error',
                message: error.message,
            };
        }
    }
}
exports.MusicGPTApi = MusicGPTApi;
//# sourceMappingURL=MusicGPTApi.credentials.js.map