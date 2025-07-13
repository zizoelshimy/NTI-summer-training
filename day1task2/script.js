document.getElementById("employeeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = parseInt(document.getElementById("age").value);
  const experience = parseFloat(document.getElementById("experience").value);
  const rating = parseFloat(document.getElementById("rating").value);
  const baseSalary = parseFloat(document.getElementById("baseSalary").value);

  // Job Category
  let jobCategory = "";
  if (experience < 2) jobCategory = "Junior";
  else if (experience <= 5) jobCategory = "Mid-Level";
  else if (experience <= 10) jobCategory = "Senior";
  else jobCategory = "Expert";

  // Performance Level
  let performance = "";
  switch (true) {
    case (rating >= 9):
      performance = "Excellent";
      break;
    case (rating >= 7):
      performance = "Good";
      break;
    case (rating >= 5.6):
      performance = "Average";
      break;
    default:
      performance = "Needs Improvement";
  }

// Bonus Calculation (Fixed)
let bonusPercentage = 0;
if (experience >= 0 && experience <= 2) bonusPercentage = 0.1;
else if (experience > 2 && experience <= 5) bonusPercentage = 0.15;
else if (experience > 5) bonusPercentage = 0.2;


  const bonus = baseSalary * bonusPercentage;
  const finalSalary = baseSalary + bonus;

  // Work Shift
  const hour = new Date().getHours();
  const shift = hour >= 9 && hour < 18 ? "Day Shift" : "Night Shift";

  // DOM Output (with <br>)
  const htmlOutput = `
    Name: ${name}<br>
    Age: ${age}<br>
    Experience: ${experience} years (${jobCategory})<br>
    Performance: ${performance}<br>
    Base Salary: $${baseSalary.toFixed(2)}<br>
    Bonus: $${bonus.toFixed(2)}<br>
    Final Salary: $${finalSalary.toFixed(2)}<br>
    Work Shift: ${shift}
  `;

  // Console Output (plain text)
  const textOutput = `
Name: ${name}
Age: ${age}
Experience: ${experience} years (${jobCategory})
Performance: ${performance}
Base Salary: $${baseSalary.toFixed(2)}
Bonus: $${bonus.toFixed(2)}
Final Salary: $${finalSalary.toFixed(2)}
Work Shift: ${shift}`;

  console.log(textOutput);
  alert(`Employee ${name} is evaluated. Final Salary: $${finalSalary.toFixed(2)}`);
  document.getElementById("output").innerHTML = htmlOutput;
});
