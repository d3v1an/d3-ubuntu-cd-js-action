const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https'); // https://hcd.urbanissa.net/api/cd/exec

try {

    const options = {
        host: 'hcd.urbanissa.net',
        port: 443,
        path: '/api/cd/exec',
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.everest-preview+json',
          'Content-Type': 'application/json; charset=UTF-8'
        }
    };

    const request = https.request(options, (res) => {
        
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('close', () => {
            console.log('Added new test');
            console.log(JSON.parse(data));
        });
    });

    request.on('error', (e) => {
        console.error(e);
      });
    request.end();
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}