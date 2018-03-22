/*jshint esversion: 6 */

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var cognitiveServices = require('botbuilder-cognitiveservices');
var minha = require('./minhabiblioteca');
var respostas = require('./respostas');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);
bot.set('storage', tableStorage);

/////LUIS CODE/////

var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';
const LuisModelUrl = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/f1c2986b-e9b0-426f-99ec-faf01acc68b5?subscription-key=69847929754f4440b23d38f8e6b370ec&verbose=true&timezoneOffset=0&q=';

var recognizer = new builder.LuisRecognizer(LuisModelUrl);

var intents = new builder.IntentDialog({ recognizers: [recognizer] })

    .matches('Cumprimento', (session, args) => {
        // var foundEntities = [];
        // args.entities.forEach(fEntity=>{
        //     foundEntities.push(fEntity);
        // });
        // const message = foundEntities.map(m=>m.entity).join(',');
        var mensagem = respostas.Respostas('cumprimento', session.message.text);
        session.send(mensagem);        
    })

    .matches('Xingamento', (session, args) => {
        // var foundEntities = [];
        // args.entities.forEach(fEntity=>{
        //     foundEntities.push(fEntity);
        // });
        // const message = foundEntities.map(m=>m.entity).join(',');
        var mensagem = respostas.Respostas('xingamento', session.message.text);
        session.send(mensagem);
    })

    .matches('Definicao', (session, args) => {

        // var foundEntities = [];
        // args.entities.forEach(fEntity=>{
        //     foundEntities.push(fEntity);
        // });
        // const allEntities = foundEntities.map(m=>m.entity).join(',');
        // const curEntity = foundEntities[1].entity;
        // var mensagem = respostas.Respostas('definicao', session.message.text, curEntity);
        // session.send(mensagem);
        // const message01 = allEntities;
        // const message = foundEntities[0].entity + ' do tipo ' + foundEntities[1].entity;

        const myEntities = builder.EntityRecognizer.findAllEntities( args.entities, 'HMD');
        const message = myEntities.map(m=>m.entity).join(',');
        session.send('Desobri a intenção **Definicao**, você disse **\'%s\'** e achei as entidades **'+ message +'\**' , session.message.text);
    })

    .onDefault((session, args) => {
        var mensagem = respostas.Respostas('None', session.message.text);
        console.log(respostas.Respostas('None', session.message.text));
        session.send(mensagem);
});

bot.dialog('/', intents);


////END LUIS CODE////



////PROATIVIDADE//////

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
                .images([builder.CardImage.create(session, "https://yt3.ggpht.com/-AZ4w5v06Pxo/AAAAAAAAAAI/AAAAAAAAAAA/GfUVPVBuH_c/s288-mo-c-c0xffffffff-rj-k-no/photo.jpg")])
                .text('Me chamo Tropical Cyborg. Sou especialista em realidade virtual e aumentada. Como posso te ajudar?');
    
                var helloMessage = new builder.Message(session).addAttachment(helloCard);
                session.send(helloMessage);
    
            }
        session.endDialog();
        }
    ]);

////FIM PROATIVIDADE/////

