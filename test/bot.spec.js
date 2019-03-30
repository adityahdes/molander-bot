import assert from 'assert';
import sinon from 'sinon';
import cool from '../src/commands/cool';
import help from '../src/commands/help';
import infidels from '../src/commands/deus-vult';
import gif from '../src/commands/gif';
import bot from '../src/bot';
import quote from '../src/commands/quote';

function messagePrintable(message) {
    return JSON.stringify(message, null, 4);
}

let sandbox;
let expectedMessage;

describe('bot test suite', () => {
    before(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    context('/molander bot', () => {
        let expectedId;

        beforeEach(() => {
            expectedId = 'BOT_ID';
            process.env.BOT_ID = expectedId;
        });

        context('base command', () => {
            beforeEach(() => {
                expectedMessage = 'some face';
                sandbox.stub(cool, 'processCommand').returns(expectedMessage);
            });

            it('should respond to the base command', async () => {
                await bot.respondTo("/molander", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            });
        });

        context('help command', () => {
            beforeEach(() => {
                expectedMessage = 'help message';
                sandbox.stub(help, 'processCommand').returns(expectedMessage);
            });

            it('should respond to the help command', async () => {
                await bot.respondTo("/molander help", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            });
        });

        context('infidels command', () => {
            beforeEach(() => {
                expectedMessage = 'infidel message';
                sandbox.stub(infidels, 'processCommand').returns(expectedMessage);
            });

            it('should respond to the infidels command', async () => {
                await bot.respondTo("/molander infidels!", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            });
        });

        context('gif command', () => {
            beforeEach(() => {
                expectedMessage = 'https://local:test.com/gif';
                sandbox.stub(gif, 'processCommand').returns(expectedMessage);
            });

            it('should respond to the gif command', async () => {
                await bot.respondTo("/molander gif", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            });

            it('should respond to the gif command with a tag', async () => {
                await bot.respondTo("/molander gif cat", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            });

            it('should be default', async () => {
                await bot.respondTo("/molander cat", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            })
        });
    });

    context('/test bot', () => {
        let expectedId;
        
        beforeEach(() => {
            expectedId = 'TEST_BOT_ID';
            process.env.TEST_BOT_ID = expectedId;
        });

        context('base command', () => {
            beforeEach(() => {
                expectedMessage = 'some face';
                sandbox.stub(cool, 'processCommand').returns(expectedMessage);
            });

            it('should respond to the base command', () => {
                bot.respondTo("/test", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            });
        });

        context('help command', () => {
            beforeEach(() => {
                expectedMessage = 'help message';
                sandbox.stub(help, 'processCommand').returns(expectedMessage);
            });

            it('should respond to the help command', () => {
                bot.respondTo("/test help", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            });
        });

        context('infidels command', () => {
            beforeEach(() => {
                expectedMessage = 'infidel message';
                sandbox.stub(infidels, 'processCommand').returns(expectedMessage);
            });

            it('should respond to the infidels command', async () => {
                await bot.respondTo("/test infidels!", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            });
        });

        context('gif command', () => {
            beforeEach(() => {
                expectedMessage = 'https://local:test.com/gif';
                sandbox.stub(gif, 'processCommand').returns(expectedMessage);
            });

            it('should respond to the gif command', async () => {
                await bot.respondTo("/test gif", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            });

            it('should respond to the gif command with a tag', async () => {
                await bot.respondTo("/test gif cat", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            });

            it('should be default', async () => {
                await bot.respondTo("/test cat", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            })
        });
    });
});
