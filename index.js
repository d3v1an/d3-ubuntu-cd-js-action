const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios').create({
    baseURL: "https://hcd.urbanissa.net"
    // headers: {
    //     'apikey': process.env.SMS_API_KEY
    // }
});

const ax = async () => {
    return await axios.post('/api/cd/exec', {
        'message': `Prueba con axion`
    });
}
// gp().then(d => {
//     console.log(d);
// })
// .catch(e => {
//     console.log(e);
// });

try {
    ax().then(d => console.log('Axios', d) ).catch(e => console.log('Error', e));
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