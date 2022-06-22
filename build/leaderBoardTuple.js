function leaderBoardTuple(obj) {
    let myTuple = [];
    for (let key in obj) {
        myTuple.push(obj[key]);
    }
    return myTuple;
}
export { leaderBoardTuple };
