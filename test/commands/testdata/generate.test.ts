import {expect, test} from '@oclif/test';
import { Messages } from '@salesforce/core';
import * as child from 'child_process';
import * as fs from 'fs';
import * as util from 'util';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('testdata', 'testdataplugin');
const exec = util.promisify(child.exec);

describe('sfdx testdata:generate', () => {
    test
    .env({MAPIKEY: ''})
    .stdout()
    .stderr()
    .command(['testdata:generate', '--schemaid', 'ea4x6ba0', '--count', '100', '--sobject', 'account'])
    .it('API Key not supplied error check', ctx => {
        expect(ctx.stderr).to.contains(messages.getMessage('apiKeyMissingMessage'));
    });

    test
    .env({MAPIKEY: 'foobar'})
    .nock('https://api.mockaroo.com', api => api
        .get('/api/ea4x6ba0?count=100&key=foobar')
        .reply(200, '[{"externalId":1,"Name":"Zooveo"},{"externalId":2,"Name":"Mynte"}]')
    )
    .stdout()
    .command(['testdata:generate', '--schemaid', 'ea4x6ba0', '--count', '100', '--sobject', 'account'])
    .it('server error check when response status is 200', async ctx => {
        expect(ctx.stdout).to.contain('file successfully generated at');
        expect(fs.existsSync('./data/account.json')).equals(true);
        await exec('rm -rf ./data/');
    });

    test
    .env({MAPIKEY: 'foobar'})
    .nock('https://api.mockaroo.com', api => api
        .get('/api/ea4x6ba0?count=100&key=foobar')
        .reply(500, '{"statusText":"failed response!"}')
    )
    .stdout()
    .stderr()
    .command(['testdata:generate', '--schemaid', 'ea4x6ba0', '--count', '100', '--sobject', 'account'])
    .it('server error check when response status is 500', ctx => {
        expect(fs.existsSync('./data/account.json')).equals(false);
    });

    test
    .env({MAPIKEY: 'foobar'})
    .nock('https://api.mockaroo.com', api => api
        .get('/api/ea4x6ba0?count=100&key=foobar')
        .reply(200, '[{"externalId":1,"Name":"Zooveo"},{"externalId":2,"Name":"Mynte"}]')
    )
    .stdout()
    .command(['testdata:generate', '--schemaid', 'ea4x6ba0', '--count', '100', '--sobject', 'account', '--format', 'csv'])
    .it('server error check when response status is 200 and format is csv', async ctx => {
        expect(ctx.stdout).to.contain('file successfully generated at');
        expect(fs.existsSync('./data/account.csv')).equals(true);
        await exec('rm -rf ./data/');
    });

});
