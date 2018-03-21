/*jshint esversion: 6 */

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var builder_cognitiveservices = require("botbuilder-cognitiveservices");
var minha = require('./minhabiblioteca');


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());


var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);


// Create your bot with a function to receive messages from the user
const bot = new builder.UniversalBot(connector);
bot.set('storage', tableStorage);

////

bot.on('conversationUpdate',(update) => {
    if(update.membersAdded){
        update.membersAdded.forEach( identity =>{
            if(identity.id === update.address.bot.id){
                bot.beginDialog(update.address,'start');
            }
        });
    }     
 });

 bot.dialog('start',[(session)=>{
    if(!session.userData.reload)
        {const helloCard  = new builder.HeroCard(session)
            .title('Olá')
            .images([builder.CardImage.create(session, "http://www.tropicalcyborg.com/images/tropical3d.png")])
            .text('Me chamo Tropical Cyborg. Sou especialista em realidade virtual e aumentada. Como posso te ajudar?');

            var helloMessage = new builder.Message(session).addAttachment(helloCard);
            session.send(helloMessage);
            session.endDialog();
        }
    }
]);









