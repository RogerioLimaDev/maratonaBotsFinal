/*jshint esversion: 6 */

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var cognitiveServices = require('botbuilder-cognitiveservices');
var minha = require('./minhabiblioteca');

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

var recognizer = new cognitiveServices.QnAMakerRecognizer({
    knowledgeBaseId: process.env.QnAKnowledgebaseId, 
    subscriptionKey: process.env.QnASubscriptionKey,
    top:3});

var qnaMakerTools = new cognitiveServices.QnAMakerTools();
// var qnaMakerTools = new minha.BrazilianQnaMakerTools();//
// bot.library(qnaMakerTools.createLibrary());


const qnaMakerDialog = new cognitiveServices.QnAMakerDialog(
    {
        recognizers: [recognizer],
        defaultMessage:'Ops!...Não entendi. Pode reformular a pergunta?',
        qnaThreshold: 0.3,
        feedbackLib: qnaMakerTools
    }
);

bot.dialog('/', qnaMakerDialog);

qnaMakerDialog.respondFromQnAMakerResult = (session,result) => {
    const resposta = result.answers[0].answer;
    const partesDaResposta = resposta.split('%');
    const [titulo, imagem, descricao, url] = partesDaResposta;

    var card4 = ()=>{
        // const card  = new builder.HeroCard(session)
        const card = new builder.ThumbnailCard(session)
            .title(titulo)
            .images([builder.CardImage.create(session,imagem.trim())])
            .text(descricao)
            .buttons([ builder.CardAction.openUrl(session, url.trim(), 'mande um email')]);
        const retorno = new builder.Message(session).addAttachment(card);
        session.send(retorno);
    };

    var card3 = ()=>{
        const card = new builder.ThumbnailCard(session)
            .title(titulo)
            .images([builder.CardImage.create(session,imagem.trim())])
            .text(descricao);
        const retorno = new builder.Message(session).addAttachment(card);
        session.send(retorno);
    };

    var card2 = ()=>{
        const card = new builder.ThumbnailCard(session)
        .text(descricao)
        .buttons([ builder.CardAction.openUrl(session, url.trim(), 'mande um email')]);
        const retorno = new builder.Message(session).addAttachment(card);
        session.send(retorno);
    };

    switch(partesDaResposta.length){
        case 4:
        card4();
        break;

        case 3:
        card3();
        break;

        case 2:
        card2();
        break;

        case 1:
        session.send(resposta);
        break;
    }
};