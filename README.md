# molly rudisill — website

Plain HTML/CSS/JS. No build step, so it can go on any host (Netlify, GitHub Pages, Vercel…).

## Updating content
Edit **`js/content.js`** only. Add an item to `pages.art.items` (or tech / life) and the page
rebuilds itself: cards, filter chips and a brand-colored cover image are made automatically.
To use a real image, give the item `image: "assets/your-file.jpg"`.

- Your photo: save it as `assets/molly.jpg`. It replaces the placeholder in the home hero.
- Email + socials: top of `content.js`.
- Colors & fonts: the `:root` block at the top of `css/styles.css`.

## Preview locally
```bash
python3 -m http.server 5173
```
Then open http://localhost:5173
