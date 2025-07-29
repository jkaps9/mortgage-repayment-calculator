import "./styles.css";

const clearButton = document.querySelector(".title-row > button");
const inputs = document.querySelectorAll("input");

const calculateButton = document.querySelector("#calculate");
const emptyResults = document.querySelector(".empty-results");
const completedResults = document.querySelector(".completed-results");

clearButton.addEventListener("click", () => {
  inputs.forEach((input) => {
    if (input.type === "radio") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });

  emptyResults.classList.remove("hidden");
  completedResults.classList.add("hidden");
});

calculateButton.addEventListener("click", () => {
  if (!emptyResults.classList.contains("hidden")) {
    emptyResults.classList.add("hidden");
    completedResults.classList.remove("hidden");
  }
});
