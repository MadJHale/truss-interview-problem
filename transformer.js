import moment from 'moment-timezone';

export function transformInputs(value, headerName) {
    switch(headerName.toLowerCase()) {
        case 'timestamp':
            dateFormatter(value);
            break;
        case 'zip':
            zipCodeFormatter(value);
            break;
        case 'fullname':
            fullNameFormatter(value);
            break;
        case 'fooduration':
            durationSecondsFormatter(value);
            break;
        case 'barduration':
            durationSecondsFormatter(value);
            break;
        case 'totalduration':
            //make a value that sums the other 2
            break;
        default:
            break;
    }
    return value;
}

function dateFormatter(colValue) {
    let colDateValue = moment(colValue, 'MM/DD/YY hh:mm:ss a');
    return colDateValue.tz("America/New_York").format();
}

function zipCodeFormatter(colValue) {
    return colValue.padStart(5, "0");
}

function fullNameFormatter(colValue) {
    return colValue.toUpperCase();
}

function durationSecondsFormatter(colValue) {
    return moment.duration(colValue).asSeconds();
}