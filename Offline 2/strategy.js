

const backTrack=(board,heuristic)=>{

    //dev
    //return

    var currCell=heuristic(board.state)
    if(currCell===null){
        board.state.map(r=>{
            var row=[]
            r.map(c=>{
                row.push(c.value)
            })
            console.log(row)
        })
        console.log('solved')
    }else{
        var sortedDomain=getLeastConstariningValues(board,currCell)
        sortedDomain.map(domainValue=>{
            if(isConsistent(board,currCell,domainValue)) {
                currCell.assignValue(domainValue)
                backTrack(board, heuristic)
                currCell.unassignValue(domainValue)
            }
        })
    }
}


const getLeastConstariningValues=(board,cell)=>{
    //need to write logic here
    var sortedDomainList=JSON.parse(JSON.stringify(cell.domain))
    sortedDomainList.sort(function(a,b){
        var aCount=0,bCount=0
        for(var x=0;x<board.n;x++){
            if(x!==cell.col){
                var rowCell=board.state[x][cell.col]
                if(rowCell.value===a)aCount++
            }
            if(x!==cell.row){
                var colCell=board.state[cell.row][x]
                if(colCell.value===b)bCount++
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