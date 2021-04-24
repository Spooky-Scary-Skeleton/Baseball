console.log("hello, vanilla.");

const startBtn = document.querySelector(".start-btn");
const restartBtn = document.querySelector(".restart-btn");
const userInputBox = document.querySelector(".user-input-box")
const userInput = document.querySelector(".user-input")
const userGuessBox = document.querySelector(".user-guess-box")
const attemptLeft = document.querySelector(".attempt")
const instruction = document.querySelector(".instruction")

let answer = "";
let userGuess = 0;
let attemptCount = 10;
let answerHit = false; //정답 이미 맞힌 상태 기록

function createRandomNumber() {
  //각자릿수가 0~9이며 서로 다른 3자릿수 생성
  while (answer.length < 3) {
    let random_num = Math.floor(Math.random()*10).toString();
    while (answer.includes(random_num)) {
      random_num = Math.floor(Math.random()*10).toString();
    }
    answer += random_num;
  }
  console.log(answer);
}

function showResult(result) {
  let resultStatement = document.createElement("div");
  if (result.strike !== 3) {
    resultStatement.classList.add("user-guess");
    resultStatement.innerText = `${userGuess} is Strike: ${result.strike} Ball: ${result.ball} Out: ${result.out}`;
    userGuessBox.appendChild(resultStatement);
  } else {
    resultStatement.classList.add("user-hit-answer");
    resultStatement.innerText = `You've hit the answer(${userGuess})!`
    instruction.innerHTML = `Target:${answer}<br>Type your number and press Enter`
    userGuessBox.appendChild(resultStatement);
   answerHit = true;
  }
}

function compareNumber() {

  let result = {
    strike:0,
    ball:0,
    out:0
  };

  for (let i = 0; i < 3; i++) {
    let out = true; //아웃 판별용 변수
    //strike 판별
    if (userGuess[i] === answer[i]) {
      result.strike += 1;
      continue;
    }
    for (let j = 0; j < 3; j++) {
      //ball 판별
      if (userGuess[i] === answer[j]) {
          result.ball += 1;
          out = false;
          break;
        }
    }
    //아웃일경우 아웃 추가.
    if (out === true) {
      result.out += 1;
    }
  }
  console.log(result);
  showResult(result);
}

function handleUserInput(event) {
  if (event.key === "Enter" && attemptCount > 0 && answerHit === false) {
    userGuess = userInput.value;
    if (userGuess.length !== 3) {
      alert("Please enter 3 digit number.");
      return;
    }
    compareNumber();
    attemptCount -= 1;
    console.log(attemptCount);
    attemptLeft.innerText = `attempt left: ${attemptCount}`;
    userInput.value = ""
  } else if (event.key === "Enter" && attemptCount <= 0) {
    alert("No more attempt left. Please Restart the Game.")
    userInput.value = ""
  } else if (event.key === "Enter" && answerHit === true) {
    alert("You've already hit the answer. Click RESTART to play again.")
  }
}

function handleStartBtnClick() {
  createRandomNumber();
  userInputBox.classList.remove("hide");
  userInputBox.classList.add("show-user-input-box");
}

function handleRestartBtnClick() {
 answerHit = false;
  attemptCount = 10;
  answer = "";
  instruction.innerHTML = `Target:???<br>Type your number and press Enter`;
  handleStartBtnClick();
  while (userGuessBox.firstChild) {
    userGuessBox.removeChild(userGuessBox.firstChild);
  }
  attemptLeft.innerText = `attempt left: ${attemptCount}`;
}

function inIt() {
  startBtn.addEventListener("click", handleStartBtnClick);
  userInput.addEventListener("keydown", handleUserInput);
  restartBtn.addEventListener("click", handleRestartBtnClick);
}

inIt()