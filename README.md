testdata
========



[![Version](https://img.shields.io/npm/v/testdata.svg)](https://npmjs.org/package/testdata)
[![CircleCI](https://circleci.com/gh/Projects/testdata/tree/master.svg?style=shield)](https://circleci.com/gh/Projects/testdata/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/Projects/testdata?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/testdata/branch/master)
[![Codecov](https://codecov.io/gh/Projects/testdata/branch/master/graph/badge.svg)](https://codecov.io/gh/Projects/testdata)
[![Greenkeeper](https://badges.greenkeeper.io/Projects/testdata.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/Projects/testdata/badge.svg)](https://snyk.io/test/github/Projects/testdata)
[![Downloads/week](https://img.shields.io/npm/dw/testdata.svg)](https://npmjs.org/package/testdata)
[![License](https://img.shields.io/npm/l/testdata.svg)](https://github.com/Projects/testdata/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g testdata
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
testdata/0.0.0 darwin-x64 node-v14.1.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
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

_See code: [src/commands/testdata/generate.ts](https://github.com/Projects/testdata/blob/v0.0.0/src/commands/testdata/generate.ts)_
<!-- commandsstop -->
