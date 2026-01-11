# Patrick Ryan - Static Marketing Website

This is a static website built with HTML, CSS, and vanilla JavaScript. No build tools or React are required for the final site.

## Project Structure

```
/client
  ├── index.html       # Main homepage
  ├── privacy.html     # Privacy Policy
  ├── terms.html       # Terms of Service
  ├── thanks.html      # Thank You page (after form submit)
  └── assets
      ├── css
      │   └── styles.css
      └── js
          └── main.js
```

## How to Deploy (LetsHost or similar Shared Hosting)

1.  **Export the files**: Download the contents of the `client` folder.
2.  **Connect to FTP**: Use an FTP client (like FileZilla) to connect to your LetsHost account.
3.  **Upload**: Upload all files from the `client` folder (index.html, assets folder, etc.) to the `public_html` or `www` folder on your hosting server.
4.  **Verify**: Visit your domain (e.g., patrickryan.ie) to check if the site loads.

## Contact Form Setup (Important)

The contact form uses **Formspree** to handle emails without a backend server.

1.  Go to [Formspree.io](https://formspree.io/) and create a free account.
2.  Create a new form and get your unique endpoint URL (e.g., `https://formspree.io/f/xvndkdkd`).
3.  Open `client/index.html`.
4.  Find the `<form>` tag (around line 350).
5.  Replace `https://formspree.io/f/PLACEHOLDER` with your actual Formspree URL.

```html
<!-- Before -->
<form action="https://formspree.io/f/PLACEHOLDER" ...>

<!-- After -->
<form action="https://formspree.io/f/xvndkdkd" ...>
```

## Updates

-   **Text**: Edit `index.html` directly in any text editor (Notepad, VS Code, etc.).
-   **Images**: Add images to `assets/img/` and update the `src` attributes in `index.html`.
-   **Colors**: Edit `assets/css/styles.css` and change the variables at the top of the file (e.g., `--primary`).

## Features

-   **Responsive**: Works on mobile, tablet, and desktop.
-   **Dark Mode**: Auto-detects system preference and allows manual toggle.
-   **Fast**: Pure HTML/CSS with minimal JavaScript.
-   **Accessible**: Semantic HTML and keyboard navigation support.
