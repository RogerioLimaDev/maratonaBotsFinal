/*jshint esversion: 6 */

var selecOp = 0;
var ranOp = 0;

function Respostas(string,sessionMessage, entity, type){

var textoMsg = sessionMessage;
var curEntity = String(entity);
var curType = String(type);

var cumprimento = [

    "Opa! Beleza? O que quer saber sobre a Tropical Cyborg?",
    "Oi! Sou o Tropical Cyborg e estou aqui para tirar suas dúvidas de Realidade Virtual e aumentada",
    "E aê? Como posso te ajudar"
];

var xingamento = [
        "**" + textoMsg + "\**??? Epa! Olha a boca, rapaz!...",
        "**" + textoMsg + "\**??? Sua mãe não te deu educação, não?",
        "**" + textoMsg + "\**??? Seu IP foi registrado. Vou mandar o Robocop aí te dar uma lição."
        ];

var Default = [
        
        'Não entendi o que vc quis dizer com **' + textoMsg +'\** . Minha especialidade é responder sobre realidade aumentada e virtual' ,
        ' Poutz! Não entendi o que vc quis dizer com **'+ textoMsg +'\**',
        'Eita... agora vc me pegou. Ainda não aprendi como responder a **'+ textoMsg +'\** '
        ];

    switch(string){

        case 'xingamento':
            ranOp = SelectRandomNumber();
            return(xingamento[ranOp]);

        case 'cumprimento':
            ranOp = SelectRandomNumber();
            return(cumprimento[ranOp]);

        case 'None' :
            ranOp = SelectRandomNumber();
            return(Default[ranOp]);

        case 'definicao':
            SelectType(curType);
            break;
    }
}

function SelectType(curType)
{
    switch(curType)
    {
        case 'hmd':
        RespostasHMD(curEntity);
        break;

        case 'name':
        RespostasNomes(curEntity);
        break;

        case 'tech':
        RespostasTech(curEntity);
        break;

        default:
        return('Esta é apenas uma reposta padrão qualquer');
    }
}

function RespostasHMD(curEntity){

    switch(curEntity){

        case 'oculus':
        return('resposta sobre oculus rift');

        case 'holoens':
        return('resposta sobre Microsoft Hololens');

        case 'gearvr':
        return('aqui vai uma resposta sobre o Gear VR');

        case 'magic leap':
        return('aqui vai uma resposta sobre o Magic Leap');

        case 'cardboard':
        return('aqui vai uma resposta sobre o cardboard');
        
        default:
        return('Esta é apenas uma reposta padrão de hmd');
    }
}

function RespostasNomes(curEntity){

    switch(curEntity){

        case 'rogerio':
        return('resposta sobre Rogério Lima');

        case 'tropical':
        return('resposta sobre Tropical Cyborg');

        case 'Bionikos':
        return('aqui vai uma resposta sobre a Bionikos');
        
        default:
        return('Esta é apenas uma reposta padrão de nomes');
    }
}

function RespostasTech(curEntity){

    switch(curEntity){

        case 'aumentada':
        return('resposta sobre realidade aumentada');

        case 'virtual':
        return('resposta sobre realidade virtual');

        case 'kinect':
        return('aqui vai uma resposta sobre o sensor kinect');

        case 'beacons':
        return('aqui vai uma resposta sobre beacons');

        case 'mixed':
        return('resposta sobre mixed reality');

        case 'chatbot':
        return('resposta sobre chatbots');
        
        default:
        return('Esta é apenas uma reposta padrão de tecnologia');
    }
}

function SelectRandomNumber(){

    var  selected = Math.random();

    if (selected <= 0.33){ selecOp = 0;}
    else if (selected <= 0.66 && selected >0.33){ selecOp = 1.0;}
    else { selecOp = 2.0;}

    return(selecOp);

}

//module.exports.Respostas();
exports.SelectRandomNumber = SelectRandomNumber;
exports.Respostas = Respostas;