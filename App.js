// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from "react"
import Die from "./Die";
import './style.css';
import {nanoid} from "nanoid"
import Confetti from "react-confetti" 

function App(){
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die=> die.isHeld )
    const firstValue = dice[0].value
    const allsameValue = dice.every(die=> die.value ===  firstValue)
    if(allHeld && allsameValue) {
      setTenzies(true)
    console.log("You Won!")
    }
  }, [dice])  

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id : nanoid()
    }
  }


  function allNewDice() {
    const newDice = [] 
    for(let i=0; i<10; i++) {
      newDice.push(generateNewDie())
  }
    // console.log(newDice)
    return newDice
  }

  function rollDice(){
    if(!tenzies) {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ?
      die : 
       generateNewDie()
    }))
  } else{
    setTenzies(false)
    setDice(allNewDice())
  }
}
  function holdDice(id){
    // console.log(id)
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
      {...die, isHeld: !die.isHeld} :
      die
    }))
  }
  // console.log(allNewDice())
  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)
  return(
<main>
  {tenzies && <Confetti />}
  <h1 className="title">Tenzies</h1>
  <p className="instructions">Roll untill all dice are same. Click each die to freeze it at its current value between rolls.</p>
  <div className="dice-container">
 {/* <Die value="1" />
 <Die value="2" />
 <Die value="3" />
 <Die value="4" />
 <Die value="5" />
 <Die value="6" />
 <Die value="7" /> 
 <Die value="8" />
 <Die value="9" />
 <Die value="10" /> */}
 {diceElements}
 </div>
 <button className="roll-dice" 
 onClick={rollDice}>
  {tenzies ? "New Game" : "Roll"}
  </button>
</main>
  )
}

export default App;