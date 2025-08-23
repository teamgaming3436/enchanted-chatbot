document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const chatBox = document.getElementById("chat-box");
    const newChatBtn = document.getElementById("new-chat-btn");
    const themeToggle = document.getElementById("theme-toggle");

    // Initialize
    initializeApp();

    function initializeApp() {
        // Load theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        
        // Setup event listeners
        setupEventListeners();
        
        // Auto-resize textarea
        setupTextareaAutoResize();
        
        // Update send button state
        updateSendButtonState();
    }

    function setupEventListeners() {
        sendBtn.addEventListener("click", sendMessage);
        userInput.addEventListener("keydown", handleKeyDown);
        userInput.addEventListener("input", updateSendButtonState);
        newChatBtn.addEventListener("click", startNewChat);
        themeToggle.addEventListener("click", toggleTheme);
    }

    function setupTextareaAutoResize() {
        userInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    function updateSendButtonState() {
        const hasText = userInput.value.trim().length > 0;
        sendBtn.disabled = !hasText;
    }

    async function sendMessage() {
        const messageText = userInput.value.trim();
        if (messageText === "") return;

        // Hide welcome message if it exists
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }

        // Display user's message
        addMessage(messageText, "user");
        userInput.value = "";
        userInput.style.height = 'auto';
        updateSendButtonState();
        userInput.focus();

        // Add thinking indicator
        const thinkingIndicator = addThinkingIndicator();

        try {
            // Send message to the backend
            const response = await fetch("/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: messageText }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Remove thinking indicator and display bot's response
            thinkingIndicator.remove();
            addMessage(data.response, "bot");

        } catch (error) {
            console.error("Error:", error);
            thinkingIndicator.remove();
            addMessage("Sorry, something went wrong. Please try again.", "bot");
        }
    };

    function addMessage(text, sender) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", `${sender}-message`);
        
        // Create avatar
        const avatar = document.createElement("div");
        avatar.classList.add("message-avatar");
        avatar.textContent = sender === "user" ? "U" : "✨";
        
        // Create message content
        const messageContent = document.createElement("div");
        messageContent.classList.add("message-content");
        
        // Render markdown for bot messages
        if (sender === "bot") {
            messageContent.innerHTML = renderMarkdown(text);
        } else {
            messageContent.textContent = text;
        }
        
        messageElement.appendChild(avatar);
        messageElement.appendChild(messageContent);

        chatBox.appendChild(messageElement);
        scrollToBottom();
        
        return messageElement;
    }

    function addThinkingIndicator() {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", "bot-message");
        
        const avatar = document.createElement("div");
        avatar.classList.add("message-avatar");
        avatar.textContent = "✨";
        
        const messageContent = document.createElement("div");
        messageContent.classList.add("message-content");
        
        const thinkingDiv = document.createElement("div");
        thinkingDiv.classList.add("thinking-indicator");
        
        // Create animated dots
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement("div");
            dot.classList.add("thinking-dot");
            thinkingDiv.appendChild(dot);
        }
        
        messageContent.appendChild(thinkingDiv);
        messageElement.appendChild(avatar);
        messageElement.appendChild(messageContent);

        chatBox.appendChild(messageElement);
        scrollToBottom();
        
        return messageElement;
    }

    function renderMarkdown(text) {
        // Simple markdown rendering
        let html = text;
        
        // Bold text **text**
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Italic text *text*
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Unordered lists
        html = html.replace(/^\* (.+)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        
        // Line breaks
        html = html.replace(/\n/g, '<br>');
        
        return html;
    }

    function scrollToBottom() {
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function startNewChat() {
        // Clear chat box
        chatBox.innerHTML = '';
        
        // Add welcome message back
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'welcome-message';
        welcomeDiv.innerHTML = `
            <div class="welcome-icon">✨</div>
            <h2>Welcome to Enchanted</h2>
            <p>Your intelligent AI assistant is ready to help. Ask me anything!</p>
        `;
        chatBox.appendChild(welcomeDiv);
        
        // Clear input
        userInput.value = '';
        userInput.style.height = 'auto';
        updateSendButtonState();
        userInput.focus();
    }

    function toggleTheme() {
        const body = document.body;
        const isDark = body.classList.contains('dark-theme');
        
        if (isDark) {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    }

    function setTheme(theme) {
        const body = document.body;
        
        if (theme === 'dark') {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
        
        localStorage.setItem('theme', theme);
    }

});
