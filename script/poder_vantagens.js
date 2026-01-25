let contadorPoderes = 0;
let contadorEfeitos = [];
let contadorEfeitosAlternativos = [];
let contadorModificadores = [];
let contadorVantagens = 0;


function adicionarPoder() {
  contadorPoderes++;
  contadorEfeitos[contadorPoderes] = 0;
  contadorEfeitosAlternativos[contadorPoderes] = [];
  contadorModificadores[contadorPoderes] = [];

  const listaPoderes = document.getElementById("lista-poderes");

  const novoPoder = document.createElement("div");
  novoPoder.className = "poder-linha";
  novoPoder.id = `poder-${contadorPoderes}`;

  novoPoder.innerHTML = `
    <div class="span-2" style="display: flex;">
      <button title="Ocultar Efeitos do Poder" class="botao-img mostrar-poder" onclick="ocultarDetalhesPoder(${contadorPoderes})" id="mostrar-poder-${contadorPoderes}">
        <img src="img/mais.png" alt="Mostrar Efeitos" class="toggle-show">
      </button>
      <input type="text" id="nome-poder-${contadorPoderes}" placeholder="Nome do Poder ${contadorPoderes}" class="nome-poder">
      <button class="botao-img apagar-poder" title="Apagar Poder ${contadorPoderes}" onclick="removerPoder(${contadorPoderes})" id="apagar-poder-${contadorPoderes}">
        <img src="img/delete.png" alt="Apagar Poder">
      </button>
    </div>
    
    <div class="efeitos-modificadores">
      <div class="efeitos-linha" style="margin-left:35px;">
        <label for="">Modif.</label>
        <label for="">Ef.Alt.</label>
        <br>
        <label for="">LVL</label>
        <label for="">Custo</label>
        <label for="">Efeito</label>
        <br>
      </div>

      <div id="lista-efeitos-${contadorPoderes}" style="max-height: 300px; overflow-y: auto;" class="lista-efeitos hierarquia-container">
      </div>

      <div style="justify-self: center; display: flex;">
        <button class="botao-img adicionar-efeito" title="Adicionar Efeito ao Poder ${contadorPoderes}" onclick="adicionarEfeito(${contadorPoderes})" style="width: 50%;" id="adicionar-efeito-${contadorPoderes}">
          <img src="img/stack.png" alt="Adicionar Efeito">
        </button>

        <button class="botao-img remover-efeito" title="Remover Efeitos e Modificadores Vazios do Poder ${contadorPoderes}" onclick="removerEfeitos(${contadorPoderes})" style="width: 50%;" id="remover-efeito-${contadorPoderes}">
          <img src="img/remover.png" alt="Remover Efeitos Vazios">
        </button>
      </div>
    </div>

    <div class="descricao-poder">
      <label for="">
        Descrição
      </label>
      <textarea name="descricao-poder" id="descricao-poder-${contadorPoderes}" placeholder="Descrição do poder ${contadorPoderes}"></textarea>
      <div class="small-number" style="display: flex; align-items: center;">
        <label for="pontos-poder-${contadorPoderes}">Total de Pontos:</label>
        <input type="number" id="pontos-poder-${contadorPoderes}" style="font-size: 20px; width: 20px" readonly>
      </div>
    </div>
  `;

  listaPoderes.appendChild(novoPoder);
  trocaTema();
}

