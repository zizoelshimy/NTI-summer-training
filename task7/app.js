// app.js
import { add, subtract, pi } from './math.js';
import { greet } from './greet.js';
import { capitalize } from './utils.js';

console.log("Add: ", add(5, 3));          
console.log("Subtract: ", subtract(10, 4)); 
console.log("Pi value: ", pi);            


console.log(greet("moataz"));            

console.log(capitalize("hello"));         
