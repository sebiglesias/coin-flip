# Coin Flip 🪙

A simple, beautiful, and fun coin flip web app with smooth animations. Built with vanilla JavaScript, HTML, and CSS.

## Features

- 🎯 **Simple & Intuitive** - Click the coin to flip it
- ✨ **Beautiful Animations** - Smooth 3D flip animations
- 📊 **Streak Tracking** - Keep track of consecutive heads or tails
- 💾 **Persistent Storage** - Your streaks are automatically saved using localStorage
- 📱 **Progressive Web App (PWA)** - Install and use offline
- 🎨 **Responsive Design** - Works on all devices
- ⚡ **SEO Optimized** - Proper meta tags and Open Graph support

## How to Use

1. **Online**: Simply open `index.html` in your web browser
2. **Local Server**: For PWA features, serve the files using a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```
3. **Click the coin** or press **Space/Enter** to flip
4. Watch the animation and see if it's Heads or Tails!
5. Track your streaks - when you get Heads, the Tails counter resets to 0, and vice versa

## PWA Features

- **Installable**: Add to your home screen on mobile or desktop
- **Offline Support**: Works without internet connection
- **Fast Loading**: Resources are cached for instant access
- **Responsive**: Adapts to any screen size

## Technical Details

- **No dependencies** - Pure vanilla JavaScript
- **localStorage** for persistence
- **Service Worker** for offline functionality
- **CSS animations** for smooth 3D effects
- **Manifest.json** for PWA configuration

## Browser Support

Works on all modern browsers that support:
- CSS3 Transforms
- localStorage
- Service Workers (for PWA features)

## License

Open source and free to use!
