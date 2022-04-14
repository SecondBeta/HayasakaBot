const Discord = require('discord.js');

module.exports = {
	name: 'purge',
	run: async (client, message, args) => {
		const purgeCount = Number(args[0]);
		if (!purgeCount) {
			return message.channel.send(`${client.emotes.error} | Please provide a # of previous messages you would like to delete (.purge 50)`);
		}
		if (purgeCount > 100 || purgeCount < 1) {
		return message.channel.send(`${client.emotes.error} | Please select a number **between** 1 and 100`)
		}
		if (isNaN(purgeCount)) return message.channel.send(`${client.emotes.error} | Please enter a valid number!`);
		await message.channel.messages.fetch({
			limit: purgeCount
		  }).then(messages => {
			message.channel.bulkDelete(messages);
			message.channel.send({
				embeds: [
					new Discord.MessageEmbed()
						.setTitle(`Purged ${purgeCount} messages!`)
						.setImage('https://cdn.discordapp.com/attachments/929954012097310731/963989793660895262/693990042485522432.gif')
				]});
		  })
	},
};