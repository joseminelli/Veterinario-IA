const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");


//const apiKey = "SUA_KEY";

let genAIClient;
let debug = false;

function initGenAI() {
  gapi.client
    .init({
      apiKey: apiKey,
      discoveryDocs: [
        "https://generativelanguage.googleapis.com/$discovery/rest?version=v1beta",
      ],
    })
    .then(() => {
      genAIClient = gapi.client.generativelanguage;
      console.log("API do Gemini inicializada.");
    })
    .catch((error) => {
      console.error("Erro ao inicializar a API do Gemini:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  sendButton.addEventListener("click", sendMessage);

  mensagem =
    "Olá! Como posso ajudar você e seus pets? Se você tiver alguma dúvida sobre cuidados com pets é só me falar!";
  appendMessage("bot", mensagem);

  userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  gapi.load("client", initGenAI);
});

async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    appendMessage("user", userMessage);
    userInput.value = "";
    if (debug) {
      appendMessage("bot", "Debug mode: mensagem não enviada para o Gemini.");
    } else {
      if (genAIClient) {
        try {
          const systemInstruction =
            "Você é um veterinário, pode responder qualquer dúvida relacionada a pets, se a pergunta não for relacionada a isso, não tente responder, fale que não consegue responder sobre outros assuntos. Caso você receba uma pergunta sobre problema de um animal, de uma resposta e diga que sugere fortemente levar a um veterinário real. formate sua resposta como html, mas não colocque ```html só o corpo do html direto. Se for algo  importante alem do <b> coloque a class='atencao'\n\n";
          const promptWithInstruction = systemInstruction + userMessage;

          const response = await gapi.client.request({
            root: "https://generativelanguage.googleapis.com",
            path: "/v1beta/models/gemini-2.0-flash:generateContent",
            method: "POST",
            body: {
              contents: [
                {
                  parts: [
                    {
                      text: promptWithInstruction,
                    },
                  ],
                },
              ],
            },
          });

          if (
            response.result &&
            response.result.candidates &&
            response.result.candidates.length > 0 &&
            response.result.candidates[0].content &&
            response.result.candidates[0].content.parts &&
            response.result.candidates[0].content.parts.length > 0
          ) {
            let botResponse =
              response.result.candidates[0].content.parts[0].text;
            appendMessage("bot", botResponse);
          } else {
            console.warn("Resposta do Gemini incompleta:", response);
            appendMessage("bot", "A resposta do Gemini está incompleta.");
          }
        } catch (error) {
          console.error("Erro ao obter resposta do Gemini:", error);
          appendMessage("bot", "Ocorreu um erro ao obter a resposta.");
        }
      } else {
        appendMessage("bot", "A API do Gemini ainda não foi inicializada.");
      }
    }
  }
}

function appendMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(`${sender}-message`);

  if (sender === "bot") {
    const botInfoDiv = document.createElement("div");
    botInfoDiv.classList.add("bot-info");

    const botImage = document.createElement("img");
    botImage.src = "img/icon.jpg";
    botImage.alt = "Avatar do Bot";
    botImage.classList.add("bot-avatar");

    const botName = document.createElement("span");
    botName.textContent = "Veterinário IA";
    botName.classList.add("bot-name");

    botInfoDiv.appendChild(botImage);
    botInfoDiv.appendChild(botName);
    messageDiv.appendChild(botInfoDiv);
  }

  const messageText = document.createElement("p");
  messageText.innerHTML = text;
  messageDiv.appendChild(messageText);

  chatLog.appendChild(messageDiv);
  chatLog.scrollTop = chatLog.scrollHeight;
}

document.getElementById("send-btn").addEventListener("click", function () {
  const button = this;
  button.classList.add("clicked");

  setTimeout(() => {
    button.classList.remove("clicked");
  }, 1000);
});

function copyEmail() {
  const email = "joseminelli04@gmail.com";

  navigator.clipboard
    .writeText(email)
    .then(() => {
      showNotify("Email copiado para a área de transferência!");
    })
    .catch((err) => {
      showNotify("Falha ao copiar o email!", true);
      console.error(err);
    });
}

function showNotify(message, isError = false) {
  const container = document.getElementById("notify-container");

  const notify = document.createElement("div");
  notify.className = "notify";
  notify.textContent = message;

  if (isError) {
    notify.style.backgroundColor = "#f44336";
  }

  container.appendChild(notify);

  setTimeout(() => {
    notify.classList.add("show");
  }, 10);

  setTimeout(() => {
    notify.classList.remove("show");

    setTimeout(() => container.removeChild(notify), 400);
  }, 2500);
}
