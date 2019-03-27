const Discord = require('discord.js');
const { prefix} = require('./config.json');
const client = new Discord.Client();

//----------------------------------------------------------------------


const info = new Discord.RichEmbed()
  .setTitle("All BOT-COMMANDS")
  .setAuthor("LaPeSi's", "https://i.ibb.co/YjPJgy3/Icon.png")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(0x00AE86)
  .setDescription("Thank you for using the server!\nPlease write the commands in the spam-chat channel.")
  .setFooter("LaPeSi's", "https://i.ibb.co/YjPJgy3/Icon.png")
  .setThumbnail("https://i.ibb.co/jJ99j0d/559146230442098698.png")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
  .addField("@everyone",
    "$info, to see this\n$blacklist, to see the blacklist\n$karma, to see your karma")
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addField("@admins", "$kick [@member], to kick the member\n$blacklistAdd [word], to add this word to the blacklist", true)
  /*
   * Blank field, useful to create some space.
   */
  .addBlankField(true)
  .addField("General informations", "Please use the commands in the spam-chat channel!\nIf you have an Idea for a word that should be blacklisted, but it isn't, then write it in the blacklist channel.\nLast rule is, that you should have fun and don't be mad!", true);


//----------------------------------------------------------------------





client.once('ready', () => {
    console.log('Ready!')
})




function makeChannel(message){
    var server = message.guild;
    var name = message.member.displayName +" VS. "+ message.mentions.members.first().displayName;
    server.createChannel(name, 'text',[{
        type: 'role',
        id:'859999680677019649',
        deny:0x400
       }])
       .then(channel =>{
           channel.send("Welcome to the tic tac toe fight between "+message.member.displayName+" and "+message.mentions.members.first().displayName+"!\nThe winner gets 5 karma and the loser loses 5.")
           var beginner = Math.floor(Math.random() * 3);
           var b = 0;
           try{b += parseInt(client.data["bMax"].points)} 
           catch{}

        //--------------------------------------
           if(beginner == 0){
               channel.send(message.member.displayName+" goes first!")

               client.data ["channel"+b.toString()] = {
                playerId1: [message.member.id],
                playerId2: [message.mentions.members.first().id],
                channelId: [channel.id],
                turn:      [0],
                game:      ["tictactoe"]

             }
             fs.writeFile("./data.json", JSON.stringify(client.data, null, 4), err =>{
                 if (err) throw err;
             })
            }
        //--------------------------------------

        //--------------------------------------
        if(beginner == 1){
            channel.send(message.mentions.members.first().displayName+" goes first!")

            client.data ["channel"+b.toString()] = {
             playerId1: [message.member.id],
             playerId2: [message.mentions.members.first().id],
             channelId: [channel.id],
             turn:      [1],
             game:      ["tictactoe"]

          }
          fs.writeFile("./data.json", JSON.stringify(client.data, null, 4), err =>{
              if (err) throw err;
          })
         }
         message.author.send("You challenged "+message.mentions.members.first().displayName+" to a game of tic tac toe at the channel "+channel.name+"!")
         client.users.get(message.mentions.members.first().id).send("You got challenged by "+message.member.displayName+" to a game of tic tac toe at the channel "+channel.name+"!")
     //--------------------------------------

             client.data ["bMax"] = {
                points: [b += 1]
             }
             fs.writeFile("./data.json", JSON.stringify(client.data, null, 4), err =>{
                 if (err) throw err;

            }
            )
            //--------------------------------------

        })
        .catch(console.error);
}

function checkBlacklist(toCheck){
    var num = 1;
    try{num = parseInt(client.data["blacklist"].num)}
    catch{}
    var n=1;

    while(n < num){
        var word = client.data[n.toString()].word;

        if(toCheck.includes(word)){
            return false
        }


        n++;
    }
    return true
}
function blackArray(){
    var num = 1;
    try{num = parseInt(client.data["blacklist"].num)}
    catch{}
    var n=1;
    var array = [];

    while(n < num){
        var word = client.data[n.toString()].word;
        array += word+", ";
        


        n++;
    }
    return array;
}

const fs = require("fs");
client.data = require ("./data.json");

