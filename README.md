# II Technology - Mini E-Commerce Website

A modern, responsive mini e-commerce website for **II Technology**, a local tech accessories store based in Kabul, Afghanistan. Built as a student project using vanilla HTML, CSS, Bootstrap 5 and JavaScript — no frameworks, no backend.

## Features

- Sleek dark tech-themed UI inspired by Apple / Nothing
- Hero section with animated text and call-to-action
- Featured products rendered dynamically from a JavaScript array
- Real-time product search
- Category filter pills
- Shopping cart (add, remove, change quantity, live total)
- Cart counter in navbar
- Checkout page with real-time form validation
- Contact page with form, embedded map and FAQ accordion
- About page with stats, team and timeline
- Dark mode toggle, back-to-top button, sticky navbar
- Animated counters, scroll reveal animations, toast notifications
- Product details modal
- Bootstrap carousel for customer testimonials
- Fully responsive on desktop, tablet and mobile

## Technologies Used

- HTML5
- CSS3 (custom animations and design system variables)
- Bootstrap 5
- Vanilla JavaScript (DOM manipulation only)

## Folder Structure

```
ii-technology/
├── index.html
├── about.html
├── cart.html
├── checkout.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── products.js
│   ├── main.js
│   ├── cart.js
│   └── checkout.js
├── images/
│   ├── hero.jpg
│   ├── phone.jpg
│   ├── airpods.jpg
│   └── ... (other product images)
└── README.md
```

## How to Run

1. Download or clone the project folder.
2. Open `index.html` in any modern browser.

That's it — no build step, no install needed.

For local development with live reload you can use VS Code's **Live Server** extension.

## How to Edit Products

Open `js/products.js` and edit the `products` array. Each product has:

```js
{
  id: 1,
  name: "Product Name",
  category: "Smartphones",
  price: 999,
  image: "images/myimage.jpg",
  desc: "Short product description."
}
```

To add a new product, copy a block, change the `id` and the fields, drop a matching image in the `images/` folder.

## Deploy to GitHub Pages

1. Push the project to a new GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Source**, select the `main` branch and `/ (root)` folder.
4. Click **Save**. After a minute, your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

## Notes

- The cart is in-memory only and resets when the page is reloaded — this matches the project requirements.
- All product images are stored as normal files inside `/images` so they can be easily replaced with real photos later.

---

Made with ☕ in Kabul.
