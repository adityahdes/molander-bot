import { expect } from 'chai';
import help from '../../src/commands/help';

describe('help command', () => {
	it('should return the placeholder help message', async () => {
		const result = await help.processCommand();

		expect(result.text).to.equal('I\'ll help out eventually');
	});
});
