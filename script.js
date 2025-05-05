let xp= 0;
let level= 1;
const xpDisplay = document.getElementById("xp");
const levelDisplay = document.getElementById("level");
const xpBar = document.getElementById("xpBar");
const xpBarFill = document.getElementById("xpBarFill");
const quoteText = document.getElementById("quote-text");

const quotes = [
    "You got this!",
    "Let's continue.",
    "Give yourself a pat on the back.",
    "Every small step brings you closer to your goal.",
    "The journey of a thousand miles begins with one step.",
    "Keep grinding. XP doesn’t earn itself.",
    "Small wins lead to epic victories.",
    "Progress is progress, no matter how slow.",
    "Even heroes rest — come back stronger.",
    "Stay focused. You're building something great.",
    "You’re leveling up every time you show up.",
    "Fail forward. Every mistake is bonus XP.",
    "You've got more in you than you think.",
    "Boss fights are hard, but you’re harder.",
    "Keep showing up — that’s how legends are made.",
    "You’re not just playing; you’re building your steps.",
    "Every task completed is a step towards greatness.",
    "Today is a great day",
    "You are doing great!",
    "Keep up the good work!"
  ];
  function gainxp(amount) {
    xp += amount;
    while (xp >= level * 100) { // Handle multiple level-ups
        xp -= level * 100; // Deduct the XP required for the current level
        levelup();
    }
    updateDisplay();
  }
  function levelup() {
    level++;
    updateDisplay();
  }
  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
  function updateDisplay() {
    xpDisplay.textContent = xp;
    levelDisplay.textContent = level;
    xpBar.value = xp;
}

function showRandomQuote() {
    quoteText.textContent = getRandomQuote();
}

const gifContainer = document.getElementById("gif-container");
const GIPHY_API_KEY = "SWkpqZgOCia5uQgUj4X1vU3GWQPLfHCI"; // Replace with your key

function showMotivationalGif() {
  const query = "motivational";
  fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query}&limit=25`)
    .then(response => response.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.data.length);
      const gifUrl = data.data[randomIndex].images.original.url;
      gifContainer.innerHTML = `<img src="${gifUrl}" alt="Motivational GIF" style="max-width: 100%; height: auto;" />`;
    })
    .catch(error => console.error("Error fetching GIF:", error));
}

const addTaskBtn = document.getElementById("addTaskBtn");
const taskText = document.getElementById("taskText");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", () => {
    const task = taskText.value.trim();
    if (task) {
        const li = document.createElement("li"); 
        li.textContent = task;
        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            if (li.classList.contains("completed")) {
                gainxp(10); // Award XP 
                showRandomQuote(); // Show a motivational quote
                showMotivationalGif(); // Show a motivational GIF
            }
        });
        taskList.appendChild(li);
        taskText.value = ""; // Clear input field
    }
});
