import readline from 'readline';
import {processFile} from './processor';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.question('Enter the file name of the CSV File you would like processed from ./data/ or input 1 or 2 to select from the following CSV files located in ./data/ \n 1: sample.csv \n 2: sample-with-broken-utf8.csv \n', (answer) => {
  if(answer == '1') {
    console.log('sample.csv will now be processed \n');
    processFile("./data/sample.csv");
  } else if(answer == '2') {
    console.log('sample-with-broken-utf8.csv will now be processed \n');
    processFile("./data/sample-with-broken-utf8.csv");
  } else if(answer) {
    console.log(`${answer} will now be processed \n`);
    processFile("./data/" + answer);
  } else {
    console.log('No Choice was given. The program is now finished.');
  }
  rl.close();
});