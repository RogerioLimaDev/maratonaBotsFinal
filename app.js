/*jshint esversion: 6 */

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");

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

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWeb.JobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);
bot.set('storage', tableStorage);

/////////////////////////////////////

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


/////////////////////

bot.dialog('/', function (session) {
    session.send('You said ' + session.message.text);
});