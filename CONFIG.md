# Configuration Guide

## Quick Configuration for Deployment

### Step 1: Deploy YouTube Relay

1. Upload `youtube-relay.html` to your hosting service
2. Note the full HTTPS URL where it's accessible
   - Example: `https://your-project.pages.dev/youtube-relay.html`
   - Example: `https://your-domain.com/youtube-relay.html`

### Step 2: Update videos.html

Open `videos.html` and find this section (around line 200):

```javascript
// YouTube Embed Relay URL - Update this to your deployed relay URL
// See YOUTUBE_RELAY_SETUP.md for detailed setup instructions
// 
// For production: Deploy youtube-relay.html to an HTTPS hosting service
// (CloudFlare Pages, GitHub Pages, Netlify, etc.) and update this URL
// Example: 'https://your-relay-domain.pages.dev/youtube-relay.html'
//
// For local testing: Use a local HTTP server (not file:// protocol)
// Run: python3 -m http.server 8000
// Then access: http://localhost:8000/videos.html
const RELAY_URL = getRelayUrl();
```

**For Production**, replace the `getRelayUrl()` function call with your actual URL:

```javascript
// Replace this:
const RELAY_URL = getRelayUrl();

// With this (use your actual deployed relay URL):
const RELAY_URL = 'https://your-project.pages.dev/youtube-relay.html';
```

### Step 3: Test

1. Deploy your updated `videos.html`
2. Open the Videos page
3. Click "Watch" on any video
4. Verify the video loads in the modal

---

## Environment-Specific Configuration

### Local Development
```javascript
// Use this for local testing (works with HTTP server)
const RELAY_URL = window.location.origin + '/youtube-relay.html';
```

### Production/Staging
```javascript
// Use absolute HTTPS URL for production
const RELAY_URL = 'https://your-domain.com/youtube-relay.html';
```

---

## Books Configuration

**No configuration needed!** Books use external Project Gutenberg URLs and work automatically once deployed.

---

## Checklist

- [ ] `youtube-relay.html` is deployed to HTTPS hosting
- [ ] `RELAY_URL` in `videos.html` is updated to deployed URL
- [ ] All files are uploaded to server
- [ ] Test videos load correctly
- [ ] Test books load correctly
- [ ] Test level test and progress bar