function removerPoder (poder) {
  const poderRemover = document.getElementById(`poder-${poder}`);
  if(poderRemover) {
    poderRemover.remove();
    contadorModificadores.splice(poder,1);
    contadorEfeitos.splice(poder,1);
    contadorPoderes--;
  }

  const poderes = document.querySelectorAll(".poder-linha");
  
  poderes.forEach((linhaPoder, indexPoder) => {
    const mostrarPoder = linhaPoder.querySelector(".mostrar-poder");
    const nomePoder = linhaPoder.querySelector(".nome-poder");
    const apagarPoder = linhaPoder.querySelector(".apagar-poder");
    const listaEfeitos = linhaPoder.querySelector(".lista-efeitos");
    const addEfeito = linhaPoder.querySelector(".adicionar-efeito");
    const remEfeito = linhaPoder.querySelector(".remover-efeito");
    const descricaoPoder = linhaPoder.querySelector("textarea[name='descricao-poder']");

    linhaPoder.id = `poder-${indexPoder+1}`;
    
    if (mostrarPoder) {
      mostrarPoder.id = `mostrar-poder-${indexPoder+1}`;
      mostrarPoder.onclick = () => ocultarDetalhesPoder(indexPoder+1);
    }
    if (nomePoder) {
      nomePoder.id = `nome-poder-${indexPoder+1}`;
      nomePoder.placeholder = `Nome do Poder ${indexPoder+1}`;
    }
    if (apagarPoder) {
      apagarPoder.id = `apagar-poder-${indexPoder+1}`;
      apagarPoder.onclick = () => removerPoder(indexPoder+1);
      apagarPoder.title = `Apagar Poder ${indexPoder+1}`;
    }
    if (listaEfeitos) {
      listaEfeitos.id = `lista-efeitos-${indexPoder+1}`;
    }
    if (addEfeito) {
      addEfeito.id = `adicionar-efeito-${indexPoder+1}`;
      addEfeito.title = `Adicionar Efeito ao Poder ${indexPoder+1}`;
      addEfeito.onclick = () => adicionarEfeito(indexPoder+1);
    }
    if (remEfeito) {
      remEfeito.id = `remover-efeito-${indexPoder+1}`;
      remEfeito.title = `Remover Efeitos e Modificadores Vazios do Poder ${indexPoder+1}`;
      remEfeito.onclick = () => removerEfeitos(indexPoder+1);
    }
    if (descricaoPoder) {
      descricaoPoder.id = `descricao-poder-${indexPoder+1}`;
      descricaoPoder.placeholder = `Descrição do poder ${indexPoder+1}`
    }

    const linhasEf = linhaPoder.querySelectorAll(".efeitos-linha");

    linhasEf.forEach((linhaEfeito, indexEfeito) => {

      const lvl = linhaEfeito.querySelector('input[name="lvl-efeito"]');
      const custo = linhaEfeito.querySelector('input[name="custo-efeito"]');
      const nome = linhaEfeito.querySelector('input[name="nome-efeito"]');

      if (lvl) {
        lvl.id = `lvl-efeito-${indexPoder+1}-${indexEfeito}`;
      }

      if (custo) {
        custo.id = `custo-efeito-${indexPoder+1}-${indexEfeito}`;
      }

      if (nome) {
        nome.id = `nome-efeito-${indexPoder+1}-${indexEfeito}`;
        nome.placeholder = `Efeito ${indexEfeito}`;
      }

      const linhasModif = linhaEfeito.querySelectorAll(".modificadores-linha");

      linhasModif.forEach((linhaModificador, indexModificador) => {

        const custoM = linhaModificador.querySelector('input[name="custo-modificador"]');
        const tipoM = linhaModificador.querySelector('select[name="tipo-modificador"]');
        const nomeM = linhaModificador.querySelector('input[name="nome-modificador"]');

        if(custoM) {
          custoM.id = `custo-modificador-${indexPoder+1}-${indexEfeito}-${indexModificador}`;
        }

        if (tipoM) {
          tipoM.id = `tipo-modificador-${indexPoder+1}-${indexEfeito}-${indexModificador}`;
        }

        if (nomeM) {
          nomeM.id = `nome-modificador-${indexPoder+1}-${indexEfeito}-${indexModificador}`;
          nomeM.placeholder = `Modificador ${indexModificador} do efeito ${indexEfeito}`;
        }
      });
    });
  });

  recalcularTudo();
}

function ocultarDetalhesPoder(poderId) {
  const poderEl = document.getElementById(`poder-${poderId}`);
  if (!poderEl) return;

  const botao = document.getElementById(`mostrar-poder-${poderId}`);
  const imgBotao = botao.querySelector("img");
  imgBotao.classList.toggle("show");
  if (imgBotao.classList.contains("show")) {
    botao.title = "Mostrar Efeitos do Poder";
  } else {
    botao.title = "Ocultar Efeitos do Poder";
  }

  const elementos = poderEl.querySelectorAll(
    ".efeitos-modificadores, .descricao-poder"
  );

  elementos.forEach(el => {
    el.classList.toggle("hide");
  });
}

