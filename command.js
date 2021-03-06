import { prompt } from 'readline-sync';

export const LIST_ALL = 1;
export const LIST_ACCOUNT = 2;
export const IMPORT_FILE = 3;
export const EXIT = 4;

class Command {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}

function promptForCommand() {
    console.log('\nAvailable commands:');
    console.log(' - List All');
    console.log(' - List <Account>');
    console.log(' - Import File <filePath>')
    console.log(' - Exit');
    console.log('\nPlease enter your command:');
    return prompt();
}

function parseCommand(command) {
    if (command.toLowerCase() === 'exit') {
        return new Command(EXIT);
    } else if (command.toLowerCase() === 'list all') {
        return new Command(LIST_ALL);
    } else if (command.toLowerCase().startsWith('list ')) {
        const account = command.slice(5);
        return new Command(LIST_ACCOUNT, {account});
    } else if (command.toLowerCase().startsWith('import file ')) {
        const filePath = command.slice(12);
        return new Command(IMPORT_FILE, {filePath});
    } else {
        return undefined;
    }
}

export function getParsedCommand() {
    let command;
    do {
        command = parseCommand(promptForCommand());
    } while (command === undefined && (console.log('Please enter a valid command') || true));
    return command;
}
