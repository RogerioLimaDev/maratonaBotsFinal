/*jshint esversion: 6 */

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var cognitiveServices = require('botbuilder-cognitiveservices');
var minha = require('./minhabiblioteca');
var respostas = require('./respostas');
var isNullOrEmpty = require('check-null-or-empty');

var mensagem = '';
var txt;

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

respostas.Teste();
// FormatCard(respostas.Teste());

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

var qnarecognizer = new cognitiveServices.QnAMakerRecognizer({
    knowledgeBaseId: process.env.QnAKnowledgebaseId, 
    subscriptionKey: process.env.QnASubscriptionKey,
    top:3});

var intents = new builder.IntentDialog({ recognizers: [ recognizer, qnarecognizer ] });
bot.dialog('/', intents);


intents.matches('Cumprimento', (session, args) => {
        mensagem = respostas.Respostas('cumprimento', session.message.text);
        session.send(mensagem);        
    });
intents.matches('Xingamento', (session, args) => {
        mensagem = respostas.Respostas('xingamento', session.message.text);
        session.send(mensagem);
    });

intents.matches('Definicao', (session, args) => {
        const hmdEntities = ['oculus', 'cardboard','htc', 'hololens', 'gearvr','magic leap','windows mr', 'playstationvr'];
        for( var i = 0; i<hmdEntities.length; i++ ){
            const foundEntities = builder.EntityRecognizer.findAllEntities(args.entities, hmdEntities[i]);
            if(foundEntities.length > 0){
                var currentEntity = hmdEntities[i];
                const mensagemHmd = respostas.Respostas('definicao', session.message.text,currentEntity,'hmd');
                FormatCard(mensagemHmd);
                const cardH = cardHMD(session,mensagemHmd) ;
                const msgemH = new builder.Message(session).addAttachment(cardH);
                session.send(msgemH);
                return;
                }
            }

            const techEntities = ['virtual', 'aumentada','beacons', 'kinect', 'chatbot','mixed'];
        
            for( var j = 0; j<techEntities.length; j++ ){
                const foundEntities = builder.EntityRecognizer.findAllEntities(args.entities, techEntities[j]);
                if(foundEntities.length >0){
                    const mensagemTech = respostas.Respostas('definicao', session.message.text,techEntities[j],'tech');
                    FormatCard(mensagemTech);
                    const cardT = cardTech(session,mensagemTech) ;
                    const msgemT = new builder.Message(session).addAttachment(cardT);
                    session.send(msgemT);
                    return;

                    }   
                }

            const nameEntities = ['rogerio','tropical','bionikos','andrea'];
        
            for( var k = 0; k<nameEntities.length; k++ ){
                const foundEntities = builder.EntityRecognizer.findAllEntities(args.entities, nameEntities[k]);
                if(foundEntities.length >0){
                    const mensagemName = respostas.Respostas('definicao', session.message.text,nameEntities[k],'name');
                    session.send(mensagemName);
                    return;
                }  
            }
    });

intents.onDefault((session, args) => {
        mensagem = respostas.Respostas('None', session.message.text);
        session.send(mensagem);
    });

intents.matches('pessoais', (session,args)=>{
        mensagem = respostas.Respostas('pessoais', session.message.text);
        session.send(mensagem);
    });
intents.matches('onde', (session,args)=>{
        mensagem = respostas.Respostas('onde', session.message.text);
        session.send(mensagem);
    });
intents.matches('quem', (session,args)=>{
        mensagem = respostas.Respostas('quem', session.message.text);
        session.send(mensagem);
    });
intents.matches('compras', (session,args)=>{
        mensagem = respostas.Respostas('compras', session.message.text);
        session.send(mensagem);
    });
intents.matches('comparacao', (session,args)=>{
        mensagem = respostas.Respostas('None', session.message.text);
        session.send(mensagem);
    });
intents.matches('portfolio', (session,args)=>{
        mensagem = respostas.Respostas('portfolio', session.message.text);
        session.send(mensagem);
    });
intents.matches('orcamento', (session,args)=>{
        mensagem = respostas.Respostas('orcamento', session.message.text);
        const card = card4(session);
        const msgem = new builder.Message(session).addAttachment(card);
        session.send(msgem);
    });

intents.matches('qna', [
        function (session, args, next) {
            var answerEntity = builder.EntityRecognizer.findEntity(args.entities, 'answer');
            var respQnA = String(answerEntity.entity);
            var txtQna = FindCardSize(session,respQnA);
            // if(isNullOrEmpty(txtQna)){
                const msgemQ = new builder.Message(session).addAttachment(txtQna);
                session.send(msgemQ);
            // }
            // else session.send(answerEntity);
            session.send(answerEntity.entity);
            return;

        }
    ]);

const card4 = (session)=>{
    var txt = FormatCard(mensagem);
    return new builder.HeroCard(session)
        .title(txt[0])
        .images([builder.CardImage.create(session,txt[1].trim())])
        .text(txt[2])
        .buttons([ builder.CardAction.openUrl(session, txt[3].trim(), 'mande um email')]);
    };

