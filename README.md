# 📸 InstaFake - O Ataque dos Clones

Este projeto foi desenvolvido como parte da **Aventura 1: O Ataque dos Clones**, com o objetivo de construir um clone funcional de interfaces famosas do Instagram utilizando tecnologias modernas de desenvolvimento mobile.

O aplicativo replica a experiência do feed principal, a lista de conversas de mensagens diretas (DMs) e uma tela de chat interativa com simulação de respostas automatizadas.

---

## 🗺️ Comparação: Instagram Original vs. InstaFake

Para o cumprimento dos pré-requisitos da atividade, abaixo está o bloco comparativo contendo o mapeamento das telas originais de referência lado a lado com os clones desenvolvidos no aplicativo:

### 🏠 Página Inicial / Feed

| Instagram Original | InstaFake |
|:---:|:---:|
| ![Instagram Home](./fotoreadme/instagram-home.jpeg) | ![InstaFake Home](./fotoreadme/instafake-home.jpeg) |

### 💬 Lista de Bate-papo / DMs

| Instagram Original | InstaFake |
|:---:|:---:|
| ![Instagram Bate-papo](./fotoreadme/instagram-batepapo.jpeg) | ![InstaFake Bate-papo](./fotoreadme/instafake-batepapo.jpeg) |

> 💡 *Nota para avaliação:* Conforme exigido pelos critérios do projeto, as imagens utilizadas como base de comparação foram incluídas na raiz do repositório junto a este arquivo de documentação.

---

## 🛠️ Tecnologias e Componentes Utilizados

O projeto cumpre todos os requisitos técnicos estipulados para a atividade, utilizando:

- **React Native & Expo Router**: Arquitetura moderna baseada em rotas por arquivos nativos, organizando de forma limpa o fluxo entre as abas (`(tabs)`) e telas dedicadas.
- **TypeScript**: Tipagem estática em todos os arquivos (`.tsx`) para maior segurança, controle de erros em tempo de compilação e definição de estruturas de dados (ex: tipo `Message`).
- **StyleSheet Isolado**: Separação completa das regras de estilização visual organizadas de forma independente na base dos arquivos, mantendo a semântica do JSX limpa.
- **Componentes Nativos Obrigatórios**:
  - `View`: Estruturação de caixas de layouts, grids e flexbox.
  - `Text`: Renderização de textos, legendas, títulos e contadores.
  - `TextInput`: Campo interativo de entrada de dados para digitação de novas mensagens na conversa.
  - `Image`: Renderização de mídias dinâmicas carregadas diretamente de URLs externas para exibição das fotos no feed.
- **Área Segura Dinâmica (`react-native-safe-area-context`)**: Resolução completa dos problemas de sobreposição do conteúdo com elements nativos do celular (Barra de Notificações / Bateria e Barra de Gestos Inferior).

---

## 🚀 Funcionalidades Implementadas

1. **Feed Responsivo**: Rolagem infinita com lista vertical de publicações estruturadas contendo avatares, curtidas dinâmicas locais, legendas formatadas e barra horizontal superior de Stories.
2. **Navegação Inteligente**: Transição fluida entre abas através do Expo Router, garantindo navegação acoplada e passagem segura de parâmetros estruturados via serialização JSON.
3. **Bate-papo em Tempo Real (Simulado)**: Interface interativa de chat capaz de registrar novas mensagens enviadas pelo usuário, auto-rolagem automática para manter a última mensagem sempre visível na tela e resposta automática simulada gerada via temporizador em background.

---

## 📦 Como Executar o Projeto

1. Certifique-se de ter o **Node.js** instalado na sua máquina.
2. Instale as dependências do projeto rodando o terminal na raiz do diretório:
   ```bash
   npm install
