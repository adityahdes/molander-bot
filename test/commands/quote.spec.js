import { expect } from 'chai';
import quote from '../../src/commands/quote';
import quotes from '../../src/data/quotes-list';

describe('quote command', () => {
	it('should return a quote form the quote list', async () => {
		const result = await quote.processCommand();

		expect(quotes).to.include(result);
	});
});
