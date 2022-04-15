const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

// https://gist.github.com/sell/bff7b542b98c6497889b8527fc21d254

module.exports = {
    name: 'eval',
    run: async (client, message, args) => {
        client.config = require('../config.json');
        if (!args[0]) {
            return message.channel.send(`${client.emotes.error} | Please put code to evaluate in code blocks: \`\`\`\ console.log('hello there') \`\`\`\ `)
        }
        const embed = new MessageEmbed()
            .setTitle('Evaluating...')
            .setColor(config.embedColour)
        const msg = await message.channel.send({ embeds: [embed] });
        try {
            const data = eval(args.join(' ').replace(/```/g, ''))
            const embed = await new MessageEmbed()
                .setTitle('Evaluated Code')
                .setDescription(data)
                .setColor(config.embedColour)
            await msg.edit(embed);
            await msg.react('✅')
            await msg.react('❌')
            const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id)
            msg.awaitReactions(filter, { max: 1 })
                .then((collected) => {
                    collected.map((emojis) => {
                        switch (emojis._emoji.name) {
                            case '✅':
                                msg.reactions.removeAll()
                                break;
                            case '❌':
                                msg.delete()
                                break;
                        }
                    })
                })

        } catch (error) {
            const embed = new MessageEmbed()
                .setTitle('An Error Occurred')
                .setColor('#ff0000');
            console.error(error);
            return await msg.edit(embed);
        }
    }
}