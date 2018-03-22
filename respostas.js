/*jshint esversion: 6 */

var selecOp = 10;
var selected = Math.random();
var ranOp = 0;

//function Respostas(intent, entity){
function Respostas(string,sessionMessage){

var textoMsg = sessionMessage;

var xingamento = [
        "Epa! Olha a boca, rapaz!...",
        "Sua mãe não te deu educação, não?",
        "Seu IP foi registrado. Vou mandar o Robocop aí te dar uma lição."
        ];

var Default = [
        
        'Você pode repetir a pergunta? Não entendi o que vc quis dizer com' + textoMsg +'.' ,
        ' Poutz! Não entendi o que vc quis dizer com **'+ textoMsg +'\**',
        'Eita... agora vc me pegou. Ainda não aprendi como responder a **'+ textoMsg +'\** '
        ];

    switch(string){

        case 'xingamento':
            ranOp = SelectRandomNumber();
            return(xingamento[ranOp]);

        case 'None' :
            ranOp = SelectRandomNumber();
            return(Default[ranOp]);
    }
}


function SelectRandomNumber(){

    var teste = 'testando';

    if (selected <= 0.33){ selecOp = 0;}
    else if (selected <= 0.66 && selected >0.33){ selecOp = 1.0;}
    else { selecOp = 2.0;}

    return(selecOp);

}

//module.exports.Respostas();
exports.SelectRandomNumber = SelectRandomNumber;
exports.Respostas = Respostas;