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

module.exports={
    vah1
}