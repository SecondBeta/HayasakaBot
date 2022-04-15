const config = require('../config.json');

module.exports = {
    name: 'eval',
    run: async (client, message, args) => {
        client.config = require('../config.json');
        if (message.author.id !== config.devID)
        return; 
        try {
            const evaled = eval(args.join(" "));
            const cleaned = await clean(evaled);
            message.channel.send(`\`\`\`js\n${cleaned}\n\`\`\``);
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${cleaned}\n\`\`\``);
        }
    }
}