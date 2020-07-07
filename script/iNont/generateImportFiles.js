const fs = require('fs');
const path = require('path');

let fileList = [];

const fromDir = function(startPath, filter) {
  if (!fs.existsSync(startPath)) {
    return ;
  }

  let files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    let filename = path.join(startPath, files[i]);
    let stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter); //recurse
    } else if (filename.indexOf(filter) >= 0) {
      fileList.push(filename.replace(/\\/g, '/'));
    }
  }
}

const readFile = function(dir, type) {
    fileList = [];
    fromDir(dir, type);
    return fileList;
}

// src/utils/generated/ImportLESS.less'
readFile('./src', '.less');

let OUTPUT_NAME = 'ImportLESS.less';
let text = fileList.filter(e => !e.includes("/utils") && !e.includes("/backup"));
let temp = {};
text.forEach(e => {
  let length = e.split('/').length;
  if(temp[length]) {
    temp[length].push(e);
  }
  else {
    temp[length] = [e];
  }
});
let tempKeys = Object.keys(temp);
tempKeys.sort((a,b) => Number(a) - Number(b));
tempKeys.shift();
let tempArray = [];
tempKeys.forEach(e => {
  temp[e].sort((a,b) => a.localeCompare(b));
  tempArray = [...tempArray, ...temp[e]];
});
text = tempArray.map(e => `@import '${e.replace('src', '../..')}';`).join('\n');

fs.writeFileSync(`./src/utils/generated/${OUTPUT_NAME}`, text);
console.log(`Generated: ${OUTPUT_NAME}`);

// src/utils/generated/ImportCommonComponents.js'
readFile('./src/common', '.js');

OUTPUT_NAME = 'ImportCommonComponents.js';

fileList = fileList.map(e => ({
  path: e,
  name: e
    .split('.js')[0]
    .split('/')
    .slice(-1)[0]
}));

let importComps = fileList.map(e => `import ${e.name} from '${e.path.replace('src/', '')}';`).join('\n');
let assignToCTRL = fileList.map(e => `  '${e.name}': ${e.name}`);
let result = `import CTRL from 'react-nc';
${importComps}

CTRL.COMMON = {
${assignToCTRL.join(',\n')}
}`;

fs.writeFileSync(`./src/utils/generated/${OUTPUT_NAME}`, result);
console.log(`Generated: ${OUTPUT_NAME}`);
