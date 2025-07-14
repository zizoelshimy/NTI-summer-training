function checkWeather() {
  let temp = prompt("Enter the temperature:");
  temp = Number(temp);

  // Determine condition using ternary operator
  const condition = temp < 0 ? "Freezing cold": temp <= 15? "Cold": temp <= 25? "Mild": temp <= 35? "Warm": "Hot";

  // Determine safety using if/else
  let safety;
  if (temp < -5 || temp > 40) {
    safety = "Dangerous temperature";
  } else {
    safety = "Safe temperature";
  }

  // Additional advice using ternary operator
  const advice = temp > 30? "Stay hydrated!": temp >= 16 && temp <= 25? "Perfect for outdoor activities!": "No specific advice.";

  // Final result
  const output = `Condition: ${condition}\nSafety: ${safety}\nAdvice: ${advice}`;

  // Output in console
  console.log(output);

  // Output in alert
  alert(output);

  // Output in DOM
  document.getElementById("result").textContent = output;
}
