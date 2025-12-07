# Quick Deployment Guide

## 🚀 Fast Setup for New System/Server

### 1. Copy Files
Copy entire `englishtopia` folder to new system/server.

### 2. Start Local Server (Development)
```bash
cd englishtopia
python3 -m http.server 8000
# Open: http://localhost:8000/homepage.html
```

### 3. Deploy to Production

#### Option A: CloudFlare Pages (Easiest)
1. Go to [cloudflare.com/pages](https://pages.cloudflare.com)
2. Upload `englishtopia` folder
3. Deploy automatically
4. **IMPORTANT**: Update `videos.html` line ~200:
   ```javascript
   const RELAY_URL = 'https://your-project.pages.dev/youtube-relay.html';
   ```
5. Redeploy

#### Option B: GitHub Pages
1. Create GitHub repo
2. Upload all files
3. Settings → Pages → Enable
4. Update `RELAY_URL` in `videos.html` to GitHub Pages URL
5. Commit and push

### 4. YouTube Videos Setup (REQUIRED)

**Critical Step**: YouTube videos won't work without this!

1. **Deploy `youtube-relay.html`** to your hosting:
   - Upload to same location as other files
   - Must be accessible via HTTPS

2. **Update `videos.html`**:
   ```javascript
   // Find this line (around line 200):
   const RELAY_URL = window.location.origin + '/youtube-relay.html';
   
   // Replace with your deployed URL:
   const RELAY_URL = 'https://your-domain.com/youtube-relay.html';
   ```

3. **Test**: Click "Watch" on any video - should open modal

### 5. Books Setup

✅ **No setup needed!** Books use external Project Gutenberg URLs and work automatically.

### 6. Verify Everything Works

- [ ] Homepage loads
- [ ] Navigation works
- [ ] Level test works
- [ ] Progress bar updates
- [ ] Videos open in modal (check relay URL)
- [ ] Books open in modal
- [ ] Quizzes work

### ⚠️ Important Notes

1. **HTTPS Required**: YouTube needs HTTPS. Use CloudFlare Pages, GitHub Pages, Netlify, or Vercel.

2. **Relay URL**: Must be absolute HTTPS URL in production:
   ```javascript
   // ❌ Wrong (local only):
   const RELAY_URL = window.location.origin + '/youtube-relay.html';
   
   // ✅ Correct (production):
   const RELAY_URL = 'https://your-domain.com/youtube-relay.html';
   ```

3. **Local Testing**: Always use HTTP server, never `file://` protocol.

### 🔧 Troubleshooting

**Videos don't work?**
- Check relay URL is HTTPS
- Verify `youtube-relay.html` is deployed
- Check browser console for errors

**Progress bar not updating?**
- Clear browser localStorage
- Check browser console for errors
- Verify `app.js` loads correctly

**Books don't load?**
- Check internet connection
- Verify Project Gutenberg URLs are accessible

### 📝 Configuration Files to Update

1. **videos.html** (Line ~200):
   - Update `RELAY_URL` to your deployed relay URL

2. **That's it!** Everything else works automatically.

---

For detailed instructions, see `DEPLOYMENT_GUIDE.md`