function adicionarEfeito(poder) {
  contadorEfeitos[poder]++;
  contadorEfeitosAlternativos[poder][contadorEfeitos[poder]] = 0;
  contadorModificadores[poder][contadorEfeitos[poder]] = [];
  contadorModificadores[poder][contadorEfeitos[poder]][contadorEfeitosAlternativos[poder][contadorEfeitos[poder]]] = 0;
  
  const listaEfeitos = document.getElementById(`lista-efeitos-${poder}`);
  
  const novoEfeito = document.createElement("div");
  novoEfeito.className = "efeitos-linha item-conectado";
  novoEfeito.id = `efeito-${poder}-${contadorEfeitos[poder]}`;
  novoEfeito.innerHTML = `
    <button class="botao-img" onclick="adicionarModificadores(${poder},${contadorEfeitos[poder]},${contadorEfeitosAlternativos[poder][contadorEfeitos[poder]]})" title="Adicionar Modificador ao Efeito ${contadorEfeitos[poder]} do Poder ${poder}">
      <img src="img/rubiks-cube.png" alt="Adicionar modificador">
    </button>

    <button class="botao-img" title="Adicionar Efeito Alternativo a Efeito ${contadorEfeitos[poder]}" onclick="adicionarAlternativo(${poder},${contadorEfeitos[poder]})" id="alternativo-efeito-${contadorEfeitos[poder]}">
      <img src="img/card-exchange.png" alt="Adicionar Efeito Alternativo">
    </button>

    <button class="botao-rolar" onclick="rolarPoderPersonalizado(${poder}, ${contadorEfeitos[poder]}, ${contadorEfeitosAlternativos[poder][contadorEfeitos[poder]]})">
      <img src="img/d20.png" alt="Rolar teste de Poder" id="teste-efeito-${poder}-${contadorEfeitos[poder]}">
    </button>

    <input type="number" name="lvl-efeito" id="lvl-efeito-${poder}-${contadorEfeitos[poder]}-${contadorEfeitosAlternativos[poder][contadorEfeitos[poder]]}" class="dependente" placeholder="NVL">
    <input type="number" name="custo-efeito" id="custo-efeito-${poder}-${contadorEfeitos[poder]}" class="dependente" placeholder ="CST">
    <input type="text" name="nome-efeito" id="nome-efeito-${poder}-${contadorEfeitos[poder]}-${contadorEfeitosAlternativos[poder][contadorEfeitos[poder]]}" placeholder="Efeito ${contadorEfeitos[poder]}">
    <div class="small-number">
      <input type="number" id="pontos-efeito-${poder}-${contadorEfeitos[poder]}" name="pontos-efeito"  style="font-size: 20px;" readonly>
    </div>

    <div id="lista-modificadores-${poder}-${contadorEfeitos[poder]}-${contadorEfeitosAlternativos[poder][contadorEfeitos[poder]]}" class="span-6 lista-modificadores hierarquia-container">
    </div>

    <div id="lista-alternativos-${poder}-${contadorEfeitos[poder]}" class="span-7 lista-alternativos hierarquia-container">
    </div>
  `;
  
  listaEfeitos.appendChild(novoEfeito);
  trocaTema();
}

