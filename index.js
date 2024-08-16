// global scope variable
const userText = document.querySelector("#user-input");
const btnSubmit = document.getElementById("btn-submit");
const para = document.querySelector("#para");
const header = document.querySelector("#head");
const heart = document.querySelector(".heart-container");
const grad = document.querySelector(".gradient");
let audio = new Audio("./assets/wrong.mp3");
let audioWin = new Audio("./assets/win.mp3");
let audioLose = new Audio("./assets/lose.mp3");
let label = document.querySelector("#label");
userText.focus();

const randNum = Math.floor(Math.random() * 50);
console.log(randNum);

btnSubmit.addEventListener("click", handleUserInput);

let count = 5;

function handleUserInput() {
  let userInput = Number(userText.value);
  count--;

  const heartImageHTML = `
  <img class="heart" src="./assets/pixelated-heart-multiple-colours.png" 
  alt="heart" height="100px" width="100px" />
`;

  if (randNum !== userInput) {
    heart.innerHTML = "";

    for (let i = 0; i < count; i++) {
      heart.innerHTML += heartImageHTML;
    }
  }

  console.log(userInput);

  if (isNaN(userInput)) {
    audio.play();
    grad.classList.add("wrong");
    setTimeout(function () {
      grad.classList.remove("wrong");
    }, 200);
    userText.value = "";
    userText.focus();
    para.textContent = `Please enter a valid number. You have ${count} attempts left`;
  } else if (userInput === randNum) {
    userText.value = "";
    label.style.display = "none";
    btnSubmit.textContent = "😭";
    grad.style.backgroundColor = "rgba(0, 128, 0, 0.716)";
    userText.style.display = "none";
    para.textContent = "";
    audioWin.play();
    btnSubmit.textContent = "✓";
    btnSubmit.style.backgroundColor = "#00B900";
    header.textContent = " You WIN! The secret number was " + randNum;
    para.textContent = `Flawless Victory!`;
    userText.disabled = true;
    btnSubmit.disabled = true;
  } else if (userInput < randNum) {
    grad.classList.add("wrong");
    setTimeout(function () {
      grad.classList.remove("wrong");
    }, 200);
    audio.play();
    userText.value = "";
    userText.focus();
    para.textContent = `${userInput} is less than the secret number. You have ${count} attempts left. Try again`;
  } else if (userInput > randNum) {
    grad.classList.add("wrong");
    setTimeout(function () {
      grad.classList.remove("wrong");
    }, 200);
    audio.play();
    userText.value = "";
    userText.focus();
    para.textContent = `${userInput} is greater than the secret number. You have ${count} attempts left. Try again`;
  }

  if (count === 0 && userInput !== randNum) {
    btnSubmit.disabled = true;
    setTimeout(() => {
      label.style.display = "none";
      btnSubmit.textContent = "😭";
      grad.style.backgroundColor = "rgba(255, 0, 0, 0.705)";
      userText.style.display = "none";
      para.textContent = `Oh Noooo, Noooo, Noooo!`;
      header.textContent = `Game Over. The secret number was ` + randNum;
      userText.disabled = true;
      audioLose.play();
    }, 500);
    header.style.textShadow = "4px 4px 8px rgba(178, 34, 34, 0.596)";
  }
}
