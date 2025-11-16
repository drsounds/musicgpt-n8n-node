import {
  IExecuteFunctions,
  INodeExecutionData,
  NodeApiError,
} from 'n8n-workflow';

import {
  OptionsWithUri,
} from 'request';

export class MusicGPT {
  description = {
    displayName: 'MusicGPT',
    name: 'musicGpt',
    icon: 'file:musicgpt.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Create AI-generated music using MusicGPT API',
    defaults: {
      name: 'MusicGPT',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'musicGptApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Music',
            value: 'music',
          },
        ],
        default: 'music',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: [
              'music',
            ],
          },
        },
        options: [
          {
            name: 'Create',
            value: 'create',
            description: 'Create AI-generated music',
          },
        ],
        default: 'create',
      },
      {
        displayName: 'Prompt',
        name: 'prompt',
        type: 'string',
        displayOptions: {
          show: {
            operation: [
              'create',
            ],
            resource: [
              'music',
            ],
          },
        },
        default: '',
        placeholder: 'e.g., A happy pop song about summer days',
        description: 'A natural language prompt for music generation (keep under 280 characters)',
        required: true,
      },
      {
        displayName: 'Music Style',
        name: 'music_style',
        type: 'string',
        displayOptions: {
          show: {
            operation: [
              'create',
            ],
            resource: [
              'music',
            ],
          },
        },
        default: 'Pop',
        placeholder: 'e.g., Rock, Pop, Jazz, Classical',
        description: 'Style of music to generate',
      },
      {
        displayName: 'Lyrics',
        name: 'lyrics',
        type: 'string',
        typeOptions: {
          editor: 'multiLine',
        },
        displayOptions: {
          show: {
            operation: [
              'create',
            ],
            resource: [
              'music',
            ],
          },
        },
        default: '',
        placeholder: 'Custom lyrics for the generated music',
        description: 'Custom lyrics for the generated music (optional)',
      },
      {
        displayName: 'Voice Model',
        name: 'voice_id',
        type: 'string',
        displayOptions: {
          show: {
            operation: [
              'create',
            ],
            resource: [
              'music',
            ],
          },
        },
        default: '',
        placeholder: 'e.g., Drake, Ariana Grande',
        description: 'Voice model to convert generated audio (optional)',
      },
      {
        displayName: 'Options',
        name: 'options',
        type: 'collection',
        displayOptions: {
          show: {
            operation: [
              'create',
            ],
            resource: [
              'music',
            ],
          },
        },
        default: {},
        options: [
          {
            displayName: 'Make Instrumental',
            name: 'make_instrumental',
            type: 'boolean',
            default: false,
            description: 'Whether to make the music instrumental',
          },
          {
            displayName: 'Vocal Only',
            name: 'vocal_only',
            type: 'boolean',
            default: false,
            description: 'Whether to generate only vocals of output audio',
          },
          {
            displayName: 'Webhook URL',
            name: 'webhook_url',
            type: 'string',
            default: '',
            placeholder: 'https://your-webhook-url.com/endpoint',
            description: 'URL for callback upon completion (optional)',
          },
        ],
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === 'music') {
          if (operation === 'create') {
            const responseData = await musicCreate(this, items[i], i);
            returnData.push(responseData);
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          const executionErrorData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: (error as Error).message }),
            { itemData: { item: i } },
          );
          returnData.push(...executionErrorData);
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}

async function musicCreate(context: IExecuteFunctions, item: INodeExecutionData, itemIndex: number): Promise<INodeExecutionData> {
  const credentials = await context.getCredentials('musicGptApi');

  if (credentials === undefined) {
    throw new NodeApiError(context.getNode(), {
      message: 'Credentials are required!',
    });
  }

  const prompt = context.getNodeParameter('prompt', itemIndex) as string;
  const music_style = context.getNodeParameter('music_style', itemIndex) as string;
  const lyrics = context.getNodeParameter('lyrics', itemIndex) as string;
  const voice_id = context.getNodeParameter('voice_id', itemIndex) as string;
  const options = context.getNodeParameter('options', itemIndex) as {
    make_instrumental?: boolean;
    vocal_only?: boolean;
    webhook_url?: string;
  };

  const body: any = {
    prompt,
    music_style,
  };

  if (lyrics) {
    body.lyrics = lyrics;
  }

  if (voice_id) {
    body.voice_id = voice_id;
  }

  if (options.make_instrumental !== undefined) {
    body.make_instrumental = options.make_instrumental;
  }

  if (options.vocal_only !== undefined) {
    body.vocal_only = options.vocal_only;
  }

  if (options.webhook_url) {
    body.webhook_url = options.webhook_url;
  }

  const optionsWithUri: OptionsWithUri = {
    headers: {
      'Authorization': credentials.apiKey as string,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body,
    uri: 'https://api.musicgpt.com/api/public/v1/MusicAI',
    json: true,
  };

  try {
    const responseData = await context.helpers.request(optionsWithUri);
    
    return context.helpers.constructExecutionMetaData(
      context.helpers.returnJsonArray(responseData),
      { itemData: { item: itemIndex } },
    );
  } catch (error) {
    throw new NodeApiError(context.getNode(), error);
  }
}
