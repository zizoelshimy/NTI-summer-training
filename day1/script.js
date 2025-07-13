// Get the user's name
let userName = prompt("What is your name?");

// Get the user's birth year (we'll convert it to a number)
let birthYearInput = prompt("What year were you born?");
let birthYear = parseInt(birthYearInput); // Convert text to a whole number

// Ask if they are a student (true or false)
let isStudent = confirm("Are you a student?");
// Calculate current age
const currentYear = new Date().getFullYear(); 
let age = currentYear - birthYear;

// Determine age category
let ageCategory = ""; // This variable will store "Kid", "Teen", "Adult", or "Senior"

if (age < 13) {
    ageCategory = "Kid";
} else if (age >= 13 && age <= 17) {
    ageCategory = "Teen";
} else if (age >= 18 && age <= 59) {
    ageCategory = "Adult";
} else { // If none of the above, they must be 60 or older
    ageCategory = "Senior";
}

// Add a special message if they are a student
let studyReminder = "";
if (isStudent) {
    studyReminder = "\nDon't forget to study hard!";
}

// Combine all parts into one final message
let finalMessage = `Hello ${userName}, you are ${age} years old.\nCategory: ${ageCategory}${studyReminder}`;

// 1. Show in the browser's console (for developers)
console.log("--- Console Output ---");
console.log(finalMessage);
console.log("---------------------------------");

// 2. Show in alert box
alert(finalMessage);

// 3. Show directly on the web page
document.getElementById("result").innerText = finalMessage; // Puts the message inside the 'result' area on the page