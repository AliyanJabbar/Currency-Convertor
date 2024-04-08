import inquirer from "inquirer";

const currency: any = {
  USD: 1, //base currency
  EUR: 0.92,
  PKR: 278,
  INR: 83.28,
  AED: 3.67,
};

let user_answer = await inquirer.prompt([
  {
    name: "from",
    message: "Enter From Currency",
    type: "list",
    choices: ["USD", "EUR", "PKR", "INR", "AED"],
  },

  {
    name: "to",
    message: "Enter to Currency",
    type: "list",
    choices: ["USD", "EUR", "PKR", "INR", "AED"],
  },
  {
    name: "amount",
    message: "Enter amount to convert",
    type: "number"
  }
]);


let userFromCurrency = user_answer.from
let userToCurrency = user_answer.to

let fromAmount = currency[userFromCurrency] // here we use currency to take exchange rate given above //here we have used dynamic approach because we can add multiple currencies in our choices section but if we use if else condition than we have to take diffent if else section for our different currencies
let toAmount = currency[userToCurrency]
let amount = user_answer.amount
let baseAmount = amount / fromAmount //we are converting the selected currency to our base currency which is USD here , because we don't know what is the selected currency
let convertedAmount = baseAmount * toAmount
console.log(convertedAmount)