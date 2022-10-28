

var noDice=0
var message=""
var round=0
var balanceOfPoints=0
/* 
the function setup the dice on the dom according to the user input of  number of dice to play

@param table->the table element
@param num ->the number of dice chosen by the player 
*/

function setup(table,num){
    var trElement=table.firstChild.firstChild
    console.log(trElement)
    for(var i=0;i<num;i++){
        var tdElement=trElement.insertCell(i)
        tdElement.setAttribute('id',i+"1")
        
        var img=document.createElement('img')

        img.src='diceOne.png'
        img.setAttribute('id',i)
        tdElement.appendChild(img)

    }
}


/* 
rolling the dices is done using the play function

@param no parameters 
 
*/
function play(){
    round++
    console.log(round)
    
    var diceOut=[]

    for(var i=1;i<=noDice;i++){
        diceOut.push( Math.floor(Math.random()*6)+1)
    }
    console.log(diceOut)
    for(var i=0;i<diceOut.length;i++){
        var diceFace=diceFaces(diceOut[i])
        document.getElementById(String(i)).src=diceFace
    



    }
    var scoreForTheRound=calcScore(diceOut)
    balanceOfPoints+=scoreForTheRound


    console.log('scoreForTheRound',scoreForTheRound)
    console.log('balance of points',balanceOfPoints)
    document.getElementById('scoreCard').innerHTML="Score for the round "+round+" is:"+scoreForTheRound
    document.getElementById('playButton').style.display='none'
    document.getElementById('section3').style.display='unset'
    


}
/* 
player is asked wheather to move to next round or to end game and if move to next chooseen continueGame is invoked

@param no parameters 
 
*/
function continueGame(){
    for(var i=0;i<noDice;i++){
        document.getElementById(i+"1").remove()


    }
    setup(document.getElementById('table'),noDice)


    document.getElementById('scoreCard').innerHTML=""
    document.getElementById('playButton').style.display='unset'
    document.getElementById('section3').style.display='none'
    


}



/* 
claculationg the  overall score earnedby the player based on the diceOutputs

@param diceOutputs-> the output after rolling N number of dice 
 
*/
function calcScore(diceOutputs){
    var totalOutputPerRound=diceOutputs.reduce(function(prevValue,nextValue){return prevValue+nextValue})

    




    if(allEqual(diceOutputs)){
        return 60+totalOutputPerRound
    }else if(sequenceCheck(diceOutputs)){
        return 20+totalOutputPerRound
    }else if(notOneElementEqual(diceOutputs)){
        return 40+totalOutputPerRound
    }else if(allNotEqual(diceOutputs)&&!sequenceCheck(diceOutputs)){
        return totalOutputPerRound
        
    }else{
        return 0
    }
  
    



}


/* 
when the player chooses to end the game endGame function is invoked

@param no parameters 
 
*/

function endGame(){
    document.getElementById('section3').style.display='none'
    document.getElementById('section1').style.display='none'
    document.getElementById('section2').style.display='none'
    document.getElementById('result').style.display='unset'
    document.getElementById('scoreCard').style.display='none'
    document.getElementById('round').innerHTML=round
    document.getElementById('totalScore').innerHTML=balanceOfPoints
    round=0
    balanceOfPoints=0



    


}

/* 
After ending the game the player is choosen an option to start the game again from the start 

@param no parameters 
 
*/

function playAgain(){
    location.reload()
}



/* 
user should input a number in between 3 and 6 including both,the condition is checked using ValidateUserInput function

@param userInput->number of dice user have choosen 
@param table->table element where the dice needs to be displayed
@param msg->msg element to display the message to the player if the player enters an invalid input 
 
*/
function ValidateUserInput(userInput,table,msg){

   
    
        if(userInput.length==1&&userInput.match('[3-6]')){
            noDice=parseInt(userInput)
            message=""
            msg.innerHTML=message
            setup(table,noDice)
            document.getElementById('section1').style.display='none';
            document.getElementById('section2').style.display='unset'
        
            

        }
        else{
            message="please choose a number between 3 to 6"
            msg.innerHTML=message;
            

        }
}

/* 
function to  select the dice display according to the output when the player rolls the dice

@param faces->face number of the dice

all images used are downloaded from https://game-icons.net/
 
*/

function diceFaces(faces){
    var src="one.png"
    switch(faces){
        case 1:
            src="diceOne.png"
            break
        case 2:
            src="diceTwo.png"
            break
        case 3:
            src="diceThree.png"
            break
        case 4:
            src="diceFour.png"
            break
        case 5:
            src="diceFive.png"
            break
        case 6:
            src="diceSix.png"
            break
    }

    return src;

}
/* 
function to check wheather the dice outputs are in run

@param arrayInput->the dice output
 
*/
function sequenceCheck(arrayInput){
    var sortedInput=arrayInput.sort(function(a,b){
        return b-a
    })
    console.log(sortedInput)
    var run=sortedInput.every(function(value,index){
        return index===sortedInput.length-1 || value-1===sortedInput[index+1]
        })
    
    return run
}
/* 
function to check wheather the dice output are all equal

@param arrayInput->the dice output
 
*/

function allEqual(arrayInput){
    return arrayInput.every(function(value){return value===arrayInput[0]})


}
/* 
function to check wheather all the dice output expect one  are equal

@param arrayInput->the dice output
 
*/
function notOneElementEqual(arrayInput){
    var success=0
    var failure=0
    var arrayInputSetLen=new Set(arrayInput).size
    console.log(arrayInputSetLen)
    if(arrayInputSetLen===2){
   

        for(var i=0;i<arrayInput.length;i++){
            if(arrayInput[i]===arrayInput[0]){
                success++
            }
            else{
                failure++
            }
        }
        if(success===arrayInput.length-1||failure===arrayInput.length-1){
            return true
        }
        else{
            return false
        }
    }
    else{
        return false
    }



}

/* 
function to check wheather the all the dice outputs are different 

@param arrayInput->the dice output
 
*/
function allNotEqual(arrayInput){
    return new Set(arrayInput).size===arrayInput.length
}

