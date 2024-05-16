const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;

// API key
let API_KEY_CHATBOT = localStorage.getItem('API_KEY_CHATBOT');

// Fetch API keys from localStorage or config.json
if (!API_KEY_CHATBOT) {
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            API_KEY_CHATBOT = config.chatbotApiKey;
            localStorage.setItem('API_KEY_CHATBOT', API_KEY_CHATBOT);  // Store in browser localStorage
        })
        .catch(error => {
            console.error('Error fetching API keys:', error);
        });
}

// Create a chat <li> element with passed message and className to show conversation messages
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span><i class="fa-solid fa-robot"></i></span><p>${message}</p>`
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY_CHATBOT}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]
        })
    }

    // Send POST request to API, and get response
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
    })
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    console.log(userMessage);

    // Check if input field is empty
    if(!userMessage) return;

    // Append user message to chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    // Clear the textarea after sending the message
    chatInput.value = '';

    // Response
    setTimeout(() => {
        // Display loading message while response is being generated
        chatbox.appendChild(createChatLi("Typing...", "incoming"));

        // Call method to generate response
        generateResponse();
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);