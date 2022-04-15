const config = require('../config.json');

module.exports = {
    name: 'eval',
    run: async (client, message, args) => {
        client.config = require('../config.json');
    const args = message.content.split(" ").slice(1);
      if (message.author.id !== `${process.env.devID}`)
        return;
      try {
        const evaled = eval(args.join(" "));
        const cleaned = await clean(evaled);
        message.channel.send(`\`\`\`js\n${cleaned}\n\`\`\``);

      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${cleaned}\n\`\`\``);
      }
    }
}