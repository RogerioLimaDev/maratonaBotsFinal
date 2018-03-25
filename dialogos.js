
function Textos (textoMsg)
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

        },
        hmd:
        {
            oculus:'Resposta sobre oculus dos dialogos',
            gearvr:'Resposta sobre gear vr',
            cardboard:'resposta sobre cardboard',
            htc:'resposta sobre htc',
            hololens:'resposta sobre hololens',
            windowsmr:'resposta sobre windows mr',
            magic_leap:'resposta sobre magic leap',
            worksense:'resposta sobre DAQRI worksense',
            oculus_go:'resposta sobre oculus go'
        },
        tech:
        {
            virtual:'Realidade \nVirtual%https://conteudo.imguol.com.br/c/noticias/1b/2017/10/09/mulher-usa-oculos-e-realidade-virtual-1507569900854_300x300.jpg%É\n fazer um usuário sentir que está em um lugar diferente do que ele está.\n Para isso, usamos um celular, tablet ou computador e um óculos \nespecial. É chato explicar mas é divertido experimentar.',
            aumentada:'',
            mista:'',
            kinect:'',
            beacons:'',
            chatbot:'',
            360:''
        },
        nomes:
        {
            rogerio:'',
            tropical:'',
            bionikos:''
        },
        pessoais:
        {
            0: 'Não leva a mal mas estou em hora de expediente, não posso falar de assuntos pessoais.',
            1: 'Desculpa aê, mas agora não posso falar disso',
            2: 'Foi mal mas se eu ficar falando disso aqui,posso acabar perdendo o emprego'
        },

        orcamento:
        {
            0:'Orçamentos%https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/118/grinning-face_1f600.png%Então manda um email pra gente ou liga para o Rogério Lima pelo telefone +55 11 99137-8591%mailto:contact@tropicalcyborg.com'
        },
        onde:
        {
            0:'Estamos em São Paulo mas trabalhamos remotamente para qualquer lugar do mundo.'
        },
        quem:
        {},
        compras:
        {},
        comparacao:
        {},
        portfolio:
        {
            0: 'Será um prazer! **(carrousel com trabalhos)**'
        }
    };

    return(dialogos);
}

module.exports = Textos;
