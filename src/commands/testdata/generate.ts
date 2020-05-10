import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import csvjson = require('csvjson');
import * as fs from 'fs';
import { RequestInit } from 'node-fetch';
import * as apiservice from '../../mockaroo/apiservice';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('testdata', 'testdataplugin');

export default class Generate extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `Generates testdata from mockaroo schemaid and creates a json file account.json with 10 rows of data in ./data directory
      $ sfdx testdata:generate --schemaid=ea4x6ba0 --count=100 --sobject=account --json`,
    `Generates testdata from mockaroo schemaid and creates a json file Contact.json in ./data directory
      $ sfdx testdata:generate --schemaid=eax36ba0 --sobject=Contact`,
    `Generates testdata from mockaroo schemaid and creates a csv file Contact.csv in ./data directory
      $ sfdx testdata:generate --schemaid=eax36ba0 --sobject=Contact --outputdir=./data --format=csv`
  ];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    schemaid: flags.string({
      char: 's',
      description: messages.getMessage('schemaDescription'),
      required: true
    }),
    sobject: flags.string({
      char: 'o',
      description: messages.getMessage('objectDescription'),
      default: 'testdata'
    }),
    outputdir: flags.string({
      char: 'd',
      description: messages.getMessage('outputdirDescription'),
      default: './data'
    }),
    format: flags.string({
      char: 'f',
      description: messages.getMessage('formatDescription')
    }),
    count: flags.integer({
      char: 'c',
      description: messages.getMessage('countDescription'),
      default: 10
    })
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    let finalresponse = {};

    const mockarooAPIKey = process.env.MAPIKEY;

    if (!mockarooAPIKey) {
      throw new SfdxError(messages.getMessage('apiKeyMissingMessage'));
    }

    const mockarooendpoint = `https://api.mockaroo.com/api/${this.flags.schemaid}?count=${this.flags.count}&key=${mockarooAPIKey}`;

    let format = 'application/json';

    if (this.flags.format === 'csv') {
      format = 'text/csv';
    }

    const requestOptions: RequestInit = {
      headers: {
        'Content-Type': format
      },
      method: 'GET'
    };

    try {
      const response = await apiservice.getMockData(mockarooendpoint, requestOptions);

      if (response.status === 200) {
        // Create a directory if it doesn't exist'

        if (!fs.existsSync(this.flags.outputdir)) {
          fs.mkdirSync(this.flags.outputdir);
        }

        // This is response array for the regular data for CSV output
        const responseArray = [];
        // This is for JSON output as expected by data:import command in sfdx CLI
        const sfdcresponseArray = [];

        await response.json().then(data =>
          data.forEach(element => {
            // This is for regular CSV data
            responseArray.push(element);
            // This is for JSON output as expected by data:import command in sfdx CLI
            const dataRow = {
              attributes: {
                type: this.flags.sobject,
                referenceId: this.flags.sobject + 'Ref' + element['externalId']
              },
              ...element
            };
            sfdcresponseArray.push(dataRow);
          })
        );
        finalresponse = this.createFile(format, responseArray, finalresponse, sfdcresponseArray);
      } else {
          finalresponse = {
            sucess: false,
            result: response.statusText + '.The status code of response is ' + response.status
          };
          throw new SfdxError(finalresponse['result']);
      }
    } catch (err) {
      finalresponse = {
        sucess: false,
        result: err.cause ? err.cause : err.message
      };
      throw new SfdxError(err.cause ? err.cause : err.message);
    }

    return { finalresponse };
  }

  // tslint:disable-next-line: no-any
  private createFile(format: string, responseArray: any[], finalresponse: {}, sfdcresponseArray: any[]) {
    if (format === 'text/csv') {
      finalresponse = this.createCSVFile(responseArray, finalresponse);
    }
    // For JSON format
    if (format === 'application/json') {
      finalresponse = this.createJSONfile(sfdcresponseArray, finalresponse);
    }
    return finalresponse;
  }

  // tslint:disable-next-line: no-any
  private createJSONfile(sfdcresponseArray: any[], finalresponse: {}) {
    const filepath: string = this.flags.outputdir + '/' + this.flags.sobject + '.json';
    fs.writeFile(filepath, JSON.stringify(sfdcresponseArray, null, 4), 'UTF-8', err => {
      if (err) {
        finalresponse = { result: err };
        throw err;
      }
    });
    finalresponse = {
      sucess: true,
      result: this.flags.sobject +
        '.json' +
        ' file successfully generated at ' +
        filepath
    };
    this.ux.log(finalresponse['result']);
    return finalresponse;
  }

  // tslint:disable-next-line: no-any
  private createCSVFile(responseArray: any[], finalresponse: {}) {
    const filepath: string = this.flags.outputdir + '/' + this.flags.sobject + '.csv';
    const csvData = csvjson.toCSV(responseArray, {
      headers: 'key'
    });
    fs.writeFile(filepath, csvData, 'UTF-8', err => {
      if (err) {
        if (err) {
          finalresponse = { sucess: false, result: err };
          throw err;
        }
      }
    });
    finalresponse = {
      sucess: true,
      result: this.flags.sobject +
        '.csv' +
        ' file successfully generated at ' +
        filepath
    };
    this.ux.log(finalresponse['result']);
    return finalresponse;
  }
}
