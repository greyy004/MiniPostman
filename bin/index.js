#!/usr/bin/env node
import chalk from "chalk";
import { makeRequest } from "../src/request.js";

console.log(chalk.green("Welcome to API Test CLI!"));
const args = process.argv.slice(2);

const method = args[0];
const url = args[1];
const rawdata = args[2];

if (!method || !url) {
    console.log(chalk.red("Please provide both HTTP method and URL."));
    process.exit(1);
}

let data = null;

if (rawdata) {
    try {
        data = JSON.parse(rawdata);
    } catch (err) {
        console.log(chalk.red("Invalid JSON body"));
        process.exit(1);
    }
}

console.log(chalk.green("processing your request..."));

try {
  const response = await makeRequest(method, url, data);

  if (response.success === false) {
    console.log(chalk.red("Request failed"));
    console.log(chalk.red(response.message));
    process.exit(1);
  }

  console.log(chalk.blue("Response:"));
  console.log(chalk.yellow(JSON.stringify(response, null, 2)));

} catch (error) {
  console.error(chalk.red("Unexpected Error:"), error.message);
}

