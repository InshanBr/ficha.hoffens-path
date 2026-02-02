function subtrairVida(dano, pctEstamina) {
  const resistencia = Number(document.getElementById("resistencia-total").value) || 0;
  var reducao;
  const danoSofrido = Number(document.getElementById(dano).value) || 0;
  const vidaAtual = document.getElementById("vida-combate");
  const pct = Number(document.getElementById(pctEstamina).value) || 0;

  const subtrairRes = document.getElementById("sub-res");

  if(danoSofrido > resistencia) {
    vidaAtual.value = Number(vidaAtual.value) - danoSofrido;

    if(subtrairRes.checked){
      vidaAtual.value = Number(vidaAtual.value) + resistencia;
      reducao = Math.floor((danoSofrido - resistencia) * pct/100);
    } else {
      reducao = Math.floor((danoSofrido) * pct/100);
    }
    
  }
  else{
    reducao = 0;
  }
  subtrairEstamina(reducao);
  
  return danoSofrido
}

function subtrairEstamina(reducao) {
  const estaminaAtual = document.getElementById("estamina-combate");
  estaminaAtual.value = estaminaAtual.value - reducao;
  recalcularTudo();
  return reducao;
}

function calculoEsforcoExtra() {
  const estamina = Number(document.getElementById("estamina-maxima-combate").value) || 0;

  document.getElementById("esforco-20").value = Math.floor(estamina*0.2);
  document.getElementById("esforco-50").value = Math.floor(estamina*0.5);
}

function determinarRolagem(thisDano) {
  var rolagem=1;

  if (thisDano == 0) {
    rolagem = 1;
  }
  else if (thisDano == 1){
    rolagem = "1d4+1";
  }
  else if (thisDano == 2){
    rolagem = "2d4+2";
  }
  else if (thisDano == 3){
    rolagem = "3d4+3";
  }
  else if (thisDano == 4){
    rolagem = "3d6+4";
  }
  else if (thisDano == 5){
    rolagem = "4d6+5";
  }
  else if (thisDano == 6){
    rolagem = "4d8+6";
  }
  else if (thisDano == 7){
    rolagem = "5d8+7";
  }
  else if (thisDano == 8){
    rolagem = "5d10+8";
  }
  else if (thisDano == 9){
    rolagem = "6d10+9";
  }
  else if (thisDano == 10){
    rolagem = "6d12+10";
  }
  else if (thisDano == 11){
    rolagem = "7d12+11";
  }
  else if (thisDano == 12){
    rolagem = "8d12+12";
  }
  else if (thisDano == 13){
    rolagem = "9d12+13";
  }
  else if (thisDano == 14){
    rolagem = "10d12+14";
  }
  else if (thisDano == 15){
    rolagem = "7d20+15";
  }
  else if (thisDano == 16){
    rolagem = "8d20+16";
  }
  else if (thisDano == 17){
    rolagem = "9d20+17";
  }
  else if (thisDano == 18){
    rolagem = "10d20+18";
  }
  else if (thisDano == 19){
    rolagem = "11d20+19";
  }
  else if (thisDano == 20){
    rolagem = "12d20+20";
  }
  else {
    rolagem = "---";
  }
  return rolagem;
}

function atribuirRolagemDano(nvl, rolagem) {
  const nivelDano = Number(document.getElementById(nvl).value) || 0;
  const rolagemCampo = document.getElementById(rolagem);
  
  rolagemCampo.value = determinarRolagem(nivelDano);
}

function destacaCritico(linha) {
  const destacar = document.getElementById(linha);
  destacar.classList.toggle("critico");
}