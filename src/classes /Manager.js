const chalk = require('chalk');
const fetch = require('node-fetch');
const aoiversion = dependencies['aoi.js'];
const axios = require('axios');
const Discord = require('discord.js');

const { exec } = require('child_process');
const { version } = require('../package.json'); 
const { dependencies } = require('../../../package.json');

class AoiAI {
    constructor(options) {
        this.autoupdate = options.autoupdate || false;
        this.options = options;
        if(!options.client) {
            console.log("[ERR]: You have not inputted your aoi client.");
            process.exit(0);
        }

        if(this.autoupdate) {
            this.checkUpdates();
        }

        module.exports = this.options.client;

    } AndLog() {
        const client = this.options.client;
        client.on("ready", () => {
            console.log("\n\n\n");
            console.log(chalk.magenta.bold(`'|————— mocaoi.js | Plugin - Vers: v${version} —————'`));
            console.log(chalk.magenta.bold(`'|————— developer — github: S1mvolxD —————'`));
            console.log("\n\n\n");
        })
    } LoadFuncs() {
        const client = this.options.client;
    
        client.functionManager.createFunction({
            name: "$aiVersion",
            type: "djs",
            code: async d => {
                const data = d.util.aoiFunc(d);
                data.result = version;

                return {
                    code: d.util.setCode(data)
                }
            }
        });
    }
}

module.exports = { AoiAI };
