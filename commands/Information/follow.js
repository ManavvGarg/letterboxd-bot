const { MessageEmbed } = require("discord.js")
var ee = require("../../botconfig/embed.json");
const User = require("../../models/User")
const Parser = require("rss-parser")
let parser = new Parser();
const { updateMovies2 } = require("../../handlers/functions")

var urlExists = require('url-exists');

module.exports = {
  name: "follow", //the command name for execution & for helpcmd [OPTIONAL]
  category: "Information", //the command category for helpcmd [OPTIONAL]
  aliases: [], //the command aliases for helpcmd [OPTIONAL]
  cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
  usage: "follow <letterboxd profile username>", //the command usage for helpcmd [OPTIONAL]
  description: "follows the user", //the command description for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
  maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
  minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
  maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
  argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
  argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {

      
      if(args[1]) message.reply(`Only one username at a time`)
      if(!args) message.reply(`Please enter a letterboxd ID`)
      var temp_username = args[0];
      var username = `${temp_username.toLowerCase()}`
      var validBool = false;


      await urlExists(`https://letterboxd.com/${username}/`, async function(err, exists) {
      
        if(exists === true) {
          let feed = await parser.parseURL(`https://letterboxd.com/${username}/rss/`);
          let userName = feed.title.split(" - ")[1]
          const newUser = new User({
            uhid: username,
            name: userName,
            profileLink: `https://letterboxd.com/${username}`,
            lastUpdated: + new Date()
          })
  
         await newUser.save();
  
         await updateMovies2(`https://letterboxd.com/${username}`, username);
  
          
          message.reply(`Successfully followed **${username}** !`)
        }

        else {
          message.reply(`No letterboxd profile found with **${username}** ! Please try again!`)
        }
       
      });



    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.reply({embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERROR | An error occurred`)
          .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
      ]});
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
