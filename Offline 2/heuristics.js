const vah1=state=>{
    var cell=null
    var minDomainCount=state.length*10
    state.map(r=>{
        r.map(c=>{
            if(!c.isFixed && !c.isAssigned && c.domain.length<minDomainCount){
                minDomainCount=c.domain.length
                cell=c
            }
        })
    })
    return cell
}

const vah2=state=>{
    var cell=null
    var maxDegreeCount=-1
    state.map((r,i)=>{
        r.map((c,j)=>{
            if(!c.isFixed && !c.isAssigned){
                var currDegreeCount=0
                for(var x=0;x<state.length;x++){
                    if(x!==j){
                        var rowCell=state[i][x]
                        if(!rowCell.isFixed && !rowCell.isAssigned)currDegreeCount++
                    }
                    if(x!==i){
                        var colCell=state[x][j]
                        if(!colCell.isFixed && !colCell.isAssigned)currDegreeCount++
                    }
                }
                if(currDegreeCount>maxDegreeCount){
                    maxDegreeCount=currDegreeCount
                    cell=c
                }
            }
        })
    })
    return cell
}

module.exports={
    vah1,
    vah2
}