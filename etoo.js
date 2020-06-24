const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const weather = require('weather-js');
const moment = require("moment");
moment.locale('pt-BR') 


client.on("ready", () => {

    console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);


    var tabela = [
        {name: 'Amo Meu Criador!', type: 'PLAYING'},
        {name: 'Etoo No Topo!', type: 'LISTENING'},
        {name: 'Terminamos Death Note :(', type: 'WATCHING'},
        {name: 'Me adicione em seu servidor!', type: 'PLAYING'},
        {name: 'Etoo Divaa!', type: 'LISTENING'},
        {name: 'Meu prefixo: e!', type: 'LISTENING'},
        {name: 'Sendo Desenvolvida.', type: 'LISTENING'},
        {name: '12/06 Meu aniversário!', type: 'LISTENING'},
        {name: 'Tudo Depende De Você!', type: 'LISTENING'},
        {name: 'O Byel Gostosuh UvU', type: 'WATCHING'},
        {name: 'Speed flows do Lilo', type: 'STREAMING'},
        {name: 'Drink no copo do Pai', type: 'LISTENING'},
    ];


    function setStatus() {
        var altstatus = tabela[Math.floor(Math.random() * tabela.length)]
        client.user.setPresence({game: altstatus})
    }
    setStatus();
    setInterval(() => setStatus(), 5000)

    
});  

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();
    
//COMANDO PING//

    if(comando === "ping") {
        const m = await message.channel.send("Calculando...");
        m.edit(`A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. Já a API é ${Math.round(client.ping)}ms`);
    
    }

//COMANDO UPTIME//

    if(comando === "time") {
        let dias = 0;
        let semanas = 0;

        let uptime = ``;
        let totalSegundos = (client.uptime / 1000);
        let horas = Math.floor(totalSegundos / 3600);
        totalSegundos %= 3600;
        let minutos = Math.floor(totalSegundos / 60);
        let segundos = Math.floor(totalSegundos % 60);

        if (horas > 23){
            dias = dias + 1;
            horas = 0;
    } 
    
    if (dias == 7) {
        dias = 0;
        semanas = semanas + 1;
        }

        if (semanas > 0){
            uptime += `${semanas} semanas, `;
        }

        if (minutos > 60){
            minutos = 0;
        }
    
        uptime += `**${dias} dias** **${horas} horas** **${minutos} minutos** **${segundos} segundos**`;
    
        message.channel.send(`:sleeping: Estou sem dormir faz: ${uptime}`);
   }
    
//COMANDO ROLETA RUSSA//

   if(comando === "roleta") {
   var random = Math.floor(Math.random() * (5 - 2) + 2);
    if (random === 3){
 
        let embed = new Discord.RichEmbed()
 
        .setDescription(`Rodou o cartucho e vc sobreviveu!`)
        .setColor('RANDOM')
        .setFooter(`A bala ficou no cartucho ${Math.round(random)}`)
 
        message.reply(embed)
    }

    else{
        let embed2 = new Discord.RichEmbed()
 
        .setDescription(`Rodou o cartucho e vc morreu!`)
        .setColor('RANDOM')
        .setFooter(`A bala estava no cartucho ${Math.round(random)}`)
 
        message.reply(embed2)
    }
}

//COMANDO ICONE DO SERVIDOR//

if(comando === "icon") {
    let embed = new Discord.RichEmbed()
 
    .setColor('PINK')
    .setTitle(`${message.guild.name}`)
    .setDescription("[Link de Download](" + message.guild.iconURL + ")")
    .setImage(message.guild.iconURL)
 
    message.reply(embed)
 
}
if(comando === "avatar") {
    let member = message.mentions.users.first() || message.author;
 
    let embed = new Discord.RichEmbed()
 
    .setColor('PINK')
    .setTitle(`${message.author.username}`)
    .setDescription("[Clique aqui para Baixar](" + member.displayAvatarURL + ")")
    .setImage(member.displayAvatarURL)
 
    message.reply(embed)

}

//COMANDO ANUNCIO//

