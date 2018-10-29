const fs = require("fs");
const path = require("path");

const {VALID_RES, INVALID_RES} = require("./lib");

function checkFiles(paths, basePath) {
  return paths.reduce((res, file) => {
    const fullPath = path.join(basePath, file);
    res[file] = fs.existsSync(fullPath) ? VALID_RES : INVALID_RES;
    return res;
  }, []);
}

exports.checkFiles = checkFiles;
