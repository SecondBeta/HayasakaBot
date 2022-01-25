const { MessageEmbed } = require('discord.js');
const querystring = require('querystring');
const fetch = require('node-fetch');

module.exports = {
	name: 'urban',
	aliases: ['ud'],
	description: 'Get a definition of a word with Urban Dictionary',
	run: async (client, message, args, Discord) => {
		if (!args.length) return message.reply({ content: 'No Query Given' });

		const query = querystring.stringify({ term:args.join(' ') });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

		if (!list.length) return message.channel.send(`No definition was found for **"${args.join(' ')}"**`);

		const embed = new Discord.MessageEmbed()
			.setTitle('Urban Dictionary')
			.setColor('#DD989B')
			.setDescription(`**Definition:**\n${list[0].definition}`)
			.setTimestamp();

		message.channel.send({ embeds: [embed] });
	},
};
