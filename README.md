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

print a greeting and your org IDs

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
  $ sfdx testdata:generate --schemaid=ea4x6ba0 --count=100 --sobject=account --json
         TestData generated successfully
  $ sfdx testdata:generate --schemaid=eax36ba0 --sobject=Contact
       TestData generated successfully.
```

_See code: [src/commands/testdata/generate.ts](https://github.com/Projects/testdata/blob/v0.0.0/src/commands/testdata/generate.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
