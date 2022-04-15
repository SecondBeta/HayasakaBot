const config = require('../config.json');

module.exports = {
    name: 'eval',
    run: async (client, message, args) => {
        client.config = require('../config.json');
        const code = args[0]
        if (!code) {
            return message.channel.send(`${client.emotes.error} | Please provide code to evaluate`);
        }
        if (message.author.id !== config.devID)
        return; 
        try {
            const evaled = eval(code.join(' ').replace(/```/g, ''))
            await message.channel.send(`\`\`\`js\n${evaled}\n\`\`\``);
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${evaled}\n\`\`\``);
        }
    }
}