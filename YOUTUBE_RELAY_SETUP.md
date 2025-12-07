# YouTube Embed Relay Setup

This project uses a YouTube Embed Relay to resolve YouTube Error 153 issues when embedding videos. This solution is based on the approach discussed in [this Stack Overflow thread](https://stackoverflow.com/questions/79802987/youtube-error-153-video-player-configuration-error-when-embedding-youtube-video).

## Problem

YouTube Error 153 occurs when YouTube's embedded player cannot properly identify the referrer or origin of the embedding page. This is especially common when:
- Serving files via `file://` protocol
- Using local development servers
- Missing proper referrer policy headers

## Solution

The YouTube Embed Relay (`youtube-relay.html`) acts as an intermediary between your application and YouTube's embed API. It ensures:
- Proper HTTPS origin (required by YouTube)
- Correct referrer policy headers
- Proper origin parameter handling

## Setup Instructions

### Step 1: Deploy the Relay

1. Upload `youtube-relay.html` to an HTTPS hosting service:
   - **CloudFlare Pages** (recommended): Free and easy
   - **GitHub Pages**: Free for public repos
   - **Netlify**: Free tier available
   - **Vercel**: Free tier available
   - Any other static hosting service

2. Note your deployed relay URL, for example:
   - `https://your-app.pages.dev/youtube-relay.html`
   - `https://your-username.github.io/youtube-relay.html`
   - `https://your-app.netlify.app/youtube-relay.html`

### Step 2: Update the Relay URL

In `videos.html`, find the `RELAY_URL` constant (around line 130) and update it:

```javascript
// For production - replace with your deployed relay URL
const RELAY_URL = 'https://your-relay-domain.pages.dev/youtube-relay.html';

// For local development (if serving via HTTP server)
// const RELAY_URL = window.location.origin + '/youtube-relay.html';
```

### Step 3: Local Development

**Important**: YouTube embeds will NOT work when opening HTML files directly (`file://` protocol). You must serve files through a web server:

#### Option A: Python HTTP Server
```bash
# Navigate to project directory
cd /path/to/englishtopia

# Start server (Python 3)
python3 -m http.server 8000

# Access at http://localhost:8000/videos.html
```

#### Option B: Node.js HTTP Server
```bash
# Install http-server globally
npm install -g http-server

# Navigate to project directory
cd /path/to/englishtopia

# Start server
http-server -p 8000

# Access at http://localhost:8000/videos.html
```

#### Option C: VS Code Live Server
If using VS Code, install the "Live Server" extension and use it to serve your files.

## How It Works

1. User clicks "Watch" button on a video card
2. JavaScript extracts the YouTube video ID from the URL
3. The video ID is passed to the relay via query parameter: `?v=VIDEO_ID`
4. The relay page loads and creates a proper YouTube embed URL with:
   - Correct origin parameter
   - Required API parameters
   - Proper referrer policy
5. YouTube's embed API accepts the request because it comes from a valid HTTPS origin

## Troubleshooting

### Videos still not loading?

1. **Check relay URL**: Ensure `RELAY_URL` in `videos.html` points to your deployed relay
2. **Verify HTTPS**: The relay must be served over HTTPS (not HTTP)
3. **Check browser console**: Look for any CORS or referrer policy errors
4. **Test relay directly**: Try accessing `https://your-relay-url/youtube-relay.html?v=VIDEO_ID` directly in browser
5. **Local server**: Make sure you're using a local HTTP server, not opening files directly

### Error 153 persists?

- Verify the relay page has the `<meta name="referrer" content="strict-origin-when-cross-origin">` tag
- Check that the iframe in the relay has `referrerpolicy="strict-origin-when-cross-origin"`
- Ensure you're not blocking referrer headers in browser settings
- Try clearing browser cache

## References

- [Stack Overflow Discussion](https://stackoverflow.com/questions/79802987/youtube-error-153-video-player-configuration-error-when-embedding-youtube-video)
- [YouTube Required Minimum Functionality](https://developers.google.com/youtube/terms/required-minimum-functionality#embedded-player-api-client-identity)

