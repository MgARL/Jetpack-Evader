"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderBoard1 = void 0;
// hard-coding Leader Board;
let leaderBoard1 = [{
        name: 'Miguel',
        score: '30'
    }, {
        name: 'Ceci',
        score: '16'
    }, {
        name: 'Nick',
        score: '12'
    }, {
        name: 'Edgar',
        score: '6'
    }, {
        name: 'Annie',
        score: '3'
    }];
exports.leaderBoard1 = leaderBoard1;
// Get Leader-board From local if there is any.
let lBString = localStorage.getItem('leaderBoard');
if (lBString !== null) { // If there is a local leaderBoard parsing it into object and then saving it a the leader board.
    const parsedString = JSON.parse(lBString);
    exports.leaderBoard1 = leaderBoard1 = parsedString;
}
;
