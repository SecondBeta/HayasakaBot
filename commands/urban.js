const discord = require('discord.js');
const axios = require('axios');

module.exports = {
	name: 'urban',
	run: async (client, message, args) => {
		const query = args.join(' ');
		if (!query) {
			return message.channel.send(`${client.emotes.error} | Please provide a query`);
		}
		const link = 'https://api.urbandictionary.com/v0/define?';
		let fetch = await axios(link + encodeURI(query));
		fetch = fetch.data.list;

		if (fetch.length === 0) {
			return message.channel.send(`${client.emotes.error} | No results found for **${query}**.`);
		}
		const data = fetch[0];

		const embed = new discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(data.word)
			.setURL(data.permalink)
			.addFields(
				{ name: 'Definition', value: (data.definition) },
				{ name: 'Example', value: (data.example) },
				{ name: 'Rating', value: `${data.thumbs_up} thumbs up. ${data.thumbs_down} thumbs down.` },
			);
		message.channel.send({ embeds: [embed] });
	},
};