if(comando === "anuncio") {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`vc nao possui permissao.`)
 
    message.channel.send(`Em qual canal vc deseja iniciar?`).then(msg => {
        let cp = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
        .on('collect', c => {
            canal = c.mentions.channels.first()
            if (!canal) {
                message.reply(`mencione um canal!`)
            } else {
                message.channel.send(`Qual a mensagem desse anuncio?`).then(msg2 => {
                    let cl = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
                    .on('collect', c => {
                        desc = c.content
                   
                        message.channel.send(`Qual o titulo?`).then(msg3 => {
                            let ck = message.channel.createMessageCollector(x => x.author.id == message.author.id, {max: 1})
                            .on('collect', c => {
                                title = c.content
 
                                message.channel.send(`anuncio enviado ao canal ${canal} com sucesso`)
 
                                let embed = new Discord.RichEmbed()
 
                                .setColor('GOLD')
                                .setFooter(`Comando efetuado por: ${message.author.username}`, message.author.avatarURL)
                                .setTitle(title)
                                .setDescription(desc)
 
                                canal.send(`@everyone`, embed)
 
                            })
                        })
                    })
                })
            }
        })
    })
 
}

//BLOQUEADOR DE COMANDOS EM CHAT//

if (message.channel.id === "719958854145671228") {
    if (message.content.startsWith(`${config.prefix}`)) {
        return message.reply(`Meus comandos são bloqueados nesse chat!`)
    }
}

//COMANDO DE INFO DO BOT//

if(comando === "botinfo") {
    var adicioneeu = ('[Adicione-me](https://discord.com/oauth2/authorize?client_id=720794048029523999&scope=bot&permissions=8)')
    const inline = true
    const botAvatar = client.user.displayAvatarURL
    const date = client.user.createdAt
    const userName = client.user.username
    const servsize = client.guilds.size
    const usersize = client.users.size
    const status = {
      online: '`🟢` Online',
      offline: '`⚫` Offline'
    }
    const embed = new Discord.RichEmbed()
    .setColor(client.displayHexColor === '#000000' ? '#ffffff' : client.displayHexColor)
    .setThumbnail(botAvatar)
    .setAuthor('🤖 Minhas informações')
    .addField('**Meu nick**', userName)
    .addField('**Meu ID**', client.user.id)
    .addField('**Servidores**', `🛡 ${servsize}`, true)
    .addField('**Usuários**', `${usersize}`, inline)
    .addField('**Criado em**', formatDate('DD/MM/YYYY, ás: mm:ss', date))
    .addField('**Desenvolvedores**', `✨Opressorinho✨#1052`)
    .addField('**Convite**', `${adicioneeu}`)
    .setFooter(`2020 © ${client.user.username}.`)
    .setTimestamp()

    if (client.user.presence.status) {
        embed.addField(
          '**Status**',
          `${status[client.user.presence.status]}`,
          inline,
          true
        )
      }

      message.channel.send(embed)
    }
    function formatDate (template, date) {
        var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
        date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
        return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
          return template.split(specs[i]).join(item)
        }, template)
      }


      //COMANDO DE BAN//

      if(comando === "ban") {
        let erro = new Discord.RichEmbed()

        .setTitle(`❓ INFORMAÇÃO DO COMANDO`)
        .setDescription(`\`ban\` - Aplique um banimento`)
        .addField(`:hammer: **Uso**`, `\`e!ban @user <motivo>\``)
        .addField(`:book: **Exemplo**`, `\`e!ban @Etoo por ser linda dms\``)
        .addField(`:bookmark: **Permissão**`, `\`BAN_MEMBERS\``)
        .setColor('#8c0046')
             // Puxando o usuário que o autor irá mencionar
             var membro = message.mentions.members.first() || message.guild.members.get(args[0]); // Puxando do argumento zero (0) 
             if (!membro) return message.channel.send(erro); // Caso o autor esqueça de mencionar o membro, iremos enviar a embed de explicação
             if (membro === message.member) return message.reply(`você não pode se banir!`) // Caso o autor tente mencionar ele mesmo
             
             var motivo = args.slice(1).join(" "); // Agora, o motivo do banimento
             if (!motivo) return message.channel.send(erro); // Caso ele não escreva o motivo, iremos enviar a embed de explicação
             // Requisitando a permissão *BAN_MEMBERS* ou *BANIR_MEMBROS*
             if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`esse comando necessita da permissão: **BAN_MEMBERS**`)
        
          // Agora, a embed de confirmação
             let banembed = new Discord.RichEmbed()
      
             .setTitle(`<:thinking:722152321743585352> Confirmação`)
             .setDescription(`**${message.author.username}**, você realmente deseja aplicar esse banimento em **${membro.user.username}**?`)
             .setColor('AQUA')
             .setFooter(`Clique no emoji para confirmar ou espere 30s para cancelar!`)
      
             message.channel.send(banembed).then(msg => { // E, como quase todo arquivo, usaremos a função 'then', nomeada de 'msg'
               msg.react("👍"); // Reagindo com o emoji de legal
              // Criando um filtro, verificando quem clicou no emoji, e vendo se o ID do mesmo é compativel com o do autor
               let filtro = (reaction, usuario) => reaction.emoji.name === "👍" && usuario.id === message.author.id; 
               let coletor = msg.createReactionCollector(filtro, {max: 1, time: 30000}); // Um tempo limite de 30s
      
               coletor.on("collect", em => { // Com o coletor, iremos fazer a ação
                   em.remove(message.author.id); // Removendo o clique do usuário no emoji
                   let embed = new Discord.RichEmbed()
      
                   .setTitle(`:hammer: Ban`)
                   .setDescription(`:bust_in_silhouette: » Membro: **${membro.user.tag}**\n\n:police_officer: » Responsável: **${message.author.tag}**\n\n:notepad_spiral: » Motivo: ${motivo}`)
                   .setColor('#ff5d52')
                   var canal = client.channels.get('721799683147694241') // O canal para enviarmos a embed do ban
                    canal.send(embed) // Enviando no canal a embed
                    membro.ban();  // Banindo o usuário mencionado
               });
              });
      }
      
    //COMANDO DE BRONCA

    if(comando === "warn") {
        var canal = client.channels.get('721799683147694241'); // Puxando o canal aonde iremos enviar que o usuário tomou um warn
   // Requisitando a permissão de Administrador
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`apenas administradores podem utilizar esse comando!`)
    // Puxando o usuário que iremos dar o Warn
    var membro = message.mentions.members.first() || message.guild.members.get(args[0]); // puxando do argumento zero (0)
    if (!membro) return message.reply(`mencione um usuário!`) // caso ele não mencione ninguém
   if (membro === message.member) return message.reply(`mencione alguém que não seja você mesmo!`) // caso ele mencione a si memso

    var motivo = args.slice(1).join(' '); // Puxando o motivo do warn
    if (!motivo) return message.reply(`escreva alguma coisa para esse warn`); // Caso ele não escreva o motivo