function adicionarAlternativo(poder, efeito) {
  contadorEfeitosAlternativos[poder][efeito]++;
  contadorModificadores[poder][efeito][contadorEfeitosAlternativos[poder][efeito]] = 0;

  const listaAlternativos = document.getElementById(`lista-alternativos-${poder}-${efeito}`);

  if (contadorEfeitosAlternativos[poder][efeito] == 1) {
    const cabecalho = document.createElement("div");
    cabecalho.className = "span-6";
    cabecalho.style = "margin-top: 2px;"
    cabecalho.innerHTML = `
      <label for="">Efeitos Alternativos</label>
    `;
    listaAlternativos.appendChild(cabecalho);
  }

  const novoAlternativo = document.createElement("div");
  novoAlternativo.className = "alternativos-linha item-conectado";
  novoAlternativo.id = `alternativo-${poder}-${efeito}-${contadorEfeitosAlternativos[poder][efeito]}`;
  novoAlternativo.innerHTML = `
    <button class="botao-img" onclick="adicionarModificadores(${poder},${efeito},${contadorEfeitosAlternativos[poder][efeito]})" title="Adicionar Modificador ao Efeito Alternativo ${contadorEfeitosAlternativos[poder][efeito]} do Efeito ${efeito} do Poder ${poder}">
      <img src="img/rubiks-cube.png" alt="Adicionar modificador">
    </button>
    <br>

    <button class="botao-rolar" onclick="rolarPoderPersonalizado(${poder}, ${efeito}, ${contadorEfeitosAlternativos[poder][efeito]})">
      <img src="img/d20.png" alt="Rolar teste de Poder" id="teste-alternativo-${poder}-${efeito}-${contadorEfeitosAlternativos[poder][efeito]}">
    </button>
    
    <input type="number" name="lvl-alternativo" id="lvl-efeito-${poder}-${efeito}-${contadorEfeitosAlternativos[poder][efeito]}" class="dependente" placeholder="NVL">
    <input type="number" name="custo-alternativo" id="custo-efeito-${poder}-${efeito}-${contadorEfeitosAlternativos[poder][efeito]}" class="dependente" placeholder="CST">
    <input type="text" name="nome-alternativo" id="nome-efeito-${poder}-${efeito}-${contadorEfeitosAlternativos[poder][efeito]}" placeholder="Efeito Alternativo ${contadorEfeitosAlternativos[poder][efeito]} do Efeito ${efeito}">
    <div class="small-number">
      <input type="number" id="pontos-alternativo-${poder}-${efeito}-${contadorEfeitosAlternativos[poder][efeito]}" name="pontos-alternativo"  style="font-size: 20px;" readonly>
    </div>

    <div id="lista-modificadores-${poder}-${efeito}-${contadorEfeitosAlternativos[poder][efeito]}" class="span-6 hierarquia-container lista-modificadores">
    </div>
  `;

  listaAlternativos.appendChild(novoAlternativo);
  trocaTema();
  recalcularTudo();
}

function removerEfeitos(poder) {
  const poderEl = document.getElementById(`poder-${poder}`);
  if (!poderEl) return;

  const listaEfeitos = poderEl.querySelector(".lista-efeitos");
  const efeitosDom = listaEfeitos.querySelectorAll(".efeitos-linha");

  efeitosDom.forEach(efeitoEl => {
    limparModificadoresVazios(efeitoEl);

    const alternativosDom = efeitoEl.querySelectorAll(".alternativos-linha");
    alternativosDom.forEach(altEl => {
      limparModificadoresVazios(altEl);

      const inputNomeAlt = altEl.querySelector("input[name='nome-alternativo']");
      if (!inputNomeAlt || inputNomeAlt.value.trim() === "") {
        altEl.remove();
      }
    });

    const inputNomeEf = efeitoEl.querySelector("input[name='nome-efeito']");
    if (!inputNomeEf || inputNomeEf.value.trim() === "") {
      efeitoEl.remove(); 
    }
  });

  contadorEfeitos[poder] = 0;
  contadorEfeitosAlternativos[poder] = []; 
  contadorModificadores[poder] = []; 

  const efeitosRestantes = listaEfeitos.querySelectorAll(".efeitos-linha");
  
  efeitosRestantes.forEach((efeitoEl, indexEfeitoZero) => {
    const indexEf = indexEfeitoZero + 1;
    contadorEfeitos[poder] = indexEf;
    
    contadorEfeitosAlternativos[poder][indexEf] = 0;
    contadorModificadores[poder][indexEf] = []; 
    contadorModificadores[poder][indexEf][0] = 0;
    
    efeitoEl.id = `efeito-${poder}-${indexEf}`;
    
    atualizarAtributosEfeito(efeitoEl, poder, indexEf, 0);

    const listaModifPrincipal = efeitoEl.querySelector(".lista-modificadores");
    if(listaModifPrincipal) {
      listaModifPrincipal.id = `lista-modificadores-${poder}-${indexEf}-0`;
      reindexarModificadores(listaModifPrincipal, poder, indexEf, 0);
    }

    const listaAlternativosContainer = efeitoEl.querySelector(".lista-alternativos");
    if(listaAlternativosContainer) {
      listaAlternativosContainer.id = `lista-alternativos-${poder}-${indexEf}`;
    }

    const alternativosRestantes = efeitoEl.querySelectorAll(".alternativos-linha");
    
    if (alternativosRestantes.length === 0) {
      const headerAlt = listaAlternativosContainer.querySelector("div:not(.alternativos-linha)");
      if(headerAlt && headerAlt.innerText.includes("Efeitos Alternativos")) headerAlt.remove();
    }
    
    alternativosRestantes.forEach((altEl, indexAltZero) => {
      const indexAlt = indexAltZero + 1;
      contadorEfeitosAlternativos[poder][indexEf] = indexAlt;
      contadorModificadores[poder][indexEf][indexAlt] = 0;

      altEl.id = `alternativo-${poder}-${indexEf}-${indexAlt}`;

      atualizarAtributosAlternativo(altEl, poder, indexEf, indexAlt);
      const listaModifAlt = altEl.querySelector(".lista-modificadores");
      if(listaModifAlt) {
        listaModifAlt.id = `lista-modificadores-${poder}-${indexEf}-${indexAlt}`;
        reindexarModificadores(listaModifAlt, poder, indexEf, indexAlt);
      }
    });
  });

  recalcularTudo();
}

