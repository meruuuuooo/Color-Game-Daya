const b1 = document.querySelector(".b1");
const b2 = document.querySelector(".b2");
const b3 = document.querySelector(".b3");
const b4 = document.querySelector(".b4");
const b5 = document.querySelector(".b5");
const b6 = document.querySelector(".b6");

const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const rollBtnEl = document.querySelector(".btn-roll");
const resetBtnEl = document.querySelector(".btn-reset");

let nIntervalId;
const boxs = [b1, b2, b3, b4, b5, b6];
const randomBoxes = [box1, box2, box3];

for (let i = 0; i < 6; i++) {
  boxs[i].addEventListener("click", () => {
    placeBetmodal(boxs[i]);
  });
}

rollBtnEl.addEventListener("click", () => {
  stopInterval();
});

rollBtnEl.addEventListener("dblclick", () => {
  const nonEmptyBoxColors = getNonEmptyBoxColors(boxs);
  if (nonEmptyBoxColors.length !== 6) {
    changeColor();
  } else {
    invalidModalShow();
  }
});

resetBtnEl.addEventListener("click", () => {
  reset();
});

function reset() {
  randomBoxes.forEach((element) => {
    element.style.backgroundColor = "bisque";
  });
  boxs.forEach((box) => {
    box.textContent = "";
  });
}

function stopInterval() {
  clearInterval(nIntervalId);
  nIntervalId = null;
}

function randomNum(arr) {
  return Math.floor(Math.random() * arr) + 1;
}

function getNonEmptyBoxColors(boxes) {
  let boxColors = [];

  for (let index = 0; index < boxes.length; index++) {
    if (boxes[index].textContent.trim() === "") {
      const color = window
        .getComputedStyle(boxes[index])
        .backgroundColor.toLowerCase();
      boxColors.push(color);
    }
  }
  return boxColors;
}

function changeColor() {
  const colors = ["yellow", "white", "palevioletred", "blue", "red", "green"];
  if (!nIntervalId) {
    nIntervalId = setInterval(() => {

      randomBoxes.forEach((element) => {
        element.style.backgroundColor = colors[randomNum(colors.length)];
      });

      const nonEmptyBoxColors = getNonEmptyBoxColors(boxs);

      //below you can change the prefered condition here i set it to 3
      if (nonEmptyBoxColors.length === 3) {
        for (let index = 0; index < randomBoxes.length; index++) {
          const randomIndex = randomNum(nonEmptyBoxColors.length) - 1;
          randomBoxes[index].style.backgroundColor =
            nonEmptyBoxColors[randomIndex];
        }
        setTimeout(() => {
          stopInterval();
        }, 1000);
      } else {
        setTimeout(() => {
          stopInterval();
        }, 1000);
      }
    }, 1);
  }
}

function placeBetmodal(value) {
  const modalEl = document.createElement("div");
  modalEl.classList.add("modal");
  setTimeout(() => {
    modalEl.classList.add("open");
  }, 200);

  const modalContentEl = document.createElement("div");
  modalContentEl.classList.add("content");

  const inputBetEl = document.createElement("input");
  inputBetEl.classList.add("input-bet-el");
  inputBetEl.type = "number";

  modalContentEl.appendChild(inputBetEl);

  const betContainerEl = document.createElement("div");
  betContainerEl.classList.add("bet-container-el");

  const defaultBets = [10, 20, 30, 40, 50];

  const btn1El = document.createElement("button");

  const btn1E2 = document.createElement("button");

  const btn1E3 = document.createElement("button");

  const btn1E4 = document.createElement("button");

  const btn1E5 = document.createElement("button");

  const btns = [btn1El, btn1E2, btn1E3, btn1E4, btn1E5];

  for (let i = 0; i < defaultBets.length; i++) {
    btns[i].textContent = `${defaultBets[i]}`;
    btns[i].classList.add("btn-el");
    btns[i].addEventListener("click", () => {
      inputBetEl.value = defaultBets[i];
    });
    betContainerEl.appendChild(btns[i]);
  }

  modalContentEl.appendChild(betContainerEl);

  const cancelAndBetBtn = document.createElement("div");
  cancelAndBetBtn.classList.add("cancelAndBetBtn");

  const cancelBtnEl = document.createElement("button");
  cancelBtnEl.classList.add("cancelBtnEl");
  cancelBtnEl.textContent = "Cancel";
  cancelBtnEl.addEventListener("click", () => {
    modalEl.classList.remove("open");
    setTimeout(() => {
      document.body.removeChild(modalEl);
    }, 300);
  });

  cancelAndBetBtn.appendChild(cancelBtnEl);

  const betBtnEl = document.createElement("button");
  betBtnEl.classList.add("betBtnEl");
  betBtnEl.textContent = "Bet";
  betBtnEl.addEventListener("click", () => {
    if (inputBetEl.value === "") {
      alert("No bet Added!");
    } else {
      value.textContent = inputBetEl.value;
      modalEl.classList.remove("open");
      setTimeout(() => {
        document.body.removeChild(modalEl);
      }, 300);
    }
  });

  cancelAndBetBtn.appendChild(betBtnEl);

  modalContentEl.appendChild(cancelAndBetBtn);

  modalEl.appendChild(modalContentEl);

  document.body.appendChild(modalEl);
}

function invalidModalShow() {
  const resultModalEl = document.createElement("div");
  resultModalEl.classList.add("resultModal");
  setTimeout(() => {
    resultModalEl.classList.add("openResult");
  }, 200);

  const resultContentEl = document.createElement("div");
  resultContentEl.classList.add("resultContent");

  const titleEl = document.createElement("h1");
  titleEl.innerHTML = "Invalid! <hr>";

  resultContentEl.appendChild(titleEl);

  const messageContainerEl = document.createElement("div");
  messageContainerEl.classList.add("messageContainer");

  const messageEl = document.createElement("p");
  messageEl.innerHTML = "Please place a bet on the boxes before rolling the dice!";

  messageContainerEl.appendChild(messageEl);

  resultContentEl.appendChild(messageContainerEl);

  const okBtnEl = document.createElement("button");
  okBtnEl.classList.add("okBtnEl");
  okBtnEl.textContent = "Ok";

  okBtnEl.addEventListener("click", () => {
    resultModalEl.classList.remove("openResult");
    setTimeout(() => {
      document.body.removeChild(resultModalEl);
    }, 300);
  });

  resultContentEl.appendChild(okBtnEl);

  resultModalEl.appendChild(resultContentEl);

  document.body.appendChild(resultModalEl);
}
