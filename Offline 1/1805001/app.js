import * as fs from 'fs'
import PriorityQueue from "priorityqueue"
import BoardState,{hammingComparator,manhattanComparator} from "./NPuzzle.js";

//input parsing
var rawInput=fs.readFileSync('./input.txt','utf8')
var inputLines=rawInput.split('\r\n')

//formatting
var k=parseInt(inputLines[0])
var initialState=[]
var goalState=[]
for(var i=0;i<k;i++){
    initialState.push([])
    goalState.push([])
    inputLines[i+1].split(' ').map((c,j)=>{
        initialState[i].push(c==='*'?0:parseInt(c))
        goalState[i].push(i===k-1 && j===k-1?0:i*k+j+1)
    })
}

//solve function
const solve=(initial,goal,strategy)=>{
    var openList = new PriorityQueue({comparator: strategy});
    var closedList = []
    openList.push(initial)
    var nExplored=0,nExpanded=0
    while (!openList.top().equals(goal)){
        var current=openList.pop()
        nExplored++
        closedList.push(current)
        current.generateNextStates()
        current.nextStates.map(b=>{
            var isVisited=false
            closedList.map(s=>{
                if(s.equals(b))
                    isVisited=true
            })
            if(!isVisited) {
                openList.push(b)
                nExpanded++
            }
        })
    }
    nExplored++
    openList.top().printRecursive()
    console.log(`\nSolved in ${openList.top().reachDistance} moves !!!\n\nNumber of explored nodes: ${nExplored}\nNumber of expanded nodes: ${nExpanded}\n\n`)
}

//check solvability
var initialBoard=new BoardState(initialState,0,null,null)
var goalBoard=new BoardState(goalState,Number.POSITIVE_INFINITY,null,null)

if(initialBoard.isSolvable) {
    //Hamming Distance
    console.log('########HAMMING DISTANCE########')
    solve(initialBoard,goalBoard,hammingComparator)
    //Manhattan Distance
    console.log('########MANHATTAN DISTANCE########')
    solve(initialBoard,goalBoard,manhattanComparator)
}else
    console.log('Not solvable')