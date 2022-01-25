const Discord = require('discord.js');

module.exports = {
	name: 'help',
	aliases: ['h', 'cmd', 'command'],
	run: async (client, message) => {
		message.channel.send({
			embeds: [
				new Discord.MessageEmbed()
					.setTitle('All Commands')
					.setImage('https://cdn.discordapp.com/emojis/796645689890701343.gif?size=128J&quality=lossless')
					.addFields(
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
						{ name: '.sauce', value: 'paste a screenshot and find that sauce!', inline: true },
					)
					.setColor('#DD989B'),
			],
		});
	},
};