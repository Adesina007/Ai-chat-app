const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;
  displayMessage('You', message, 'user-msg');
  userInput.value = '';

  try {
    const res = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    displayMessage('AI', data.reply || data.error, 'ai-msg');
  } catch (err) {
    displayMessage('AI', 'Error sending message', 'ai-msg');
  }
});

function displayMessage(sender, msg, cls) {
  const d = document.createElement('div');
  d.classList.add(cls);
  d.textContent = `${sender}: ${msg}`;
  chatBox.appendChild(d);
  chatBox.scrollTop = chatBox.scrollHeight;
}
