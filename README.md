# 🎁 Amigo Secreto

Aplicação web para sortear amigo secreto entre um grupo de participantes. Cada pessoa recebe exatamente um amigo e ninguém tira a si mesmo.

---

## Funcionalidades

- Adicionar participantes à lista
- Validação de nome vazio e duplicado
- Sorteio completo: todos os participantes são sorteados de uma só vez
- Garantia de que ninguém tira a si mesmo
- Reiniciar o sorteio do zero

---

## Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla, ES6+)
- Fontes: [Chakra Petch](https://fonts.google.com/specimen/Chakra+Petch) e [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts

---

## Estrutura do projeto

```
amigo-secreto/
├── assets/
│   ├── favicon.ico
│   └── imagem-presente.png
├── js/
│   └── app.js
├── index.html
└── style.css
```

---

## Como executar

Não há dependências ou build. Basta abrir o `index.html` no navegador:

```bash
# com Live Server (VS Code)
# clique com botão direito em index.html → Open with Live Server

# ou via terminal
npx serve .
```

---

## Arquitetura do JavaScript

O arquivo `js/app.js` segue o **Single Responsibility Principle (SRP)**: cada camada tem uma única razão para mudar.

| Camada | Responsabilidade |
|---|---|
| `state` | Fonte de verdade — armazena a lista de participantes |
| `validation` | Regras de negócio (nome vazio, duplicado, mínimo de participantes) |
| `dom` | Leitura e escrita na interface (input, listas, foco) |
| `drawService` | Lógica pura do sorteio (embaralhamento) |
| handlers (`add`, `draw`, `restart`) | Orquestram as camadas acima em resposta ao usuário |

---

## Uso

1. Digite o nome de um participante e clique em **Adicionar**
2. Repita para todos os participantes (mínimo 2)
3. Clique em **Sortear** para ver todos os pares de uma vez
4. Clique em **Reiniciar** para começar um novo sorteio