// Embed do Warn, enviado no canal 
    let embedi = new Discord.RichEmbed()

    .setTitle(`:hammer: Warn`)
    .setDescription(`**${membro.user.username}** tomou uma **Bronca** de **${message.author.username}**!\n\n<:DL_stafftools:692105688024875028> » Motivo: ${motivo}`)
 // Enviando no privado do usuário
    let embed = new Discord.RichEmbed()

    .setTitle(`:warning: Warn`)
    .setDescription(`${motivo}`)
    .setFooter(`Staff responsável: ${message.author.username}`)

    membro.send(embed) // Enviando pro usuário
    canal.send(embedi) // Enviando no canal
    message.reply(`bronca enviada com sucesso! :thumbsup:`)
}
    
   //COMANDO MENSAGEM NA DM

   if(comando === "dm") {
       // Requisitando a permissão Administrador (Pode colocar outra, mas prefiro essa)
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`apenas administradores podem utilizar esse comando!`)
    // Agora, iremos criar a famosa função 'then'
     message.channel.send(`Mencione o membro para quem eu devo enviar.`).then(m => { // Nesse caso, nomeada de m 
        let ck = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1}) // Vamos verificar se o ID do usuário que clicou é compativel com o do autor
        .on('collect', c => {
            membro = c.mentions.users.first() // Puxando o usuário que ele irá mencionar
            if (!membro){ // Caso não mencione, iremos retornar com o erro
                message.reply(`mencione um membro!`)  
            } else { // Caso ele mencione, iremos dar continuidade
                message.channel.send(`Qual a mensagem?`).then(m2 => { // E tudo se repete!
                    let cp = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1})
                    .on('collect', c => {
                        mensagem = c.content
                        // Essa é uma parte importante, definindo se o usuário decida enviar em embed ou nãoi
                        message.channel.send(`Deseja que a mensagem seja em uma embed?\n**Com** - Envio em EMBED\n**Sem** - Envio sem EMBED`).then(m3 => {
                            let cd = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1})
                            .on('collect', c => {
                                result = c.content

                                if (result === 'Com'){ // Caso seja "Com", iremos enviar com embed
                                    let embedi = new Discord.RichEmbed()

                                    .setDescription(`${mensagem}`)
                                    .setFooter(`Staff responsável: ${message.author.username}`)
                                    .setColor('#042a59')

                                    membro.send(embedi)
                                    message.reply(`EMBED enviada na **DM** do ${membro} com sucesso!`)
                                } 

                                if (result === 'Sem'){ // Caso ele escreva 'sem' iremos enviar sem
                                    membro.send(`${mensagem}\n\nStaff responsável: \`${message.author.username}\``)
                                    message.reply(`Mensagem enviada na **DM** do ${membro} com sucesso!`)
                                }
                            })
                        })
                    })
                })
            }
        })
    })
}
   
