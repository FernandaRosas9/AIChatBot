document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const customAlert = document.getElementById("custom-alert");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const darkModeIcon = document.querySelector("#dark-mode-toggle i");

  
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    darkModeIcon.classList.remove("fa-moon");
    darkModeIcon.classList.add("fa-sun");
  }

  
  function showAlert(message) {
    customAlert.textContent = message;
    customAlert.style.opacity = 1;
    setTimeout(() => {
      customAlert.style.opacity = 0;
    }, 3000);
  }

  
  function addMessage(text, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", `${sender}-message`);
    const content = sender === "bot" ? marked.parse(text) : text;
    messageElement.innerHTML = content;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageElement; 
  }

 
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userMessage = userInput.value.trim();

    if (userMessage) {
      addMessage(userMessage, "user");
      getResponseFromApi(userMessage);
      userInput.value = "";
    }
  });

  
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      darkModeIcon.classList.remove("fa-moon");
      darkModeIcon.classList.add("fa-sun");
    } else {
      localStorage.setItem("theme", "light");
      darkModeIcon.classList.remove("fa-sun");
      darkModeIcon.classList.add("fa-moon");
    }
  });

  
  async function getResponseFromApi(message) {
    const apiKey = document.getElementById("api-key").value.trim();

    if (!apiKey) {
      showAlert("Chave inválida. Por favor, insira sua chave.");
      return;
    }

    const loadingMessage = addMessage("Digitando", "bot");
    loadingMessage.classList.add("loading"); 

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error.message || `Erro da API: ${response.status}`
        );
      }

      const data = await response.json();
      const botMessageText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      loadingMessage.classList.remove("loading"); 
      if (botMessageText) {
        loadingMessage.innerHTML = marked.parse(botMessageText);
      } else {
        loadingMessage.textContent =
          "Desculpe, não consegui gerar uma resposta.";
      }
    } catch (error) {
      console.error("Falha ao se comunicar com a API:", error);
      loadingMessage.classList.remove("loading"); 
      loadingMessage.textContent =
        "Desculpe, houve um erro ao processar sua solicitação. Verifique a chave da API e tente novamente.";
    }
  }


  addMessage("Olá! Eu sou a nIAh, sua Assistente de IA. Como posso te ajudar hoje?", "bot");
});
