#! /usr/bin/env node

const chalk = require('chalk')
const boxen = require('boxen')
const utils = require('./utils.js')
const translate = require('@vitalets/google-translate-api');
const usage = chalk.keyword('violet')("\nUsage: tran <lang_name> sentence to be translated");


const yargs = require("yargs");


const options = yargs
      .usage(usage)
      .option("l", {alias:"languages", describe: "List all supported languages.", type: "boolean", demandOption: false })
      .help(true)
      .argv;

// console.log(yargs.argv);
if(yargs.argv.l == true || yargs.argv.languages == true){
    utils.showAll();
    return;
}

if(yargs.argv._[0] == null){
    utils.showHelp();
    return;
}



if(yargs.argv._[0])
var language = yargs.argv._[0].toLowerCase(); // stores the language.

var sentence = "";


//parsing the sentence to be translated.
sentence = utils.parseSentence(yargs.argv._);


if(sentence == ""){
    console.error(chalk.red.bold("\nThe entered sentence is like John Cena, I can't see it!\n"))
    console.log(chalk.green("Enter tran --help to get started.\n"))
    return;
}

//parsing the language specified to the ISO-639-1 code.
language = utils.parseLanguage(language); 

//terminating the program if the language is unsupported.
if(language == null){
    return;
}

translate(sentence, {to: language}).then(res => {

        console.log("\n" + boxen(chalk.green("\n" + res.text + "\n"), {padding: 1, borderColor: 'green', dimBorder: true}) + "\n");

}).catch(err => {
	    console.error(err);
	});
