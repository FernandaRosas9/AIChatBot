# nIAh - Sua Assistente de IA Pessoal (Baseado em Gemini)

Este é um projeto de chatbot simples e interativo construído com **HTML, CSS e JavaScript** puro, que utiliza a **API do Gemini** para fornecer respostas inteligentes. O nome **nIAh** (ou o que você preferir!) representa uma assistente de IA moderna e útil.
aqui esta um vídeo com a aplicação em uso: https://youtu.be/vdjNlg-rQjY

## ✨ Recursos

* **Integração com a API do Google Gemini:** Comunicação direta para respostas avançadas e contextuais.
* **Histórico de Conversa Persistente:** Salva automaticamente as perguntas e respostas no **`localStorage`** do navegador, mantendo o contexto da conversa mesmo após o recarregamento.
* **Modo Escuro (Dark Mode):** Alterna o esquema de cores para uma melhor experiência visual, especialmente à noite, com persistência da preferência no `localStorage`.
* **Botão "Copiar" na Resposta:** Facilita a cópia rápida do conteúdo gerado pela IA.
* **Limpar Chat:** Um botão dedicado para apagar todo o histórico de conversa (`localStorage` e interface).
* **Alerta de Chave de API:** Validação básica da chave de API inserida pelo usuário.
* **Formatação de Respostas:** Utiliza a biblioteca `marked.js` para renderizar a formatação Markdown (`**negrito**`, `*itálico*`, etc.) das respostas da API.

## 🚀 Como Executar Localmente

Como este é um projeto de *front-end* puro, você só precisa de um navegador para executá-lo.

1.  **Clone o Repositório** (Assumindo que este código está em um repositório):
    ```bash
    git clone [LINK-DO-SEU-REPOSITORIO]
    cd [NOME-DO-PROJETO]
    ```
2.  **Abra o `index.html`:**
    Basta clicar duas vezes no arquivo `index.html` ou abri-lo em seu navegador preferido.

## ⚙️ Configuração (Chave de API)

Para que o chatbot funcione, você precisará de uma **Chave de API do Google AI Studio (ou Gemini API)**.

1.  **Obtenha sua Chave:** Crie sua chave no [Google AI Studio](https://ai.google.dev/gemini-api/docs/api-key).
2.  **Insira no Chatbot:** Na interface do chatbot, haverá um campo onde você deve inserir sua chave de API antes de enviar sua primeira mensagem.
3.  **Modelo Utilizado:** O código está configurado para usar o modelo `gemini-2.0-flash`.

## 💻 Estrutura do Código (Arquivo Principal - `script.js` ou similar)

O código JavaScript principal gerencia as seguintes funcionalidades:

| Variável/Função | Descrição |
| :--- | :--- |
| `responses`, `questions` | Arrays para armazenar e persistir o histórico de conversas no `localStorage`. |
| `addMessage(text, sender)` | Cria e adiciona uma nova mensagem ao `chat-box`, formatando a resposta do bot com `marked.js`. |
| `showAlert(message)` | Exibe uma pequena notificação de alerta (usada para chaves inválidas). |
| `getResponseFromApi(message)` | Função assíncrona que envia a mensagem do usuário para o *endpoint* da API do Gemini, tratando o estado de "Digitando" (`loading`) e erros. |
| **`darkModeToggle`** | Gerencia a alternância e persistência (`localStorage`) do modo escuro. |
| **`clearChatButton`** | Limpa o `chatBox` e o `localStorage`, reiniciando a conversa. |

## 🤝 Contribuição

Sinta-se à vontade para sugerir melhorias, reportar *bugs* ou adicionar novos recursos!

1.  Faça um **Fork** do projeto.
2.  Crie uma **Branch** para sua feature (`git checkout -b feature/minha-feature`).
3.  Faça o **Commit** das suas mudanças (`git commit -m 'feat: Adiciona feature XYZ'`).
4.  Envie para o seu **Fork** (`git push origin feature/minha-feature`).
5.  Abra um **Pull Request**.
