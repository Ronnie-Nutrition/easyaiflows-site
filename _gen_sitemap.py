#!/usr/bin/env python3
"""Regenerate sitemap.xml for easyaiflows.com (GitHub Pages).

Run from the repo root after adding/removing pages: python3 _gen_sitemap.py
URL conventions (match internal links / canonicals):
  - root marketing pages: extensionless (/grader)
  - directory pages: trailing slash (/kolab/)
  - ai-for industry pages: extensionless (/ai-for/dentists)
  - blog articles: .html (/blog/slug.html)
"""
import datetime
import glob
import os

BASE = "https://easyaiflows.com"
ROOT = os.path.dirname(os.path.abspath(__file__))

# (loc, source file for lastmod)
entries = [("/", "index.html")]

for page in ["grader", "perfect-pitch", "perfect-pitch-kit", "nonprofit",
             "ai-automation-pearland", "ai-automation-houston"]:
    entries.append((f"/{page}", f"{page}.html"))

for d in ["assistant", "kolab", "operator-kit", "inner-circle", "champions", "class"]:
    if os.path.isfile(os.path.join(ROOT, d, "index.html")):
        entries.append((f"/{d}/", f"{d}/index.html"))

entries.append(("/ai-for/", "ai-for/index.html"))
for path in sorted(glob.glob(os.path.join(ROOT, "ai-for", "*", "index.html"))):
    slug = os.path.basename(os.path.dirname(path))
    entries.append((f"/ai-for/{slug}", f"ai-for/{slug}/index.html"))

entries.append(("/blog/", "blog/index.html"))
for path in sorted(glob.glob(os.path.join(ROOT, "blog", "*.html"))):
    name = os.path.basename(path)
    if name == "index.html":
        continue
    entries.append((f"/blog/{name}", f"blog/{name}"))

lines = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for loc, src in entries:
    mtime = os.path.getmtime(os.path.join(ROOT, src))
    lastmod = datetime.date.fromtimestamp(mtime).isoformat()
    lines.append(f"  <url><loc>{BASE}{loc}</loc><lastmod>{lastmod}</lastmod></url>")
lines.append("</urlset>")

out = os.path.join(ROOT, "sitemap.xml")
with open(out, "w") as f:
    f.write("\n".join(lines) + "\n")
print(f"wrote {out} with {len(entries)} URLs")
