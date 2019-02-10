// import Papa from 'papaparse';
import {transformInputs} from './transformer';

const Papa = require('papaparse');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.question('Enter the csv file path ', (answer) => {
  console.log(`Thank you, ${answer} will now be processed`);
  // let forcedInput = "./data/sample.csv";
  processFile(answer);
  rl.close();
});

// rl.on('line', (line) => {
//   processFile(line)
// }).on('close', () => {
//   process.exit();
// });

function processFile(input) {

  console.log(input);
  const fileStream = fs.createReadStream(input); //needs file not path
  Papa.parse(fileStream, {
    header: true,
    encoding: "utf8",
    error: function(errorMessage, file) {
      console.log(errorMessage);
    },
    transform: transformInputs,
    complete: function(results) {
      console.log("Parsing complete:", results)
      fs.writeFile('./data/output.csv', Papa.unparse(results), (err) => {
        if (err) throw err;
        console.log('The file has been created!');
      });
    }
  });  
}