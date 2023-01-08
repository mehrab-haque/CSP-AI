const Cell=require('./cell')

class Board{
    constructor(
        initialState
    ) {
        this.initialize(initialState)
    }

    initialize=initialState=>{
        this.n=initialState.length
        this.state=[]
        initialState.map((r,i)=>{
            this.state.push([])
            r.map((c,j)=>{
                this.state[i].push(new Cell(i,j,c,c!==0))
            })
        })
        this.initializeDomains()
    }

    initializeDomains=()=>{
        this.state.map((r,i)=>{
            r.map((c,j)=>{
                if(!c.isFixed){
                    var allValues=[]
                    for(var t=1;t<=this.n;t++)allValues.push(t)
                    for(var x=0;x<this.n;x++){
                        if(x!==j){
                            var rowCell=this.state[i][x]
                            if(allValues.indexOf(rowCell.value)>-1)
                                allValues.splice(allValues.indexOf(rowCell.value),1)
                        }
                        if(x!==i){
                            var colCell=this.state[x][j]
                            if(allValues.indexOf(colCell.value)>-1)
                                allValues.splice(allValues.indexOf(colCell.value),1)
                        }
                    }
                    c.domain=allValues
                }
            })
        })
    }

    solve=(algorithm,heuristic)=>{
        algorithm(this,heuristic)
    }
}

module.exports=Board