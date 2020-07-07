const {
  readdirSync,
  existsSync,
  lstatSync,
  writeFileSync,
  readFileSync,
  mkdirSync,
} = require("fs");
const { join } = require("path");
const { logGreen } = require("./consoleLog.js");
const { getSimpleReact, getSimpleSCSS } = require("./simpleCode.js");

const startPath = "src";
const importPath = "src/utils/generated/ImportSCSS.scss";
const indexPath = "src/index.scss";
const fileExtension = ".tsx";

const getFiles = (src) =>
  readdirSync(src)
    .map((name) => join(src, name))
    .filter((e) => lstatSync(e).isFile());

const getDirs = (src) =>
  readdirSync(src)
    .map((name) => join(src, name))
    .filter((e) => lstatSync(e).isDirectory());

const getAllFile = (src) =>
  getDirs(src)
    .map((e) => getAllFile(e))
    .reduce((a, b) => a.concat(b), [])
    .concat(getFiles(src));

const getAllLastDir = (src) =>
  getDirs(src)
    .map((e) => getAllLastDir(e))
    .reduce((a, b) => a.concat(b), [])
    .concat(getDirs(src))
    .filter((e) => isLastFolder(e.replace(/\\/g, "/")));

function isLastFolder(path) {
  if (
    readdirSync(path, () => {}).filter((e) => {
      return lstatSync(path + "/" + e).isDirectory();
    }).length <= 0
  )
    return true;
  return false;
}

const getAllJS = (src) =>
  getAllFile(src).filter((e) => e.includes(fileExtension));

const createFileByJS = (src) => {
  let createdFile = [];
  getAllJS(src).forEach((JSFile) => {
    let JSFileName = JSFile.substring(
      JSFile.lastIndexOf("\\") + 1,
      JSFile.lastIndexOf(".")
    );
    console.log(JSFileName);
    let JSText = readFileSync(JSFile, "utf8") || "";
    if (JSText.length == 0) {
      writeFileSync(JSFile, getSimpleReact(JSFileName));
      logGreen("write-default-react : " + JSFileName + fileExtension);
    }

    let SCSSFile = JSFile.replace(fileExtension, ".scss");
    if (!existsSync(SCSSFile)) {
      logGreen("Generate : " + SCSSFile);
      writeFileSync(SCSSFile, getSimpleSCSS(JSFileName));
    }
    createdFile.push(SCSSFile);
  });
  return createdFile;
};

const genFileByJS = (src) => {
  genFile = getDirs(src)
    .map((e) => createFileByJS(e))
    .reduce((a, b) => a.concat(b), []);

  genFile = genFile
    .map((e) => `@import "${e.replace("src", "../..").replace(/\\/g, "/")}"`)
    .join(";\n");

  // addImportPathToImport(genFile);
  // addImportPathToIndex();
  return genFile;
};

const genFileByLastFolder = (src) => {
  genFile = getAllLastDir(src)
    .map((e) => {
      let fileName = e.split("\\").pop();
      let JSFile = e + "\\" + fileName + fileExtension;
      let SCSSFile = e + "\\" + fileName + ".scss";
      if (!existsSync(JSFile)) {
        writeFileSync(JSFile, getSimpleReact(fileName));
        logGreen("gen-file : " + JSFile);
      }
      if (!existsSync(SCSSFile)) {
        writeFileSync(SCSSFile, getSimpleSCSS(fileName));
        logGreen("gen-file : " + SCSSFile);
      }
      return `@import "${e.replace("src", "../..").replace(/\\/g, "/")}"`;
    })
    .join(";\n");
  return genFile;
};

const addImportPathToImport = (pathString) => {
  importPath.split("/").reduce((a, b) => {
    if (!existsSync(a)) mkdirSync(a);
    return a + "/" + b;
  });
  writeFileSync(importPath, pathString + ";");
  logGreen("update import done!!");
};

const addImportPathToIndex = () => {
  if (!existsSync(indexPath)) writeFileSync(indexPath, "");
  let text = readFileSync(indexPath, "utf8") || "";
  let importText = `@import "${importPath}";`;
  if (!text.includes(importText))
    writeFileSync(indexPath, importText + "\n" + text);
  logGreen("update index done!!");
};

// genFileByLastFolder(startPath);
genFileByJS(startPath);
logGreen("=== generate file done!! ===");
