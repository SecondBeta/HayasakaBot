const discord = require('discord.js');
const axios = require('axios');

module.exports = {
	name: 'urban',
	cooldown: 3000,
	run: async (client, message, args) => {

		const query = args.join(' ');
		if (!query) {
			return message.channel.send(`${client.emotes.error} | Please provide a query`);
		}
		const link = 'https://api.urbandictionary.com/v0/define?term=';
		let fetch = await axios(link + encodeURI(query));
		fetch = fetch.data.list;

		if (fetch.length === 0) {
			return message.channel.send(`${client.emotes.error} | Query not found`);
		}
		const data = fetch[0];
		let definition = data.definition;
		let example = data.example;
		const permalink = data.permalink;
		const thumbsUp = data.thumbs_up;
		const thumbsDown = data.thumbs_down;
		const title = data.word;

		definition = definition.length >= 1024 ? definition.slice(0, 1024) + '...' : definition;
		example = example.length >= 1024 ? example.slice(0, 1024) + '...' : example;

		const embed = new discord.MessageEmbed()
			.setTitle(title)
			.setURL(permalink)
			.setColor('#DD989B')
			.addField('Definition ', definition)
			.addField('Example: ', example)
			.setFooter(`👍: ${thumbsUp} | 👎: ${thumbsDown}`);

		return message.channel.send(embed);
	},
};