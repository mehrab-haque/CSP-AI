class BoardState {
    constructor(currentState,reachDistance,parent,move) {
        this.board=JSON.parse(JSON.stringify(currentState))
        this.k=currentState.length
        this.reachDistance=reachDistance
        this.calculateHammingDistance()
        this.calculateManhattanDistance()
        this.calculateBlankIndex()
        this.calculateSolvable()
        this.parent=parent
        this.move=move
    }
    calculateHammingDistance=()=>{
        this.hammingDistance=0
        for(var i=0;i<this.k;i++)
            for(var j=0;j<this.k;j++)
                if(this.board[i][j]>0 && (this.board[i][j]!==i*this.k+j+1))
                    this.hammingDistance+=1
    }

    calculateManhattanDistance=()=>{
        this.manhattanDistance=0
        for(var i=0;i<this.k;i++)
            for(var j=0;j<this.k;j++)
                if(this.board[i][j]>0)
                    this.manhattanDistance += Math.abs(parseInt((this.board[i][j] - 1) / this.k) - i) + Math.abs((this.board[i][j] - 1) % this.k - j)
    }

    calculateBlankIndex(){
        for(var i=0;i<this.k;i++)
            for(var j=0;j<this.k;j++)
                if(this.board[i][j]===0) {
                    this.blankRowIndex = i
                    this.blankColumnIndex = j
                }
    }

    calculateSolvable=()=>{
        var nInversions=0
        for(var i=0;i<this.k;i++)
            for(var j=0;j<this.k;j++)
                for(var m=j<this.k-1?i:i+1;m<this.k;m++)
                    for(var n=m===i?j+1:0;n<this.k;n++)
                        if(this.board[i][j]!==0 && this.board[m][n]!==0 && this.board[i][j]>this.board[m][n])
                            nInversions++;

        this.isSolvable=this.k%2===1?nInversions%2===0:((this.k-this.blankRowIndex)%2!==nInversions%2)
    }
    generateNextStates(){
        this.nextStates=[]
        //move down
        if(this.blankRowIndex>0){
            var tmpBoard=JSON.parse(JSON.stringify(this.board))
            tmpBoard[this.blankRowIndex][this.blankColumnIndex]=tmpBoard[this.blankRowIndex-1][this.blankColumnIndex]
            tmpBoard[this.blankRowIndex-1][this.blankColumnIndex]=0
            this.nextStates.push(new BoardState(tmpBoard,this.reachDistance+1,this,'DOWN'))
        }
        //move up
        if(this.blankRowIndex<this.k-1){
            var tmpBoard=JSON.parse(JSON.stringify(this.board))
            tmpBoard[this.blankRowIndex][this.blankColumnIndex]=tmpBoard[this.blankRowIndex+1][this.blankColumnIndex]
            tmpBoard[this.blankRowIndex+1][this.blankColumnIndex]=0
            this.nextStates.push(new BoardState(tmpBoard,this.reachDistance+1,this,'UP'))
        }
        //move right
        if(this.blankColumnIndex>0){
            var tmpBoard=JSON.parse(JSON.stringify(this.board))
            tmpBoard[this.blankRowIndex][this.blankColumnIndex]=tmpBoard[this.blankRowIndex][this.blankColumnIndex-1]
            tmpBoard[this.blankRowIndex][this.blankColumnIndex-1]=0
            this.nextStates.push(new BoardState(tmpBoard,this.reachDistance+1,this,'RIGHT'))
        }
        //move left
        if(this.blankColumnIndex<this.k-1){
            var tmpBoard=JSON.parse(JSON.stringify(this.board))
            tmpBoard[this.blankRowIndex][this.blankColumnIndex]=tmpBoard[this.blankRowIndex][this.blankColumnIndex+1]
            tmpBoard[this.blankRowIndex][this.blankColumnIndex+1]=0
            this.nextStates.push(new BoardState(tmpBoard,this.reachDistance+1,this,'LEFT'))
        }
    }
    print(){
        console.log("########BOARD START########")
        this.board.map(r=>{
            var row=''
            r.map(c=>{
                row+=`${c}\t`
            })
            console.log(row)
        })
        console.log(`Distance from initial state: ${this.reachDistance}`)
        console.log(`Hamming distance: ${this.hammingDistance}`)
        console.log(`Manhattan distance: ${this.manhattanDistance}`)
        console.log("########BOARD END########")
    }

    printRecursive(){
        if(this.parent!==null)
            this.parent.printRecursive()
        console.log()
        if(this.move!==null)
            console.log(this.move)
        this.board.map(r=>{
            var row=''
            r.map(c=>{
                row+=`${c===0?'':c}\t`
            })
            console.log(row)
        })
        console.log(`hamming distance: ${this.hammingDistance}\nmanhattan distance: ${this.manhattanDistance}`)
    }

    equals(b){
        var isMatched=true
        if(b.k!==this.k)isMatched=false
        else{
            b.board.map((r,i)=>{
                r.map((c,j)=>{
                    if(c!==this.board[i][j])
                        isMatched=false
                })
            })
        }
        return isMatched
    }
}

const hammingComparator = (a, b) => {
    return b.reachDistance+b.hammingDistance-a.reachDistance-a.hammingDistance
}

const manhattanComparator = (a, b) => {
    return b.reachDistance+b.manhattanDistance-a.reachDistance-a.manhattanDistance
}

export default BoardState
export {hammingComparator,manhattanComparator}