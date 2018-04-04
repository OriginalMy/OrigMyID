const rp = require('request-promise');
const crypto = require('crypto');

app.get("/auth/:nonce", function (req, res) {

    let urlAPI = 'https://api1.testnet.originalmy.com/login/user';
    let CID = '01';
    let OMID_KEY = 'ORIG-8742-DEVV';
    let CRYPTOGRAPHY_KEY ='AC483E3D9CC2474BB46CC215D0EA83CB';
    let IV = "KJSKJ982983KK8HD";
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