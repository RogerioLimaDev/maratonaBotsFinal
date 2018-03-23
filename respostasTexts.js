var cumprimento = {

    1: "Opa! Beleza? O que quer saber sobre a Tropical Cyborg?",
    2: "Oi! Sou o Tropical CyBot e estou aqui para tirar suas dúvidas de Realidade Virtual e aumentada",
    3:"E aê? Como posso te ajudar"
};

var xingamento = {
    1: "**" + textoMsg + "\**??? Epa! Olha essa boca!...",
    2: "**" + textoMsg + "\**??? Você não tem educação, não?",
    3: "**" + textoMsg + "\**??? Seu IP foi registrado. Vou mandar meu primo Robocop aí te dar uma lição."
};

var Default = {
        
    1: 'Não entendi o que vc quis dizer com **' + textoMsg +'\** . Minha especialidade é responder sobre realidade aumentada e virtual' ,
    2: 'Poutz! Não entendi o que vc quis dizer com **'+ textoMsg +'\**',
    3: 'Eita... agora vc me pegou. Ainda não aprendi como responder a **'+ textoMsg +'\** '
};


module.exports = cumprimento;
module.exports = xingamento;
module.exports = Default;