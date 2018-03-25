/*jshint esversion: 6 */

var selecOp = 0;
var ranOp = 0;
var curType = '';
var curEntity = '';
var dialogos = require('./dialogos');

function Respostas(string,sessionMessage, entity, tipo){

    var textoMsg = sessionMessage;
    var curEntity = entity;
    var curType = String(tipo);

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

        case 'definicao':
            if(curType != null)
                switch(curType)
                {
                    case 'hmd':
                        switch(curEntity){

                            case 'oculus':
                            msg = dialogos(textoMsg).hmd.oculus;
                            return (msg);
                    
                            case 'hololens':
                            msg =dialogos(textoMsg).hmd.hololens;
                            return (msg);
                    
                            case 'gearvr':
                            msg =dialogos(textoMsg).hmd.gearvr;
                            return (msg);
                    
                            case 'magic leap':
                            msg = dialogos(textoMsg).hmd.magic_leap;
                            return (msg);
                    
                            case 'cardboard':
                            msg = dialogos(textoMsg).hmd.cardboard;
                            return (msg);

                            case 'htc':
                            msg = dialogos(textoMsg).hmd.htc;
                            return (msg);
                        }
                    break;
            
                    case 'name':
                        switch(curEntity){

                            case 'rogerio':
                            msg = dialogos(textoMsg).nomes.rogerio;
                            return (msg);

                            case 'tropical':
                            msg = dialogos(textoMsg).nomes.tropical;
                            return (msg);

                            case 'Bionikos':
                            msg = dialogos(textoMsg).nomes.bionikos;
                            return (msg); 
                                                       
                            default:
                            return('Esta é apenas uma reposta padrão de nomes');
                        }
                    break;
                                   
                    case 'tech':
                        switch(curEntity){

                            case 'aumentada':
                            msg = dialogos(textoMsg).tech.aumentada;
                            return (msg);

                            case 'virtual':
                            msg = dialogos(textoMsg).tech.virtual;
                            return (msg);

                            case 'kinect':
                            msg = dialogos(textoMsg).tech.kinect;
                            return (msg);

                            case 'beacons':
                            msg = dialogos(textoMsg).tech.beacons;
                            return (msg);

                            case 'mixed':
                            msg = dialogos(textoMsg).tech.mixed;
                            return (msg);
                            
                            
                            case 'chatbot':
                            msg = dialogos(textoMsg).tech.chatbots;
                            return (msg);

                            default:
                            return('Esta é apenas uma reposta padrão de tecnologia');
                        }
                    break;
            
                    default:
                    return('Esta é apenas uma reposta padrão qualquer');
                }
            break;
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

    var teste = 'Recebi aqui: ' + Respostas('definicao');
    console.log(teste);
    return(teste);

}

//module.exports.Respostas();
exports.SelectRandomNumber = SelectRandomNumber;
exports.Respostas = Respostas;
exports.Teste = Teste;