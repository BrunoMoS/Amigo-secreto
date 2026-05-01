// STATE — única fonte de verdade da aplicação

const state = {
  friends: [],
};

/*
O que é: guarda os dados principais da aplicação.
Aqui: temos uma lista (array) chamada friends, que começa vazia.
Função: é a “memória” do programa, onde ficam os nomes dos amigos adicionados.
*/

// VALIDATION — regras de negócio / validação

const validation = {
  isNameEmpty(name) {
    return name.trim() === "";
  },

  isNameDuplicate(name) {
    return state.friends
      .map((f) => f.toLowerCase())
      .includes(name.trim().toLowerCase());
  },

  hasEnoughFriends() {
    return state.friends.length >= 4;
  },
};

/*
isNameEmpty(name): verifica se o nome digitado está vazio (só espaços).
isNameDuplicate(name): checa se o nome já foi adicionado antes, comparando em minúsculas para evitar duplicatas como "Ana" e "ana".
hasEnoughFriends(): confirma se já temos pelo menos 4 amigos para poder sortear.
*/

// DOM — leitura e escrita na interface

const dom = {
  getInputValue() {
    return document.getElementById("friend-name").value;
  },

  clearInput() {
    document.getElementById("friend-name").value = "";
  },

  renderFriendsList(friends) {
    const el = document.getElementById("friends-list");
    el.innerHTML = friends
      .map((name, i) => `<span>${i + 1}. ${name}</span>`)
      .join("<br>");
  },

  renderDrawResult(pairs) {
    const el = document.getElementById("draw-list");
    el.innerHTML = pairs
      .map(
        ({ giver, winner }) =>
          `<span>🎁 <strong>${giver}</strong> → <strong>${winner}</strong></span>`,
      )
      .join("<br>");
  },

  clearDrawResult() {
    document.getElementById("draw-list").innerHTML = "";
  },

  focusInput() {
    document.getElementById("friend-name").focus();
  },
};

/*
getInputValue(): pega o texto digitado no campo de entrada.
clearInput(): limpa o campo de entrada.
renderFriendsList(friends): mostra na tela a lista de amigos numerada.
renderDrawResult(pairs): mostra o resultado do sorteio (quem dá presente para quem).
clearDrawResult(): apaga o resultado anterior.
focusInput(): coloca o cursor de volta no campo de entrada.
*/

// DRAW — lógica do sorteio

const drawService = {
  
  shuffle(list) {
    const arr = [...list];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  drawAll() {
    const givers = state.friends;
    let winners;

    do {
      winners = this.shuffle(givers);
    } while (winners.some((winner, i) => winner === givers[i]));

    return givers.map((giver, i) => ({ giver, winner: winners[i] }));
  },
};

/*
shuffle(list): embaralha os elementos de um array usando o algoritmo Fisher-Yates (mistura aleatória).
drawAll(): faz o sorteio garantindo que ninguém tire a si mesmo.
           Ele embaralha até encontrar uma combinação válida.
           Depois retorna pares { giver, winner }.
*/

// HANDLERS — reações às ações do usuário

function add() {
  const name = dom.getInputValue();

  if (validation.isNameEmpty(name)) {
    alert("Por favor, digite o nome de um amigo.");
    dom.focusInput();
    return;
  }

  if (validation.isNameDuplicate(name)) {
    alert(`"${name.trim()}" já foi adicionado.`);
    dom.clearInput();
    dom.focusInput();
    return;
  }

  state.friends.push(name.trim());
  dom.renderFriendsList(state.friends);
  dom.clearInput();
  dom.focusInput();
}

/*
add(): função chamada quando o usuário clica em "Adicionar".
       Ela pega o nome do input, valida se não está vazio ou duplicado,
       e se tudo estiver certo, adiciona à state.friends e atualiza a lista na tela.
*/

function draw() {
  if (!validation.hasEnoughFriends()) {
    alert("Adicione pelo menos 4 amigos para realizar o sorteio.");
    return;
  }

  const pairs = drawService.drawAll();
  dom.renderDrawResult(pairs);
}

/*
draw(): função chamada quando o usuário clica em "Sortear".
        Ela verifica se há amigos suficientes, e se sim, realiza o sorteio e mostra o resultado.
*/

function restart() {
  state.friends = [];
  dom.renderFriendsList([]);
  dom.clearDrawResult();
  dom.clearInput();
  dom.focusInput();
}

/*
restart(): função chamada quando o usuário clica em "Reiniciar".
           Ela limpa a lista de amigos, o resultado do sorteio, e prepara a interface para um novo jogo.
*/
