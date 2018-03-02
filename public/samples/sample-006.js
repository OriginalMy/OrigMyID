var request = require("request");

var options = { method: 'POST',
  url: 'https://api1.testnet.originalmy.com/login/image',
  headers: 
   { 'Postman-Token': 'a0cf84d9-52cf-f1a4-c3ee-cdd927e8df7b',
     'Cache-Control': 'no-cache',
     'Content-Type': 'application/json',
     Authorization: 'ORIG-8742-DEVV' },
  body: { cid: '01', token: '37f051fefce4429d' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
