import stories from '../data/story-list';

const commandRegex = /(story|legend)/;

function processCommand () {
    return '>' + stories[Math.floor(Math.random() * stories.length)];
}

export default {
    commandRegex,
    processCommand
};
