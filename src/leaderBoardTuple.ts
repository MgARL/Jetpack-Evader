import { Player, LeaderBoard } from './leaderBoard'

function leaderBoardTuple(obj: any): LeaderBoard {
    let myTuple: Player[] = []
    for (let key in obj) {
        myTuple.push(obj[key])
    }
    return myTuple as LeaderBoard
}

export { leaderBoardTuple }