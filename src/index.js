import "./styles.css";

const clearButton = document.querySelector(".title-row > button");
const inputs = document.querySelectorAll("input");

clearButton.addEventListener("click", () => {
  inputs.forEach((input) => {
    if (input.type === "radio") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
});
