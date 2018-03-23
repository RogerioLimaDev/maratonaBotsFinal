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
        var mensagem = respostas.Respostas('cumprimento', session.message.text);
        session.send(mensagem);        
    })

    .matches('Xingamento', (session, args) => {
        var mensagem = respostas.Respostas('xingamento', session.message.text);
        session.send(mensagem);
    })

    .matches('Definicao', (session, args) => {
        const hmdEntities = ['oculus', 'cardboard','htc', 'hololens', 'gearvr','magic leap','windows mr', 'playstationvr'];
        for( var i = 0; i<hmdEntities.length; i++ ){
            const foundEntities = builder.EntityRecognizer.findAllEntities(args.entities, hmdEntities[i]);
            if(foundEntities.length > 0){
                var currentEntity = hmdEntities[i];
                const mensagemHmd = respostas.Respostas('definicao', session.message.text,currentEntity,'hmd');
                session.send(mensagemHmd);
                }
            }

            const techEntities = ['virtual', 'aumentada','beacons', 'kinect', 'chatbot','mixed'];
        
            for( var i = 0; i<techEntities.length; i++ ){
                const foundEntities = builder.EntityRecognizer.findAllEntities(args.entities, techEntities[i]);
                if(foundEntities.length >0){
                    const mensagemTech = respostas.Respostas('definicao', session.message.text,techEntities[i],'tech');
                    session.send(mensagemTech);
                    // session.send('Achei a entidade '+ techEntities[i] + 'do tipo tech');
                }   
                }

            const nameEntities = ['rogerio', 'tropical','bionikos','andrea'];
        
            for( var i = 0; i<nameEntities.length; i++ ){
                const foundEntities = builder.EntityRecognizer.findAllEntities(args.entities, nameEntities[i]);
                if(foundEntities.length >0){
                    const mensagemName = respostas.Respostas('definicao', session.message.text,nameEntities[i],'name');
                    session.send(mensagemName);
                    // session.send('Achei a entidade '+ nameEntities[i] + 'do tipo name');
                }  
                }
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

