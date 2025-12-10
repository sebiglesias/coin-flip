// DOM Elements
const coin = document.getElementById('coin');
const result = document.getElementById('result');
const headsCounter = document.getElementById('headsCounter');
const tailsCounter = document.getElementById('tailsCounter');

// State
let isFlipping = false;
let headsStreak = 0;
let tailsStreak = 0;

// Load saved streaks from localStorage
function loadStreaks() {
    const savedHeadsStreak = localStorage.getItem('headsStreak');
    const savedTailsStreak = localStorage.getItem('tailsStreak');
    
    if (savedHeadsStreak !== null) {
        headsStreak = parseInt(savedHeadsStreak, 10);
        headsCounter.textContent = headsStreak;
    }
    
    if (savedTailsStreak !== null) {
        tailsStreak = parseInt(savedTailsStreak, 10);
        tailsCounter.textContent = tailsStreak;
    }
}

// Save streaks to localStorage
function saveStreaks() {
    localStorage.setItem('headsStreak', headsStreak);
    localStorage.setItem('tailsStreak', tailsStreak);
}

// Update counter display with animation
function updateCounters(isHeads) {
    if (isHeads) {
        headsStreak++;
        tailsStreak = 0;
        headsCounter.textContent = headsStreak;
        tailsCounter.textContent = tailsStreak;
        
        // Add pulse animation
        const headsCounterEl = document.querySelector('.heads-counter');
        headsCounterEl.classList.add('active');
        setTimeout(() => headsCounterEl.classList.remove('active'), 500);
    } else {
        tailsStreak++;
        headsStreak = 0;
        headsCounter.textContent = headsStreak;
        tailsCounter.textContent = tailsStreak;
        
        // Add pulse animation
        const tailsCounterEl = document.querySelector('.tails-counter');
        tailsCounterEl.classList.add('active');
        setTimeout(() => tailsCounterEl.classList.remove('active'), 500);
    }
    
    saveStreaks();
}

// Show result with animation
function showResult(isHeads) {
    result.textContent = isHeads ? '🎉 HEADS!' : '🎉 TAILS!';
    result.className = 'result show ' + (isHeads ? 'heads-result' : 'tails-result');
}

// Hide result
function hideResult() {
    result.className = 'result';
}

// Flip the coin
function flipCoin() {
    if (isFlipping) return;
    
    isFlipping = true;
    hideResult();
    
    // Remove previous animation classes
    coin.classList.remove('flip-heads', 'flip-tails');
    
    // Random result (true = heads, false = tails)
    const isHeads = Math.random() < 0.5;
    
    // Trigger reflow to restart animation
    void coin.offsetWidth;
    
    // Add flipping class and animation
    coin.classList.add('flipping');
    coin.classList.add(isHeads ? 'flip-heads' : 'flip-tails');
    
    // After animation completes
    setTimeout(() => {
        isFlipping = false;
        coin.classList.remove('flipping');
        showResult(isHeads);
        updateCounters(isHeads);
    }, 2000);
}

// Event listeners
coin.addEventListener('click', flipCoin);

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        flipCoin();
    }
});

// Load streaks on page load
loadStreaks();

// PWA Installation
let deferredPrompt;
let installButton;

// Create install button
function createInstallButton() {
    const container = document.createElement('div');
    container.className = 'install-container';
    
    installButton = document.createElement('button');
    installButton.className = 'install-button';
    installButton.textContent = '📱 Install App';
    
    container.appendChild(installButton);
    document.body.appendChild(container);
    
    installButton.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
        installButton.classList.remove('show');
    });
}

// Listen for install prompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    if (!installButton) {
        createInstallButton();
    }
    
    installButton.classList.add('show');
});

// Log installation
window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    deferredPrompt = null;
    if (installButton) {
        installButton.classList.remove('show');
    }
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful:', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed:', err);
            });
    });
}
