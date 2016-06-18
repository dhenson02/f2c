'use strict';
const fs = require('fs');
const path = require('path');

class League {
    constructor () {
        let filePath = path.join(__dirname, '..', '/data/league.json');
        let file = fs.readFileSync(filePath, { encoding: "utf8" });
        this.league = JSON.parse(file);

        this.franchises = new Map();
        this.standings = new Map();

        this.setupStandings();
        this.setupFranchises();
    }

    setupStandings () {
        let filePath = path.join(__dirname, '..', '/data/leagueStandings.json');
        let file = fs.readFileSync(filePath, { encoding: "utf8" });
        let standings = JSON.parse(file);
        standings.franchise.forEach(stats => {
            this.standings.set(stats.id, stats);
        });
    }

    setupFranchises () {
        let franchises = this.league.franchises.franchise;
        franchises.forEach(franchise => {
            let stats = this.standings.get(franchise.id);
            let fullFranchise = Object.assign({ stats }, franchise);
            this.franchises.set(franchise.id, fullFranchise);
        });
    }

    getFranchise ( id ) {
        return this.franchises.get(id);
    }

    getSettings () {
        return this.league;
    }
}

module.exports = League;
