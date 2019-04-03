import { expect } from 'chai';
import story from '../../src/commands/story';
import stories from '../../src/data/story-list';

describe('story command', () => {
	it('should return a story from the story list', async () => {
		const result = await story.processCommand();
		expect(stories).to.include(result);
	});
});
