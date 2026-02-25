import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();

function read(path) {
  return readFileSync(resolve(root, path), "utf8");
}

function write(path, content) {
  writeFileSync(resolve(root, path), content, "utf8");
}

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

function minifyJs(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}();,:=<>+\-])\s*/g, "$1")
    .trim();
}

const cssSourcePath = "dist/minside.css";
const cssMinPath = "dist/minside.min.css";
const jsSourcePath = "dist/minside.js";
const jsMinPath = "dist/minside.min.js";

const cssSource = read(cssSourcePath);
const jsSource = read(jsSourcePath);

write(cssMinPath, minifyCss(cssSource));
write(jsMinPath, minifyJs(jsSource));

console.log("Built:");
console.log(`- ${cssMinPath}`);
console.log(`- ${jsMinPath}`);
