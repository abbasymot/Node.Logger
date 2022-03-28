const EventEmitter = require('events');
const fs = require('fs');
const uuid = require('uuid');

class Logger extends EventEmitter{
    // Simple logger that writes to console.
    log(msg) {
        this.emit('message', { id: uuid.v4(), msg });
    }

    // Write to a file.
    // It will remove the file context and add new context.
    writeLog(path, data) {
        fs.writeFile(path, data, err => {
            if (err) throw err;
            console.log(`Log file created: ${path}`);
        });
    }

    // Append data to already existed log file.
    appendLog(path, data) {
        fs.appendFile(path, `\n${data}`, err => {
            if (err) throw err;
            console.log(`Log data added to ${path}`);
        });
    }

    // Opens a log file and write the data to the console.
    readLog(path) {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) throw err;
            console.log(`\n\tThe ${path} log file data:\n`);
            console.log(data);
        });
    }
}

module.exports = Logger