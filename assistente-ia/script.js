document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userMessage = userInput.value.trim();
    const responseFromApi = getResponseFromApi(userMessage);

    if (responseFromApi) {
      addMessage(responseFromApi, "user");
      userInput.value = "";
      processUserMessage(responseFromApi);
    }
  });

  function addMessage(text, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", `${sender}-message`);
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function processUserMessage(message) {
    const lowerCaseMessage = message.toLowerCase();
    let botResponse = "";

    if (lowerCaseMessage.includes("olá") || lowerCaseMessage.includes("oi")) {
      botResponse = "Olá! Como posso ajudar você hoje?";
    }

  }

  async function getResponseFromApi(message) {
    const apiKey = document.getElementById("api-key").value;

    if(!apiKey) {
      alert("Chave inválida");
      return;
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    if(data.choices && data.choices.length > 0) {
      const botResponse = data.choices[0].message.content.trim();
      return botResponse;
    } else {
      addMessage("Erro ao obter resposta", "bot");
    }
  }

  addMessage("Olá! Sou seu Assistente de IA. Como posso ajudar?", "bot");
});
