# Café Aurora

Site de cafeteria — primeiro projeto do portfólio. Next.js (App Router) + React, CSS Modules,
animação com Motion.

```bash
npm run dev     # http://localhost:3000
npm run build   # build de produção
```

## Estrutura

| Arquivo | O que faz |
| --- | --- |
| `app/globals.css` | tokens (cor, raio, sombra, ritmo), tipografia e as classes `btn` / `tag` / `eyebrow` |
| `components/Nav.jsx` | barra fixa + overlay de menu em tela cheia |
| `components/Hero.jsx` | wordmark, foto grande e os cards de bebida com parallax |
| `components/Mood.jsx` | trilha de fotos que segue o cursor |
| `components/Menu.jsx` | cardápio com filtro por categoria |
| `components/Events.jsx` | bento de eventos |
| `components/Footer.jsx` | painel escuro com wordmark e colunas de links |
| `lib/menu.js` | itens e categorias do cardápio |

## Colocando fotos de verdade

Hoje cada imagem é um placeholder de cor quente gerado a partir do nome do item —
o site fica apresentável sem nenhum arquivo de foto. Para trocar:

1. Jogue os arquivos em `public/fotos/`.
2. Passe `src` no componente `Photo`:

```jsx
<Photo src="/fotos/espresso.jpg" alt="Espresso na xícara" name="espresso" />
```

O `alt` é obrigatório para acessibilidade; o `name` só define a cor do placeholder
enquanto não houver foto.

## Acessibilidade e motion

- `prefers-reduced-motion` desliga o parallax, os reveals e a trilha do cursor.
- A trilha só liga em ponteiro fino (mouse). No toque, entra um leque estático.
- O overlay de menu fecha no `Esc` e trava o scroll do fundo enquanto está aberto.
