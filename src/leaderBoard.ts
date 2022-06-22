// Object Interface
interface Player {
    name: string,
    score: number
}

// tuple
type LeaderBoard = [Player, Player, Player, Player, Player]

// hard-coding Leader Board;

let leaderBoard1: LeaderBoard = [{
    name: 'Miguel',
    score: 30
},{
    name: 'Ceci',
    score: 16
},{
    name: 'Nick',
    score: 12
},{
    name: 'Edgar',
    score: 6
},{
    name: 'Annie',
    score: 3
}];


// Get Leader-board From local if there is any.
let lBString = localStorage.getItem('leaderBoard');

if (lBString !== null){ // If there is a local leaderBoard parsing it into object and then saving it a the leader board.
    const parsedString : LeaderBoard = JSON.parse(lBString);
    leaderBoard1 = parsedString;
};

// exporting it to use it in the index and game-logic scripts.
export { leaderBoard1, Player, LeaderBoard };