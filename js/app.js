// STATE — única fonte de verdade da aplicação

const state = {
  friends: [],
};

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

// DRAW — lógica do sorteio

const drawService = {
  /**
   * Embaralha um array usando Fisher-Yates.
   */
  shuffle(list) {
    const arr = [...list];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  /**
   * Gera uma derangement (permutação sem ponto fixo):
   * ninguém tira a si mesmo.
   * Retorna um array de pares [{ giver, winner }, ...] com todos os participantes.
   */
  drawAll() {
    const givers = state.friends;
    let winners;

    // Tenta até obter uma derangement válida
    do {
      winners = this.shuffle(givers);
    } while (winners.some((winner, i) => winner === givers[i]));

    return givers.map((giver, i) => ({ giver, winner: winners[i] }));
  },
};

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

function draw() {
  if (!validation.hasEnoughFriends()) {
    alert("Adicione pelo menos 4 amigos para realizar o sorteio.");
    return;
  }

  const pairs = drawService.drawAll();
  dom.renderDrawResult(pairs);
}

function restart() {
  state.friends = [];
  dom.renderFriendsList([]);
  dom.clearDrawResult();
  dom.clearInput();
  dom.focusInput();
}
