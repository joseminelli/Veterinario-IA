# Chatbot Veterinário IA

Um chatbot inteligente que responde dúvidas relacionadas a cuidados com pets utilizando a API Gemini do Google (Generative Language API). O bot funciona como um veterinário virtual, auxiliando os usuários e sugerindo sempre a consulta a um veterinário real para casos de problemas mais graves.

---

## Funcionalidades

* Recebe perguntas do usuário sobre cuidados e dúvidas relacionadas a pets.
* Responde apenas perguntas no contexto veterinário.
* Caso a pergunta não seja sobre pets, avisa que não pode responder.
* Formata as respostas em HTML, destacando informações importantes.
* Sugere fortemente levar o pet ao veterinário real em caso de problemas.
* Interface simples com mensagens do usuário e do bot.

---

## Como usar

1. Clone o repositório:

```bash
git clone https://github.com/joseminelli/Veterinario-IA.git
```

2. Abra o arquivo `index.html` (ou o arquivo principal do seu projeto) em um navegador moderno.

3. Insira sua chave de API do Google para o serviço Gemini no arquivo JavaScript, linha 6:

```js
const apiKey = "SUA_KEY"; 
```

4. Digite uma pergunta na caixa de texto e envie. O chatbot responderá no campo de conversa.

---

## Tecnologias usadas

* HTML, CSS e JavaScript puro para a interface.
* Google API Client Library (`gapi`) para acessar a API Gemini.
* API Generative Language da Google (Gemini 2.0 Flash).

---

## Estrutura do código

* `initGenAI()`: Inicializa a API Gemini com sua chave.
* `sendMessage()`: Envia a mensagem do usuário para a API e recebe a resposta.
* `appendMessage()`: Adiciona mensagens do usuário e do bot ao chat.
* Eventos para enviar mensagem com botão ou tecla Enter.
* Função para copiar email e mostrar notificações.

---

## Observações importantes

* Caso faça fork, lembre de NÃO commitar com sua KEY.
* O bot está configurado para atuar como veterinário e recusar perguntas fora desse contexto.

---

## Contato

Se quiser entrar em contato, envie um email para:
`joseminelli04@gmail.com`

---

## Screenshots

