import { MusicGPT } from '../nodes/MusicGPT/MusicGPT.node';

describe('MusicGPT Node', () => {
  const musicGPTNode = new MusicGPT();

  describe('Description', () => {
    it('should have correct display name', () => {
      expect(musicGPTNode.description.displayName).toBe('MusicGPT');
    });

    it('should have correct name', () => {
      expect(musicGPTNode.description.name).toBe('musicGpt');
    });

    it('should have correct group', () => {
      expect(musicGPTNode.description.group).toEqual(['transform']);
    });

    it('should have version 1', () => {
      expect(musicGPTNode.description.version).toBe(1);
    });

    it('should have correct description', () => {
      expect(musicGPTNode.description.description).toBe('Create AI-generated music using MusicGPT API');
    });

    it('should require MusicGPT API credentials', () => {
      expect(musicGPTNode.description.credentials).toEqual([
        {
          name: 'musicGptApi',
          required: true,
        },
      ]);
    });

    it('should have music resource', () => {
      const resourceProperty = musicGPTNode.description.properties.find(
        (prop: any) => prop.name === 'resource'
      );
      expect(resourceProperty).toBeDefined();
      if (resourceProperty) {
        expect(resourceProperty.options).toEqual([
          {
            name: 'Music',
            value: 'music',
          },
        ]);
      }
    });

    it('should have create operation', () => {
      const operationProperty = musicGPTNode.description.properties.find(
        (prop: any) => prop.name === 'operation'
      );
      expect(operationProperty).toBeDefined();
      if (operationProperty) {
        expect(operationProperty.options).toEqual([
          {
            name: 'Create',
            value: 'create',
            description: 'Create AI-generated music',
          },
        ]);
      }
    });

    it('should have required prompt parameter', () => {
      const promptProperty = musicGPTNode.description.properties.find(
        (prop: any) => prop.name === 'prompt'
      );
      expect(promptProperty).toBeDefined();
      if (promptProperty) {
        expect(promptProperty.required).toBe(true);
        expect(promptProperty.type).toBe('string');
      }
    });

    it('should have music style parameter', () => {
      const styleProperty = musicGPTNode.description.properties.find(
        (prop: any) => prop.name === 'music_style'
      );
      expect(styleProperty).toBeDefined();
      if (styleProperty) {
        expect(styleProperty.type).toBe('string');
        expect(styleProperty.default).toBe('Pop');
      }
    });

    it('should have optional lyrics parameter', () => {
      const lyricsProperty = musicGPTNode.description.properties.find(
        (prop: any) => prop.name === 'lyrics'
      );
      expect(lyricsProperty).toBeDefined();
      if (lyricsProperty) {
        expect(lyricsProperty.type).toBe('string');
        expect(lyricsProperty.required).toBeUndefined();
      }
    });

    it('should have options collection', () => {
      const optionsProperty = musicGPTNode.description.properties.find(
        (prop: any) => prop.name === 'options'
      );
      expect(optionsProperty).toBeDefined();
      if (optionsProperty) {
        expect(optionsProperty.type).toBe('collection');
      }
    });
  });
});
