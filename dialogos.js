
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
            oculus:'Oculus Rift%http://s2.glbimg.com/N5xZWxsEeHTKkqWcaHtjYrDtMpc=/0x0:1160x653/695x391/s.glbimg.com/po/tt2/f/original/2015/08/17/2882181-oculus-touch-2-1434465834-ej3p-full-width-inline.jpg% É o modelo topo de linha da marca que popularizou a realidade virtual. Começou como um projeto de financiamento coletivo e acabou comprado pelo Facebook. O óculos Gear VR da Samsung tem a mesma tecnologia porém menos recursos.',
            gearvr:'Gear VR % http://images.samsung.com/is/image/samsung/br-gear-vr-sm-r325nzvazto-lperspectiveblack-75797458?$PD_GALLERY_JPG$ %  Óculos de realidade virtual que funciona com alguns modelos de celular Samsung. É o dispositivo de realidade virtual com a maior base instalada no mundo e o que oferece a melhor relação custo/qualidade.',
            cardboard:'Cardboard%https://www.techgirl.nl/wp-content/uploads/2015/05/Screen-Shot-2015-05-16-at-12.07.46-AM-750x400.png%O óculos cardboard foi desenvolvido de forma open source pelo Google como um dispositivo acessível e de baixo custo para visualização de realidade virtual.',
            htc:'HTC Vive%https://www.irishtimes.com/polopoly_fs/1.2977854.1487244851!/image/image.jpg_gen/derivatives/landscape_620/image.jpg%O HTC Vive é um dos óculos de realidade virtual topo de linha produzido pela Valve, empresa conhecida pela produção de videogames e pela plataforma de distribuição online de games Steam.',
            hololens:'resposta sobre hololens',
            windowsmr:'resposta sobre windows mr',
            magic_leap:'resposta sobre magic leap',
            worksense:'resposta sobre DAQRI worksense',
            oculus_go:'resposta sobre oculus go'
        },
        tech:
        {
            virtual:'Realidade Virtual%https://conteudo.imguol.com.br/c/noticias/1b/2017/10/09/mulher-usa-oculos-e-realidade-virtual-1507569900854_300x300.jpg%É fazer um usuário sentir que está em um lugar diferente do que ele está. Para isso, usamos um celular, tablet ou computador e um óculos especial. É chato explicar mas é divertido experimentar.',
            aumentada:'Realidade aumentada%https://abrilexame.files.wordpress.com/2016/09/size_960_16_9_pokemon-go.png?quality=70&strip=info&crop=true&w=680&h=453% É a experiência de visualizar objetos virtuais em um ambiente real. Pode ser experimentada pela camera de um celular ou com os óculos de realidade virtual.',
            mixed:'',
            kinect:'',
            beacons:'',
            chatbot:'',
            360:''
        },
        nomes:
        {
            rogerio:'Rogério Lima é sócio e diretor de criação da Tropical Cyborg. É um dos pioneiros no desenvolvimento de realidade virtual no Brasil',
            tropical:'**Tropical Cyborg** é um estúdio de produção de experiências com novas tecnologias, incluindo **VR, AR, sensores digitais, beacons, etc.** É também o avatar de Rogério Lima nas redes sociais e portais de games online',
            bionikos:'Bionikos é a empresa de Rogério Lima com a coreógrafa Andrea Pivatto especializada em experiências misturando dança e novas tecnologias.'
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