//COMANDO DADO

if(comando === "dado") {
    // puxando um chao, com sistema randomico (de 6 a 1)
    var numero = Math.floor(Math.random() * 6) + 1;

    message.channel.send(`<:game_die:722159296334266389> Você jogou o dado e... Caiu em: \`${numero}\``)
}

//COMANDO DE PERGUNTA

if(comando === "perguntar") {
    let erro = new Discord.RichEmbed()

    .setTitle(`❓ INFORMAÇÃO DO COMANDO`)
    .setDescription(`\`pergunta\` - Pergunte algo para mim`)
    .addField(`:hammer: **Uso**`, `\`e!pergunta <texto>\``)
    .addField(`:book: **Exemplo**`, `\`e!pergunta <texto>\``)
    .addField(`:bookmark: **Permissão**`, `\`Nenhuma\``)
    .setColor('#8c0046') 
  
      var replies = ["Sim", "Não", "Talvez", "Provavelmente Sim", "Provavelmente Não", "Sei-lá", "Melhor Não responder isso", "Nem eu sei", "Pergunta Pra Deus", "Só sei que eu sei"]; // criando uma 'tabela' com Sim e Não e etc.
      var result = Math.floor((Math.random() * replies.length)); // puxando aquela tabela, vamos criar um sistema random, que pode cair em uma ou outra
      
      var duvida = args.slice(0).join(" "); // aqui, a pergunta do membro, partindo do argumento 0 (!args zero um)
      if (!duvida) return message.reply(erro)
    
      let embed = new Discord.RichEmbed()
      
      .setColor('GOLD')
      .addField(`PERGUNTA`, `${duvida}`)
      .addField(`RESPOSTA`, `${replies [result]}`)
      
      message.channel.send(embed)
  }

  //COMANDO DE CLEAR
  
  if(comando === "clear") {
    let erro = new Discord.RichEmbed()

    .setTitle(`❓ INFORMAÇÃO DO COMANDO`)
    .setDescription(`\`clear\` - Crie um texto com letras grandes`)
    .addField(`:hammer: **Uso**`, `\`e!clear <número de 2 à 100>\``)
    .addField(`:book: **Exemplo**`, `\`e!clear 100\``)
    .addField(`:bookmark: **Permissão**`, `\`MANAGE_MESSAGES\``)
    .setColor('#8c0046')   
  
      if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`você precisa da permissão \`MANAGE_MESSAGES\`.`); // caso o autor não possua a permissão 'GERENCIAR_MENSAGENS', vamos avisar para ele
      let clean = args.slice(0).join(' '); // puxando uma quantidade de numero, partindo dos argumentos zero
   // caso o membro bote um numero menor que 2, ou maior que 100, pediremos um numero acima
      if (clean < 2 || clean > 100) return message.reply(erro)
      // caso o membro não escreva um numero
      if (args.length === 0) return message.reply(erro) 
      try { // utilizando a function 'try', traduzindo: tentar
          message.channel.bulkDelete(clean) // tentaremos deletar a quantia que o membro pediu
          // enviando uma embed
          let embed = new Discord.RichEmbed()
  
          .setTitle(`:broom: LIMPEZA`)
          .setDescription(`Limpei um total de \`${clean}\` mensagens.`)
          .setColor('#0000')
          .setFooter(`Responsável: ${message.author.username}`)
  
          message.channel.send(embed)
      } catch(e){ // procurando um erro
          console.log(e); // caso consiga encontrar, daremos o erro
      }
    }

    //COMANDO DE KICK

    if(comando === "kick") {
        let erro = new Discord.RichEmbed()

  .setTitle(`❓ INFORMAÇÃO DO COMANDO`)
  .setDescription(`\`sair\` - Expulse um usuário`)
  .addField(`:hammer: **Uso**`, `\`e!kick @user <motivo>\``)
  .addField(`:book: **Exemplo**`, `\`e!kick @dina lindo de bonito\``)
  .addField(`:bookmark: **Permissão**`, `\`KICK_MEMBERS\``)
  .setColor('#8c0046')
       // Puxando o usuário que o autor irá mencionar
       var membro = message.mentions.members.first() || message.guild.members.get(args[0]); // Puxando do argumento zero (0) 
       if (!membro) return message.channel.send(erro); // Caso o autor esqueça de mencionar o membro, iremos enviar a embed de explicação
       if (membro === message.member) return message.reply(`você não pode se banir!`) // Caso o autor tente mencionar ele mesmo
       
       var motivo = args.slice(1).join(" "); // Agora, o motivo do kick
       if (!motivo) return message.channel.send(erro); // Caso ele não escreva o motivo, iremos enviar a embed de explicação
       // Requisitando a permissão *KICK_MEMBERS* ou *EXPULSAR_MEMBROS*
       if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`esse comando necessita da permissão: **KICK_MEMBERS**`)
 
       let banembed = new Discord.RichEmbed()

       .setTitle(`<:DL_correto:693214719477153813> Confirmação`)
       .setDescription(`**${message.author.username}**, você realmente deseja aplicar esse banimento em **${membro.user.username}**?`)
       .setColor('AQUA')
       .setFooter(`Clique no emoji para confirmar ou espere 30s para cancelar!`)

       message.channel.send(banembed).then(msg => { // E, como quase todo arquivo, usaremos a função 'then', nomeada de 'msg'
         msg.react("👍"); // Reagindo com o emoji de legal
        // Criando um filtro, verificando quem clicou no emoji, e vendo se o ID do mesmo é compativel com o do autor
         let filtro = (reaction, usuario) => reaction.emoji.name === "👍" && usuario.id === message.author.id; 
         let coletor = msg.createReactionCollector(filtro, {max: 1, time: 30000}); // Um tempo limite de 30s

         coletor.on("collect", em => { // Com o coletor, iremos fazer a ação
             em.remove(message.author.id); // Removendo o clique do usuário no emoji
             let embed = new Discord.RichEmbed()

             .setTitle(`:hammer: Kick`)
             .setDescription(`:bust_in_silhouette: » Membro: **${membro.user.tag}**\n\n:police_officer: » Responsável: **${message.author.tag}**\n\n:notepad_spiral: » Motivo: ${motivo}`)
             .setColor('#ff5d52')
             var canal = client.channels.get('721799683147694241') // O canal para enviarmos a embed do kick
              canal.send(embed) // Enviando no canal a embed
              membro.kick();  // Expulsando o usuário mencionado
         });
        });

    }

    //COMANDO SAY

    if(comando === "say") {
        let erro = new Discord.RichEmbed()

        .setTitle(`❓ INFORMAÇÃO DO COMANDO`)
        .setDescription(`\`say\` - Deixe-me replicar o que tu falar`)
        .addField(`:hammer: **Uso**`, `\`e!say <texto>\``)
        .addField(`:book: **Exemplo**`, `\`e!say etoo diva\``)
        .addField(`:bookmark: **Permissão**`, `\`ADMINISTRATOR\``)
        .setColor('#8c0046') 
       // Para não deixarmos que abusem, iremos definir que apenas ADMINISTRADORES podem utilizar
          if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`apenas ADMINISTRADORES podem utilizar esse comando!`)
      
          var fala = args.slice(0).join(' '); // Puxando um argumento, que seria o que o usuário irá escrever
          if (!fala) return message.reply(erro) // Caso ele não escreva, iremos enviar a embed e explicação
        
          let embed = new Discord.RichEmbed() // Enviando em embed
          
          .setDescription(fala)
          .setColor('#00000')
          
          message.channel.send(embed)
          message.delete() // Deletando o pedido do comando (dl.say)
      
      }
    
