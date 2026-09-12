# Kadaron Construction — Website

Professional website for **Kadaron Construction** (RC: 1949711), built for GitHub Pages hosting.

---

## Quick Start — GitHub Pages Deployment

### 1. Create a GitHub repository

```bash
# Option A: Using Git
git init
git add .
git commit -m "Initial Kadaron Construction website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select `Deploy from a branch`
4. Set branch to `main`, folder to `/ (root)`
5. Click **Save**
6. Your site will be live at `https://YOUR_USERNAME.github.io/REPO_NAME/` within a few minutes

### 3. Custom Domain (Optional)

To use a custom domain (e.g. `kadaronconstruction.com`):
1. In GitHub Pages settings, enter your custom domain
2. Create a `CNAME` file in the root containing just your domain name
3. Point your domain's DNS to GitHub Pages:
   - A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Or CNAME record: `YOUR_USERNAME.github.io`

---

## Project Structure

```
/
├── index.html          # Main website file
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Navigation, lightbox, form, scroll effects
├── assets/
│   ├── images/         # Add real project photos here
│   ├── icons/          # Favicon and app icons
│   └── logo/           # High-res logo files
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## Content Customization

### Company Information

All company information is verified from the business card:
- **Company:** Kadaron Construction
- **RC:** 1949711
- **CEO:** Oyeniran Segun Kayode
- **Phone:** +234 706 957 7000
- **Email:** kadaron85@gmail.com
- **Instagram:** @kara_ron

To update any details, search `index.html` for the value and replace it.

---

## Replacing Placeholder Images

All placeholder images use Unsplash URLs. Replace them with **real Kadaron Construction photography**:

### Hero Image
```html
<!-- Line ~80 in index.html -->
<img src="YOUR_REAL_HERO_PHOTO.jpg" ... />
```

### About Image
```html
<!-- Look for class="about__img" -->
<img src="YOUR_TEAM_OR_SITE_PHOTO.jpg" ... />
```

### Service Images
Look for each `service-card__img` and replace the `src` with real photos.

### Project Photos
Find the `.project-item` blocks and update:
```html
<article class="project-item"
  data-title="YOUR PROJECT TITLE"
  data-cat="Project Category"
  data-desc="Description of the project for the lightbox..."
>
  <img src="YOUR_PROJECT_PHOTO.jpg" alt="Project description" />
```

**Recommended image sizes:**
| Location       | Size        | Format   |
|---------------|-------------|----------|
| Hero           | 1920×1080   | JPG @85% |
| About          | 900×1125    | JPG @80% |
| Services       | 800×600     | JPG @80% |
| Projects       | 800×600     | JPG @80% |
| Statement BG   | 1920×800    | JPG @85% |

Place all images in `/assets/images/` and update `src` paths accordingly.

---

## Contact Form Integration

The form is built for the frontend but requires a backend to send emails.
Open `js/main.js` and find the **INTEGRATION POINT** comment (~line 155).

### Option A — Formspree (Easiest, Free tier available)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Replace the simulated timeout in `main.js`:

```javascript
fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: new FormData(contactForm),
  headers: { Accept: 'application/json' },
})
.then(r => r.ok ? showFormSuccess() : alert('Something went wrong. Please try again.'))
.catch(() => alert('Network error. Please try again.'));
```

### Option B — EmailJS (No backend, free tier)
1. Sign up at [emailjs.com](https://emailjs.com)
2. Add the SDK to `index.html` before `</body>`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```
3. Replace the simulated timeout with:
```javascript
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm, 'YOUR_PUBLIC_KEY')
  .then(() => showFormSuccess())
  .catch(() => alert('Failed to send. Please try emailing kadaron85@gmail.com directly.'));
```

---

## Updating the Sitemap

After deployment, update `sitemap.xml` with your real domain:
```xml
<loc>https://YOUR_REAL_DOMAIN.com/</loc>
```

Also update the canonical and Open Graph URLs in `index.html`:
```html
<link rel="canonical" href="https://YOUR_REAL_DOMAIN.com/" />
<meta property="og:url" content="https://YOUR_REAL_DOMAIN.com/" />
```

---

## SEO

The site includes:
- Semantic HTML5 structure
- Unique title and meta description
- Open Graph tags
- Twitter Card tags
- Canonical URL placeholder
- JSON-LD structured data (GeneralContractor schema)
- robots.txt
- sitemap.xml
- All images have descriptive alt attributes
- Logical heading hierarchy (H1 → H2 → H3)

---

## Browser & Device Support

Tested layouts:
- 320px, 375px, 390px, 414px (mobile)
- 768px (tablet)
- 1024px, 1280px (laptop)
- 1440px, 1920px (desktop)

Accessibility:
- Keyboard navigation throughout
- Visible focus indicators
- ARIA labels on navigation, modals, and forms
- `prefers-reduced-motion` respected
- Form error messages announced to screen readers

---

## Performance Notes

- No external JavaScript libraries (vanilla JS only)
- Google Fonts loaded via preconnect hints for speed
- Images use `loading="lazy"` except the hero (which uses `fetchpriority="high"`)
- CSS uses custom properties for efficient theming
- No unnecessary animations or heavy effects

---

## Editing Guide

| What to change         | Where                                          |
|------------------------|------------------------------------------------|
| Company name/contact   | `index.html` — search for "Kadaron" or "+234" |
| Brand colors           | `css/style.css` — `:root` variables at top    |
| Hero headline          | `index.html` — `class="hero__heading"`         |
| Services               | `index.html` — `class="service-card"` sections |
| Projects               | `index.html` — `class="project-item"` sections |
| Process steps          | `index.html` — `class="process__step"` items   |
| Why Choose Us          | `index.html` — `class="why__item"` blocks      |
| Footer description     | `index.html` — `class="footer__desc"`          |
| Form backend           | `js/main.js` — INTEGRATION POINT comment       |

---

*Built for Kadaron Construction — RC: 1949711*