function limparModificadoresVazios(container) {
  const inputsNome = container.querySelectorAll("input[name='nome-modificador']");
  
  inputsNome.forEach(input => {
    if (input.value.trim() === "") {
      const linhaMod = input.closest(".modificadores-linha");
      if (linhaMod) linhaMod.remove();
    }
  });

  const linhasRestantes = container.querySelectorAll(".modificadores-linha");
  let temConteudo = false;
  linhasRestantes.forEach(linha => {
      if(linha.querySelector("input")) temConteudo = true;
  });

  if (!temConteudo) {
      linhasRestantes.forEach(linha => linha.remove());
  }
}

function reindexarModificadores(containerModificadores, poder, efeito, alternativo) {
    const modificadores = containerModificadores.querySelectorAll(".modificadores-linha");
    let contadorReal = 0;

    modificadores.forEach(linha => {
        if (!linha.querySelector("input")) return;

        contadorReal++;
        contadorModificadores[poder][efeito][alternativo] = contadorReal;

        const custo = linha.querySelector("input[name='custo-modificador']");
        const tipo = linha.querySelector("select[name='tipo-modificador']");
        const nome = linha.querySelector("input[name='nome-modificador']");

        if (custo) custo.id = `custo-modificador-${poder}-${efeito}-${alternativo}-${contadorReal}`;
        if (tipo) tipo.id = `tipo-modificador-${poder}-${efeito}-${alternativo}-${contadorReal}`;
        if (nome) {
            nome.id = `nome-modificador-${poder}-${efeito}-${alternativo}-${contadorReal}`;
            nome.placeholder = `Modificador ${contadorReal} do efeito ${efeito}`;
        }
    });
}

function atualizarAtributosEfeito(el, poder, indexEf, indexAlt) {
    const btnAddMod = el.querySelector("button[onclick^='adicionarModificadores']");
    if(btnAddMod) {
        btnAddMod.setAttribute("onclick", `adicionarModificadores(${poder}, ${indexEf}, ${indexAlt})`);
        btnAddMod.title = `Adicionar Modificador ao Efeito ${indexEf} do Poder ${poder}`;
    }

    const btnAddAlt = el.querySelector("button[onclick^='adicionarAlternativo']");
    if(btnAddAlt) {
        btnAddAlt.id = `alternativo-efeito-${indexEf}`;
        btnAddAlt.setAttribute("onclick", `adicionarAlternativo(${poder}, ${indexEf})`);
        btnAddAlt.title = `Adicionar Efeito Alternativo a Efeito ${indexEf}`;
    }
    
    const btnRolar = el.querySelector("button[onclick^='rolarPoderPersonalizado']");
    if(btnRolar) {
        btnRolar.setAttribute("onclick", `rolarPoderPersonalizado(${poder}, ${indexEf}, ${indexAlt})`);
        const img = btnRolar.querySelector("img");
        if(img) img.id = `teste-efeito-${poder}-${indexEf}`;
    }

    const lvl = el.querySelector("input[name='lvl-efeito']");
    if(lvl) lvl.id = `lvl-efeito-${poder}-${indexEf}-${indexAlt}`;

    const custo = el.querySelector("input[name='custo-efeito']");
    if(custo) custo.id = `custo-efeito-${poder}-${indexEf}`;

    const nome = el.querySelector("input[name='nome-efeito']");
    if(nome) {
        nome.id = `nome-efeito-${poder}-${indexEf}-${indexAlt}`;
        nome.placeholder = `Efeito ${indexEf}`;
    }

    const pontos = el.querySelector("input[name='pontos-efeito']");
    if(pontos) pontos.id = `pontos-efeito-${poder}-${indexEf}`;
}