//COMANDO DE ADDEMOJI

if(comando === "addemoji") {
    let erro = new Discord.RichEmbed()

  .setTitle(`❓ INFORMAÇÃO DO COMANDO`)
  .setDescription(`\`addemoji\` - Adicione um emoji ao servidor de forma mais fácil`)
  .addField(`:hammer: **Uso**`, `\`e!addemoji <nome> <url>\``)
  .addField(`:book: **Exemplo**`, `\`e!addemoji fazeroq <id do emoji>\``)
  .addField(`:bookmark: **Permissão**`, `\`MANAGE_EMOJIS\``)
  .setColor('#8c0046')  
  
  if (!args[0]) return message.channel.send(erro); // Caso o usuário não escreva o nome do emoji, daremos a embed de explicação
  if (!args[1]) return message.channel.send(erro); // Mesma coisa com o URL
    // Caso o usuário não possua a permissão necessária, vamos aviar!
    if (!message.member.hasPermission("MANAGE_EMOJIS")) return message.reply(`apenas usuários com a permissão \`MANAGE_EMOJIS\` podem utilizar!`)
try { // Utilizando a função 'try', literalmente traduzindo: Tentar
    message.guild.createEmoji(args[1], args[0]).then(emoji => { // Criar um emoji com as informações
      message.channel.send(`${emoji} **|** Emoji adicionado com sucesso.`); // Caso não haja erro, iremos criar
    });
  } catch (err) { // Agora, iremos procurar um erro
    message.channel.send(`\`\`\`js\n${err}\`\`\``) // Se acharmos, iremos avisar o que deu
  }
};

