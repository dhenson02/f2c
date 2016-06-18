'use strict';
const express = require('express');
const bp = require('body-parser');
const path = require('path');
const Server = express();
const server = require('http').createServer(Server);

Server.use(bp.json());
Server.use(bp.urlencoded({ extended: true }));
Server.use(express.static('dist'));

Server.use('js/app.js', ( req, res ) => {
    res.sendFile(path.join(__dirname, 'dist/js/app.js'));
});

Server.use('css/styles.css', ( req, res ) => {
    console.log(`styles.css ${req.url}`);
    res.sendFile(path.join(__dirname, 'dist/css/styles.css'));
});

Server.use('css/styles:id.css', ( req, res ) => {
    console.log(`style special ${req.url}`);
    res.sendFile(path.join(__dirname, `dist/css/styles${req.params.id}.css`));
});

Server.use('*', ( req, res ) => {
    console.log(req.url);
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const Players = require('./server/build-player-info');
const Results = require('./server/build-weekly-results');
const Rosters = require('./server/build-rosters');
const League = require('./server/build-league');
const LiveScoring = require('./server/build-live-scoring');

const players = new Players();
const _rosters = new Rosters(players);
_rosters.then(rosters => {
    const results = new Results(players);
    const league = new League();
    const liveScoring = new LiveScoring(players, league);
    const io = require('socket.io')(server);

    io.on('connection', function ( socket ) {
        console.log(`socket.io got a connection from: `, socket.id);

        let timer = null;
        socket.on("load league settings", () => {
            if ( timer ) clearTimeout(timer);
            // timer = setTimeout(() => {
                let settings = league.getSettings();
                console.log('-------SETTINGS LOAD', settings);
                socket.emit("league settings loaded", settings);
            // }, 800);
        });

        socket.on("load franchise", id => {
            if ( timer ) clearTimeout(timer);
            timer = setTimeout(() => {
                socket.emit("franchise loaded", league.getFranchise(id), id);
            }, 800);
        });

        socket.on("load player injury", id => {
            let injury = players.getInjury(id);
            socket.emit("player injury loaded", injury, id);
        });

        socket.on("load roster", id => {
            socket.emit("roster loaded", rosters.getRoster(id), id);
        });

        socket.on("load starting lineup", ( id, withScores ) => {
            let lineup = withScores ?
                         results.getLineupWithScores(id) :
                         results.getLineup(id);
            socket.emit("starting lineup loaded", lineup, id);
        });

        socket.on("load live scoring", ( week, index ) => {
            if ( week ) {
                // Get that week
            }

            let result = index ?
                         liveScoring.getMatch(index) :
                         liveScoring.getAllMatches();
            socket.emit("live scoring loaded", result, index);
        });

        /**
         * Changing stuff
         */

        socket.on("change lineup", ( id, status ) => {
            socket.emit("lineup changed", id, status);
        });

        socket.on("disconnect", () => console.log("D/C'd dang"));
    });

    server.listen(3003, () => console.log("Server listening on port 3003"));

});

/*
Server.use('/players/:id', ( req, res ) => {
    res.json(players.getPlayer(req.params.id));
});

Server.use('/rosters/:id', ( req, res ) => {
    res.json(rosters.getRoster(req.params.id));
});

Server.use('/league/franchises/:id', ( req, res ) => {
    res.json(league.getFranchise(req.params.id));
});

Server.use('/league', ( req, res ) => {
    res.json(league.getSettings());
});*/
