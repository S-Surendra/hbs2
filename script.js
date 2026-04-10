// --- DOM Elements ---
const bgMusic = document.getElementById('bgMusic');
const blowSound = document.getElementById('blowSound');
const celebMusic = document.getElementById('celebMusic');
let audioContextStarted = false;

// --- Navigation Function ---
function navigate(targetPageId) {
    // Audio Context unlock on first interaction
    if (!audioContextStarted) {
        bgMusic.volume = 0.3; // Low volume for background
        bgMusic.play().catch(e => console.log("Audio autoplay blocked until interaction."));
        audioContextStarted = true;
    }

    // Handle Page Transitions
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        // Small timeout to allow fade out before hiding from DOM flow
        setTimeout(() => {
            if(!page.classList.contains('active')){
                page.classList.add('hidden');
            }
        }, 600);
    });

    const target = document.getElementById(targetPageId);
    target.classList.remove('hidden');
    // Small timeout to allow display:block to apply before animating opacity
    setTimeout(() => {
        target.classList.add('active');
    }, 50);

    // Page Specific Logic
    if(targetPageId === 'page-3') {
        startCelebration();
    }
    if(targetPageId === 'page-4') {
        triggerFireworks();
    }
}

// --- Page 2: Cake Cutting Logic ---
function blowCandles() {
    const flame = document.getElementById('flame');
    const blowBtn = document.getElementById('blowBtn');
    const continueSec = document.getElementById('continue-section');

    // Play Sound
    blowSound.play().catch(e => console.log("Sound error"));

    // Extinguish Flame
    flame.classList.add('extinguished');
    blowBtn.classList.add('hidden');

    // Trigger Confetti using Canvas-Confetti library
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff9a9e', '#fecfef', '#f6d365', '#ffffff']
    });

    // Show Next Button
    setTimeout(() => {
        continueSec.classList.remove('hidden');
        continueSec.classList.add('animate-pop');
    }, 1000);
}

// --- Page 3: Celebration Logic ---
function startCelebration() {
    // Switch Music
    bgMusic.pause();
    celebMusic.volume = 0.5;
    celebMusic.play().catch(e => console.log("Sound error"));

    // Message Carousel Logic
    const messages = document.querySelectorAll('.carousel-text');
    let currentIndex = 0;

    setInterval(() => {
        messages[currentIndex].classList.add('hidden');
        messages[currentIndex].classList.remove('active');
        
        currentIndex = (currentIndex + 1) % messages.length;
        
        messages[currentIndex].classList.remove('hidden');
        messages[currentIndex].classList.add('active', 'animate-pop');
    }, 3000); // Change message every 3 seconds

    // Continuous soft confetti
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        const particleCount = 20 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// --- Page 4: Fireworks Logic ---
function triggerFireworks() {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}