/*jshint esversion: 6 */

var selecOp = 0;
var ranOp = 0;
var curType = '';
var curEntity = '';
var dialogos = require('./dialogos');

function Respostas(string,sessionMessage, entity, tipo){

    var textoMsg = sessionMessage;
    curEntity = String(entity);
    curType = String(tipo);

    switch(string){

        case 'xingamento':
            ranOp = SelectRandomNumber();
            return(dialogos(textoMsg).xingamento[ranOp]);

        case 'cumprimento':
            ranOp = SelectRandomNumber();
            return(dialogos(textoMsg).cumprimento[ranOp]);

        case 'None' :
            ranOp = SelectRandomNumber();
            return(dialogos(textoMsg).default[ranOp]);

        case 'definicao':
            if(curType != null)
                switch(curType)
                {
                    case 'hmd':
                        return(RespostasHMD());
            
                    case 'name':
                        return(RespostasNomes());
                        
            
                    case 'tech':
                        return(RespostasTech());
            
                    default:
                    return('Esta é apenas uma reposta padrão qualquer');
                }
            break;
        
        case 'pessoais':
            ranOp = SelectRandomNumber();
            return(dialogos(textoMsg).pessoais[ranOp]);

        case 'orcamento':
            return(dialogos(textoMsg).orcamento[0]);

        case 'onde':
            return(dialogos(textoMsg).onde[0]);

        case 'quem':
            return(dialogos(textoMsg).quem[0]);

        case 'compras':
            return(dialogos(textoMsg).compras[0]);

        case 'comparacao':
            return(dialogos(textoMsg).comparacao[0]);

        case 'portfolio':
            return(dialogos(textoMsg).portfolio[0]);
    }
}


function RespostasHMD(){

    switch(curEntity){

        case 'oculus':
        return(dialogos(textoMsg).hmd.oculus);

        case 'hololens':
        return(dialogos(textoMsg).hmd.hololens);

        case 'gearvr':
        return(dialogos(textoMsg).hmd.gearvr);

        case 'magic leap':
        return(dialogos(textoMsg).hmd.magic_leap);

        case 'cardboard':
        return(dialogos(textoMsg).hmd.cardboard);
        
        default:
        return('Esta é apenas uma reposta padrão de hmd');
    }
}

function RespostasNomes(){

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

function RespostasTech(){

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

function Teste (){

    var teste = dialogos().default[1];
    console.log(teste);

}

//module.exports.Respostas();
exports.SelectRandomNumber = SelectRandomNumber;
exports.Respostas = Respostas;
exports.Teste = Teste;