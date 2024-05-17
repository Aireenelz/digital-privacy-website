const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;

// API key
let API_KEY_CHATBOT = "";

// Fetch API keys from config.json
if (!API_KEY_CHATBOT) {
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            API_KEY_CHATBOT = config.chatbotApiKey;
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

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

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
        // Log the json data from api in console for debugging purpose
        console.log(data);

        // Display the bot response as incoming message
        messageElement.textContent = data.choices[0].message.content;

    }).catch((error) => {
        console.log(error);
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    })
}

// Handle when user send a message in the chatbot feature
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
        const incomingChatLi = createChatLi("Typing...", "incoming")
        chatbox.appendChild(incomingChatLi);

        // Call method to generate response based on user input and display the response as incoming message from the bot
        generateResponse(incomingChatLi);
    }, 600);
}

// Event listener for chatbot send button
sendChatBtn.addEventListener("click", handleChat);