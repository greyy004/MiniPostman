import chalk from "chalk";
import { getRequest } from "./request.js";

console.log(chalk.green("Welcome to API Test CLI!"));
const args = process.argv.slice(2);

const method = args[0];
const url = args[1];
const rawdata = args[2];

if(!method || !url){
console.log(chalk.red("Please provide both HTTP method and URL."));
process.exit(1);
}

let data = null;
if(rawdata){
    data = JSON.parse(rawdata);
}
console.log(chalk.green("processing your request..."));

try {
    const response = await getRequest(method, url, data);
    console.log(chalk.blue("Response:"));
    console.log(chalk.yellow(JSON.stringify(response, null, 2)));
}
catch (error) {
    console.error(chalk.red("Error:"), error.message);
}