function atualizarAtributosAlternativo(el, poder, indexEf, indexAlt) {
    const btnAddMod = el.querySelector("button[onclick^='adicionarModificadores']");
    if(btnAddMod) {
        btnAddMod.setAttribute("onclick", `adicionarModificadores(${poder}, ${indexEf}, ${indexAlt})`);
        btnAddMod.title = `Adicionar Modificador ao Efeito Alternativo ${indexAlt} do Efeito ${indexEf}`;
    }

    const btnRolar = el.querySelector("button[onclick^='rolarPoderPersonalizado']");
    if(btnRolar) {
        btnRolar.setAttribute("onclick", `rolarPoderPersonalizado(${poder}, ${indexEf}, ${indexAlt})`);
        const img = btnRolar.querySelector("img");
        if(img) img.id = `teste-alternativo-${poder}-${indexEf}-${indexAlt}`;
    }

    const lvl = el.querySelector("input[name='lvl-alternativo']");
    if(lvl) lvl.id = `lvl-efeito-${poder}-${indexEf}-${indexAlt}`; // Mantendo padrão do seu HTML original

    const custo = el.querySelector("input[name='custo-alternativo']");
    if(custo) custo.id = `custo-efeito-${poder}-${indexEf}-${indexAlt}`;

    const nome = el.querySelector("input[name='nome-alternativo']");
    if(nome) {
        nome.id = `nome-efeito-${poder}-${indexEf}-${indexAlt}`;
        nome.placeholder = `Efeito Alternativo ${indexAlt} do Efeito ${indexEf}`;
    }

    const pontos = el.querySelector("input[name='pontos-alternativo']");
    if(pontos) pontos.id = `pontos-alternativo-${poder}-${indexEf}-${indexAlt}`;
}

function adicionarModificadores(poder, efeito, alternativo) {
  contadorModificadores[poder][efeito][alternativo]++;

  const listaModificadores = document.getElementById(`lista-modificadores-${poder}-${efeito}-${alternativo}`);
  
  if (contadorModificadores[poder][efeito][alternativo] == 1) {
    const cabecalho = document.createElement("div");
    cabecalho.className = "modificadores-linha span-6";
    cabecalho.style = "margin-bottom: 0px;"
    cabecalho.innerHTML = `
      <span></span>
      <label for="">Custo</label>
      <label for="">Tipo</label>
      <label for="">Modificador</label>
    `;
    listaModificadores.appendChild(cabecalho);
  }

  const novaLinha = document.createElement("div");
  novaLinha.className = "modificadores-linha span-6 item-conectado";
  novaLinha.innerHTML = `
    <br>
    <input type="number" id="custo-modificador-${poder}-${efeito}-${alternativo}-${contadorModificadores[poder][efeito]}" name="custo-modificador" class="dependente" placeholder="Custo">
    <select name="tipo-modificador" id="tipo-modificador-${poder}-${efeito}-${alternativo}-${contadorModificadores[poder][efeito]}" class="dependente">
      <option value="por-nivel">Por Nível</option>
      <option value="fixo-por-nivel">Fixo por Nível</option>
      <option value="fixo">Fixo</option>
    </select>
    <input type="text" id="nome-modificador-${poder}-${efeito}-${alternativo}-${contadorModificadores[poder][efeito]}" name="nome-modificador" placeholder="Modificador ${contadorModificadores[poder][efeito][alternativo]} do efeito ${efeito}">
  `;
  
  listaModificadores.appendChild(novaLinha);
}

