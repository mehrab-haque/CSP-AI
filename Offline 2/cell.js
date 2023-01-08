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
    }

    unassignValue=val=>{
        this.value=0
        this.isAssigned=false
    }

}

module.exports=Cell