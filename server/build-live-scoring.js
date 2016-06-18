'use strict';
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

class LiveScoring {
    constructor ( players, league ) {
        let filePath = path.join(__dirname, '..', '/data/liveScoring.json');
        let file = fs.readFileSync(filePath, { encoding: "utf8" });
        let scoring = JSON.parse(file);
        let matches = scoring.matchup;

        this.weeks = new Map();
        this.matches = new Map();
        this.matchCount = 0;

        this.setupMatches = function ( match ) {
            let teamA = match.franchise[ 0 ];
            let teamB = match.franchise[ 1 ];
            teamA.players.player = teamA.players.player.map(player => {
                player.score = parseInt(player.score, 10);
                return Object.assign({}, players.getPlayer(player.id), player);
            });
            teamB.players.player = teamB.players.player.map(player => {
                player.score = parseInt(player.score, 10);
                return Object.assign({}, players.getPlayer(player.id), player);
            });
            teamA.score = parseInt(teamA.score, 10);
            teamB.score = parseInt(teamB.score, 10);
            let teams = [
                Object.assign({}, teamA, league.getFranchise(teamA.id)),
                Object.assign({}, teamB, league.getFranchise(teamB.id))
            ];
            return teams;
        };

        matches.forEach(match => {
            let teams = this.setupMatches(match);
            this.matches.set(this.matchCount++, teams);
        });

    }

    getMatch ( index ) {
        return this.matches.get(index);
    }

    getAllMatches () {
        let matches = new Array(this.matchCount);
        for ( let i = 0; i < this.matchCount; ++i ) {
            matches[ i ] = this.matches.get(i);
        }
        return matches;
    }
}

module.exports = LiveScoring;