function custoPoder (poder) {
  let custoPoder = 0;
  const poderEl = document.getElementById(`poder-${poder}`);
  if(!poderEl) return 0;
  
  const listaEfeitos = poderEl.querySelector(".lista-efeitos");
  const efeitos = listaEfeitos.querySelectorAll(".efeitos-linha");
  
  efeitos.forEach(efeito => {
    
    const nivel = Number(efeito.querySelector("input[name='lvl-efeito']").value) || 0;
    var custoPorNivel = Number(efeito.querySelector("input[name='custo-efeito']").value) || 0;
    var fixo = 0;
    
    const listaModificadores = efeito.querySelector(".lista-modificadores");
    modificadores = listaModificadores.querySelectorAll(".modificadores-linha");
    modificadores.forEach(modificador => {
      
      const tipoModif = modificador.querySelector("select[name='tipo-modificador']");
      if(!tipoModif) return;
      const custoModif = Number(modificador.querySelector("input[name='custo-modificador']").value) || 0;

      if (tipoModif.value =="por-nivel") {
        custoPorNivel += custoModif;
      } else {
        fixo += custoModif;
      }
    });
    const custoEfeito = custoPorNivel * nivel + fixo;
    efeito.querySelector("input[name='pontos-efeito']").value = custoEfeito;

    custoPoder += custoEfeito;
  });

  return custoPoder;
}

function calcularCustoPoderes () {
  let custoPoderes = 0;
  for (let poder = 1; poder <= contadorPoderes; poder++) {
    const custo = custoPoder(poder);
    document.getElementById(`pontos-poder-${poder}`).value = custo;
    custoPoderes += custo;
  }
  document.getElementById("total-pontos-poderes").value = custoPoderes;
}

function custoEfeitoAlternativo (poder, efeito, alternativo) {
  
  const poderEl = document.getElementById(`poder-${poder}`);
  if(!poderEl) return 0;
  
  const efAlternativoEl = document.getElementById(`alternativo-${poder}-${efeito}-${alternativo}`);
  
  const nivel = Number(efAlternativoEl.querySelector("input[name='lvl-alternativo']").value) || 0;
  var custoPorNivel = Number(efAlternativoEl.querySelector("input[name='custo-alternativo']").value) || 0;
  var fixo = 0;
  
  const listaModificadores = document.getElementById(`lista-modificadores-${poder}-${efeito}-${alternativo}`);
  modificadores = listaModificadores.querySelectorAll(".modificadores-linha");
  modificadores.forEach(modificador => {
    
    const tipoModif = modificador.querySelector("select[name='tipo-modificador']");
    if(!tipoModif) return;
    const custoModif = Number(modificador.querySelector("input[name='custo-modificador']").value) || 0;

    if (tipoModif.value =="por-nivel") {
      custoPorNivel += custoModif;
    } else {
      fixo += custoModif;
    }
  });
  const custoEfeito = custoPorNivel * nivel + fixo;
  return custoEfeito;
}

function calcularCustoEfeitosAlternativos () {
  
  for (let poder = 1; poder <= contadorPoderes; poder++) {
    const poderEl = document.getElementById(`poder-${poder}`);
    const efeitos = poderEl.querySelectorAll(".lista-alternativos");

    efeitos.forEach((efeito, index_efeito) => {
      const efeitoEl = efeito.closest(".efeitos-linha");
      const custoEfeito = Number(efeitoEl.querySelector("input[name='pontos-efeito']").value) || 0;
      
      efeito.querySelectorAll(".alternativos-linha").forEach((alternativo, index_alternativo) => {
        let custo = custoEfeitoAlternativo(poder, index_efeito+1, index_alternativo+1);
        const restanteAlternativo = alternativo.querySelector("input[name='pontos-alternativo']");
        restanteAlternativo.value = custoEfeito - custo - contadorEfeitosAlternativos[poder][index_efeito+1];
      });
    });
  }
}

