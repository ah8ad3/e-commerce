const fs = require('fs');
const program = require('commander');
const {exec} = require('child_process');

if (!fs.existsSync('app/')) {
    fs.mkdirSync('app/');
}

program
    .version('0.5.0')
    .option('-c, --create-app [app_name]', 'Add name for app', false)
    .option('-t, --test', 'Test run')
    .option('-i, --install', 'Install dependency')
    .option('-p, --production', 'Start server in production mode')
    .option('-d, --dev', 'Start server in develop mode')
    .parse(process.argv);

// -c command code check if app doesn't exist create app
if (program.createApp === true) {
    console.log('Please enter app name here');
} else if (program.createApp !== false){
    fs.readdir('app/', function(err, items) {
        if (items.includes(program.createApp)){
            console.log('App exist')
        }else {
            fs.mkdirSync('app/' + program.createApp);
            fs.writeFileSync('app/'+program.createApp + '/models.js', '');
            fs.writeFileSync('app/'+program.createApp + '/routes.js', '');
            fs.writeFileSync('app/'+program.createApp + '/test.js', '');
            fs.writeFileSync('app/'+program.createApp + '/messages.js', '');
            console.log('App %s created', program.createApp);
        }
    });
}


// test
if (program.test) {
    exec('npm test')
}


if (program.install) {
    exec('npm install\n' +
        'npm install -g strongloop cross-env\n', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}

if (program.dev) {
    exec('node bin/www', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    })
}

if (program.production) {
    exec('cross-env NODE_ENV=production slc run bin/www', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    })
}
