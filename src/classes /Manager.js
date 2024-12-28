const chalk = require("chalk");
const fetch = require("node-fetch");
//const aoiversion = dependencies['aoi.js'];
//const axios = require("axios");
//const Discord = require("discord.js");

const { exec } = require("child_process");
const { version } = require("../package.json");
//const { dependencies } = require("../../../package.json");


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
            console.log(chalk.magenta.bold(`'|————— aoi.ai | Plugin - Vers: v${version} —————'`));
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

        client.functionManager.createFunction({
            name: "chatAI",
            type: "djs",
            code: async (d) => {
                const data = d.util.aoiFunc(d);
                const [text, key] = data.inside.splits;

                if(!key) return d.aoiError.fnError("custom", {}, "This endpoint required \"key\". Create Your Free Key in https://discord.gg/djPPQ4cJQ2.")
                    if(!text) return d.aoiError.fnError("custom", {}, "You did not write text.");
                    const api = await fetch(`https://api.kastg.xyz/api/ai/chatgpt?prompt=${encodeURI(text)}&key=${key}`)
                    .then(response => response.json());
                    if(api.error) throw 'Could not connect to CodAre API'
                    data.result =  api.cevap;

                
                return {
                  code: d.util.setCode(data)
                }
            }
        })
    } checkUpdates() {
        console.log(chalk.white.bold("[aoi.ai AutoUpdate] ") + chalk.yellow("Checking for updates..."));
    
        exec("npm show aoi.ai version", (error, stdout, stderr) => {
          if (error) {
            console.error(chalk.red("Error checking for updates:", error.message));
            return;
          }
    
          const latestVersion = stdout.trim();
          const currentVersion = require("../package.json").version;
    
          if (latestVersion !== currentVersion) {
            console.log(chalk.white.bold("[aoi.ai AutoUpdate] ") + chalk.green("Updating module..."));
            exec("npm install aoi.ai@latest", (updateError) => {
              if (updateError) {
                console.error(chalk.white.bold("[aoi.ai AutoUpdate] ") + chalk.red("Error updating module:", updateError.message));
              } else {
                console.log(chalk.white.bold("[aoi.ai AutoUpdate] ") + chalk.green("Module updated successfully, Restart your project for the new version to become active."));
              }
            });
          } else {
            console.log(chalk.white.bold("[aoi.ai AutoUpdate] ") + chalk.green("Module is up-to-date."));
          }
        });
      }
}

module.exports = { AoiAI };
