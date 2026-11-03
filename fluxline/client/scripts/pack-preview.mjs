// Packs dist-preview into one self-contained HTML body for publishing as a hosted preview.
import fs from 'node:fs';
const dir = 'dist-preview/assets';
const css = fs.readdirSync(dir).filter((f) => f.endsWith('.css')).map((f) => fs.readFileSync(`${dir}/${f}`, 'utf8')).join('\n');
const js = fs.readdirSync(dir).filter((f) => f.endsWith('.js')).map((f) => fs.readFileSync(`${dir}/${f}`, 'utf8')).join('\n');
const esc = (s) => s.replace(/\uFFFD/g, '\\uFFFD');
const out = `<title>Fluxline</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap">
<style>${css.replace(/\uFFFD/g, "\\FFFD").replace(/<\/style/gi, '<\\/style')}</style>
<div id="root"></div>
<script type="module">${esc(js).replace(/<\/script/gi, '<\\/script')}</script>
`;
fs.writeFileSync(process.argv[2], out);
console.log('wrote', process.argv[2], (out.length / 1e6).toFixed(2), 'MB');
