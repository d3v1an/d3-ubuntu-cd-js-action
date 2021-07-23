const core = require('@actions/core');
const github = require('@actions/github');
// const https = require('https'); // https://hcd.urbanissa.net/api/cd/exec
const axios = require('axios');

try {

    // const options = {
    //     host: 'hcd.urbanissa.net',
    //     port: 443,
    //     path: '/api/cd/exec',
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/vnd.github.everest-preview+json',
    //       'Content-Type': 'application/json; charset=UTF-8'
    //     }
    // };

  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  axios
  .post('https://hcd.urbanissa.net/api/cd/exec', {
    todo: 'Buy the milk'
  })
  .then(res => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  });

} catch (error) {
  core.setFailed(error.message);
}