//COMANDO CLIMA

if(comando === "clima") {
    weather.find({ // puxando os detalhes do npm
        search: args, // definindo argumentos
        degreeType: 'C' // o detalhe setado: C de Graus Celcius
    }, function (err, result) { // caso ache um erro
        if (err) console.log(err); // enviaremos no console
        // caso o membro não escreva a cidade
        if (!result) return message.reply(`forneça uma cidade. Ex.: \`e!clima rj\``)
        // caso o bot não encontre a cidade
        if (!result[0]) return message.reply(`desculpe, mas não encontrei essa cidade!`)
        let embed = new Discord.RichEmbed()
            .setDescription(`**${result[0].location.name}**`)
            .addField(`**Temperatura**`, `${result[0].current.temperature}°C`)
            .addField(`**Sensação Térmica**`, `${result[0].current.feelslike}°C`)
            .addField(`**Umidade**`, `${result[0].current.humidity}%`)
            .addField(`**Vento**`, `${result[0].current.windspeed}`)
            .setColor("RANDOM")
            .setImage(result[0].current.imageUrl)

        message.channel.send(embed)

    });
};

//COMANDO DE SUGESTÃO

if(comando === "sugestao") {
    let erro = new Discord.RichEmbed()

  .setTitle(`❓ INFORMAÇÃO DO COMANDO`)
  .setDescription(`\`sugestao\` - Deixe uma sugestão para o servidor`)
  .addField(`:hammer: **Uso**`, `\`e!sugestao <sugestão>\``)
  .addField(`:book: **Exemplo**`, `\`e!sugestao adicione emojis animados no servidor\``)
  .addField(`:bookmark: **Permissão**`, `\`Nenhuma\``)
  .setColor('#8c0046')   
 
  var ff = ('[Descrição das reações](https://prnt.sc/rxzb92)') // Uma print, explicando as reações
  var canal = client.channels.get('722171373727907950') // ID do canal aonde iremos enviar a sugestão do usuário
  
  var sugestao = args.slice(0).join(' '); // Uma variável, contendo tudo o que o usuário escrever
  if (!sugestao) { // Caso o usuário não escreva nada, iremos avisar que ele necessita
    return message.reply(`você precisa escrever a sua sugestão!`)
  } else { // Caso ele escreva, iremos enviar a sugestão para o canal
      let embed = new Discord.RichEmbed()
        .setTitle(`SUGESTÃO`)
        .setDescription(` Autor: ${message.author}\n\n Sugestão: ${sugestao}\n\n${ff}`)
        .setColor('RANDOM')
        .setFooter(`Deixe sua opnião sobre, clicando em um dos emojis abaixo!`)
        
        canal.send(embed) // Enviando no canal a embed
        .then(function (msg) { // Abrindo a função 'then' (Famosa aqui haha)
            msg.react("👍"); // Reagindo com os emojis, um legalzin e outro deslike
            msg.react("👎"); 
              message.reply(`sua sugestão foi enviada ao ${canal}!`)
   })  
 }
}

//COMANDO DE USER INFO

