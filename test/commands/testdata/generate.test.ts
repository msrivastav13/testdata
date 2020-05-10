import {expect, test} from '@oclif/test';
import { Messages } from '@salesforce/core';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('testdata', 'testdataplugin');

describe('sfdx testdata:generate', () => {
    test
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
    .it('server error check when response status is 200', ctx => {
        expect(ctx.stdout).to.contain('file successfully generated');
    });

});
