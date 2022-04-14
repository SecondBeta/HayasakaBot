const { DisTube } = require('distube');
const Discord = require('discord.js');
const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_VOICE_STATES,
	],
});
const fs = require('fs');
const config = require('./config.json');
const { SoundCloudPlugin } = require('@distube/soundcloud');

client.config = require('./config.json');
client.distube = new DisTube(client, {
	leaveOnStop: false,
	emitNewSongOnly: true,
	plugins: [new SoundCloudPlugin()],
});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = config.emoji;

fs.readdir('./commands/', (err, files) => {
	if (err) return console.log('Could not find any commands!');
	const jsFiles = files.filter(f => f.split('.').pop() === 'js');
	if (jsFiles.length <= 0) return console.log('Could not find any commands!');
	jsFiles.forEach(file => {
		const cmd = require(`./commands/${file}`);
		console.log(`Loaded ${file}`);
		client.commands.set(cmd.name, cmd);
		if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name));
	});
});

client.on('ready', () => {
	console.log(`${client.user.tag} is ready to play music.`);
	client.user.setPresence({ activities: [{ name: '.help', type: 'LISTENING' }], status: 'online' });
});

client.on('messageCreate', async message => {
	if (message.author.bot || !message.guild) return;
	const prefix = config.prefix;
	if (!message.content.startsWith(prefix)) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
	if (!cmd) return;
	if (cmd.inVoiceChannel && !message.member.voice.channel) {
		return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`);
	}
	try {
		cmd.run(client, message, args);
	}
	catch (e) {
		console.error(e);
		message.channel.send(`${client.emotes.error} | Error: \`${e}\``);
	}
});

const status = queue =>
	`Volume: \`${queue.volume}%\` | Repeat: \`${
		queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
	}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;
client.distube
	.on('playSong', (queue, song) =>
		queue.textChannel.send({
			embeds: [
				new Discord.MessageEmbed()
					.setColor(config.embedColour)
					.setTitle(`${client.emotes.play} | **Now Playing:** ${song.name} - Duration: \`${song.formattedDuration}\``)
					.setImage(`${song.thumbnail}`),
			],
		},
		),
	)
	.on('addSong', (queue, song) =>
		queue.textChannel.send({
			embeds: [
				new Discord.MessageEmbed()
					.setColor(config.embedColour)
					.setTitle(`${client.emotes.success} | Added ${song.name} to the queue - Duration: \`${song.formattedDuration}\`\n${status(queue)}`),
			],
		},
		),
	)
	.on('addList', (queue, playlist) =>
		queue.textChannel.send(
			`${client.emotes.success} | Added \`${playlist.name}\` playlist (${
				playlist.songs.length
			} songs) to queue\n${status(queue)}`,
		),
	)
	.on('searchNoResult', (message, query) => message.channel.send('No result found for: ' + query))
	.on('error', (channel, e) => {
		channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`);
		console.error(e);
	})
	.on('empty', channel => channel.send('Voice channel is empty! Leaving the channel...'))
	.on('searchNoResult', message => message.channel.send(`${client.emotes.error} | No result found!`))
	.on('finish', queue => queue.textChannel.send({
		embeds: [
			new Discord.MessageEmbed()
				.setColor(config.embedColour)
				.setTitle(`${client.emotes.queue} Queue is now empty!`),
		],
	},
	),
	);

client.login(`${process.env.BOT_TOKEN}`);