document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userMessage = userInput.value.trim();
    if (userMessage) {
      addMessage(userMessage, "user");
      userInput.value = "";
      processUserMessage(userMessage);
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

  addMessage("Olá! Sou seu Assistente de IA. Como posso ajudar?", "bot");
});
