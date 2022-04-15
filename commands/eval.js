const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'eval',
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle('Evaluating...')
        const msg = await message.channel.send(embed)
        try {
            const data = eval(args.join(' ').replace(/```/g, ''))
            const embed = new MessageEmbed()
                .setTitle('Eval Command')
                .setDescription(await `${data}`)
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
                .setTitle('An Error occurred');
            console.error(error);
            return await msg.edit(embed);
        }
    }
}