const Board=require('./board')
const Strategy=require('./strategy')
const Heuristics=require('./heuristics')

class Game{
    constructor(
        initialState
    ) {
        this.currentState=initialState
        this.board=new Board(initialState)
    }

    run=()=>{
        this.board.solve(Strategy.forwardCheck,Heuristics.vah1)
    }

}

module.exports=Game