let cells = document.querySelectorAll(".cell");
let statusText = document.getElementById("status");

let board = ["","","","","","","","",""];
let gameOver = false;

const winCombos = [
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];

cells.forEach((cell,index)=>{
    cell.addEventListener("click",()=>{

        if(board[index]=="" && !gameOver){

            board[index]="X"
            cell.textContent="X"

            let win = checkWinner("X")
            if(win){
                highlight(win)
                statusText.innerText="🎉Player Wins!"
                gameOver=true
                return
            }

            if(!board.includes("")){
                statusText.innerText="Draw!"
                gameOver=true
                return
            }

            statusText.innerText="Computer Thinking..🤔"

            setTimeout(computerMove,700)
        }

    })
})

function computerMove(){

    let bestScore = -Infinity
    let move

    for(let i=0;i<9;i++){

        if(board[i]==""){

            board[i]="O"
            let score = minimax(board,0,false)
            board[i]=""

            if(score>bestScore){
                bestScore=score
                move=i
            }

        }

    }

    board[move]="O"
    cells[move].textContent="O"

    let win = checkWinner("O")

    if(win){
        highlight(win)
        statusText.innerText="🤖Computer Wins!"
        gameOver=true
        return
    }

    if(!board.includes("")){
        statusText.innerText="Draw!"
        gameOver=true
        return
    }

    statusText.innerText="Player X Turn.."
}

function minimax(board,depth,isMax){

    if(checkWinner("O")) return 1
    if(checkWinner("X")) return -1
    if(!board.includes("")) return 0

    if(isMax){

        let bestScore=-Infinity

        for(let i=0;i<9;i++){
            if(board[i]==""){

                board[i]="O"
                let score=minimax(board,depth+1,false)
                board[i]=""

                bestScore=Math.max(score,bestScore)
            }
        }

        return bestScore
    }

    else{

        let bestScore=Infinity

        for(let i=0;i<9;i++){
            if(board[i]==""){

                board[i]="X"
                let score=minimax(board,depth+1,true)
                board[i]=""

                bestScore=Math.min(score,bestScore)
            }
        }

        return bestScore
    }
}

function checkWinner(player){

    for(let combo of winCombos){

        let [a,b,c]=combo

        if(board[a]==player && board[b]==player && board[c]==player){
            return combo
        }

    }

    return null
}

function highlight(combo){

    combo.forEach(index=>{
        cells[index].style.background="lightgreen"
    })
}

function restartGame(){

    board=["","","","","","","","",""]
    gameOver=false

    cells.forEach(cell=>{
        cell.textContent=""
        cell.style.background="white"
    })

    statusText.innerText="Player X Turn..."
}
function showPopup(message){
    document.getElementById("winnerText").innerText = message
    document.getElementById("popup").style.display = "flex"
}

function closePopup(){
    document.getElementById("popup").style.display = "none"
    restartGame()
}