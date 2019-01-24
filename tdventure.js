#!/usr/bin/env node

const vorpal = require('vorpal')();
const chalk = vorpal.chalk;
const fs = require('fs');

vorpal
  .command('play <cartridge>', 'Plays the selected game')
  .action(function(args, callback) {
    this.log('Loading ' + args.cartridge);
    if (!fs.existsSync('games/' + args.cartridge + '/game.js')) {
        this.log('The game ' + args.cartridge + ' does not exist!');
    }
    callback();
  });

vorpal
  .delimiter(chalk.green('tdventure:'))
  .show();