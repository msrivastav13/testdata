import * as child from 'child_process';
import * as fs from 'fs';
import * as util from 'util';

const exec = util.promisify(child.exec);

describe('sfdx testdata:generate', () => {
    jest.setTimeout(100000);

    const workspace = './testWorkspace';

    beforeAll(async () => {
        if ( fs.existsSync(workspace)) {
            fs.rmdirSync(workspace);
        }
        fs.mkdirSync(workspace);
    });

    it('API Key not supplied', async () => {
        const command = 'sfdx testdata:generate --schemaid=ea4x6ba0 --count=100 --sobject=account';
        try {
            await exec(command, { cwd: 'testWorkspace' });
        } catch (err) {
            console.log(err.stderr);
        }
    });

    afterAll(async () => {
        fs.rmdirSync(workspace);
    });

});
