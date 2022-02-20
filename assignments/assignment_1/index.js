const { stdin, stdout } = require("process")

function getNameFromCommandLine() {
   
    const name=process.argv


    return name[name.length-1]
    // Write you code here, name should be taken as args in process.argv
}

function getNameFromEnv() {
    process.env.NODE_ENV="Yash"
    
     return process.env.NODE_ENV
    // Write your code here
}

function getNameFromReadLine() {
    const readline = require('readline');
    readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    
    // Write your code here
}

module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}
