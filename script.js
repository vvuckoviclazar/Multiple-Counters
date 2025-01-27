"use strict";

const boxes = document.querySelector(".boxes");
const marbles = document.querySelector(".marbles");
const boxBtn = document.querySelector(".boxBtn");
const boxList = document.querySelector(".boxList");

function counterCreator() {
  let id = crypto.randomUUID();
  let counterNum = 0;

  const getId = () => id;

  const increaseCounterNum = () => {
    counterNum += 1;
    return counterNum;
  };

  const decreaseCounterNum = () => {
    counterNum -= 1;
    return counterNum;
  };

  const getCurrentNum = () => {
    return counterNum;
  };

  return {
    getId,
    increaseCounterNum,
    decreaseCounterNum,
    getCurrentNum,
  };
}

function counterManager() {
  let counterData = [];

  const addData = (data) => {
    counterData.push(data);
  };

  const getData = () => {
    return counterData;
  };

  const setData = (data) => {
    counterData = data;
  };

  const calculateMarblesNum = () => {
    const totalMarbles = counterData.reduce((sum, data) => {
      return sum + data.getCurrentNum();
    }, 0);

    return totalMarbles;
  };

  const removeCounter = (id) => {
    const updatedCounters = manager
      .getData()
      .filter((data) => data.getId() !== id);
    manager.setData(updatedCounters);
    manager.calculateMarblesNum();
  };

  return { addData, getData, setData, calculateMarblesNum, removeCounter };
}

const manager = counterManager();

boxList.addEventListener("click", (e) => {
  const counterElement = e.target.closest("li");
  if (!counterElement) return;

  const id = counterElement.id;
  const data = manager.getData().find((data) => data.getId() === id);

  const spanNumber = counterElement.querySelector(".spanNumber");

  if (e.target.closest(".plusBtn")) {
    spanNumber.textContent = data.increaseCounterNum();
    marbles.textContent = manager.calculateMarblesNum();
  }
  if (e.target.closest(".minusBtn")) {
    spanNumber.textContent = data.decreaseCounterNum();
    marbles.textContent = manager.calculateMarblesNum();
  }
  if (e.target.closest(".removeBtn")) {
    counterElement.remove();
    manager.removeCounter(id);
    boxes.textContent = manager.getData().length;
    marbles.textContent = manager.calculateMarblesNum();
  }
});

function getCounter(id) {
  const counter = document.createElement("li");
  counter.id = id;
  counter.classList.add("counter");
  counter.innerHTML = `
    <button class="minusBtn">-</button>
    <span class="spanNumber">0</span>
    <button class="plusBtn">+</button>
    <button class="removeBtn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="trash ">
        <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd" />
      </svg>
    </button>`;
  return counter;
}

boxBtn.addEventListener("click", () => {
  const data = counterCreator();
  manager.addData(data);

  const counterElement = getCounter(data.getId());
  boxList.appendChild(counterElement);

  boxes.textContent = manager.getData().length;
});
