const fs=require('fs')
const Board = require("./board");
const Game=require('./game')

const takeInput=async ()=>{
    var rawInput=fs.readFileSync(`./${process.env.input_folder}/${process.env.input_file}`,'UTF-8')
    var inputLines=rawInput.split('\n')
    var N=parseInt(inputLines[0].substring(2).split(';')[0])
    var formatedInput=[]
    for(var i=0;i<N;i++){
        formatedInput.push([])
        inputLines[i+3].split(',').map(s=>{
            formatedInput[i].push(parseInt(s.split('|')[0]))
        })
    }

    var game=new Game(formatedInput)
    game.run()
}

takeInput()

