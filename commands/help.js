const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
	name: 'help',
	aliases: ['h', 'cmd', 'command'],
	run: async (client, message) => {
		client.config = require('../config.json');
		message.channel.send({
			embeds: [
				new Discord.MessageEmbed()
					.setTitle('All Commands')
					.setImage('https://cdn.discordapp.com/emojis/777578958715093022.gif')
					.addFields(
						{ name: '.purge', value: 'ayo those msg\'s were kinda sus ngl (.purge 100)', inline: true },
						{ name: '.play', value: 'eg: (.play rick roll)', inline: true },
						{ name: '.stop', value: 'Kill the music!', inline: true },
						{ name: '.queue', value: 'View your playlist', inline: true },
						{ name: '.skip', value: '--->', inline: true },
						{ name: '.previous', value: '<---', inline: true },
						{ name: '.autoplay', value: 'Plays similar tracks, can be toggled ON or OFF', inline: true },
						{ name: '.seek', value: 'eg: (.seek 147 seconds)', inline: true },
						{ name: '.repeat', value: '.repeat bruh sound effect #2', inline: true },
						{ name: '.volume', value: 'between 1-100%', inline: true },
						{ name: '.leave', value: 'Out!', inline: true },
					)
					.setColor(config.embedColour),
			],
		});
	},
};