import { model } from "./mainModule.js";

const topicsContainer = document.getElementById('topics-container');
const chatArea = document.getElementById('chat-area');
const userMessageInput = document.getElementById('user-message');
const sendBtn = document.getElementById('send-btn');
const resetBtn = document.getElementById('reset-btn');
const resetChatBtn = document.getElementById('reset-btn-chat');

const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const clearChatButton = document.querySelector(".clear-chat-btn");
const typingContainer = document.querySelector(".typing-container"); // Select the typing container

let chatHistory = [];

// Fetch random prompts
const fetchRandomPrompts = async () => {
    try {
        const result = await model.generateContent("Generate four random topics or questions about Bong Bong Marcos");
        const response = await result.response.text();
        return response.split('\n').map(prompt => prompt.replace(/^\d+\.\s*/, '')); // Clean prompts
    } catch (error) {
        console.error("Error fetching prompts:", error);
        return [];
    }
};

// Display the initial greeting
const displayGreeting = async () => {
    const greetingBubble = document.createElement("div");
    greetingBubble.classList.add("chat-content", "bot");
    greetingBubble.innerHTML = `<div class="chat-inner-body"><p>FE!N: Hello, how may I help you today?</p></div>`;
    chatContainer.appendChild(greetingBubble);

    const randomSuggestions = await fetchRandomPrompts(); // Fetch random suggestions
    const suggestionButtons = randomSuggestions
        .map(suggestion => `<button class="topic-btn">${escapeHtml(suggestion)}</button>`)
        .join(" ");

    greetingBubble.innerHTML += `<div class="suggestions">${suggestionButtons}</div>`;

    const newButtons = greetingBubble.querySelectorAll(".topic-btn");
    newButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const selectedTopic = button.textContent; // Get the selected topic
            sendMessage(selectedTopic); // Send the selected topic directly
        });
    });

    chatContainer.scrollTop = chatContainer.scrollHeight;
};

// Escape HTML
const escapeHtml = (unsafe) => {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};
// Send message and disable input
const sendMessage = (message) => {
    const userText = message || chatInput.value.trim();
    if (!userText) return;

    // Create user chat bubble
    const userBubble = document.createElement("div");
    userBubble.classList.add("chat-content", "user");
    userBubble.innerHTML = `<div class="chat-inner-body"><p><strong>YOU:</strong> ${escapeHtml(userText)}</p></div>`;
    chatContainer.appendChild(userBubble);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Remove suggestions after sending the selected suggestion
    const suggestions = chatContainer.querySelector(".suggestions");
    if (suggestions) {
        suggestions.remove();
    }

    // Disable input and send button
    chatInput.disabled = true;
    sendButton.disabled = true;
    clearChatButton.disabled = true;

    getChatResponse(userText); // Call to function to get response (needs implementation)
    chatInput.value = "";
};


// Typing animation
const showTypingAnimation = () => {
    const typingBubble = document.createElement("div");
    typingBubble.classList.add("chat-content", "bot");
    typingBubble.innerHTML = `<div class="chat-inner-body"><p>FE!N is typing${getDots()}</p></div>`;
    chatContainer.appendChild(typingBubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return typingBubble;
};

const getDots = () => {
    return '<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
};

// Remove typing animation
const removeTypingAnimation = (typingBubble) => {
    typingBubble.remove();
};

// Get chat response and enable input after FE!N responds
const getChatResponse = async (userText) => {
    // Simulate typing animation and response retrieval
    const typingBubble = showTypingAnimation();

    chatHistory.push({ role: 'user', content: userText });

    try {
        const result = await model.generateContent(
            chatHistory.map(msg => `${msg.role}: ${msg.content}`).join("\n"),
            {
                temperature: 0.7,
                maxTokens: 150
            }
        );

        const response = await result.response.text();
        const formattedResponse = formatResponse(response);

        if (chatHistory.length > 10) {
            chatHistory.shift();
        }

        chatHistory.push({ role: 'bot', content: formattedResponse });

        removeTypingAnimation(typingBubble);

        // Create bot chat bubble
        const botBubble = document.createElement("div");
        botBubble.classList.add("chat-content", "bot");
        botBubble.innerHTML = `<div class="chat-inner-body"><p><strong>FE!N:</strong></p><p>${formattedResponse}</p></div>`;
        chatContainer.appendChild(botBubble);

        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Enable input after the bot responds
        chatInput.disabled = false;
        sendButton.disabled = false;
        clearChatButton.disabled = false;
        chatInput.focus();

    } catch (error) {
        console.error("Error occurred:", error);
        removeTypingAnimation(typingBubble);

        const errorBubble = document.createElement("div");
        errorBubble.classList.add("chat-content", "bot");
        errorBubble.innerHTML = `<div class="chat-inner-body"><p><strong>FE!N:</strong></p><p>Oops! There was an issue.</p></div>`;
        chatContainer.appendChild(errorBubble);

        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Enable input after an error
        chatInput.disabled = false;
        sendButton.disabled = false;
        clearChatButton.disabled = false;
        chatInput.focus();
    }
};

     
 
// Format response with HTML
const formatResponse = (response) => {
    let formatted = response
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/~~(.*?)~~/g, '<del>$1</del>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>')
        .trim();

    formatted = formatted.replace(/^• (.*?)(\n|$)/gm, '<li>$1</li>');
    formatted = formatted.replace(/(<li>.*<\/li>)+/g, '<ul>$&</ul>');
    formatted = formatted.replace(/^\d+\. (.*?)(\n|$)/gm, '<li>$1</li>');
    formatted = formatted.replace(/(<li>.*<\/li>)+/g, '<ol>$&</ol>');
    formatted = formatted.replace(/(<br>){2,}/g, '<br><br>');

    return formatted;
};

// Clear chat functionality
clearChatButton.addEventListener("click", () => {
    chatContainer.innerHTML = "";
    chatHistory = [];
    displayGreeting();
});

// Initial greeting display
displayGreeting();

sendButton.addEventListener("click", () => sendMessage());

chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

// Reset chat functionality
resetChatBtn.addEventListener("click", () => {
    chatContainer.innerHTML = "";
    chatHistory = [];
    displayGreeting();
});
