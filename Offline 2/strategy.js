

const backTrack=(board,heuristic)=>{
    var currCell=heuristic(board.state)
    if(currCell===null){
        board.print()
        return true
    }else{
        var sortedDomain=getLeastConstrainingValues(board,currCell)
        for(var i in sortedDomain){
            var domainValue=sortedDomain[i]
            if(isConsistentBackTrack(board,currCell,domainValue)) {
                currCell.assignValue(domainValue)
                if(backTrack(board, heuristic))
                    return true
                currCell.unassignValue(domainValue)
            }
        }
        return false
    }
}


const forwardCheck=(board,heuristic)=>{
    var currCell=heuristic(board.state)
    if(currCell===null){
        board.print()
        return true
    }else{
        var sortedDomain=getLeastConstrainingValues(board,currCell)
        for(var i in sortedDomain){
            var domainValue=sortedDomain[i]
            if(isConsistentForwardCheck(board,currCell,domainValue)) {
                currCell.assignValue(domainValue)
                var reducedCells=currCell.reduceDomain(board,domainValue)
                if(forwardCheck(board, heuristic))
                    return true
                currCell.redeemDomain(reducedCells,domainValue)
                currCell.unassignValue(domainValue)
            }
        }
        return false
    }
}


const getLeastConstrainingValues=(board,cell)=>{
    var sortedDomainList=JSON.parse(JSON.stringify(cell.domain))
    sortedDomainList.sort(function(a,b){
        var aCount=0,bCount=0
        for(var x=0;x<board.n;x++){
            if(x!==cell.col){
                var rowCell=board.state[x][cell.col]
                if(rowCell.domain.indexOf(a))aCount++
            }
            if(x!==cell.row){
                var colCell=board.state[cell.row][x]
                if(colCell.domain.indexOf(b))bCount++
            }
        }
        return aCount-bCount
    })
    return sortedDomainList
}

const isConsistentBackTrack=(board,cell,value)=>{
    for(var x=0;x<board.n;x++){
        if(x!==cell.col){
            var rowCell=board.state[cell.row][x]
            if(rowCell.value===value)return false
        }
        if(x!==cell.row){
            var colCell=board.state[x][cell.col]
            if(colCell.value===value)return false
        }
    }

    return true
}

const isConsistentForwardCheck=(board,cell,value)=>{
    for(var x=0;x<board.n;x++){
        if(x!==cell.col){
            var rowCell=board.state[cell.row][x]
            if(!rowCell.isFixed && !rowCell.isAssigned && rowCell.domain.length===1 && rowCell.domain.indexOf(value)>-1)return false
        }
        if(x!==cell.row){
            var colCell=board.state[x][cell.col]
            if(!colCell.isFixed && !colCell.isAssigned && colCell.domain.length===1 && colCell.domain.indexOf(value)>-1)return false
        }
    }

    return true
}

module.exports={
    backTrack,
    forwardCheck
}