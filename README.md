# Погода в домі — landing page

Static one-page site, no build step. Registration is by direct message
to the host in Telegram (@Alena43) or Instagram (@alenamatchina).

```
index.html  styles.css  script.js   # the page
assets/                             # hero watercolor + host photos
vercel.json                         # caching headers
```

## Local preview

    python3 -m http.server 8000     # → http://localhost:8000

## Deploy to Vercel

    npx vercel --prod

(or import the repo in the Vercel dashboard; framework preset "Other").
