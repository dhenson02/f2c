'use strict';
const fs = require('fs');
const path = require('path');
const request = require('request');
const config = require('../config.json');

class Players {
    constructor () {
        this.scores = new Map();
        this.injuries = new Map();
        this.players = new Map();
    }

    setupScores ( playerList, rosterID ) {
        let url = `${config.url}${config.year}/export?TYPE=playerScores&W=YTD&L=${config.league}&JSON=1&PLAYERS=${playerList.join(',')}`;
        return (
            new Promise(( resolve, reject ) => {
                request(url, ( error, response, data ) => {
                    if ( error ) {
                        return reject(error);
                    }
                    if ( response.statusCode === 200 ) {
                        let scoreFilePath = path.join(__dirname, '..', `/data/playerScores-${rosterID}.json`);
                        if ( typeof data === 'string' ) {
                            fs.writeFile(scoreFilePath, data, { encoding: 'utf8' }, function () {});
                            data = JSON.parse(data);
                        }
                        else {
                            fs.writeFile(scoreFilePath, JSON.stringify(data), { encoding: 'utf8' }, function () {});
                        }
                        let scores = data.playerScores.playerScore;
                        scores.forEach(score => this.scores.set(score.id, parseInt(score.score, 10)));
                        resolve();
                    }
                    else {
                        reject(`Something went wrong.  Response: `, response);
                    }
                });
            })
                .then(() => this.setupInjuries())
                .then(() => this.setupPlayers())
                .catch(console.error)
        );

    }

    setupInjuries () {
        let injuryFilePath = path.join(__dirname, '..', '/data/injuries.json');
        let injuryFile = fs.readFileSync(injuryFilePath, { encoding: "utf8" });
        let injuries = JSON.parse(injuryFile).injury;
        injuries.forEach(injury => {
            this.injuries.set(injury.id, injury);
        });
    }

    setupPlayers () {
        let playersFilePath = path.join(__dirname, '..', '/data/players.json');
        let playersFile = fs.readFileSync(playersFilePath, { encoding: "utf8" });
        let players = JSON.parse(playersFile).player;
        players.forEach(player => {
            let injury = this.injuries.get(player.id);
            let score = this.scores.get(player.id);
            let fullPlayer = Object.assign({ injury, score }, player);
            this.players.set(player.id, fullPlayer);
        });
    }

    getScore ( id ) {
        return this.scores.get(id);
    }

    getInjury ( id ) {
        return this.injuries.get(id);
    }

    getPlayer ( id ) {
        return this.players.get(id);
    }
}

module.exports = Players;
