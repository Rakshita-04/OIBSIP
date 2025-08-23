function convertTemperature(value, unit) {
  let celsius;

  switch (unit) {
    case "celsius":
      celsius = value;
      break;
    case "fahrenheit":
      celsius = (value - 32) * 5 / 9;
      break;
    case "kelvin":
      celsius = value - 273.15;
      break;
  }

  return {
    celsius: +(celsius.toFixed(2)),
    fahrenheit: +(((celsius * 9) / 5 + 32).toFixed(2)),
    kelvin: +((celsius + 273.15).toFixed(2))
  };
}

document.getElementById("convertBtn").addEventListener("click", () => {
  const input = document.getElementById("temperature").value.trim();
  const unit = document.getElementById("unit").value;
  const errorBox = document.getElementById("error");
  const resultsBox = document.getElementById("results");
  const inputInfo = document.getElementById("inputInfo");

  errorBox.classList.add("hidden");
  resultsBox.classList.add("hidden");

  if (!input) {
    errorBox.textContent = "Please enter a temperature value.";
    errorBox.classList.remove("hidden");
    return;
  }

  const num = parseFloat(input);
  if (isNaN(num)) {
    errorBox.textContent = "Please enter a valid number.";
    errorBox.classList.remove("hidden");
    return;
  }
  if (unit === "kelvin" && num < 0) {
    errorBox.textContent = "Kelvin temperature cannot be below 0.";
    errorBox.classList.remove("hidden");
    return;
  }
  if (unit === "celsius" && num < -273.15) {
    errorBox.textContent = "Temperature cannot be below -273.15°C.";
    errorBox.classList.remove("hidden");
    return;
  }
  if (unit === "fahrenheit" && num < -459.67) {
    errorBox.textContent = "Temperature cannot be below -459.67°F.";
    errorBox.classList.remove("hidden");
    return;
  }

  const result = convertTemperature(num, unit);

  document.getElementById("celsiusResult").textContent = result.celsius + "°C";
  document.getElementById("fahrenheitResult").textContent = result.fahrenheit + "°F";
  document.getElementById("kelvinResult").textContent = result.kelvin + "K";

  inputInfo.textContent = `Input: ${num} (${unit.charAt(0).toUpperCase() + unit.slice(1)})`;
  resultsBox.classList.remove("hidden");
});
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});
