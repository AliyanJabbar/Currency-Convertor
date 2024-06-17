#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let apiLink = "https://v6.exchangerate-api.com/v6/3cee310aa784eefc20408ba0/latest/USD"; ///using api to get exchange rates of different currencies.
// console.log(apiLink) //it will give the link
// we have to fetch data from the url:
let fetching = async (data) => {
    let fetchData = await fetch(data);
    let response = await fetchData.json();
    return response.conversion_rates;
};
let conversionRates = await fetching(apiLink); //if we don't use await here it will show that promise is in pending
// console.log(conversionRates) //giving all conversion rates
let currencies = Object.keys(conversionRates); //keys is javascript built in function which takes an object
// 1.The Object.keys() method returns an array with the keys of an object.
// 2.The Object.keys() method does not change the original object.
// console.log(countries) //giving an array of keys present in conversionRates
let userInputFrom = await inquirer.prompt({
    name: "fromCurrency",
    type: "list",
    message: chalk.yellow("FROM WHICH CURRENCY YOU WANT TO CONVERT?"),
    choices: currencies.map((val) => val),
});
let userInputAmount = await inquirer.prompt({
    name: "amount",
    type: "number",
    message: chalk.yellow(`ENTER AMOUNT IN ${chalk.green(userInputFrom.fromCurrency)} TO CONVERT...`)
});
console.log(chalk.bgBlueBright(`CONVERTING FROM ${userInputFrom.fromCurrency}`));
let userInputTo = await inquirer.prompt({
    name: "toCurrency",
    type: "list",
    message: chalk.yellow("TO WHICH CURRENCY YOU WANT TO CONVERT?"),
    choices: currencies.map(val => val)
});
let fromCurrency = userInputFrom.fromCurrency;
let toCurrency = userInputTo.toCurrency;
let amount = userInputAmount.amount;
let baseCurrency = amount / conversionRates[fromCurrency]; // //we are converting the selected currency to our base currency which is USD here , because we don't know what is the selected currency
let convertedAmount = baseCurrency * conversionRates[toCurrency];
let roundOf = Math.floor(convertedAmount);
console.log(chalk.magenta(`YOUR CONVERTED AMOUNT IS: ${chalk.bgCyan(roundOf, toCurrency)}`));
