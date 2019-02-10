import fs from 'fs';
import momentTz from 'moment-timezone';
import moment from 'moment';
import Papa from 'papaparse';

const parseConfig = {header: true, encoding: "utf8", error: function(errorMessage, file) {console.log(errorMessage);}, transform: transformInputs, complete: completion};
const outputFilePath = "./data/output.csv";

export function processFile(input) {
    const fileInput = fs.createReadStream(input);
    Papa.parse(fileInput, parseConfig);
}

function completion(results, file) {
    results.data.forEach((row) => {
        row.TotalDuration = row.FooDuration + row.BarDuration;
    });

    let processedOutputData = Papa.unparse(results, parseConfig);
    console.log(processedOutputData);

    fs.writeFile(outputFilePath, processedOutputData, (err) => {
        if (err) throw err;
        console.log('The file has been created here: ' + outputFilePath);
        process.exit(0);
    });
}

function transformInputs(value, headerName) {
    switch(headerName.toLowerCase()) {
        case 'timestamp':
            return dateFormatter(value);
        case 'zip':
            return value.padStart(5, "0");
        case 'fullname':
            return value.toUpperCase();
        case 'fooduration':
            return durationSecondsFormatter(value);
        case 'barduration':
            return durationSecondsFormatter(value);
        default:
            break;
    }
    return value;
}

function dateFormatter(colValue) {
    const sourceDateTime = moment(colValue, 'MM/DD/YY hh:mm:ss a');
    const sourceDateTimeZone = momentTz.tz(sourceDateTime, 'America/Los_Angeles');
    let targetDateTimeZone = sourceDateTimeZone.clone().tz('America/New_York');
    return targetDateTimeZone.format();
}

function durationSecondsFormatter(colValue) {
    return moment.duration(colValue).asSeconds();
}