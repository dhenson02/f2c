'use strict';
const fs = require('fs');
const path = require('path');
const { Map, List } = require('immutable');
const Promise = require('bluebird');
const filePath = path.join(__dirname, '..', '/data/rosters.json');

class Rosters {
    constructor ( players ) {
        let file = fs.readFileSync(filePath, { encoding: "utf8" });
        let rosters = JSON.parse(file).franchise;

        this.rosters = Map();

        return (
            new Promise(( resolve, reject ) => {
                rosters.forEach(roster => {
                    players.setupScores(roster.player, roster.id)
                        .then(() => {
                            let fullRoster = roster.player.map(id => players.getPlayer(id));
                            this.rosters.set(roster.id, fullRoster);
                            resolve(this);
                        });
                });
            }).then(rosters => {
                console.log(this.rosters.get('0001'));
                return rosters;
            }).catch(console.error)
        );
    }

    getRoster ( id ) {
        return this.rosters.get(id);
    }
}

module.exports = Rosters;
