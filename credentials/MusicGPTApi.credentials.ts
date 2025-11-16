// @ts-nocheck

import {
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class MusicGPTApi implements ICredentialType {
  name = 'musicGptApi';

  displayName = 'MusicGPT API';

  documentationUrl = 'https://docs.musicgpt.com/api-documentation/index/introduction';

  properties: INodeProperties[] = [
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

  async test(
    credential: ICredentialTestRequest,
  ): Promise<{ status: 'OK' | 'Error'; message?: string }> {
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
    } catch (error) {
      return {
        status: 'Error',
        message: (error as Error).message,
      };
    }
  }
}
