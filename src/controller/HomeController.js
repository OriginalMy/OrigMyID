const AbstractController = require("./base/AbstractController");
const rp = require('request-promise');
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';

class HomeController extends AbstractController {
    
    index(req, res, next){
        res.render("index", {
            page_title: "OriginalMy - Identidade Blockchain",
            pageNS: "home"
        });
    }


}
module.exports = HomeController;