if(comando === "userinfo") {
    const status = { 
        online: "Disponivel", 
        idle: "Ausente",       
        dnd: "Ocupado", 
        offline: "Offline" 
    };

    var permissions = []; // deixamos vazio, pois no final do codigo, com toda nossa informacao, vai adicionar sozinho
    // puxando um membro mencionavel || nos argumentos zero || caso nao mencione ninguem, vai ser ele mesmo
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
   // um sistema de cores, para definir em randomico
   const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); }); 
    
   // agora, uma 'tabela' (sim, denovo kk), com todas as permissoes do Discord
    if(message.member.hasPermission("KICK_MEMBERS")){
        permissions.push("Expulsar membros");
    }
    
    if(message.member.hasPermission("BAN_MEMBERS")){
        permissions.push("Banir membros");
    }
    
    if(message.member.hasPermission("ADMINISTRATOR")){
        permissions.push("Administrador");
    }

    if(message.member.hasPermission("MANAGE_MESSAGES")){
        permissions.push("Gerenciar mensagens");
    }
    
    if(message.member.hasPermission("MANAGE_CHANNELS")){
        permissions.push("Gerenciar canais");
    }
  
    if(message.member.hasPermission("MANAGE_NICKNAMES")){
        permissions.push("Gerenciar apelidos");
    }

    if(message.member.hasPermission("MANAGE_ROLES")){
        permissions.push("Gerenciar cargos");
    }

    if(message.member.hasPermission("MANAGE_WEBHOOKS")){
        permissions.push("Gerenciar webhooks");
    }

    if(message.member.hasPermission("MANAGE_EMOJIS")){
        permissions.push("Gerenciar emojis");
    }

    if(permissions.length == 0){ // caso esse membro n possua permissao alguma, vamos deixar a mensagem abaixo
        permissions.push("Nenhuma permissão detectada");
    }

    let embed = new Discord.RichEmbed()
        .setAuthor(`${member.user.username}`, member.user.displayAvatarURL)
        .setColor('#0000')
        .setThumbnail(member.user.displayAvatarURL)
        .addField('Entrou aqui em',`\`${moment(member.joinedAt).format("LLL")}\``)
        .addField("Conta criada em",`\`${moment(member.user.createdAt).format("LLL")}\``, true)
        .addField("Permissões", `${permissions.join(', ')}`)
        .addField(`Cargos [${member.roles.filter(r => r.id !== message.guild.id).map(a => `\`${a.name}\``).length}]`,`${member.roles.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(', ') || "Esse membro não possui cargos."}`, true)

    message.channel.send({embed}).then(msg => { // um evento de reacao para fazermos adicionar outra embed (assim fica legal :3)
        msg.react("👉")
 
        // um filtro puxando as informacoes do membro
        let filtro = (reaction, usuario) => reaction.emoji.name === "👉" && usuario.id === message.author.id;
        // um coletor, puxando do filtro para finalizar
        let coletor = msg.createReactionCollector(filtro);

        coletor.on("collect", c => { // fazendo o evento
            c.remove(message.author.id); // retirando o clique do membro

            let emb = new Discord.RichEmbed()

            .addField("Jogando", `${member.user.presence.game ? `${member.user.presence.game.name}` : "Nenhum jogo detectado"}`)
            .addField("Status",`${status[member.user.presence.status]}`)
            .addField("Tag", `#${member.user.discriminator}`)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor('#0000')

            msg.edit(emb).then(m => { // mais um evento, que caso o membro clique, retornara a primeira embed
                m.react("👈")
                // utilizando o mesmo metodo e filtrando para coletar!
                let filter = (reaction, user) => reaction.emoji.name === "👈" && user.id === message.author.id;
                let coleter = m.createReactionCollector(filter);

                coleter.on("collect", e => {
                    e.remove(message.author.id);
                    m.edit(embed) // editando a embed pro final
             })
           })
        })
    })
}

//COMANDO DE AJUDA