client.on('message', message =>{


    //console.log(message.content);
var num = 1;
try{num = parseInt(client.data["blacklist"].num)}
catch{}

if(checkBlacklist(message.content))
{
if((message.channel.name == "chat" && message.content.startsWith(`${prefix}`)||(message.channel.name == "memes" && message.content.startsWith(`${prefix}`))))
{
    message.delete();
    var points = 0;
        try{points += parseInt(client.data[message.member.id].points)}
        catch{}
        client.data [message.member.id] = {
            points: [points-=2]
         }
         fs.writeFile("./data.json", JSON.stringify(client.data, null, 4), err =>{
             if (err) throw err;
         })
    message.channel.send(message.member.displayName+", PLEASE USE BOT-COMMANDS IN THE SPAM-CHAT CHANNEL\nKarma: "+ client.data[message.member.id].points)
    message.author.send("PLEASE USE BOT-COMMANDS IN THE SPAM-CHAT CHANNEL\n[-2 karma]")
}



//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
else if(message.channel.name == "games"){



//-------------------------------------------------------------------------
if(message.content.startsWith(`${prefix}tictactoe`)){
    try{makeChannel(message)}
    catch{}
    
    
}
//-------------------------------------------------------------------------






message.delete();
}
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------




else{

    
    //-------------------------------------------------------------------------
    if(message.content.startsWith(`${prefix}kick`)){

        
        if(message.member.hasPermission(["KICK_MEMBERS","BAN_MEMBERS"])){
        //message.channel.send("Kick")

            let member = message.mentions.members.first();
            message.mentions.members.first().kick().then((member) => {
                message.channel.send(":wave:"+member.displayName+" HAS BEEN KICKED!")
            })
        }
    }
    //-------------------------------------------------------------------------


    //-------------------------------------------------------------------------
    if(message.content.startsWith(`${prefix}info`)){
        //message.delete();
        message.delete();
        message.channel.send(message.member.displayName+" check out your dm :v:")
        message.author.send(info);
    }
    //-------------------------------------------------------------------------


    //-------------------------------------------------------------------------
    if(message.content.startsWith(`${prefix}blacklist`)){
        //message.delete();
        message.delete();
        message.channel.send(message.member.displayName+" check out your dm :cookie:")
        message.author.send(blackArray());
    }
    //-------------------------------------------------------------------------



    //-------------------------------------------------------------------------
    if(message.content.startsWith(`${prefix}karma`)){
        //message.delete();
        message.delete();

        try {parseInt(client.data[message.member.id].points)}
        catch(e) {client.data [message.member.id] = {
            points: [0]
         }
         fs.writeFile("./data.json", JSON.stringify(client.data, null, 4), err =>{
             if (err) throw err;
         })}

        message.channel.send(message.member.displayName+" has "+client.data[message.member.id].points+" karma.")
    }
    //-------------------------------------------------------------------------


    //-------------------------------------------------------------------------
    if(message.content.startsWith(`${prefix}blacklistAdd`)){
        if(message.member.hasPermission(["KICK_MEMBERS","BAN_MEMBERS"])){
            editedmessage = message.content.slice(14);
            client.data [num.toString()] = {
               word: [editedmessage]
            }
            fs.writeFile("./data.json", JSON.stringify(client.data, null, 4), err =>{
                if (err) throw err;
            })

            num+=1;
            client.data ["blacklist"] = {
                num: [num.toString()]
                }
                fs.writeFile("./data.json", JSON.stringify(client.data, null, 4), err =>{
                    if (err) throw err;
                    message.delete();
                    message.channel.send(editedmessage+" added to blacklist");
        });
        }
    }
    //-------------------------------------------------------------------------
}
}
else{
    if(message.channel.name == "chat"||message.channel.name == "memes"){
        var points = 0;
        try {points += parseInt(client.data[message.member.id].points)}
        catch{}
        client.data [message.member.id] = {
            points: [points-=10]
         }
         fs.writeFile("./data.json", JSON.stringify(client.data, null, 4), err =>{
             if (err) throw err;
         })

        message.delete().then(
        message.channel.send(message.member.displayName+" USED A BLACKLISTED WORD!\nKarma: "+ client.data[message.member.id].points))
        message.author.send("DO NOT USE BAD WORDS!\n[-10 karma]")
    }
}
})

client.login(process.env.BOT_TOKEN);