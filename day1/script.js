// Step 1: Ask the User for input
let userName = prompt("What is your name?");
let birthYearString = prompt("What is your birth year?");
let isStudent = confirm("Are you a student?");

// Convert birthYear to a number
let birthYear = parseInt(birthYearString);

// Variables for output messages
let finalMessage = "";
let category = "";
let studentMessage = "";

// Calculate the user's current age
const currentYear = new Date().getFullYear();
let age = currentYear - birthYear;
// Use conditional logic to categorize their age
if (age < 13) {
    category = "Kid";
} else if (age >= 13 && age <= 17) {
    category = "Teen";
} else if (age >= 18 && age <= 59) {
    category = "Adult";
} else if (age >= 60) {
    category = "Senior";
} else {
    category = "Invalid Birth Year";
    age = "N/A"; // Set age to N/A if invalid
}

// If the user is a student, also display: "Don't forget to study hard!"
if (isStudent) {
    studentMessage = "\nDon't forget to study hard!";
}

// Construct the final message
if (age !== "N/A") {
    finalMessage = `Hello ${userName}, you are ${age} years old.\nCategory: ${category}`;
} else {
    finalMessage = `Hello ${userName}, your age could not be determined due to an invalid birth year.\nCategory: ${category}`;
}
finalMessage += studentMessage;

// 1. In the browser console (console.log)
console.log("--- Smart User Checker App Results ---");
console.log(finalMessage);
// 2. In an alert box
alert(finalMessage);
// 3. In the HTML page using DOM (document.getElementById(...).innerText)
const outputDiv = document.getElementById("output");
if (outputDiv) {
    outputDiv.innerHTML = `<pre>${finalMessage}</pre>`;// Using <pre> tag to preserve new lines and spaces from the finalMessage
} else {
    console.error("Output div not found in the HTML.");
}
