'use strict';
let fs = require('fs');
let filename = process.argv[2];
let path = __dirname + "/" + filename;

let data = fs.readFileSync(path, {encoding: "utf8"});

let fileObj = JSON.parse(data);

let newObj = fileObj[ filename.replace(".json", "") ] || fileObj;

let newFile = JSON.stringify(newObj);

fs.writeFileSync(path, newFile, { encoding: "utf8" });

console.log(filename, path);
process.exit(0);
