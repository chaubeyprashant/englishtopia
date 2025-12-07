# Deployment Guide - Unolingo

This guide covers how to deploy and run the Unolingo project on a different system and server.

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Server Deployment](#server-deployment)
3. [YouTube Videos Setup](#youtube-videos-setup)
4. [Books Setup](#books-setup)
5. [Configuration Checklist](#configuration-checklist)

---

## Local Development Setup

### Prerequisites
- Python 3.x (for local HTTP server)
- OR Node.js (for alternative server)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Step 1: Transfer Project Files

1. Copy the entire project folder to the new system
2. Ensure all files are present:
   ```
   englishtopia/
   ├── app.js
   ├── style.css
   ├── homepage.html
   ├── videos.html
   ├── books.html
   ├── youtube-relay.html
   ├── level-test.html
   ├── level-result.html
   ├── quizzes.html
   ├── quiz-taking.html
   ├── quiz.js
   ├── profile.html
   ├── settings.html
   ├── translator.html
   ├── login.html
   ├── signup.html
   └── index.html
   ```

### Step 2: Start Local Development Server

**Option A: Python HTTP Server (Recommended)**
```bash
# Navigate to project directory
cd /path/to/englishtopia

# Start server on port 8000
python3 -m http.server 8000

# Access at: http://localhost:8000/homepage.html
```

**Option B: Node.js HTTP Server**
```bash
# Install http-server globally (if not installed)
npm install -g http-server

# Navigate to project directory
cd /path/to/englishtopia

# Start server
http-server -p 8000

# Access at: http://localhost:8000/homepage.html
```

**Option C: VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Right-click on `homepage.html`
3. Select "Open with Live Server"

### Step 3: Verify Local Setup

1. Open browser to `http://localhost:8000/homepage.html`
2. Test navigation between pages
3. Test level test functionality
4. Verify localStorage works (check browser DevTools)

---

## Server Deployment

### Option 1: Static Hosting (Recommended for Simple Deployment)

#### CloudFlare Pages
1. **Create Account**: Sign up at [cloudflare.com](https://www.cloudflare.com)
2. **Create New Project**:
   - Go to CloudFlare Pages dashboard
   - Click "Create a project"
   - Connect your Git repository OR upload files directly
3. **Configure Build**:
   - Build command: (leave empty - static site)
   - Build output directory: `/` (root)
4. **Deploy**: Click "Save and Deploy"
5. **Access**: Your site will be available at `your-project.pages.dev`

#### GitHub Pages
1. **Create Repository**: Create a new GitHub repository
2. **Upload Files**: Upload all project files to the repository
3. **Enable Pages**:
   - Go to repository Settings → Pages
   - Select source branch (usually `main` or `master`)
   - Select `/root` as folder
   - Click "Save"
4. **Access**: Your site will be available at `username.github.io/repository-name`

#### Netlify
1. **Create Account**: Sign up at [netlify.com](https://www.netlify.com)
2. **Deploy**:
   - Drag and drop your project folder, OR
   - Connect to Git repository
3. **Configure**:
   - Build command: (leave empty)
   - Publish directory: `/` (root)
4. **Access**: Your site will be available at `your-project.netlify.app`

#### Vercel
1. **Create Account**: Sign up at [vercel.com](https://www.vercel.com)
2. **Import Project**: Import your Git repository or upload files
3. **Deploy**: Click "Deploy"
4. **Access**: Your site will be available at `your-project.vercel.app`

### Option 2: Traditional Web Server (Apache/Nginx)

#### Apache Setup
1. **Install Apache** (if not installed)
2. **Copy Files**:
   ```bash
   sudo cp -r englishtopia/* /var/www/html/
   ```
3. **Set Permissions**:
   ```bash
   sudo chown -R www-data:www-data /var/www/html/
   sudo chmod -R 755 /var/www/html/
   ```
4. **Access**: `http://your-server-ip/homepage.html`

#### Nginx Setup
1. **Install Nginx** (if not installed)
2. **Create Configuration**:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/englishtopia;
       index homepage.html;

       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```
3. **Copy Files**:
   ```bash
   sudo cp -r englishtopia/* /var/www/englishtopia/
   ```
4. **Restart Nginx**:
   ```bash
   sudo systemctl restart nginx
   ```

---

## YouTube Videos Setup

### Critical: YouTube Embed Relay Deployment

YouTube videos require the relay to be hosted on an HTTPS domain. Follow these steps:

### Step 1: Deploy YouTube Relay

1. **Upload `youtube-relay.html`** to your hosting service:
   - CloudFlare Pages
   - GitHub Pages
   - Netlify
   - Vercel
   - Any static hosting service

2. **Note Your Relay URL**:
   - Example: `https://your-domain.com/youtube-relay.html`
   - Or: `https://your-project.pages.dev/youtube-relay.html`

### Step 2: Update Relay URL in videos.html

1. Open `videos.html` in a text editor
2. Find the `RELAY_URL` constant (around line 200)
3. Update it to your deployed relay URL:

```javascript
// Replace this line:
const RELAY_URL = window.location.origin + '/youtube-relay.html';

// With your deployed relay URL:
const RELAY_URL = 'https://your-domain.com/youtube-relay.html';
```

### Step 3: Verify YouTube Videos Work

1. Deploy the updated `videos.html`
2. Test clicking "Watch" on any video
3. Verify the modal opens and video loads
4. Check browser console for any errors

### Troubleshooting YouTube Videos

**Issue**: Videos show Error 153 or don't load
- **Solution**: Ensure relay is deployed on HTTPS (not HTTP)
- **Solution**: Verify `RELAY_URL` in `videos.html` is correct
- **Solution**: Check browser console for CORS errors

**Issue**: Relay URL not found
- **Solution**: Verify `youtube-relay.html` is in the root directory of your hosting
- **Solution**: Check file permissions (should be readable)

---

## Books Setup

### Step 1: Verify Book URLs

Books use external URLs from Project Gutenberg. No additional setup needed, but verify:

1. Open `books.html`
2. Check that book URLs are accessible:
   - `https://www.gutenberg.org/files/...`
   - These are public domain books

### Step 2: Test Books Functionality

1. Navigate to Books page
2. Click "Start reading" on any book
3. Verify the modal opens and book loads
4. Check if books load in iframe

### Troubleshooting Books

**Issue**: Books don't load
- **Solution**: Check internet connection (books load from external URLs)
- **Solution**: Verify Project Gutenberg URLs are accessible
- **Solution**: Check browser console for CORS/loading errors

**Issue**: Book images don't show
- **Solution**: Placeholder images should work automatically
- **Solution**: Check browser console for image loading errors

---

## Configuration Checklist

### Pre-Deployment Checklist

- [ ] All HTML files are present
- [ ] `app.js` and `style.css` are included
- [ ] `youtube-relay.html` is included
- [ ] All image placeholders are working
- [ ] Local testing works on HTTP server (not file://)

### YouTube Videos Checklist

- [ ] `youtube-relay.html` is deployed to HTTPS domain
- [ ] `RELAY_URL` in `videos.html` is updated to deployed relay URL
- [ ] Videos load correctly in modal
- [ ] No Error 153 in browser console

### Books Checklist

- [ ] Book URLs are accessible
- [ ] Books load in modal iframe
- [ ] Placeholder images display correctly

### General Functionality Checklist

- [ ] Navigation between pages works
- [ ] Level test saves results correctly
- [ ] Progress bar updates after completing test
- [ ] User registration/login works (localStorage)
- [ ] Quizzes work correctly
- [ ] Profile page displays user data

---

## Environment-Specific Configuration

### Development Environment
- Use `http://localhost:8000` for local testing
- `RELAY_URL` can use `window.location.origin + '/youtube-relay.html'`
- All features should work locally

### Production Environment
- Deploy to HTTPS hosting service
- Update `RELAY_URL` to absolute HTTPS URL
- Ensure all external resources (fonts, placeholders) load correctly
- Test on multiple browsers

---

## Quick Start Commands

### Local Development
```bash
# Start Python server
python3 -m http.server 8000

# Start Node.js server
npx http-server -p 8000

# Access site
open http://localhost:8000/homepage.html
```

### Deployment to CloudFlare Pages
1. Upload project folder
2. Deploy automatically
3. Update `RELAY_URL` in `videos.html` to CloudFlare Pages URL
4. Redeploy

### Deployment to GitHub Pages
```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo-name.git
git push -u origin main

# Then enable Pages in GitHub settings
```

---

## Important Notes

1. **HTTPS Required**: YouTube embeds require HTTPS. Always deploy to HTTPS hosting.

2. **LocalStorage**: User data is stored in browser localStorage. Clearing browser data will reset user progress.

3. **CORS**: Some features may not work if opened via `file://` protocol. Always use HTTP server.

4. **Browser Compatibility**: Test on Chrome, Firefox, Safari, and Edge for best compatibility.

5. **Mobile Responsive**: The site is responsive, but test on mobile devices after deployment.

---

## Support & Troubleshooting

### Common Issues

**Issue**: Progress bar doesn't update
- **Solution**: Check browser console for JavaScript errors
- **Solution**: Verify `app.js` is loaded correctly
- **Solution**: Clear browser cache and localStorage

**Issue**: Videos don't work after deployment
- **Solution**: Verify relay is deployed and accessible
- **Solution**: Check `RELAY_URL` is correct HTTPS URL
- **Solution**: Test relay URL directly in browser

**Issue**: Books don't load
- **Solution**: Check internet connection
- **Solution**: Verify Project Gutenberg URLs are accessible
- **Solution**: Check browser console for errors

---

## Additional Resources

- [CloudFlare Pages Documentation](https://developers.cloudflare.com/pages/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [YouTube Embed API Documentation](https://developers.google.com/youtube/iframe_api_reference)
- [Project Gutenberg](https://www.gutenberg.org/)

---

## Version History

- **v1.0** - Initial deployment guide
- Includes YouTube relay setup
- Includes books setup
- Includes server deployment options

