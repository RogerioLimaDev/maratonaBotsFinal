/*jshint esversion: 6 */

var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var cognitiveServices = require('botbuilder-cognitiveservices');
const formFlowBuilder = require('formflowbotbuilder');
const path = require('path');
var app = require('./server');
var env = require('dotenv').load();    //Use the .env file to load the variables
var minha = require('./minhabiblioteca');
var respostas = require('./respostas');
var dialogos = require('./dialogos')();
var mensagem = '';
var txt;

////SERVIDOR/////
    app.listen(process.env.port || process.env.PORT || 3978, function () {
        console.log('%s listening to %s', app.name, app.url);
    });

////SERVIDOR/////

////DBCODE////

    var nameToQuery = 'Coca-Cola';

    var data = {
        db : 'clientes',
        collection: 'empresa',
        name: nameToQuery
    };

    var qDocument = app.mongo.querytDocument;
        // qDocument(data);


    var logResponse = function (){

        var res = [];
        var info = [];

        res = app.mongo.sendResults();
        info.push(res);

        var nomeFant = [];
        var cnpj = [];
        var valor = [];
        var dataVenc = [];
        var eResp = [];

        nomeFant.push(info[0][0]);
        cnpj.push(info[0][1]);
        valor.push(info[0][2]);
        dataVenc.push(info[0][3]);
        eResp.push(info[0][4]);

        console.log('RESPOSTA DO SERVIDOR: '+ info[0]);
        return info;
        };

//    setTimeout(logResponse,6000);

    var collection = 'empresa';
    var document = {
        nomeFantasia:'Coca-Cola', 
        cnpj:'000.000.000-00',
        valor:'R$ 10.000,00',
        dataVencimento: '00/00/2018',
        emailResp:'financeiro@cocacola.com.br'
    };

    var cCollect = app.mongo.createCollection;
    var iDocument = app.mongo.insertDocument;



////DBCODE////

////BOT CODE/////

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
app.post('/api/messages', connector.listen());



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

intents.matches('faturamento',[(session, args)=>{

            var pStrings = ['Que maravilha! **Já temos seu cadastro?**',
            'Que ótimo. **Vc já passou os dados?**',
            '**A empresa já está cadastrada?**'];
    
            builder.Prompts.confirm(
                session,
                pStrings,
                {listStyle: builder.ListStyle.button});
        },

        (session,results)=>{
            const resp = (results.response);
            if(resp)
                { 
                builder.Prompts.text(session, 'Maravilha, digite o **nome da empresa**. Assim, poderemos localizar seu cadastro.',
                {inputHint: builder.InputHint.expectingInput});
                }
            else
                {session.send('Sem problemas. Faremos o cadastro rapidinho agora mesmo.');
                    session.replaceDialog('cadastrar');
                }
        },

        (session,results)=>{
                const empresa = results.response;
                session.userData.company = empresa;
                builder.Prompts.confirm(session, 'Entendi, vc é da empresa **' + empresa + '**',
                {listStyle: builder.ListStyle.button});
        },


        (session, results)=>{

                if(results.response){
                    session.send('Espera um pouquinho. Vou ali localizar seu cadastro **rapidinho**');
                    nameToQuery = session.userData.company;
                    qDocument(data);

                    var msgReceived = '';

                    setTimeout(()=>{
                        msgReceived = logResponse();
                    }, 6000);
                    
                    setTimeout(()=>{
                        session.send('Espera só mais um pouco. Meu HD está meio fragmentado hoje');
                    }, 4000);

                    setTimeout(()=>{
                        if(msgReceived){
                            const msge = msgReceived;
                            builder.Prompts.confirm(session, 'Os seus dados são estes: **'+ msge + '**',
                            {listStyle: builder.ListStyle.button});
                        }
                        else{
                            session.send('Desculpe, não localizei seu cadastro');
                            session.replaceDialog('faturamento');
                        }
                    }, 6500);
                }
                else
                {
                    session.send('Foi mal.Meu chip está meio cansado hoje. Vamos recomeçar');
                    session.replaceDialog('faturamento');
                }
            },
            (session, results)=>{
                const rslt = results.response;
                if(rslt){
                    session.send('Perfeito. Vamos emitir a nota');
                }
                else
                {
                    session.send('Eita. Não localizei seu cadastro...');
                }


            }
   ]);

