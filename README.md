# The Sith Order Site

A free, GitHub Pages-ready static website for **The Sith Order**, designed with a red/black/purple Sith holocron aesthetic.

## What is included

- Public landing page
- Welcome popup / archive entry panel
- Interactive divisions section
- Public information board area
- Links section for Roblox, Discord, handbook, recruitment, etc.
- Easy-to-edit content stored in `data.js`

## Current divisions

1. The Sith Vanguard
2. The Sith Doctrine
3. Laws & Justice
4. The Dark Honor Guard
5. Scientific Advancement

## Files

- `index.html` — main site structure
- `styles.css` — Sith theme and layout
- `app.js` — interactive behaviors
- `data.js` — editable division and link content

## Customising content

### Change text
Edit:
- `index.html` for the main headings and welcome text
- `data.js` for division descriptions and links

### Add live links
In `data.js`, replace each `href` value if you want to change destinations.

Example:
```js
{
  title: 'Roblox Group',
  description: 'Official group page for The Sith Order.',
  href: 'https://www.roblox.com/communities/...'
}