function adicionarVantagem() {
  contadorVantagens++;
  
  const listaVantagens = document.getElementById("lista-vantagens");

  const novaLinha = document.createElement("div");
  novaLinha.className = "vantagens-linha";
  novaLinha.innerHTML = `
    <input type="number" id="vantagem${contadorVantagens}-lvl" title="Nível da Vantagem" class="dependente vantagem" placeholder="NVL">
    <select name="tipo" id="vantagem${contadorVantagens}-tipo" class="dependente tipo-vantagem">
      <option value="nenhum"> — Tipo — </option>
      <option value="classe">Classe</option>
      <option value="combate">Combate</option>
      <option value="geral">Geral</option>
      <option value="pericia">Pericia</option>
      <option value="sorte">Sorte</option>
    </select>
    <input type="text" id="vantagem${contadorVantagens}-nome" title="Vantagem ${contadorVantagens}" class="nome-vantagem" placeholder="Vantagem ${contadorVantagens}">
    <button class="botao-img" onclick="mostrarVantagem(${contadorVantagens})" title = "Mostrar Descrição da Vantagem ${contadorVantagens}" id="mostrar-vantagem-${contadorVantagens}">
      <img src="img/mais.png" alt="Mostrar Descrição da Vantagem" class="vantagens-toggle toggle-show show">
    </button>
    <textarea name="descricao-vantagem" id="descricao-vantagem-${contadorVantagens}" rows="5" class="span-5 hide" placeholder="Descrição da Vantagem ${contadorVantagens}"></textarea>
  `;
    
  listaVantagens.appendChild(novaLinha);
  trocaTema();
}

function removerVantagens() {
  document.querySelectorAll(".nome-vantagem").forEach(vantagem => {
    if (vantagem.value.trim() === "") {
      const linha = vantagem.closest(".vantagens-linha");
      if (linha) {
        linha.remove();
        contadorVantagens--;
      }
    }
  });

  const linhas = document.querySelectorAll(".vantagens-linha");

  linhas.forEach((linha, index) => {
    const numero = index;

    const lvl = linha.querySelector('input[id$="-lvl"]');
    const tipo = linha.querySelector('select[id$="-tipo"]');
    const nome = linha.querySelector('input[id$="-nome"]');

    if (lvl) {
      lvl.id = `vantagem${numero}-lvl`;
    }

    if (tipo) {
      tipo.id = `vantagem${numero}-tipo`;
    }

    if (nome) {
      nome.id = `vantagem${numero}-nome`;
      nome.title = `Vantagem ${numero}`;
      nome.placeholder = `Vantagem ${numero}`
    }
  });

  recalcularTudo();
}


function calcularCustoVantagens () {
  let custoVantagens = 0;
  document.querySelectorAll(".vantagem").forEach(vantagem => {
    const nivel = Number(vantagem.value) || 0;
    custoVantagens += nivel;
  });

  document.getElementById("total-pontos-vantagens").value = custoVantagens;
}

function contarVantagens() {
  const totalClasse = document.getElementById("vantagens-classe");
  const totalCombate = document.getElementById("vantagens-combate");
  const totalGeral = document.getElementById("vantagens-geral");
  const totalPericia = document.getElementById("vantagens-pericia");
  const totalSorte = document.getElementById("vantagens-sorte");

  var classe = 0;
  var combate = 0;
  var geral = 0;
  var pericia = 0;
  var sorte = 0;

  document.querySelectorAll(".tipo-vantagem").forEach(vantagem => {
    if (vantagem.value == "classe") {
      classe++;
    } else if (vantagem.value == "combate") {
      combate++;
    } else if (vantagem.value == "geral") {
      geral++;
    } else if (vantagem.value == "pericia") {
      pericia++;
    } else if(vantagem.value == "sorte") {
      sorte++;
    }
  });

  totalClasse.value = classe;
  totalCombate.value = combate;
  totalGeral.value = geral;
  totalPericia.value = pericia;
  totalSorte.value = sorte;
}

function mostrarVantagem(vantagem) {
  const descricao = document.getElementById(`descricao-vantagem-${vantagem}`);
  if (!descricao) return;

  descricao.classList.toggle("hide");

  const botao = document.getElementById(`mostrar-vantagem-${vantagem}`);
  const imgBotao = botao.querySelector("img");
  imgBotao.classList.toggle("show");
  if (descricao.classList.contains("hide")) {
    botao.title = "Mostrar Descrição da Vantagem";
  } else {
    botao.title = "Ocultar Descrição da Vantagem";
  }

  
}
