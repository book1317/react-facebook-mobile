const fs = require('fs');

const themeCode = fs.readFileSync(`./src/utils/styles/Theme.less`);

// src/utils/generated/Colors.js
const COLOR_JS = 'Color.js';
let rows = String(themeCode).replace(/\s/g, "").split(";").filter(Boolean);
let isRGBA = false;
let isRGB = false;
rows.forEach((e, i) => {
  let [varName, value] = e.split(":");
  if(/^rgba?\(/.test(value)) {
    isRGBA = true;
    if(value.startsWith("rgb(")) {
      isRGB = true;
    }
    value = value.replace(/,/g, ", ");
  }
  else {
    value = `"${value}"`;
  }
  rows[i] = `"${varName}": ${value}`;
});

let jsCode = `import CTRL from 'react-nc';
${isRGBA ? `
const rgba = function(r, g, b, a = 1) {
  return \`rgba(\${r}, \${g}, \${b}, \${a})\`;
}` : ""}${isRGB ? `
const rgb = function(r, g, b) {
  return rgba(r, g, b, 1);
}` : ""}

const colors = {
${rows.map(e => `  ${e}`).join(",\n")}
}

CTRL.COLOR = colors;`;

fs.writeFileSync(
  `./src/utils/generated/${COLOR_JS}`,
  jsCode
);
console.log(`Generated: ${COLOR_JS}`);
