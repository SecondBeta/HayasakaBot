const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
	name: 'purge',
	run: async (client, message, args) => {
		client.config = require('../config.json');
		if(message.member.roles.cache.has(config.modRoleID)){
			const purgeCount = Number(args[0]);
			if (!purgeCount) {
				return message.channel.send(`${client.emotes.error} | Please provide a # of previous messages you would like to delete (.purge 50)`);
			}
			if (purgeCount > 100 || purgeCount < 1) {
			return message.channel.send(`${client.emotes.error} | Please select a number **between** \`1\` and \`100\``)
			}
			message.channel.messages.channel.bulkDelete(purgeCount);
			message.channel.send({
				embeds: [
					new Discord.MessageEmbed()
						.setTitle(`Purged ${purgeCount} messages!`)
						.setImage('https://cdn.discordapp.com/attachments/929954012097310731/963989793660895262/693990042485522432.gif')
						.setColor(config.embedColour)
				]}).then((msg) => {
					msg.react(`${client.emotes.success}`);
				});
		}
	},
};