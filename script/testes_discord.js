
function enviarRequest(dados, server, canal) {

  const discord = document.getElementById("conectar-discord");
  if (!discord.checked) return;
  
  fetch(server+canal, {
    method: "POST",
    body: JSON.stringify(dados),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => response.json())
    .then(json => alert(JSON.stringify(json, null, 2)));

}

function testeAtributo(id, nome) {
  var atributo = Number(document.getElementById(id).value) || 0;
  var rolagem = Math.floor(Math.random() * 20) + 1;

  var resultado = rolagem + atributo;

  const jogador = document.getElementById("usuario-discord").value || "---";
  const servidorDiscord = document.getElementById("servidor-discord").value;

  var dados = {
    [`resultado.${nome}`]: resultado,
    [`Hab.${nome}`]: atributo,
    "discordID": servidorDiscord,
    "Jogador": jogador
  };

  const bot = document.getElementById("bot-discord").value;

  if (servidorDiscord != "") enviarRequest(dados, bot, "/habilidade");
}

function rolarPericiaPersonalizada (pericia) {
  const nomePericia = document.getElementById(pericia).value || "Perícia";
  testeAtributo(pericia+"-total", nomePericia);
}

function rolarPoderPersonalizado (poder, efeito, ligado) {
  const nomePoder = document.getElementById(`nome-poder-${poder}`).value || "Teste de Poder";
  const nomeEfeito = document.getElementById(`nome-efeito-${poder}-${efeito}-${ligado}`).value || "Efeito";
  const nomeTeste = `${nomePoder} [${nomeEfeito}]`;
  testeAtributo(`lvl-efeito-${poder}-${efeito}-${ligado}`, nomeTeste);
}

function testeDano(nvl, rol) {
  var dmg = Number(document.getElementById(nvl).value) || 0;
  var somaDados = 0;
  if(dmg != ""){
    
    var rolagem = document.getElementById(rol).value;
    var rolDano;
    if(dmg > 0){
      var parts = rolagem.split(/d|\+/);
      var nDados = Number(parts[0]);
      var dado = Number(parts[1]);
      var bonus = Number(parts[2]);

      // rolar o dano
      var rolls = [];
      for(var n = 0; n < nDados; n++){
        var thisDado = Math.floor(Math.random() * dado) + 1;
        somaDados += thisDado;
        rolls.push(thisDado);
      }
      rolDano = rolls.join(", ");
      somaDados += bonus;
    }

    const jogador = document.getElementById("usuario-discord").value || "---";
    const servidorDiscord = document.getElementById("servidor-discord").value;
    
    var dados = {
      "Dano Teste": dmg,
      "Rolagem Teste": rolagem,
      "resultadoDano": somaDados,
      "rolagensDano": rolDano,
      "discordID": servidorDiscord,
      "Jogador": jogador
    };

    const bot = document.getElementById("bot-discord").value;

    if (servidorDiscord != "") enviarRequest(dados, bot, "/dano");
    }
}