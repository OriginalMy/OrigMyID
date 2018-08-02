const rp = require('request-promise');
const crypto = require('crypto');

app.get("/auth/:nonce", function (req, res) {

    let urlAPI = 'https://api1.testnet.originalmy.com/login/user';
    let CID = 'ID do CLiente fornecida pela OriginalMy';
    let OMID_KEY = 'Chave do OMID fornecida pela OriginalMy';
    let CRYPTOGRAPHY_KEY ='Chave de criptografia fornecida pela OriginalMy';
    let IV = "Chave de criptografia fornecida pela OriginalMy";
    let ALGORITHM = 'aes256';
    let nonce = req.params.nonce;

    let options = {
        uri: urlAPI,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': OMID_KEY
        },
        json: true,
        body: { 
            "cid": CID,
            "nonce": nonce 
        }
    };

    return rp(options).
        then(result => {
    
            var decipher = crypto.createDecipheriv(ALGORITHM, CRYPTOGRAPHY_KEY, IV);
            var user = decipher.update(result.data.user,'base64','utf8');
            user += decipher.final('utf8');
            user = JSON.parse(user);
            res.status(200).send(user);
                
        }).catch(
            (err) => {
                res.status(500).send({
                    statusCode: 500,
                    statusText: "Erro Interno",
                });
            }
        );
});