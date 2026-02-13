// ==========================================
// Valentine's Day Surprise - Script
// ==========================================

const messages = [
    "Itt egy csokor, de tudd, hogy ennél is szebb vagy 💐",
    "Minden nap hálás vagyok, hogy Te vagy az életemben 💕",
    "A mosolyod az a fény, ami beragyogja a napjaimat ✨",
    "Ezer tulipán sem elég, hogy kifejezze, mennyire szeretlek 🌷",
    "Veled minden pillanat egy ajándék 🎁",
    "A szívem csak Érted dobban 💗",
    "Ha virág lennél, a legszebb lennél a kertben 🌸",
    "Nálad szebbet még álmomban sem láttam 💫",
    "Te vagy a legcsodálatosabb dolog, ami valaha történt velem 🥰",
    "A világon semmi sem hasonlítható a Te szépségedhez 💝",
    "Melletted minden nap Valentin-nap 🌹",
    "A szemed fénye szebb, mint ezer csillag az égen ⭐",
    "Köszönöm, hogy vagy nekem 💖",
    "Te vagy az álom, amiből sosem akarok felébredni 🦋"
];

// Track shown messages to avoid immediate repeats
let lastMessageIndex = -1;

// ========== FALLING HEARTS ==========
const heartsContainer = document.getElementById('heartsContainer');
const heartSymbols = ['❤️', '💕', '💗', '💖', '💝', '🩷', '♥️', '💓'];

function createHeart() {
    const heart = document.createElement('span');
    heart.classList.add('falling-heart');
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    // Random positioning & sizing
    const left = Math.random() * 100;
    const size = 0.7 + Math.random() * 1.6;
    const duration = 5 + Math.random() * 7;
    const swayDuration = 2 + Math.random() * 3;
    const delay = Math.random() * 0.5;

    heart.style.left = `${left}%`;
    heart.style.fontSize = `${size}rem`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;
    heart.style.animation = `
        heartFall ${duration}s linear ${delay}s forwards,
        heartSway ${swayDuration}s ease-in-out ${delay}s infinite
    `;

    heartsContainer.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, (duration + delay) * 1000 + 500);
}

// Create hearts at intervals
function startHearts() {
    // Initial burst
    for (let i = 0; i < 8; i++) {
        setTimeout(createHeart, i * 200);
    }

    // Continuous hearts
    setInterval(() => {
        createHeart();
    }, 600);
}

// ========== PANEL LOGIC ==========
const surpriseBtn = document.getElementById('surpriseBtn');
const overlay = document.getElementById('overlay');
const panel = document.getElementById('panel');
const closeBtn = document.getElementById('closeBtn');
const messageEl = document.getElementById('message');

function getRandomMessage() {
    let index;
    // Avoid showing the same message twice in a row
    do {
        index = Math.floor(Math.random() * messages.length);
    } while (index === lastMessageIndex && messages.length > 1);

    lastMessageIndex = index;
    return messages[index];
}

function openPanel() {
    messageEl.textContent = getRandomMessage();
    // Reset animations by removing and re-adding active class
    overlay.classList.remove('active');

    // Force reflow to restart animations
    void overlay.offsetWidth;

    overlay.classList.add('active');

    // Burst of extra hearts on open
    for (let i = 0; i < 12; i++) {
        setTimeout(createHeart, i * 80);
    }
}

function closePanel() {
    overlay.classList.remove('active');
}

// Event listeners
surpriseBtn.addEventListener('click', openPanel);
closeBtn.addEventListener('click', closePanel);

// Close on overlay click (but not panel click)
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        closePanel();
    }
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closePanel();
    }
});

// Prevent scroll on body when panel is open (mobile)
overlay.addEventListener('touchmove', (e) => {
    if (e.target === overlay) {
        e.preventDefault();
    }
}, { passive: false });

// ========== INIT ==========
startHearts();
