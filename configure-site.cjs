/* Run once with the actual public GitHub Pages or custom-domain URL. */
const fs=require('fs'),path=require('path');
const baseArg=process.argv[2];
if(!baseArg){console.error('Usage: node configure-site.cjs https://YOUR-SITE/');process.exit(1);}
let base;try{base=new URL(baseArg);if(!['https:','http:'].includes(base.protocol)||base.search||base.hash)throw Error();}catch{console.error('Provide a complete HTTP(S) site URL without query or fragment.');process.exit(1);}
if(!base.pathname.endsWith('/'))base.pathname+='/';
const escape=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const root=__dirname;const pages=fs.readdirSync(root).filter(f=>f.endsWith('.html'));
for(const file of pages){const canonical=new URL(file==='index.html'?'':file,base).href;let h=fs.readFileSync(path.join(root,file),'utf8');h=h.replace(/<link[^>]*rel="canonical"[^>]*>/g,'').replace(/<meta[^>]*property="og:url"[^>]*>/g,'');h=h.replace(/(<meta property="og:image" content=")[^"]*(")/g,`$1${escape(new URL('assets/images/studio-mascot.png',base).href)}$2`);h=h.replace('</head>',`<link rel="canonical" href="${escape(canonical)}"><meta property="og:url" content="${escape(canonical)}"></head>`);fs.writeFileSync(path.join(root,file),h);}
fs.writeFileSync(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+pages.map(f=>`<url><loc>${escape(new URL(f==='index.html'?'':f,base).href)}</loc></url>`).join('')+'</urlset>');
fs.writeFileSync(path.join(root,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml',base).href}\n`);
console.log('Canonical URLs, social URLs, sitemap and robots configured for '+base.href);
