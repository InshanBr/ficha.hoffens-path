function subtrairVida(dano, pctEstamina) {
  const danoSofrido = Number(document.getElementById(dano).value) || 0;

  const vidaAtual = document.getElementById("vida-combate");
  vidaAtual.value = vidaAtual.value - danoSofrido;

  const pct = Number(document.getElementById(pctEstamina).value) || 0;
  const reducao = Math.floor(danoSofrido * pct/100);
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