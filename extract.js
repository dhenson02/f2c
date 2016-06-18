'use strict';
let fs = require('fs');
let filename = process.argv[ 2 ];
let path = __dirname + "/" + filename;

let data = fs.readFileSync(path, { encoding: "utf8" });

let fileObj = JSON.parse(data);
let fileType = filename.replace(".json", "");

let newObj = fileObj[ fileType ] || fileObj;

if ( fileType === 'rosters' ) {
    newObj.franchise = newObj.franchise.map(franchise => {
        let player = franchise.player.map(player => {
            return player.id;
        });
        let id = franchise.id;
        return {
            id,
            player
        };
    });
}

let newFile = JSON.stringify(newObj);

fs.writeFileSync(path, newFile, { encoding: "utf8" });

console.log(filename, path);
process.exit(0);
