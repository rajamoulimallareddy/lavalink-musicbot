const util = require("../util");
module.exports = {
    name: "message",
    exec: async (client, msg ) => {
        if (!msg.guild) return;
        if (msg.author.bot) return;
		
        if(msg.content === `<@${client.user.id}>` || msg.content === `<@!${client.user.id}>`){
            msg.channel.send(`${msg.author} **My Prefix for is : ** ${client.prefix}`);
        }
        const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(client.prefix)})\\s*`);

        if(!prefixRegex.test(msg.content)) return;
        const [, matchedPrefix] = msg.content.match(prefixRegex);
        const args = msg.content.slice(matchedPrefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName));
		
        if (command) {
            try {
                await command.exec(msg, args);
            } catch (e) {
                console.error(e);
            }
        }
    }
};

