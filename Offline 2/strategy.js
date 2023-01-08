

const backTrack=(board,heuristic)=>{
    var currCell=heuristic(board.state)
    if(currCell===null){
        board.print()
        return true
    }else{
        var sortedDomain=getLeastConstariningValues(board,currCell)
        for(var i in sortedDomain){
            var domainValue=sortedDomain[i]
            if(isConsistent(board,currCell,domainValue)) {
                currCell.assignValue(domainValue)
                if(backTrack(board, heuristic))
                    return true
                currCell.unassignValue(domainValue)
            }
        }
        return false
    }
}


const getLeastConstariningValues=(board,cell)=>{
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

const isConsistent=(board,cell,value)=>{
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

module.exports.backTrack=backTrack