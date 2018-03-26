Instructions to run the code:
1) If you have not already, install node and npm from https://nodejs.org/en/, I use version 7.6
1) Within the tech challenge folder, run 'npm install lodash' using a CLI to install the lone node module I used
2) Within the folder, Run 'node scenario1.js' using CLI to run the code
3) A file called 'finalAnswer.json' will be generated with the answers to the questions i have answered in the format requested.

Notes:
I decided to read the json input from a local json file as I felt this was the simpliest and cleanest way to read the json input.
I left out question 6 and started but not finished question 4 because I felt like I spent enough time working on this challenge

Question 4 thought process:
1)Using lodash, filter the json input by the routes that start with A
2)Create as many routes possible from A - C using both the filtered array and the original json input, using lodash.
3)Push all results into an array then filter via index with string length of 5