const cardTech = (session,mensagemTech)=>{
    var txtT = FormatCard(mensagemTech);
    return new builder.HeroCard(session)
        .title(txtT[0])
        .images([builder.CardImage.create(session,txtT[1].trim())])
        .text(txtT[2]);
    };

const cardHMD = (session, mensagemHmd)=>{
    var txtH = FormatCard(mensagemHmd);
    return new builder.HeroCard(session)
        .title(txtH[0])
        .images([builder.CardImage.create(session,txtH[1].trim())])
        .text(txtH[2]);
};


const card3 = (session)=>{
    var txt = FormatCard(mensagem);
    return new builder.HeroCard(session)
        .title(txt[0])
        .images([builder.CardImage.create(session,txt[1].trim())])
        .text(txt[2]);
    };

const card2 = (session)=>{
    var txt = FormatCard(mensagem);
    return new builder.HeroCard(session)
        .text(txt[2])
        .buttons([ builder.CardAction.openUrl(session, txt[3].trim(), 'mande um email')]);
    };
  
function FormatCard(mensagem){

    const resposta = String(mensagem);
    const partesDaResposta = resposta.split('%');
    const [titulo, imagem, descricao, url] = partesDaResposta;
    return partesDaResposta;

}

function FindCardSize(session,msgFromIntent)
{
    switch(resp.length){

        case 4:
        const card4QnA = (session)=>{
            const resp = FormatCard(msgFromIntent);
            return new builder.HeroCard(session)
                .title('Temos card')
                .images([builder.CardImage.create(session,resp[1].trim())])
                .text(resp[2])
                .buttons([ builder.CardAction.openUrl(session, resp[3].trim(), 'mande um email')]);
        };
        return card4QnA;

        case 3:
        const card3QnA = (session)=>{
            const resp = FormatCard(msgFromIntent);
            return new builder.HeroCard(session)
                .title('Temos titulo, ok?')
                .images([builder.CardImage.create(session,resp[1].trim())])
                .text(resp[3]);
    
        };
        return card3QnA;

        case 2:
        const card2QnA = (session)=>{
            const resp = FormatCard(msgFromIntent);
            return new builder.HeroCard(session)
            .text(resp[0])
            .buttons([ builder.CardAction.openUrl(session, resp[1].trim(), 'mande um email')]);
        };
        return card2QnA;
        
        case 1:
        return;
    }

}


////FIM LUIS CODE/////

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
                .text('Me chamo **Tropical CyBot**. Sou especialista em realidade virtual e aumentada. Como posso te ajudar?');
    
                var helloMessage = new builder.Message(session).addAttachment(helloCard);
                session.send(helloMessage);
    
            }
        session.endDialog();
        }
    ]);

////FIM PROATIVIDADE/////

////QNA///////



var qnaMakerTools = new cognitiveServices.QnAMakerTools();

// var qnaMakerTools = new minha.BrazilianQnaMakerTools();//
bot.library(qnaMakerTools.createLibrary());


// const qnaMakerDialog = new cognitiveServices.QnAMakerDialog(
//     {
//         recognizers: [qnarecognizer],
//         defaultMessage:'Ops!...Não entendi. Pode reformular a pergunta?',
//         qnaThreshold: 0.3,
//         feedbackLib: qnaMakerTools
//     }
// );


// qnaMakerDialog.respondFromQnAMakerResult = (session,result) => {
//     const resp = result.answers[0].answer;
//     const ptsDaResposta = resp.split('%');
//     const [titulo, imagem, descricao, url] = ptsDaResposta;

//     var card4QnA = ()=>{
//         const cardqna  = new builder.HeroCard(session)
//             .title(titulo)
//             .images([builder.CardImage.create(session,imagem.trim())])
//             .text(descricao)
//             .buttons([ builder.CardAction.openUrl(session, url.trim(), 'mande um email')]);
//         const retorno = new builder.Message(session).addAttachment(cardqna);
//         session.send(retorno);
//     };

//     var card3QnA = ()=>{
//         const cardqna = new builder.HeroCard(session)
//             .title(titulo)
//             .images([builder.CardImage.create(session,imagem.trim())])
//             .text(descricao);
//         const retorno = new builder.Message(session).addAttachment(cardqna);
//         session.send(retorno);
//     };

//     var card2QnA = ()=>{
//         const cardqna = new builder.HeroCard(session)
//         .text(descricao)
//         .buttons([ builder.CardAction.openUrl(session, url.trim(), 'mande um email')]);
//         const retorno = new builder.Message(session).addAttachment(cardqna);
//         session.send(retorno);
//     };

//     switch(ptsDaResposta.length){
//         case 4:
//         card4QnA();
//         break;

//         case 3:
//         card3QnA();
//         break;

//         case 2:
//         card2QnA();
//         break;

//         case 1:
//         session.send(resp);
//         break;
//     }
// };

////QNA/////
