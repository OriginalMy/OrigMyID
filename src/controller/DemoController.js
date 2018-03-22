const AbstractController = require("./base/AbstractController");
const rp = require('request-promise');
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';

class DemoController extends AbstractController {
    
    index(req, res, next){
        res.render("demo", {
            page_title: "OriginalMy - Identidade Blockchain Demo",
            pageNS: "demo"
        });
    }

    auth(req, res, next){

        let OMID_ID = '01';
        let OMID_KEY = 'ORIG-8742-DEVV';
        let CRYPTOGRAPHY_KEY ='27F5DB12FB4F4D1A9EDE13E7C91CA99A';
        let IV = "9383KJSKLL209329";
        let urlAPI = 'https://api1.testnet.originalmy.com/login/user';
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
                "cid": OMID_ID,
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
    }

}
module.exports = DemoController;