import { expect } from 'chai';
import infidels from '../../src/commands/deus-vult';

const possibleImageUrls = [
	'https://ih0.redbubble.net/image.297633040.5334/flat,550x550,075,f.u2.jpg',
	'https://i.kym-cdn.com/photos/images/newsfeed/001/176/880/239.jpg'
];

describe('deus-vult command', () => {
	it('should return a deus-vult picture', async () => {
		const result = await infidels.processCommand();

		expect(result.attachments[0].type).to.equal('image');
		expect(possibleImageUrls).to.contain(result.attachments[0].url);
	});
});
