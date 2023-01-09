class Cell{
    constructor(
        row,
        col,
        value,
        isFixed
    ){
        this.row=row
        this.col=col
        this.value=value
        this.isFixed=isFixed
        this.isAssigned=isFixed
        this.domain=[]
    }

    assignValue=val=>{
        this.value=val
        this.isAssigned=true
        this.domain.splice(this.domain.indexOf(val),1)
    }

    unassignValue=val=>{
        this.value=0
        this.isAssigned=false
        this.domain.push(val)
    }

    reduceDomain=(board,val)=>{
        var reducedCells=[]
        for(var x=0;x<board.n;x++){
            if(x!==this.col){
                var rowCell=board.state[this.row][x]
                if(!rowCell.isFixed && !rowCell.isAssigned && rowCell.domain.indexOf(val)>-1){
                    rowCell.domain.splice(rowCell.domain.indexOf(val),1)
                    reducedCells.push(rowCell)
                }
            }
            if(x!==this.row){
                var colCell=board.state[x][this.col]
                if(!colCell.isFixed && !colCell.isAssigned && colCell.domain.indexOf(val)>-1){
                    colCell.domain.splice(colCell.domain.indexOf(val),1)
                    reducedCells.push(colCell)
                }
            }
        }
        return reducedCells
    }

    redeemDomain=(cells,val)=>{
        cells.map(c=>{
            c.domain.push(val)
        })
    }

}

module.exports=Cell