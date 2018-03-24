
    var default = [
            
        'Não entendi o que vc quis dizer com **' + textoMsg +'\** . Minha especialidade é responder sobre realidade aumentada e virtual' ,
        'Poutz! Não entendi o que vc quis dizer com **'+ textoMsg +'\**',
        'Eita... agora vc me pegou. Ainda não aprendi como responder a **'+ textoMsg +'\** '
        ];

        var cumprimento = [

            "Opa! Beleza? O que quer saber sobre a **Tropical Cyborg**?",
            "Oi! Sou o **Tropical CyBot** e gosto de falar de Realidade Virtual e aumentada",
            "E aê? Como posso te ajudar"
        ];
        
        var xingamento = [
                "**" + textoMsg + "\**??? Epa! Olha a boca!...",
                "**" + textoMsg + "\**??? Você não tem educação, não?",
                "**" + textoMsg + "\**??? Seu IP foi registrado. Meu primo Robocop vai aí te dar uma lição."
        ];
        


function Textos ()
{

    var dialogos = {

        cumprimento:
        {   
            0:'Opa! Beleza? O que quer saber sobre a **Tropical Cyborg**?',
            1:'Oi! Sou o **Tropical CyBot** e gosto de falar de Realidade Virtual e aumentada',
            2:'E aê? Tudo certinho? Como posso te ajudar?'
        },
        xingamento:
        {
            0:"**" + textoMsg + "\**??? Epa! Olha a boca!...",
            1:"**" + textoMsg + "\**??? Você não tem educação, não?",
            2:"**" + textoMsg + "\**??? Seu IP foi registrado. Meu primo Robocop vai aí te dar uma lição."
        },
        default:
        {
            0:'Não entendi o que vc quis dizer com **' + textoMsg +'\** . Minha especialidade é responder sobre realidade aumentada e virtual' ,
            1:'Poutz! Não entendi o que vc quis dizer com **'+ textoMsg +'\**',
            2:'Eita... agora vc me pegou. Ainda não aprendi como responder a **'+ textoMsg +'\** '

        }
    };

    return(dialogos);
}

module.exports = Textos;
