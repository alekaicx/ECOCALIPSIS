const fs = require('fs');

// 1. Update index.html to include Fredoka font (which looks like the image)
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(
    /<link href="https:\/\/fonts.googleapis.com\/css2\?family=Playfair\+Display:ital,wght@0,400;0,700;1,400;1,700&family=Plus\+Jakarta\+Sans:wght@300;400;500;600;700;800;900&family=JetBrains\+Mono:wght@400;600;700&display=swap" rel="stylesheet">/,
    '<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">'
);
fs.writeFileSync('index.html', html);

// 2. Update index.css to use Fredoka for hand-drawn class
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(
    /\.hand-drawn \{\n  font-family: var\(--font-serif\);\n  letter-spacing: -0\.02em;\n\}/,
    '.hand-drawn {\n  font-family: \'Fredoka\', sans-serif;\n  letter-spacing: -0.01em;\n}'
);
fs.writeFileSync('src/index.css', css);

