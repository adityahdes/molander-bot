import { expect } from 'chai';
import { createSandbox } from 'sinon';
import Chance from 'chance';
import proxyquire from 'proxyquire';

let sandbox;
let chance;

before(() => {
	sandbox = createSandbox();
	chance = new Chance();
});

afterEach(() => {
	sandbox.restore();
});

describe('cool command', () => {
	let cool;
	let expectedCoolFace;

	beforeEach(() => {
		expectedCoolFace = chance.string();
		const coolStub = sandbox.stub();
		coolStub.returns(expectedCoolFace);
		cool = proxyquire('../../src/commands/cool', {
			'cool-ascii-faces': coolStub
		});
	});

	it('should return a cool face', async () => {
		const result = await cool.processCommand();

		expect(result).to.equal(expectedCoolFace);
	});
});
