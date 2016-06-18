'use strict';

import { Store, socket } from './store';

export const roster = new Store();
export const liveScoring = new Store();
export const franchise = new Store();
export const league = new Store();
export const playersList = new Store();

socket.on('league settings loaded', settings => {
    console.table(`Data returned`, settings);
    league.setData(settings);
});