if(comando === "help") {
    message.reply('verifique suas mensagens privadas, (fique com a dm publica.)')

    const embed = new Discord.RichEmbed()
        .setTitle(`CENTRAL DE AJUDA!`)
        .setColor("GOLD")
        .setDescription('Para ter mais acesso e facilidade às nossas dependências, reaja com algum emoji e receba as informações necessárias. \n\n\n🔨 `Moderação` \n🔧 `Uteis` \n💳 `Entretenimento`\n🤖 `Bots`')
        .setImage("https://images8.alphacoders.com/948/thumb-350-948510.png")
        message.author.send({embed}).then(msg => { 
            msg.react('🔨').then(r => { // mod
            msg.react('🔧').then(r => { // uteis
            msg.react('💳').then(r => { // entretenimento
            msg.react('🚀').then(r => { // info
                msg.react('🔙').then(r => { // inicio
            })
            })
        })
    })
            })
   


 // filtros de cada reação, para configurar a informação do autor
 const UtilidadesFilter = (reaction, user) => reaction.emoji.name === '🔧' && user.id === message.author.id;
 const ModeraçãoFilter = (reaction, user) => reaction.emoji.name === '🔨' && user.id === message.author.id;
 const EntretenimentoFilter = (reaction, user) => reaction.emoji.name === '💳' && user.id === message.author.id;
 const BackFilter = (reaction, user) => reaction.emoji.name === '🔙' && user.id === message.author.id;
 // coletores de cada reação, para ver confirmar tal membro 
 const Utilidades = msg.createReactionCollector(UtilidadesFilter);
 const Moderação = msg.createReactionCollector(ModeraçãoFilter);
 const Entretenimento = msg.createReactionCollector(EntretenimentoFilter);
 const Back = msg.createReactionCollector(BackFilter);

 Utilidades.on('collect', r2 => { // criando um evento, caso o membro clique nessa reação, e todos são iguais!
    r2.remove(message.author.id);
    const embed = new Discord.RichEmbed()
        .setTitle("🔧 ÚTEIS")
        .addField(`\`e!addemoji\``, `Adicione um emoji no servidor`)
        .addField(`\`e!botinfo\``, `Saiba mais sobre mim`)
        .addField(`\`e!clima\``, `Veja o clima de alguma cidade`)
        .addField(`\`e!sugestao\``, `Deixe uma sugestão para o nosso servidor`)
        .addField(`\`e!time\``, `Veja a quanto tempo o bot se encontra online`)
        .addField(`\`e!userinfo\``, `Confira algumas informações de um membro`)
        .setColor("GOLD")
        .setImage('https://images4.alphacoders.com/106/thumb-350-1062778.png')

    msg.edit(embed);
})

Moderação.on('collect', r2 => {
    r2.remove(message.author.id);
    const embed = new Discord.RichEmbed()
        .setTitle("👮 MODERAÇÃO")
        .addField(`\`e!ban\``, `Aplique um banimento em um membro`)
        .addField(`\`e!clear\``, `Limpe indesejadas mensagens em um canal`)
        .addField(`\`e!dm\``, `Envie uma mensagem na DM de um membro`)
        .addField(`\`e!kick\``, `Expulse membros fora da lei`)
        .addField(`\`e!say\``, `Escreva alguma mensagem através do bot`)
        .addField(`\`e!warn\``, `Avise um membro que não se comporta`)
        .setColor("GOLD")
        .setImage('https://images7.alphacoders.com/767/thumb-350-767152.jpg')
    msg.edit(embed);
})

Entretenimento.on('collect', r2 => {
    r2.remove(message.author.id);
    const embed = new Discord.RichEmbed()
        .setTitle("💳 ENTRETENIMENTO")
        .addField(`\`e!avatar\``, `Amplie a foto de algum membro`)
        .addField(`\`e!dado\``, `Veja em qual número o dado vai cair`)
        .addField(`\`e!perguntar\``, `Pergunte algo ao sabio bot`)
        .addField(`\`e!roleta\``, `Brinque de roleta-russa`)
        .addField(`\`e!servericon\``, `Amplie a foto do servidor`)
        .setColor("GOLD")
        .setImage('https://images8.alphacoders.com/948/thumb-350-948515.png')

    msg.edit(embed);
})


Back.on('collect', r2 => {
    const embed = new Discord.RichEmbed()
.setTitle(`CENTRAL DE AJUDA!`)
.setColor("GOLD")
.setDescription('Para ter mais acesso e facilidade às nossas dependências, reaja com algum emoji e receba as informações necessárias. \n\n\n🔨 `Moderação` \n🔧 `Uteis` \n💳 `Entretenimento`\n🤖 `Bots`')
    
   msg.edit(embed);  
});
});
}

if(comando === "pan") {
    const f = await message.channel.send("Pan!?");
    f.edit(`Pan! O mais gostoso do servidor, isso mesmo!`);
}
});

client.login(config.token);
