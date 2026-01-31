function subtrairVida(dano) {
  const danoSofrido = Number(document.getElementById(dano).value) || 0;

  const vidaAtual = document.getElementById("vida-combate");
  vidaAtual.value = vidaAtual.value - danoSofrido;

  subtrairEstamina(danoSofrido, "pct-reducao");
  recalcularTudo();
  return danoSofrido
}

function subtrairEstamina(dano, reducaoPct) {
  const pct = Number(document.getElementById(reducaoPct).value) || 0;
  const reducao = Math.floor(dano * pct/100);
  const estaminaAtual = document.getElementById("estamina-combate");
  estaminaAtual.value = estaminaAtual.value - reducao;

  return reducao;
}