////FORMFLOW//////


    const dialogName = 'form';
    const questoes = path.join(__dirname,'cadastro.json');
    
    formFlowBuilder.executeFormFlow(
        questoes,
        bot,
        dialogName,
        (err, response)=>{
            if(err)
                return console.log(err);
        
            bot.dialog('cadastrar',[
                (session)=>{ session.beginDialog(dialogName);},
                (session,results)=>{

                    var nomeF = results.nomeF;
                    var cnpj = results.cnpj;
                    var valor = results.valor;
                    var venc = results.venc;
                    var email = results.contact;

                    const question = 'Veja se está tudo certinho: \n Nome Fantasia: **'+ nomeF + '** \n cnpj: **'+ cnpj + '** \n Valor: **'+ valor + '** \n Vencimento: **'+ venc + '** Email: ' + email + '**';
                    builder.Prompts.confirm(session,question,
                        {listStyle: builder.ListStyle.button});
                },
            (session,results)=>{
                if(results.response){
                    var nomeF = String(results.nomeF);
                    var cnpj = String(results.cnpj);
                    var valor = String(results.valor);
                    var venc = String(results.venc);
                    var email = String(results.contact);

                    var document = {
                        nomeFantasia:nomeF, 
                        cnpj:cnpj,
                        valor:valor,
                        dataVencimento:venc,
                        emailResp:email
                    };
                    
                    session.send('Guenta aí. Estou fazendo o cadastro');
                    var resultado = iDocument(document);
                    setTimeOut(()=>{
                        if(resultado){
                            session.send('Maravilha. Agora só falta emitir a nota');
                           }
                           else{ 
                                 session.send('Ai, cacilda. Deu erro no servidor.');
                                 session.replaceDialog('cadastrar');
                           }
                     },3000);

                }
                else {
                    session.send('Ai...Não consegui cadastrar. Por favor, tenha paciência, eu preciso desse emprego.');
                    session.replaceDialog('cadastrar');
                }
                    
                }
            ]);
        }
    );




////FORMFLOW//////





const animCard = (session,titleX,messageX) =>{ 
        var tx = titleX;
        var teX = messageX;
        return new builder.AnimationCard(session)
        .title(tx +'???')
        .text(teX)
        .media([{url: 'https://media.giphy.com/media/5cD5KjEtkstdC/giphy.gif'}]);
        // .autostart(true);
    };

intents.matches('Xingamento', (session, args) => {
        mensagem = respostas.Respostas('xingamento', session.message.text);
        const messageX = mensagem;
        const xcard =  animCard(session,session.message.text,messageX);
        const respX = new builder.Message(session).addAttachment(xcard);
        session.send(respX);
        return;
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
            session.send(respQnA);
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


intents.matches('portfolio', (session,args)=>{

    var pCard = new builder.Message(session);
        pCard.attachmentLayout(builder.AttachmentLayout.carousel);
        pCard.attachments([
            new builder.HeroCard(session)
                .title('portfolio', args)
                .images([builder.CardImage.create(session,'http://www.tropicalcyborg.com/images/hmd.svg?crc=7237507')])
                .subtitle('experiências')
                .buttons([builder.CardAction.openUrl(session, 'http://tropicalcyborg.com/portfolio.html', 'clique para ver')]),
            new builder.HeroCard(session)
                .title('portfolio')
                .images([builder.CardImage.create(session,'http://www.tropicalcyborg.com/images/artwork-1.svg?crc=177296991')])
                .subtitle('videos 360')
                .buttons([ builder.CardAction.openUrl(session, 'http://www.tropicalcyborg.com/portfolio360.html', 'clique para ver')]),
            new builder.HeroCard(session)
                .title('portfolio')
                .images([builder.CardImage.create(session,'http://www.tropicalcyborg.com/images/i_artboard-1.png?crc=3948345849')])
                .subtitle('dança + tech')
                .buttons([ builder.CardAction.openUrl(session, 'http://www.tropicalcyborg.com/portfoliodanca.html', 'clique para ver')])
        ]);

        session.send(pCard);
        return;

    // mensagem = respostas.Respostas('portfolio', session.message.text);
    });

  
function FormatCard(mensagem){

    const resposta = String(mensagem);
    const partesDaResposta = resposta.split('%');
    const [titulo, imagem, descricao, url] = partesDaResposta;
    return partesDaResposta;

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
                .images([builder.CardImage.create(session, "http://www.tropicalcyborg.com/images/tropical3d.png?crc=224059060")])
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
bot.library(qnaMakerTools.createLibrary());

////QNA/////
