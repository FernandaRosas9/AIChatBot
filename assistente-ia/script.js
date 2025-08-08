document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userMessage = userInput.value.trim();

    if (userMessage) {
      addMessage(userMessage, "user");
      getResponseFromApi(userMessage);
      userInput.value = "";
    }
  });

  function addMessage(text, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", `${sender}-message`);
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function getResponseFromApi(message) {
    const apiKey = document.getElementById("api-key").value.trim();

    if(!apiKey) {
      alert("Chave inválida");
      return;
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    });

    const data = await response.json();

    return addMessage(data["candidates"][0]["content"]["parts"][0]["text"], "bot");
  }

  addMessage("Olá! Sou seu Assistente de IA. Como posso ajudar?", "bot");
});
