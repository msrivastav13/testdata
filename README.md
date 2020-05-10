testdata sfdx-plugin
========

A plugin for Salesforce DX CLI that provides ability to generate test data using mockaroo schema

You will need to sign up for the mockaroo API services and generate a schema.

[![Version](https://img.shields.io/npm/v/seedmockdata.svg)](https://www.npmjs.com/package/seedmockdata)
![Plugin build status](https://github.com/msrivastav13/testdata/workflows/testData%20sfdx%20plugin%20testcases/badge.svg?branch=master)
[![codecov](https://codecov.io/gh/msrivastav13/testdata/branch/master/graph/badge.svg)](https://codecov.io/gh/msrivastav13/testdata)
[![Downloads/week](https://img.shields.io/npm/dw/testdata.svg)](https://npmjs.org/package/testdata)
[![License](https://img.shields.io/npm/l/testdata.svg)](https://github.com/Projects/testdata/blob/master/package.json)

## Setup

### **Install as plugin (Recommended approach for Installing)**

 Install plugin using command : `sfdx plugins:install mo-dx-plugin`


### **Install from source(Preferred approach for debugging and enhancing the plugin)**
1. Install the SDFX CLI.

2. Clone the repository: `git clone git@github.com:msrivastav13/mo-dx-plugin.git`

3. Install using yarn: `yarn install`

4. Link the plugin: `sfdx plugins:link` .

## Prequsite

1. Get your mockaroo api key from your Account Settings. You can find under MyAccount section

2. Set the MAPIKEY environment variable. On MAC OSX for session based type '$ export MAPIKEY=<apikey>'

3. Create a Schema mapping in mockaroo. Note that always choose one field with name  externalId and map to an Id function in mockaroo

USAGE

<!-- commands -->
* [`sfdx testdata:generate -s <string> [-o <string>] [-d <string>] [-f <string>] [-c <integer>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-testdatagenerate--s-string--o-string--d-string--f-string--c-integer---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx testdata:generate -s <string> [-o <string>] [-d <string>] [-f <string>] [-c <integer>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Creates test data using mockaroo schema. Requires mockaroo schemaId and key. Set your mockaroo key using environment variable MAPIKEY

```
USAGE
  $ sfdx testdata:generate -s <string> [-o <string>] [-d <string>] [-f <string>] [-c <integer>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -c, --count=count                                                                 [default: 10] specify the number of
                                                                                    rows of data needed

  -d, --outputdir=outputdir                                                         [default: ./data] path of the output
                                                                                    directory of file

  -f, --format=format                                                               file format of the output. Supported
                                                                                    values are json/csv

  -o, --sobject=sobject                                                             [default: testdata] Name of the
                                                                                    Salesforce object

  -s, --schemaid=schemaid                                                           (required) Mockaroo Schema Id

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  Generates testdata from mockaroo schemaid and creates a json file account.json with 10 rows of data in ./data 
  directory
         $ sfdx testdata:generate --schemaid=ea4x6ba0 --count=100 --sobject=account --json
  Generates testdata from mockaroo schemaid and creates a json file Contact.json in ./data directory
         $ sfdx testdata:generate --schemaid=eax36ba0 --sobject=Contact
  Generates testdata from mockaroo schemaid and creates a csv file Contact.csv in ./data directory
         $ sfdx testdata:generate --schemaid=eax36ba0 --sobject=Contact --outputdir='./data' --format=csv
```

_See code: [src/commands/testdata/generate.ts](https://github.com/msrivastav13/testdata/blob/master/src/commands/testdata/generate.ts)_
<!-- commandsstop -->
