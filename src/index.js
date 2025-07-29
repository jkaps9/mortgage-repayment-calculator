import "./styles.css";

const clearButton = document.querySelector(".title-row > button");
const inputs = document.querySelectorAll("input");
const principalInput = document.querySelector("input#principal");
const termInput = document.querySelector("input#term");
const rateInput = document.querySelector("input#rate");

const calculateButton = document.querySelector("#calculate");
const emptyResults = document.querySelector(".empty-results");
const completedResults = document.querySelector(".completed-results");

const monthlyPayment = document.querySelector(".monthly-repayment-amount");
const totalPayment = document.querySelector(".total-repayment-amount");

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

  const principal = principalInput.value;
  const term = termInput.value;
  const rate = rateInput.value / 100;

  monthlyPayment.textContent =
    "£" +
    roundToTwoDecimals(
      getMonthlyPayment(principal, term, rate),
    ).toLocaleString();
  totalPayment.textContent =
    "£" +
    roundToTwoDecimals(getTotalPayments(principal, term, rate)).toLocaleString(
      undefined,
      { minimumFractionDigits: 2 },
    );
});

function getMonthlyPayment(principal, term, rate) {
  // // M  = P * (r (1 + r)^n) / ((1 + r)^n - 1)
  // M	Total monthly mortgage payment
  // P	Principal loan amount
  // r	Monthly interest rate: Lenders provide you an annual rate so you’ll need to divide that figure by 12 (the number of months in a year) to get the monthly rate. If your interest rate is 5 percent, your monthly rate would be 0.004167 (0.05/12=0.004167).
  // n	Number of payments over the loan’s lifetime: Multiply the number of years in your loan term by 12 (the number of months in a year) to get the number of payments for your loan. For example, a 30-year fixed mortgage would have 360 payments (30x12=360).

  const monthlyRate = rate / 12;
  const months = term * 12;
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  const monthlyPayment = principal * (numerator / denominator);
  return monthlyPayment;
}

function getTotalPayments(principal, term, rate) {
  const monthlyPayment = getMonthlyPayment(principal, term, rate);
  return monthlyPayment * (12 * term);
}

function roundToTwoDecimals(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
