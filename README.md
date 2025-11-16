# n8n-nodes-musicgpt

[![npm version](https://badge.fury.io/js/n8n-nodes-musicgpt.svg)](https://badge.fury.io/js/n8n-nodes-musicgpt)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A custom n8n node that integrates with the MusicGPT API to create AI-generated music.

## Features

- Create AI-generated music using natural language prompts
- Support for custom lyrics and voice models
- Multiple music styles (Pop, Rock, Jazz, Classical, etc.)
- Optional instrumental and vocal-only generation
- Webhook support for asynchronous music generation
- Full TypeScript support with type safety

## Installation

### Option 1: Install from npm (Recommended)

1. Navigate to your n8n installation directory
2. Install the node:
   ```bash
   npm install n8n-nodes-musicgpt
   ```
3. Restart n8n

### Option 2: Install from source

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/n8n-nodes-musicgpt.git
   cd n8n-nodes-musicgpt
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the node:
   ```bash
   npm run build
   ```
4. Link to your n8n installation:
   ```bash
   npm link
   cd /path/to/your/n8n/installation
   npm link n8n-nodes-musicgpt
   ```
5. Restart n8n

## Usage

### Prerequisites

1. Get a MusicGPT API key from [MusicGPT](https://musicgpt.com/)
2. Set up your credentials in n8n

### Setting up Credentials

1. In n8n, go to **Credentials** → **Add Credential**
2. Search for "MusicGPT API"
3. Enter your API key
4. Test the connection and save

### Creating Music

1. Add a "MusicGPT" node to your workflow
2. Configure your MusicGPT API credentials
3. Set the following parameters:
   - **Prompt**: A natural language description of the music you want to create (keep under 280 characters for best results)
   - **Music Style**: The style of music (e.g., Pop, Rock, Jazz, Classical)
   - **Lyrics** (optional): Custom lyrics for the generated music
   - **Voice Model** (optional): Voice model to use (e.g., Drake, Ariana Grande)
   - **Options**:
     - **Make Instrumental**: Generate instrumental music only
     - **Vocal Only**: Generate vocals only
     - **Webhook URL**: URL to receive completion notifications

### Example Workflow

Here's a simple example to generate music based on a text input:

```json
{
  "nodes": [
    {
      "parameters": {},
      "name": "Start",
      "type": "n8n-nodes-base.start",
      "typeVersion": 1,
      "position": [240, 300]
    },
    {
      "parameters": {
        "prompt": "A happy pop song about summer days at the beach",
        "music_style": "Pop"
      },
      "name": "MusicGPT",
      "type": "n8n-nodes-musicgpt.musicGpt",
      "typeVersion": 1,
      "position": [460, 300]
    }
  ],
  "connections": {
    "Start": {
      "main": [[{ "node": "MusicGPT", "type": "main", "index": 0 }]]
    }
  }
}
```

## Response Format

The MusicGPT API returns the following response:

```json
{
  "success": true,
  "message": "Message published to queue",
  "task_id": "8e058b85-6c22-41cc-a6ed-1e91ed73e34b",
  "conversion_id_1": "2872d9a6-4abe-4a8f-a04f-5540c4ef0a1a",
  "conversion_id_2": "dda98922-d5e9-4fc9-accd-4fc1f0729234",
  "eta": 76,
  "credit_estimate": 0.99
}
```

If you provide a webhook URL, you'll receive a notification when the music is ready:

```json
{
  "success": true,
  "conversion_type": "Music AI",
  "task_id": "8e058b85-6c22-41cc-a6ed-1e91ed73e34b",
  "conversion_id": "2872d9a6-4abe-4a8f-a04f-5540c4ef0a1a",
  "conversion_path": "https://lalals.s3.amazonaws.com/conversions/2872d9a6-4abe-4a8f-a04f-5540c4ef0a1a.mp3",
  "conversion_path_wav": "https://lalals.s3.amazonaws.com/conversions/2872d9a6-4abe-4a8f-a04f-5540c4ef0a1a.wav",
  "conversion_duration": 213.99,
  "is_flagged": false,
  "reason": "",
  "lyrics": "...",
  "lyrics_timestamped": "[ ... ]",
  "title": "Contradiction"
}
```

## Development

### Setting up the development environment

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development mode:
   ```bash
   npm run dev
   ```

### Building

```bash
npm run build
```

### Linting and formatting

```bash
npm run lint
npm run format
```

## API Reference

For detailed API documentation, visit the official [MusicGPT API Documentation](https://docs.musicgpt.com/api-documentation/index/introduction).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Create an issue in this repository for bug reports
- Check the [MusicGPT API Documentation](https://docs.musicgpt.com/api-documentation/index/introduction) for API-related questions
- Visit the [n8n Community](https://community.n8n.io/) for general n8n questions

## Changelog

### v1.0.0
- Initial release
- Music generation functionality
- Support for custom lyrics and voice models
- Webhook support for async generation
- TypeScript implementation
