const layouter = require('.');
const fs = require('fs');

const testflow = require('./fixtures/simple-flow.json');

const outputFlow = layouter(testflow);

const stringifyFlow = JSON.stringify(outputFlow);
fs.writeFile('./output/simple-flow.json', stringifyFlow, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})
