const {
  readdirSync,
  existsSync,
  writeFileSync,
  mkdirSync,
  lstatSync
} = require("fs");
const { logGreen } = require("./consoleLog.js");
const { getSimpleReact, getSimpleSCSS } = require("./simpleCode.js");
const st = require("./data/structure.json");

let ob = st;
let key = Object.keys(ob);
const startPath = "";

function genStruct(ob, key, path, callback) {
  ob = ob[key];
  if (ob) {
    path ? (path = `${path}/${key}`) : (path = `${key}`);
    callback(path, key);
    key = Object.keys(ob);
    key.forEach(e => {
      if (ob[e]) genStruct(ob, e, path, callback);
    });
  }
}

const genFile = (path, name) => {
  if (isLastFolder(path)) {
    fileName = path.split("/").pop();
    JSFile = `${path}/${fileName}.js`;
    SCSSFile = `${path}/${fileName}.scss`;
    if (!existsSync(JSFile)) {
      writeFileSync(JSFile, getSimpleReact(name));
      logGreen("gen-file : " + JSFile);
    }
    if (!existsSync(SCSSFile)) {
      writeFileSync(SCSSFile, getSimpleSCSS(name));
      logGreen("gen-file : " + SCSSFile);
    }
  }
};

function genFolder(path) {
  if (!existsSync(path)) {
    mkdirSync(path);
    logGreen("gen-folder:" + path);
  }
}

function isLastFolder(path) {
  if (
    readdirSync(path, () => {}).filter(e => {
      return lstatSync(path + "/" + e).isDirectory();
    }).length <= 0
  )
    return true;
  return false;
}

const generateStructer = () => {
  genStruct(ob, key, startPath, genFolder);
  genStruct(ob, key, startPath, genFile);
};

generateStructer();
logGreen("=== generate struct done!! ===");
