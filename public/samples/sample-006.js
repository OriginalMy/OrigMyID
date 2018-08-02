var request = require("request");

var options = { method: 'POST',
  url: 'https://api1.testnet.originalmy.com/login/image',
  headers: { 
     'Cache-Control': 'no-cache',
     'Content-Type': 'application/json',
     Authorization: 'Chave de API fornecida pela OriginalMy' 
  },
  body: { cid: 'ID do CLiente fornecida pela OriginalMy', token: 'Fornecido pela API de usuário' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

});
