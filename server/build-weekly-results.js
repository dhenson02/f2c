'use strict';
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', '/data/weeklyResults.json');

class Results {
    constructor ( players ) {
        let file = fs.readFileSync(filePath, { encoding: "utf8" });
        let lineups = JSON.parse(file).franchise;
        this.players = players;
        this.results = new Map();
        lineups.forEach(team => {
            this.results.set(team.id, team);
        });
    }

    getLineup ( id ) {
        let lineup = this.results.get(id).starters.split(/,/);
        return lineup.map(id => ({ id }));
    }

    getLineupWithScores ( id ) {
        let lineup = this.results.get(id).player;
        return lineup.map(player => {
            player.score = player.score !== '' ?
                    parseInt(player.score, 10) :
                    0;
            return player;
        });
        /*return lineup.map(player => {
            let rosterPlayer = this.players.getPlayer(player.id);
            let fullPlayer = Object.assign({}, player, rosterPlayer);
            return fullPlayer;
        });*/
    }
}

module.exports = Results;
