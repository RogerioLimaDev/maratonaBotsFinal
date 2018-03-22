/*jshint esversion: 6 */

var selecOp = 10;
var ranOp = 0;


//function Respostas(intent, entity){
function Respostas(string,sessionMessage, entity){

var textoMsg = sessionMessage;
var curEntity = String(entity);

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
            if(entity)
            return(RespostasDefinicao(curEntity));
            else
            return(RespostasDefinicao(string));
    }
}

function RespostasDefinicao(curEntity){
    switch(curEntity){

        case 'realidade virtual':
        return('resposta sobre VR');

        case 'virtual':
        return('resposta sobre Virtual');

        case 'rift':
        return('aqui vai uma resposta sobre rift');

        case 'oculus rift':
        return('aqui vai uma resposta sobre oculus rift');

        case 'cardboard':
        return('aqui vai uma resposta sobre o cardboard');
        
        case 'tropical':
        return('resposta sobre Tropical Cyborg');

        case 'realidade aumentada':
        return('reposta sobre Realidade aumentada');

        case 'aumentada':
        return('resposta sobre aumentada');

        default:
        return('Esta é apenas uma reposta padrão');
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